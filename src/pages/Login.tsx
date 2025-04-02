// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { BookOpen, Mail, Lock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
// import AnimatedTransition from "@/components/AnimatedTransition";
// import { db } from "@/firebase"; // Firestore import
// import { doc, getDoc } from "firebase/firestore";
// import bcrypt from "bcryptjs"; // Decrypt hashed password
// import Cookies from "js-cookie"; // ✅ Import Cookies

// const Login = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast({
//         title: "Error",
//         description: "Please enter both email and password",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Fetch user document from Firestore
//       const userRef = doc(db, "students", email);
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         toast({
//           title: "Login Failed",
//           description: "Invalid email or password",
//           variant: "destructive",
//         });
//         return;
//       }

//       const userData = userSnap.data();
//       const storedHashedPassword = userData.password; // Get hashed password

//       // Compare hashed password with input password
//       const isPasswordCorrect = await bcrypt.compare(password, storedHashedPassword);

//       if (!isPasswordCorrect) {
//         toast({
//           title: "Login Failed",
//           description: "Invalid email or password",
//           variant: "destructive",
//         });
//         return;
//       }

//       // ✅ Store email in cookies for later use
//       Cookies.set("studentEmail", email, { expires: 7 }); // Stored for 7 days

//       toast({
//         title: "Success",
//         description: "You've been logged in successfully",
//       });

//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error during login:", error);
//       toast({
//         title: "Login Failed",
//         description: "Something went wrong. Try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
//       <AnimatedTransition>
//         <Card className="w-full max-w-md glass">
//           <CardHeader className="space-y-2 text-center">
//             <div className="flex justify-center mb-2">
//               <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                 <BookOpen className="h-6 w-6 text-primary" />
//               </div>
//             </div>
//             <CardTitle className="text-2xl font-bold">Welcome to LearnSphere</CardTitle>
//             <p className="text-sm text-muted-foreground">
//               Enter your credentials to access your account
//             </p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="student@university.edu"
//                     className="pl-10"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="••••••••"
//                     className="pl-10"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Signing in..." : "Sign in"}
//               </Button>

//               <div className="text-center text-sm">
//                 <span className="text-muted-foreground">Don't have an account? </span>
//                 <Link to="/signup" className="text-primary hover:underline">
//                   Sign up
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </AnimatedTransition>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import AnimatedTransition from "@/components/AnimatedTransition";
import { db } from "@/firebase"; // Firestore import
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs"; // Decrypt hashed password
import Cookies from "js-cookie"; // ✅ Import Cookies

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Fetch user document from Firestore
      const userRef = doc(db, "students", email);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      const userData = userSnap.data();
      const storedHashedPassword = userData.password; // Get hashed password

      // Compare hashed password with input password
      const isPasswordCorrect = await bcrypt.compare(password, storedHashedPassword);

      if (!isPasswordCorrect) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      // ✅ Store email in cookies for later use
      Cookies.set("studentEmail", email, { expires: 7 }); // Stored for 7 days

      toast({
        title: "Success",
        description: "You've been logged in successfully",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Login Failed",
        description: "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      <AnimatedTransition>
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="pb-6 space-y-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-inner">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                LearnSphere
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Access your personalized learning environment
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="pb-4">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@university.edu"
                    className="pl-10 h-12 rounded-md border-slate-200 focus:border-primary focus:ring focus:ring-primary/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 rounded-md border-slate-200 focus:border-primary focus:ring focus:ring-primary/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : "Sign in"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="pt-0 pb-6 flex flex-col space-y-4">
            <div className="relative w-full my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default Login;
