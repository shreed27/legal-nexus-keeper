
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export interface LoginFormData {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const { data: isValid, error: verifyError } = await supabase
        .rpc('verify_credentials', { 
          check_email: data.email,
          check_password: data.password
        });

      if (verifyError) {
        throw new Error("Error verifying credentials");
      }

      if (!isValid) {
        throw new Error("Invalid email or password");
      }

      // Create a Supabase session for the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (signInError) {
        // If sign in fails, try to sign up first
        const { error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password
        });

        if (signUpError) {
          throw new Error("Failed to create authentication session");
        }

        // Try signing in again after successful signup
        const { error: finalSignInError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password
        });

        if (finalSignInError) {
          throw new Error("Failed to create authentication session");
        }
      }

      toast({
        title: "Success",
        description: "Welcome back!",
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

  return {
    isLoading,
    handleLogin,
  };
};
