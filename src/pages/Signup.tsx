// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { BookOpen, Mail, Lock, User, Phone } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
// import AnimatedTransition from "@/components/AnimatedTransition";
// import { db } from "@/firebase"; // Firestore import
// import { setDoc, doc } from "firebase/firestore";
// import bcrypt from "bcryptjs"; // Hashing passwords
// import Cookies from "js-cookie"; // ✅ Import Cookies

// const Signup = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name || !email || !password || !phoneNumber) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Hash the password before storing
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Store student data in Firestore (hashed password)
//       await setDoc(doc(db, "students", email), {
//         name,
//         email,
//         phoneNumber,
//         password: hashedPassword, // Securely stored
//         createdAt: new Date(),
//       });

//       // ✅ Store email in cookies for later use
//       Cookies.set("studentEmail", email, { expires: 7 }); // Stored for 7 days

//       toast({
//         title: "Success",
//         description: "Your account has been created successfully",
//       });

//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error signing up:", error);
//       toast({
//         title: "Signup Failed",
//         description: "Could not create account. Try again.",
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
//             <CardTitle className="text-2xl font-bold">Join LearnSphere</CardTitle>
//             <p className="text-sm text-muted-foreground">
//               Create your account to track your educational journey
//             </p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSignup} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="name"
//                     type="text"
//                     placeholder="John Doe"
//                     className="pl-10"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

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
//                 <Label htmlFor="phoneNumber">Phone Number</Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="phoneNumber"
//                     type="tel"
//                     placeholder="+1 (555) 123-4567"
//                     className="pl-10"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
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
//                 {isLoading ? "Creating account..." : "Create Account"}
//               </Button>

//               <div className="text-center text-sm">
//                 <span className="text-muted-foreground">Already have an account? </span>
//                 <Link to="/login" className="text-primary hover:underline">
//                   Sign in
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </AnimatedTransition>
//     </div>

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import AnimatedTransition from "@/components/AnimatedTransition";
import { db } from "@/firebase"; // Firestore import
import { setDoc, doc } from "firebase/firestore";
import bcrypt from "bcryptjs"; // Hashing passwords
import Cookies from "js-cookie"; // Import Cookies
import { Separator } from "@/components/ui/separator";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store student data in Firestore (hashed password)
      await setDoc(doc(db, "students", email), {
        name,
        email,
        phoneNumber,
        password: hashedPassword, // Securely stored
        createdAt: new Date(),
      });

      // Store email in cookies for later use
      Cookies.set("studentEmail", email, { expires: 7 }); // Stored for 7 days

      toast({
        title: "Account Created",
        description: "Welcome to LearnSphere! You've successfully joined.",
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Signup Failed",
        description: "Could not create account. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/10 to-transparent"></div>
      
      <AnimatedTransition>
        <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden">
          {/* Left side - Branding and info */}
          <div className="hidden md:block md:w-5/12 bg-gradient-to-br from-primary to-indigo-700 text-white p-8 relative">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <BookOpen className="h-8 w-8 text-white" />
                <span className="font-bold text-2xl">LearnSphere</span>
              </div>
              
              <div className="my-auto space-y-6">
                <h2 className="text-3xl font-bold mb-4">Start Your Learning Journey Today</h2>
                <p className="text-white/80">
                  Join our platform to unlock a world of educational opportunities and connect with expert teachers.
                </p>
                
                <div className="space-y-4 mt-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Access to Classes</h3>
                      <p className="text-sm text-white/70">Join virtual classrooms instantly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Track Progress</h3>
                      <p className="text-sm text-white/70">Monitor your learning journey</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Submit Assignments</h3>
                      <p className="text-sm text-white/70">Complete coursework with ease</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto text-sm text-white/60">
                © 2025 LearnSphere. All rights reserved.
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="absolute top-16 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
          </div>
          
          {/* Right side - Form */}
          <div className="w-full md:w-7/12 bg-white p-8">
            <CardHeader className="space-y-2 text-center p-0 mb-6">
              <div className="md:hidden flex items-center justify-center gap-2 mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl text-primary">LearnSphere</span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Create an Account</CardTitle>
              <CardDescription className="text-gray-500">
                Join LearnSphere to begin your educational journey
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-12 border-gray-200 focus:border-primary"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@university.edu"
                      className="pl-10 h-12 border-gray-200 focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="pl-10 h-12 border-gray-200 focus:border-primary"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 border-gray-200 focus:border-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 mt-2 bg-primary hover:bg-primary/90 text-white font-medium" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"} 
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                
                <div className="relative my-6">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400">
                    OR
                  </span>
                </div>
                
                <div className="text-center">
                  <span className="text-gray-500">Already have an account? </span>
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Sign in instead
                  </Link>
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="p-0 mt-8">
              <p className="text-xs text-gray-500 text-center w-full">
                By signing up, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </CardFooter>
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default Signup;
//   );
// };

// export default Signup;
