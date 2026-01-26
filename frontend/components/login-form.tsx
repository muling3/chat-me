"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("gagribarshl@gmail.com");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-3">
        <Label htmlFor="email" className="text-foreground font-medium text-sm">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-12 h-12 bg-input/50 border-input text-foreground focus:border-primary focus:ring-primary rounded-lg"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-3">
        <Label
          htmlFor="password"
          className="text-foreground font-medium text-sm"
        >
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12 pr-12 h-12 bg-input/50 border-input text-foreground focus:border-primary focus:ring-primary rounded-lg"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary bg-input/50"
          />
          <Label htmlFor="remember" className="text-muted-foreground text-sm">
            Remember me
          </Label>
        </div>
        <Button
          type="button"
          variant="link"
          className="text-primary hover:text-primary/90 text-sm p-0 h-auto hover:no-underline"
        >
          Forget Password?
        </Button>
      </div>

      {/* Continue Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-lg"
      >
        Continue
      </Button>
    </form>
  );
}
