
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth, AuthFormData } from "@/hooks/useAuth";

export const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [passcode, setPasscode] = useState("");
  
  const { handleRegister, isLoading } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: AuthFormData = {
      email,
      passcode,
      firstName,
      lastName,
      mobileNumber,
      gender,
    };
    
    if (await handleRegister(data)) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobileNumber("");
      setGender("male");
      setPasscode("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
  );
};
