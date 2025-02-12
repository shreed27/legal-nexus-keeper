import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  // Registration state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [registerPasscode, setRegisterPasscode] = useState("");
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPasscode, setLoginPasscode] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePasscode = (passcode: string) => {
    return /^\d{6}$/.test(passcode);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobileNumber = (number: string) => {
    return /^\d{10}$/.test(number);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate all fields
      if (!firstName.trim() || !lastName.trim()) {
        throw new Error("Please fill in all name fields");
      }

      if (!validateEmail(registerEmail)) {
        throw new Error("Please enter a valid email address");
      }

      if (!validateMobileNumber(mobileNumber)) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }

      if (!validatePasscode(registerPasscode)) {
        throw new Error("Passcode must be exactly 6 digits");
      }

      // First check if the email is authorized using is_email_authorized function
      const { data: isAuthorized, error: authCheckError } = await supabase
        .rpc('is_email_authorized', { check_email: registerEmail });

      if (authCheckError || !isAuthorized) {
        throw new Error("This email is not authorized to access the application");
      }

      // If email doesn't exist, proceed with registration
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: registerEmail.toLowerCase(),
            mobile_number: mobileNumber,
            gender,
            passcode: registerPasscode
          }
        ])
        .select()
        .single();

      if (profileError) {
        console.error("Registration error:", profileError);
        throw new Error(profileError.message);
      }

      toast({
        title: "Success",
        description: "Registration successful! Please login.",
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setRegisterEmail("");
      setMobileNumber("");
      setGender("male");
      setRegisterPasscode("");
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validateEmail(loginEmail)) {
        throw new Error("Please enter a valid email address");
      }

      if (!validatePasscode(loginPasscode)) {
        throw new Error("Passcode must be exactly 6 digits");
      }

      // First check if the email is authorized using is_email_authorized function
      const { data: isAuthorized, error: authCheckError } = await supabase
        .rpc('is_email_authorized', { check_email: loginEmail });

      if (authCheckError) {
        console.error("Authorization check error:", authCheckError);
        throw new Error("Error checking authorization status");
      }

      if (!isAuthorized) {
        throw new Error("This email is not authorized to access the application");
      }

      // Then verify credentials
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select()
        .eq('email', loginEmail)
        .eq('passcode', loginPasscode)
        .maybeSingle();

      if (profileError) {
        console.error("Profile check error:", profileError);
        throw new Error("Error verifying credentials");
      }

      if (!profileData) {
        throw new Error("Invalid email or passcode");
      }

      // First try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPasscode
      });

      // If sign in fails, try to sign up and then sign in
      if (signInError) {
        console.log("Sign in failed, attempting sign up:", signInError);
        
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: loginEmail,
          password: loginPasscode,
          options: {
            data: {
              first_name: profileData.first_name,
              last_name: profileData.last_name
            }
          }
        });

        if (signUpError) {
          console.error("Sign up error:", signUpError);
          throw new Error("Failed to create authentication session");
        }

        // Try signing in again after successful signup
        const { error: finalSignInError } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: loginPasscode
        });

        if (finalSignInError) {
          console.error("Final sign in error:", finalSignInError);
          throw new Error("Failed to create authentication session");
        }
      }

      toast({
        title: "Success",
        description: `Welcome back, ${profileData.first_name}!`,
      });

      // Clear form
      setLoginEmail("");
      setLoginPasscode("");
      
      // Navigate to dashboard
      navigate("/dashboard");
      
    } catch (error: any) {
      console.error("Login error details:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session) {
          console.log("Active session found, redirecting to dashboard");
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="6-digit Passcode"
                    value={loginPasscode}
                    onChange={(e) => setLoginPasscode(e.target.value)}
                    required
                    minLength={6}
                    maxLength={6}
                    pattern="\d{6}"
                    title="Please enter exactly 6 digits"
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <span>Login</span>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Mobile Number (10 digits)"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    pattern="\d{10}"
                    title="Please enter exactly 10 digits"
                    className="w-full"
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="6-digit Passcode"
                    value={registerPasscode}
                    onChange={(e) => setRegisterPasscode(e.target.value)}
                    required
                    minLength={6}
                    maxLength={6}
                    pattern="\d{6}"
                    title="Please enter exactly 6 digits"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup
                    value={gender}
                    onValueChange={(value) => setGender(value as "male" | "female" | "other")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <span>Register</span>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
