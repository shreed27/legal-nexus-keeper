
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, AuthFormData } from "@/hooks/useAuth";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const { handleLogin, isLoading } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: AuthFormData = { email, passcode };
    if (await handleLogin(data)) {
      setEmail("");
      setPasscode("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>

      <div>
        <Input
          type="password"
          placeholder="6-digit Passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
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
  );
};
