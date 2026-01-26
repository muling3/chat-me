import SignupForm from "@/components/signup-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Left Section - Brand/Info Area */}
      <div className="hidden lg:flex lg:w-1/2 bg-card flex-col p-12 border-r border-border">
        {/* Back arrow for mobile */}
        <div className="lg:hidden mb-8">
          <Link
            href="/"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Link>
        </div>

        {/* Brand Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  CM
                </span>
              </div>
              <h1 className="text-3xl font-bold">Chat Me</h1>
            </div>

            {/* Tagline */}
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Join the Conversation
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg mb-12">
              Create your account to start chatting with intelligent agents and
              manage your conversations.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">
                  Secure verification process
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">
                  Multi-device synchronization
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">
                  Advanced privacy controls
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note for left panel */}
        <div className="text-muted-foreground text-sm">
          <p>Already have an account?</p>
          <p>
            <Link
              href="/login"
              className="text-primary hover:text-primary/90 hover:underline"
            >
              Log in
            </Link>{" "}
            to continue chatting or configuring.
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full lg:w-1/2 bg-background p-8">
        <div className="max-w-md mx-auto h-full flex flex-col">
          {/* Mobile header */}
          <div className="lg:hidden mb-8">
            <Link
              href="/"
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Link>
          </div>

          {/* Signup Form Container */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">
                Sign up to get started with Chat Me
              </p>
            </div>

            {/* Signup Form */}
            <SignupForm />

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary/90 font-semibold hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-border mt-8">
            <p className="text-center text-muted-foreground text-sm">
              © 2026 Chat Me Inc., All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
