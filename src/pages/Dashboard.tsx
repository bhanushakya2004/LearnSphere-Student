import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import cookie handler
import { BookOpen, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [classId, setClassId] = useState("");
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [student, setStudent] = useState(null);
  const { toast } = useToast();

  // 🔍 Fetch Student Data from Firestore
  useEffect(() => {
    const fetchStudentData = async () => {
      const email = Cookies.get("studentEmail"); // Fetch email from cookies
      if (!email) return;

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
    };

    fetchStudentData();
  }, []);

  // ✅ Join Class: Just store classId in student’s Firestore document
  // const handleJoinClass = async () => {
  //   if (!classId.trim()) {
  //     toast({ title: "Error", description: "Class ID cannot be empty.", variant: "destructive" });
  //     return;
  //   }

  //   try {
  //     const studentRef = doc(db, "students", student.email);

  //     // Update student's classIds array
  //     await updateDoc(studentRef, { classIds: arrayUnion(classId) });

  //     // Fetch the class details
  //     const classSnap = await getDoc(doc(db, "classrooms", classId));
  //     if (classSnap.exists()) {
  //       setJoinedClasses([...joinedClasses, { id: classId, ...classSnap.data() }]);
  //     }

  //     toast({ title: "Success", description: "Joined class successfully!" });
  //     setClassId(""); // Clear input
  //     setIsJoinDialogOpen(false); // Close dialog
  //   } catch (error) {
  //     console.error("Join error:", error);
  //     toast({ title: "Join Failed", description: "Could not join class.", variant: "destructive" });
  //   }
  // };

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
  
        toast({ title: "Success", description: "Joined class successfully!" });
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

  const navigate = useNavigate();

const handleClassClick = (classId) => {
  Cookies.set("selectedClassId", classId, { expires: 7 }); // Store in cookies for 7 days
  navigate(`/class/${classId}`); // Navigate to the class page
};
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">LearnSphere</span>
          </div>
          {/* 👤 Welcome Message */}
          {student && <span className="text-gray-700">Welcome, {student.name} 👋</span>}
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Student Dashboard
          </h1>

          {/* ✅ Join Class Button */}
          <Button className="w-full max-w-xs py-6 rounded-lg text-lg bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg"
            onClick={() => setIsJoinDialogOpen(true)}>
            <Plus className="h-5 w-5" /> Join Class
          </Button>

          {/* ✅ Join Class Dialog */}
          {isJoinDialogOpen && (
            <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Join a Classroom</DialogTitle>
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsJoinDialogOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </DialogHeader>
                <div className="space-y-4">
                  <Input type="text" placeholder="Enter Class ID"
                    value={classId} onChange={(e) => setClassId(e.target.value)} />
                  <Button onClick={handleJoinClass} className="w-full">Join</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Display Joined Classes */}
          <div className="w-full space-y-4">
            <h2 className="text-xl font-semibold">Your Classes</h2>

            {joinedClasses.length === 0 ? (
              <Card className="border border-dashed border-gray-300 bg-white/50">
                <CardContent className="p-6 text-center text-muted-foreground">
                  You haven't joined any classes yet.
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {joinedClasses.map((cls) => (
  <Card key={cls.id} 
    onClick={() => handleClassClick(cls.id)} 
    className="cursor-pointer hover:shadow-lg transition-all">
    <CardHeader>
      <CardTitle>{cls.title || `Class ${cls.id}`}</CardTitle>
    </CardHeader>
    <CardContent>
      <p><b>Teacher:</b> {cls.owner_email || "Unknown"}</p>
      <p><b>Subject:</b> {cls.subject || "N/A"}</p>
    </CardContent>
  </Card>
))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
