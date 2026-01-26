import LoginForm from "@/components/login-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Left Section - Brand/Info Area */}
      <div className="hidden lg:flex lg:w-1/2 bg-card flex-col p-12 border-r border-border">
        {/* Back arrow for mobile */}
        <div className="lg:hidden mb-8">
          <button className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
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
              Pick, Connect, Chat
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg mb-12">
              Seamlessly connect with intelligent agents and manage your
              conversations in one place.
            </p>

            {/* Feature Dots */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">
                  Multi-agent conversations
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">
                  Real-time collaboration
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">
                  Advanced configuration tools
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note for left panel */}
        <div className="text-muted-foreground text-sm">
          <p>Already managing your agents?</p>
          <p>Log in to continue chatting or configuring.</p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 bg-background p-8">
        <div className="max-w-md mx-auto h-full flex flex-col">
          {/* Mobile header */}
          <div className="lg:hidden mb-8">
            <button className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </div>

          {/* Login Form Container */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Login to your account</p>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                New User?{" "}
                <Link
                  href="/signup"
                  className="text-primary hover:text-primary/90 font-semibold hover:underline"
                >
                  Sign Up
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
