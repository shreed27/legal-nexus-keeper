
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export interface AuthFormData {
  email: string;
  passcode: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  gender?: "male" | "female" | "other";
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePasscode = (passcode: string) => {
    return /^\d{6}$/.test(passcode);
  };

  const validateMobileNumber = (number: string) => {
    return /^\d{10}$/.test(number);
  };

  const handleLogin = async (data: AuthFormData) => {
    setIsLoading(true);

    try {
      if (!validateEmail(data.email)) {
        throw new Error("Please enter a valid email address");
      }

      if (!validatePasscode(data.passcode)) {
        throw new Error("Passcode must be exactly 6 digits");
      }

      const { data: isAuthorized, error: authCheckError } = await supabase
        .rpc('is_email_authorized', { check_email: data.email });

      if (authCheckError) {
        console.error("Authorization check error:", authCheckError);
        throw new Error("Error checking authorization status");
      }

      if (!isAuthorized) {
        throw new Error("This email is not authorized to access the application");
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select()
        .eq('email', data.email)
        .eq('passcode', data.passcode)
        .maybeSingle();

      if (profileError) {
        console.error("Profile check error:", profileError);
        throw new Error("Error verifying credentials");
      }

      if (!profileData) {
        throw new Error("Invalid email or passcode");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.passcode
      });

      if (signInError) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: data.passcode,
          options: {
            data: {
              first_name: profileData.first_name,
              last_name: profileData.last_name
            }
          }
        });

        if (signUpError) {
          throw new Error("Failed to create authentication session");
        }

        const { error: finalSignInError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.passcode
        });

        if (finalSignInError) {
          throw new Error("Failed to create authentication session");
        }
      }

      toast({
        title: "Success",
        description: `Welcome back, ${profileData.first_name}!`,
      });

      navigate("/dashboard");
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: AuthFormData) => {
    setIsLoading(true);

    try {
      if (!data.firstName?.trim() || !data.lastName?.trim()) {
        throw new Error("Please fill in all name fields");
      }

      if (!validateEmail(data.email)) {
        throw new Error("Please enter a valid email address");
      }

      if (!data.mobileNumber || !validateMobileNumber(data.mobileNumber)) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }

      if (!validatePasscode(data.passcode)) {
        throw new Error("Passcode must be exactly 6 digits");
      }

      const { data: isAuthorized, error: authCheckError } = await supabase
        .rpc('is_email_authorized', { check_email: data.email });

      if (authCheckError || !isAuthorized) {
        throw new Error("This email is not authorized to access the application");
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          first_name: data.firstName.trim(),
          last_name: data.lastName.trim(),
          email: data.email.toLowerCase(),
          mobile_number: data.mobileNumber,
          gender: data.gender,
          passcode: data.passcode
        }]);

      if (profileError) {
        throw new Error(profileError.message);
      }

      toast({
        title: "Success",
        description: "Registration successful! Please login.",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin,
    handleRegister,
  };
};
