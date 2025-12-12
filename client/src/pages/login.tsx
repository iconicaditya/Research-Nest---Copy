import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GraduationCap, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      if (values.username === "admin" && values.password === "admin") {
        // In a real app, this would be a server-side session
        localStorage.setItem("mock_auth_token", "admin-token");
        toast({
          title: "Login Successful",
          description: "Welcome back, Administrator.",
        });
        setLocation("/admin/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid username or password. (Try admin/admin)",
        });
      }
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-accent" />
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold text-primary">Quantum Research Group</h1>
        <p className="text-muted-foreground mt-2">Secure Administrative Access</p>
      </div>

      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-accent">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>Logging in...</>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" /> Sign In
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4 bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Restricted access. Authorized personnel only.
          </p>
        </CardFooter>
      </Card>
      
      <Button variant="link" className="mt-8 text-muted-foreground" onClick={() => setLocation("/")}>
        ← Return to Website
      </Button>
    </div>
  );
}
