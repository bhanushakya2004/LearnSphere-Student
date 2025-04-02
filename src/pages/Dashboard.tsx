
// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { BookOpen, Plus, X, BookOpenCheck, GraduationCap, User, Layout, Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { db } from "@/firebase";
// import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";

// const Dashboard = () => {
//   const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
//   const [classId, setClassId] = useState("");
//   const [joinedClasses, setJoinedClasses] = useState([]);
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   // Fetch Student Data from Firestore
//   useEffect(() => {
//     const fetchStudentData = async () => {
//       setLoading(true);
//       const email = Cookies.get("studentEmail");
//       if (!email) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const studentRef = doc(db, "students", email);
//         const studentSnap = await getDoc(studentRef);

//         if (studentSnap.exists()) {
//           const studentData = studentSnap.data();
//           setStudent(studentData);

//           // Fetch joined class details
//           const classDetails = [];
//           for (const id of studentData.classIds || []) {
//             const classDoc = await getDoc(doc(db, "classrooms", id));
//             if (classDoc.exists()) {
//               classDetails.push({ id, ...classDoc.data() });
//             }
//           }
//           setJoinedClasses(classDetails);
//         }
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//         toast({ 
//           title: "Error", 
//           description: "Failed to load your profile data.", 
//           variant: "destructive" 
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentData();
//   }, [toast]);

//   const handleJoinClass = async () => {
//     if (!classId.trim()) {
//       toast({ title: "Error", description: "Class ID cannot be empty.", variant: "destructive" });
//       return;
//     }
  
//     try {
//       const studentRef = doc(db, "students", student.email);
//       const classRef = doc(db, "classrooms", classId);
  
//       // Update student's classIds array
//       await updateDoc(studentRef, { classIds: arrayUnion(classId) });
  
//       // Fetch class details
//       const classSnap = await getDoc(classRef);
  
//       if (classSnap.exists()) {
//         // Add student email to class's students array
//         await updateDoc(classRef, { students: arrayUnion(student.email) });
  
//         // Update UI with the new class
//         setJoinedClasses([...joinedClasses, { id: classId, ...classSnap.data() }]);
  
//         toast({ 
//           title: "Success", 
//           description: "Joined class successfully!",
//           variant: "default"
//         });
//       } else {
//         toast({ title: "Error", description: "Class ID not found.", variant: "destructive" });
//       }
  
//       setClassId(""); // Clear input
//       setIsJoinDialogOpen(false); // Close dialog
//     } catch (error) {
//       console.error("Join error:", error);
//       toast({ title: "Join Failed", description: "Could not join class.", variant: "destructive" });
//     }
//   };

//   const handleClassClick = (classId) => {
//     Cookies.set("selectedClassId", classId, { expires: 7 }); // Store in cookies for 7 days
//     navigate(`/class/${classId}`); // Navigate to the class page
//   };

//   // Helper to get initials from student name or email
//   const getInitials = (person) => {
//     if (!person) return "S";
    
//     if (person.name) {
//       return person.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
//     }
    
//     if (person.email) {
//       return person.email.split('@')[0].substring(0, 2).toUpperCase();
//     }
    
//     return "S";
//   };

//   // Get random pastel color for class cards
//   const getClassColor = (id) => {
//     const colors = [
//       "from-blue-100 to-blue-50 border-blue-200",
//       "from-purple-100 to-purple-50 border-purple-200",
//       "from-green-100 to-green-50 border-green-200",
//       "from-amber-100 to-amber-50 border-amber-200",
//       "from-rose-100 to-rose-50 border-rose-200",
//       "from-indigo-100 to-indigo-50 border-indigo-200",
//     ];
    
//     // Use the sum of char codes in the id to pick a color
//     const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
//     return colors[sum % colors.length];
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <header className="bg-white shadow-sm sticky top-0 z-10 border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <GraduationCap className="h-6 w-6 text-primary" />
//             <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">LearnSphere</span>
//           </div>
          
//           {/* Welcome Message & User */}
//           <div className="flex items-center gap-4">
//             {student && (
//               <div className="hidden md:flex items-center gap-1 text-gray-700">
//                 <span>Welcome back,</span>
//                 <span className="font-medium">{student.name || student.email.split('@')[0]}</span>
//               </div>
//             )}
//             <Avatar className="h-8 w-8 bg-primary text-white">
//               <AvatarFallback>{getInitials(student)}</AvatarFallback>
//             </Avatar>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {loading ? (
//           <LoadingState />
//         ) : (
//           <div className="space-y-8">
//             {/* Dashboard Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
//                 <p className="text-gray-500 mt-1">Manage your classes and assignments</p>
//               </div>
              
//               <Button 
//                 onClick={() => setIsJoinDialogOpen(true)}
//                 className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
//               >
//                 <Plus className="h-4 w-4" /> Join New Class
//               </Button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Card className="bg-gradient-to-br from-blue-50 to-white border shadow-sm">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-500">Total Classes</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <div className="text-3xl font-bold text-gray-900">{joinedClasses.length}</div>
//                     <BookOpenCheck className="h-8 w-8 text-primary opacity-50" />
//                   </div>
//                 </CardContent>
//               </Card>
              
//               <Card className="bg-gradient-to-br from-purple-50 to-white border shadow-sm">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-500">Active Subjects</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <div className="text-3xl font-bold text-gray-900">
//                       {new Set(joinedClasses.map(cls => cls.subject)).size}
//                     </div>
//                     <BookOpen className="h-8 w-8 text-purple-500 opacity-50" />
//                   </div>
//                 </CardContent>
//               </Card>
              
//               <Card className="bg-gradient-to-br from-amber-50 to-white border shadow-sm">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-500">Teachers</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <div className="text-3xl font-bold text-gray-900">
//                       {new Set(joinedClasses.map(cls => cls.owner_email)).size}
//                     </div>
//                     <User className="h-8 w-8 text-amber-500 opacity-50" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Classes Section */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-semibold text-gray-800">Your Classes</h2>
                
//                 {joinedClasses.length > 0 && (
//                   <div className="relative w-64">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                     <Input 
//                       className="pl-9 bg-white" 
//                       placeholder="Search classes..."
//                       type="text"
//                     />
//                   </div>
//                 )}
//               </div>

//               {joinedClasses.length === 0 ? (
//                 <EmptyClassesState setIsJoinDialogOpen={setIsJoinDialogOpen} />
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {joinedClasses.map((cls) => (
//                     <Card 
//                       key={cls.id} 
//                       onClick={() => handleClassClick(cls.id)} 
//                       className={`cursor-pointer hover:shadow-md transition-all bg-gradient-to-b ${getClassColor(cls.id)} border-2`}
//                     >
//                       <CardHeader className="pb-2">
//                         <div className="flex justify-between items-start">
//                           <CardTitle className="text-lg font-bold text-gray-800 line-clamp-1">
//                             {cls.title || cls.name || `Class ${cls.id.substring(0, 6)}`}
//                           </CardTitle>
//                           {cls.subject && (
//                             <Badge variant="outline" className="bg-white/80 font-medium">
//                               {cls.subject}
//                             </Badge>
//                           )}
//                         </div>
//                         {cls.description && (
//                           <CardDescription className="text-gray-600 line-clamp-2 mt-1">
//                             {cls.description}
//                           </CardDescription>
//                         )}
//                       </CardHeader>
//                       <CardContent className="py-2">
//                         <div className="flex items-center text-gray-700">
//                           <User className="h-4 w-4 mr-2 text-gray-500" />
//                           <p className="text-sm line-clamp-1">{cls.owner_email || "Unknown"}</p>
//                         </div>
//                         {cls.room && (
//                           <div className="flex items-center text-gray-700 mt-1">
//                             <Layout className="h-4 w-4 mr-2 text-gray-500" />
//                             <p className="text-sm">Room {cls.room}</p>
//                           </div>
//                         )}
//                       </CardContent>
//                       <CardFooter className="pt-0 pb-3">
//                         {cls.students && (
//                           <div className="text-xs text-gray-500">
//                             {Array.isArray(cls.students) 
//                               ? `${cls.students.length} students enrolled` 
//                               : `${Object.keys(cls.students).length} students enrolled`}
//                           </div>
//                         )}
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Join Class Dialog */}
//       <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-semibold">Join a Classroom</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 py-2">
//             <p className="text-gray-500 text-sm">
//               Enter the Class ID provided by your teacher to join a new classroom.
//             </p>
//             <Input 
//               type="text" 
//               placeholder="Enter Class ID" 
//               value={classId} 
//               onChange={(e) => setClassId(e.target.value)}
//               className="font-mono"
//             />
//           </div>
//           <DialogFooter className="sm:justify-between">
//             <Button 
//               variant="outline" 
//               onClick={() => {
//                 setClassId("");
//                 setIsJoinDialogOpen(false);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleJoinClass} className="ml-2">
//               Join Class
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// // Loading state component
// const LoadingState = () => (
//   <div className="space-y-8">
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//       <div>
//         <Skeleton className="h-8 w-64 rounded-md" />
//         <Skeleton className="h-4 w-48 rounded-md mt-2" />
//       </div>
//       <Skeleton className="h-10 w-32 rounded-md" />
//     </div>
    
//     <Separator />
    
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {[1, 2, 3].map((i) => (
//         <Card key={i} className="border">
//           <CardHeader className="pb-2">
//             <Skeleton className="h-4 w-24 rounded-md" />
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between">
//               <Skeleton className="h-8 w-8 rounded-md" />
//               <Skeleton className="h-8 w-8 rounded-md" />
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
    
//     <div className="space-y-4">
//       <Skeleton className="h-6 w-32 rounded-md" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[1, 2, 3, 4].map((i) => (
//           <Card key={i} className="border">
//             <CardHeader className="pb-2">
//               <Skeleton className="h-6 w-3/4 rounded-md" />
//               <Skeleton className="h-4 w-full rounded-md mt-2" />
//             </CardHeader>
//             <CardContent className="py-2">
//               <Skeleton className="h-4 w-full rounded-md" />
//               <Skeleton className="h-4 w-1/2 rounded-md mt-2" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   </div>
// );

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BookOpen, Plus, X, BookOpenCheck, GraduationCap, User, Layout, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown";

const Dashboard = () => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [classId, setClassId] = useState("");
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch Student Data from Firestore
  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      const email = Cookies.get("studentEmail");
      if (!email) {
        setLoading(false);
        navigate("/login"); // Redirect to login if no studentEmail cookie
        return;
      }

      try {
        const studentRef = doc(db, "students", email);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          const studentData = studentSnap.data();
          setStudent(studentData);

          // Fetch joined class details
          const classDetails = [];
          for (const id of studentData.classIds || []) {
            const classDoc = await getDoc(doc(db, "classrooms", id));
            if (classDoc.exists()) {
              classDetails.push({ id, ...classDoc.data() });
            }
          }
          setJoinedClasses(classDetails);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast({ 
          title: "Error", 
          description: "Failed to load your profile data.", 
          variant: "destructive" 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [toast, navigate]);

  // Handle back navigation to login or signup page
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === "/login" || window.location.pathname === "/signup") {
        Cookies.remove("studentEmail");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleJoinClass = async () => {
    if (!classId.trim()) {
      toast({ title: "Error", description: "Class ID cannot be empty.", variant: "destructive" });
      return;
    }
  
    try {
      const studentRef = doc(db, "students", student.email);
      const classRef = doc(db, "classrooms", classId);
  
      // Update student's classIds array
      await updateDoc(studentRef, { classIds: arrayUnion(classId) });
  
      // Fetch class details
      const classSnap = await getDoc(classRef);
  
      if (classSnap.exists()) {
        // Add student email to class's students array
        await updateDoc(classRef, { students: arrayUnion(student.email) });
  
        // Update UI with the new class
        setJoinedClasses([...joinedClasses, { id: classId, ...classSnap.data() }]);
  
        toast({ 
          title: "Success", 
          description: "Joined class successfully!",
          variant: "default"
        });
      } else {
        toast({ title: "Error", description: "Class ID not found.", variant: "destructive" });
      }
  
      setClassId(""); // Clear input
      setIsJoinDialogOpen(false); // Close dialog
    } catch (error) {
      console.error("Join error:", error);
      toast({ title: "Join Failed", description: "Could not join class.", variant: "destructive" });
    }
  };

  const handleClassClick = (classId) => {
    Cookies.set("selectedClassId", classId, { expires: 7 }); // Store in cookies for 7 days
    navigate(`/class/${classId}`); // Navigate to the class page
  };

  // Helper to get initials from student name or email
  const getInitials = (person) => {
    if (!person) return "S";
    
    if (person.name) {
      return person.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    
    if (person.email) {
      return person.email.split('@')[0].substring(0, 2).toUpperCase();
    }
    
    return "S";
  };

  // Get random pastel color for class cards
  const getClassColor = (id) => {
    const colors = [
      "from-blue-100 to-blue-50 border-blue-200",
      "from-purple-100 to-purple-50 border-purple-200",
      "from-green-100 to-green-50 border-green-200",
      "from-amber-100 to-amber-50 border-amber-200",
      "from-rose-100 to-rose-50 border-rose-200",
      "from-indigo-100 to-indigo-50 border-indigo-200",
    ];
    
    // Use the sum of char codes in the id to pick a color
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  // Logout function
  const handleLogout = () => {
    Cookies.remove("studentEmail");
    navigate("/"); // Redirect to home
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">LearnSphere</span>
          </div>
          
          {/* Welcome Message & User */}
          <div className="flex items-center gap-4">
            {student && (
              <div className="hidden md:flex items-center gap-1 text-gray-700">
                <span>Welcome back,</span>
                <span className="font-medium">{student.name || student.email.split('@')[0]}</span>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 bg-primary text-white">
                  <AvatarFallback>{getInitials(student)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-5 w-5 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-8">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your classes and assignments</p>
              </div>
              
              <Button 
                onClick={() => setIsJoinDialogOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
              >
                <Plus className="h-4 w-4" /> Join New Class
              </Button>
            </div>
            <Separator />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-white border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">{joinedClasses.length}</div>
                    <BookOpenCheck className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-white border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">
                      {new Set(joinedClasses.map(cls => cls.subject)).size}
                    </div>
                    <BookOpen className="h-8 w-8 text-purple-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-50 to-white border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Teachers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">
                      {new Set(joinedClasses.map(cls => cls.owner_email)).size}
                    </div>
                    <User className="h-8 w-8 text-amber-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Classes Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Your Classes</h2>
                
                {joinedClasses.length > 0 && (
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      className="pl-9 bg-white" 
                      placeholder="Search classes..."
                      type="text"
                    />
                  </div>
                )}
              </div>

              {joinedClasses.length === 0 ? (
                <EmptyClassesState setIsJoinDialogOpen={setIsJoinDialogOpen} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {joinedClasses.map((cls) => (
                    <Card 
                      key={cls.id} 
                      onClick={() => handleClassClick(cls.id)} 
                      className={`cursor-pointer hover:shadow-md transition-all bg-gradient-to-b ${getClassColor(cls.id)} border-2`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-bold text-gray-800 line-clamp-1">
                            {cls.title || cls.name || `Class ${cls.id.substring(0, 6)}`}
                          </CardTitle>
                          {cls.subject && (
                            <Badge variant="outline" className="bg-white/80 font-medium">
                              {cls.subject}
                            </Badge>
                          )}
                        </div>
                        {cls.description && (
                          <CardDescription className="text-gray-600 line-clamp-2 mt-1">
                            {cls.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="flex items-center text-gray-700">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm line-clamp-1">{cls.owner_email || "Unknown"}</p>
                        </div>
                        {cls.room && (
                          <div className="flex items-center text-gray-700 mt-1">
                            <Layout className="h-4 w-4 mr-2 text-gray-500" />
                            <p className="text-sm">Room {cls.room}</p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0 pb-3">
                        {cls.students && (
                          <div className="text-xs text-gray-500">
                            {Array.isArray(cls.students) 
                              ? `${cls.students.length} students enrolled` 
                              : `${Object.keys(cls.students).length} students enrolled`}
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Join Class Dialog */}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Join a Classroom</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-gray-500 text-sm">
              Enter the Class ID provided by your teacher to join a new classroom.
            </p>
            <Input 
              type="text" 
              placeholder="Enter Class ID" 
              value={classId} 
              onChange={(e) => setClassId(e.target.value)}
              className="font-mono"
            />
          </div>
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setClassId("");
                setIsJoinDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleJoinClass} className="ml-2">
              Join Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Loading state component
const LoadingState = () => (
  <div className="space-y-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <Skeleton className="h-8 w-64 rounded-md" />
        <Skeleton className="h-4 w-48 rounded-md mt-2" />
      </div>
      <Skeleton className="h-10 w-32 rounded-md" />
    </div>
    
    <Separator />
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border">
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24 rounded-md" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    
    <div className="space-y-4">
      <Skeleton className="h-6 w-32 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md mt-2" />
            </CardHeader>
            <CardContent className="py-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

// Empty classes state component
const EmptyClassesState = ({ setIsJoinDialogOpen }) => (
  <Card className="border border-dashed border-gray-300 bg-white/50 py-8">
    <CardContent className="flex flex-col items-center justify-center text-center p-6">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <BookOpen className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">No Classes Joined Yet</h3>
      <p className="text-gray-500 max-w-md mb-6">
        Join your first class to start your learning journey. You'll need a Class ID from your teacher to get started.
      </p>
      <Button 
        onClick={() => setIsJoinDialogOpen(true)}
        className="bg-primary hover:bg-primary/90 flex items-center gap-2"
      >
        <Plus className="h-4 w-4" /> Join Your First Class
      </Button>
    </CardContent>
  </Card>
);

export default Dashboard;
// };

// export default Dashboard;
