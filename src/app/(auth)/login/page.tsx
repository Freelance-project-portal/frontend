"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { signIn, signUp } from "@/src/services/auth";
import { toast } from "sonner";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"student" | "faculty">("student");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingId = toast.loading("Signing in...");
    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      const response = await signIn({ email, password });
      console.log("✅ Signed in:", response);
      toast.dismiss(loadingId);
      toast.success("Signed in successfully!");
      
      // Store user role in localStorage
      if (response.role) {
        localStorage.setItem("userRole", response.role);
      }
      
      // Redirect to appropriate dashboard based on role
      if (response.role === "faculty") {
        router.push("/faculty-dashboard");
      } else {
        router.push("/student-dashboard");
      }
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.message ?? "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingId = toast.loading("Creating account...");
    const form = e.currentTarget;
    const fullName = (form.fullName as HTMLInputElement).value;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      // backend expects `name` field, map `fullName` -> `name`
      const response = await signUp({ name: fullName, email, password, role });
      console.log("✅ Account created:", response);
      toast.dismiss(loadingId);
      toast.success("Account created successfully!");
      
      // Store user role in localStorage
      if (response.role) {
        localStorage.setItem("userRole", response.role);
      }
      
      // Redirect to appropriate dashboard based on role
      if (response.role === "faculty") {
        router.push("/faculty-dashboard");
      } else {
        router.push("/student-dashboard");
      }
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.message ?? "Account creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Card className="w-full max-w-md shadow-lg border border-border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-foreground">
            Welcome to ProjectHub
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin">
            {/* Tab Switch */}
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Sign In Form */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>I am a...</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={(value: "student" | "faculty") =>
                      setRole(value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label
                        htmlFor="student"
                        className="font-normal cursor-pointer"
                      >
                        Student - Looking for projects
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="faculty" id="faculty" />
                      <Label
                        htmlFor="faculty"
                        className="font-normal cursor-pointer"
                      >
                        Faculty/Business - Posting projects
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
