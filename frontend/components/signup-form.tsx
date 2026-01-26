"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Phone, User, Loader2, CheckCircle2 } from "lucide-react";

type VerificationType = "none" | "phone" | "email";

export default function SignupForm() {
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // OTP states
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  // Verification states
  const [verificationType, setVerificationType] =
    useState<VerificationType>("none");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Loading states
  const [isSendingPhoneCode, setIsSendingPhoneCode] = useState(false);
  const [isSendingEmailCode, setIsSendingEmailCode] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate sending OTP
  const sendPhoneCode = () => {
    setIsSendingPhoneCode(true);
    // Simulate API call
    setTimeout(() => {
      setIsSendingPhoneCode(false);
      setVerificationType("phone");
      alert(`Verification code sent to ${phone}`);
    }, 1500);
  };

  const sendEmailCode = () => {
    setIsSendingEmailCode(true);
    // Simulate API call
    setTimeout(() => {
      setIsSendingEmailCode(false);
      setVerificationType("email");
      alert(`Verification code sent to ${email}`);
    }, 1500);
  };

  // Verify OTP
  const verifyPhoneCode = () => {
    if (phoneOtp.length !== 6) {
      alert("Please enter a 6-digit code");
      return;
    }

    setIsVerifyingPhone(true);
    // Simulate API verification
    setTimeout(() => {
      setIsVerifyingPhone(false);
      setIsPhoneVerified(true);
      setVerificationType("none");
      alert("Phone number verified successfully!");
    }, 1500);
  };

  const verifyEmailCode = () => {
    if (emailOtp.length !== 6) {
      alert("Please enter a 6-digit code");
      return;
    }

    setIsVerifyingEmail(true);
    // Simulate API verification
    setTimeout(() => {
      setIsVerifyingEmail(false);
      setIsEmailVerified(true);
      setVerificationType("none");
      alert("Email verified successfully!");
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPhoneVerified || !isEmailVerified) {
      alert("Please verify both phone and email before submitting");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Account created successfully!");
      console.log({
        fullName,
        email,
        phone,
        password,
        isPhoneVerified,
        isEmailVerified,
      });
    }, 2000);
  };

  // Auto-submit OTP when complete
  useEffect(() => {
    if (phoneOtp.length === 6 && verificationType === "phone") {
      verifyPhoneCode();
    }
  }, [phoneOtp]);

  useEffect(() => {
    if (emailOtp.length === 6 && verificationType === "email") {
      verifyEmailCode();
    }
  }, [emailOtp]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name Field */}
      <div className="space-y-3">
        <Label
          htmlFor="fullName"
          className="text-foreground font-medium text-sm"
        >
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="pl-12 h-12 bg-input/50 border-input text-foreground focus:border-primary focus:ring-primary rounded-lg"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      {/* Email Field with OTP */}
      <div className="space-y-3">
        <Label htmlFor="email" className="text-foreground font-medium text-sm">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-12 pr-32 h-12 bg-input/50 border-input text-foreground focus:border-primary focus:ring-primary rounded-lg"
            placeholder="Enter your email"
            required
          />
          <div className="absolute right-2 top-2">
            <Button
              type="button"
              size="sm"
              onClick={sendEmailCode}
              disabled={!email || isSendingEmailCode || isEmailVerified}
              className="h-8 text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
            >
              {isSendingEmailCode ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : isEmailVerified ? (
                <CheckCircle2 className="h-3 w-3 mr-1" />
              ) : null}
              {isEmailVerified ? "Verified" : "Get Code"}
            </Button>
          </div>
        </div>

        {/* Email OTP Input */}
        {verificationType === "email" && (
          <div className="space-y-3 pt-3 animate-in fade-in slide-in-from-top-5">
            <Label className="text-sm text-muted-foreground">
              Enter 6-digit code sent to {email}
            </Label>
            <div className="flex items-center gap-3">
              <InputOTP
                maxLength={6}
                value={emailOtp}
                disabled={isVerifyingEmail}
                onChange={setEmailOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="button"
                size="sm"
                onClick={verifyEmailCode}
                disabled={emailOtp.length !== 6 || isVerifyingEmail}
                className="h-10"
              >
                {isVerifyingEmail ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Phone Field with OTP */}
      <div className="space-y-3">
        <Label htmlFor="phone" className="text-foreground font-medium text-sm">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-12 pr-32 h-12 bg-input/50 border-input text-foreground focus:border-primary focus:ring-primary rounded-lg"
            placeholder="Enter your phone number"
            required
          />
          <div className="absolute right-2 top-2">
            <Button
              type="button"
              size="sm"
              onClick={sendPhoneCode}
              disabled={!phone || isSendingPhoneCode || isPhoneVerified}
              className="h-8 text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
            >
              {isSendingPhoneCode ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : isPhoneVerified ? (
                <CheckCircle2 className="h-3 w-3 mr-1" />
              ) : null}
              {isPhoneVerified ? "Verified" : "Get Code"}
            </Button>
          </div>
        </div>

        {/* Phone OTP Input */}
        {verificationType === "phone" && (
          <div className="space-y-3 pt-3 animate-in fade-in slide-in-from-top-5">
            <Label className="text-sm text-muted-foreground">
              Enter 6-digit code sent to {phone}
            </Label>
            <div className="flex items-center gap-3">
              <InputOTP
                maxLength={6}
                value={phoneOtp}
                disabled={isVerifyingPhone}
                onChange={setPhoneOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="button"
                size="sm"
                onClick={verifyPhoneCode}
                disabled={phoneOtp.length !== 6 || isVerifyingPhone}
                className="h-10"
              >
                {isVerifyingPhone ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>
        )}
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12 h-12 bg-input/50 border-input text-foreground focus:border-primary focus:ring-primary rounded-lg"
            placeholder="Create a password"
            required
          />
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-3">
        <Label
          htmlFor="confirmPassword"
          className="text-foreground font-medium text-sm"
        >
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-12 h-12 bg-input/50 border-input text-foreground focus:border-primary focus:ring-primary rounded-lg"
            placeholder="Confirm your password"
            required
          />
        </div>
        {confirmPassword && password !== confirmPassword && (
          <p className="text-sm text-destructive animate-in fade-in">
            Passwords do not match
          </p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3 pt-2">
        <Checkbox
          id="terms"
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          className="mt-1 border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Label
          htmlFor="terms"
          className="text-sm text-muted-foreground leading-relaxed"
        >
          I agree to the{" "}
          <Button
            type="button"
            variant="link"
            className="text-primary hover:text-primary/90 p-0 h-auto text-sm"
          >
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button
            type="button"
            variant="link"
            className="text-primary hover:text-primary/90 p-0 h-auto text-sm"
          >
            Privacy Policy
          </Button>
        </Label>
      </div>

      {/* Verification Status */}
      {(isPhoneVerified || isEmailVerified) && (
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-medium">Verification Status:</h4>
          <div className="flex flex-wrap gap-3">
            {isPhoneVerified && (
              <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                Phone Verified
              </div>
            )}
            {isEmailVerified && (
              <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                Email Verified
              </div>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={
          !isPhoneVerified || !isEmailVerified || !agreeToTerms || isSubmitting
        }
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
