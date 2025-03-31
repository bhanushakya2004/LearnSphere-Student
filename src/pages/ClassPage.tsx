// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getFirestore, doc, getDoc, collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
// import Cookies from 'js-cookie';
// import { Editor, EditorState, convertToRaw } from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import { ArrowLeft } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/components/ui/use-toast';

// const ClassPage = () => {
//   const { classId } = useParams();
//   const firestore = getFirestore();
//   const [classDetails, setClassDetails] = useState(null);
//   const [assignments, setAssignments] = useState([]);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [alreadySubmitted, setAlreadySubmitted] = useState(false);
//   const { toast } = useToast();
//   const userEmail = Cookies.get('studentEmail') || '';

//   useEffect(() => {
//     if (!classId) return;

//     const fetchData = async () => {
//       try {
//         const classRef = doc(firestore, 'classrooms', classId);
//         const classSnap = await getDoc(classRef);
//         if (classSnap.exists()) setClassDetails(classSnap.data());

//         const q = query(collection(firestore, 'assignments'), where('classroomId', '==', classId));
//         const querySnapshot = await getDocs(q);

//         const fetchedAssignments = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           deadline: new Date(doc.data().deadline),
//         }));
//         setAssignments(fetchedAssignments);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [classId, firestore]);

//   const handleAssignmentClick = async (assignment) => {
//     setSelectedAssignment(assignment);
//     setIsDialogOpen(true);
//     setAlreadySubmitted(false);
    
//     const assignmentRef = doc(firestore, 'assignments', assignment.id);
//     const assignmentSnap = await getDoc(assignmentRef);
//     if (assignmentSnap.exists()) {
//       const submissions = assignmentSnap.data().submitted || [];
//       setAlreadySubmitted(submissions.some(sub => sub.email === userEmail));
//     }
//   };

//   const handleSubmitText = async (e) => {
//     e.preventDefault();
//     if (!selectedAssignment || !userEmail) {
//       toast({ title: "Error", description: "Invalid assignment or user." });
//       return;
//     }

//     if (alreadySubmitted) {
//       toast({ title: "Already Submitted", description: "You have already submitted this assignment." });
//       return;
//     }

//     const contentState = editorState.getCurrentContent();
//     const rawContent = convertToRaw(contentState);
//     const plainText = rawContent.blocks.map(block => block.text).join('\n');

//     if (!plainText.trim()) {
//       toast({ title: "Error", description: "Please enter your response before submitting." });
//       return;
//     }

//     try {
//       const assignmentRef = doc(firestore, 'assignments', selectedAssignment.id);
//       await updateDoc(assignmentRef, {
//         submitted: arrayUnion({ email: userEmail, content: plainText }),
//       });
//       toast({ title: "Success", description: "Assignment submitted successfully." });
//       setIsDialogOpen(false);
//       setEditorState(EditorState.createEmpty());
//     } catch (error) {
//       console.error("Error submitting assignment:", error);
//       toast({ title: "Error", description: "Submission failed." });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <main className="container mx-auto py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <Link to="/dashboard" className="flex items-center gap-2 text-primary mb-4">
//             <ArrowLeft className="h-4 w-4" /> Back to Dashboard
//           </Link>
//           <Card>
//             <CardHeader>
//               <CardTitle>{classDetails?.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p><b>Teacher:</b> {classDetails?.owner_email}</p>
//               <p><b>Subject:</b> {classDetails?.subject}</p>
//               <p className="text-muted-foreground">{classDetails?.description}</p>
//             </CardContent>
//           </Card>
//           <Tabs defaultValue="ongoing">
//             <TabsList className="grid grid-cols-2">
//               <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
//               <TabsTrigger value="expired">Expired</TabsTrigger>
//             </TabsList>
//             <TabsContent value="ongoing">
//               {assignments.filter(a => a.deadline > new Date()).map(a => (
//                 <Card key={a.id} onClick={() => handleAssignmentClick(a)}>
//                   <CardHeader><CardTitle>{a.title}</CardTitle></CardHeader>
//                 </Card>
//               ))}
//             </TabsContent>
//             <TabsContent value="expired">
//               {assignments.filter(a => a.deadline <= new Date()).map(a => (
//                 <Card key={a.id}>
//                   <CardHeader><CardTitle>{a.title}</CardTitle></CardHeader>
//                 </Card>
//               ))}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{selectedAssignment?.title}</DialogTitle>
//           </DialogHeader>
//           {alreadySubmitted ? (
//             <p className="text-green-600 font-semibold">You have already submitted this assignment.</p>
//           ) : (
//             <form onSubmit={handleSubmitText} className="space-y-4">
//               <Label>Write your answer</Label>
//               <div className="border rounded-md p-2 min-h-[150px]">
//                 <Editor editorState={editorState} onChange={setEditorState} placeholder="Type your answer here..." />
//               </div>
//               <Button type="submit">Submit</Button>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ClassPage;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ClassPage = () => {
  const { classId } = useParams();
  const firestore = getFirestore();
  const [classDetails, setClassDetails] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const { toast } = useToast();
  const userEmail = Cookies.get('studentEmail') || '';

  useEffect(() => {
    if (!classId) return;

    const fetchData = async () => {
      try {
        const classRef = doc(firestore, 'classrooms', classId);
        const classSnap = await getDoc(classRef);
        if (classSnap.exists()) setClassDetails(classSnap.data());

        const q = query(collection(firestore, 'assignments'), where('classroomId', '==', classId));
        const querySnapshot = await getDocs(q);

        const fetchedAssignments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          deadline: new Date(doc.data().deadline),
        }));
        setAssignments(fetchedAssignments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [classId, firestore]);

  const handleAssignmentClick = async (assignment) => {
    setSelectedAssignment(assignment);
    setIsDialogOpen(true);
    setAlreadySubmitted(false);
    
    const assignmentRef = doc(firestore, 'assignments', assignment.id);
    const assignmentSnap = await getDoc(assignmentRef);
    if (assignmentSnap.exists()) {
      const submissions = assignmentSnap.data().submitted || [];
      setAlreadySubmitted(submissions.some(sub => sub.email === userEmail));
    }
  };

  const handleSubmitText = async (e) => {
    e.preventDefault();
    if (!selectedAssignment || !userEmail) {
      toast({ title: "Error", description: "Invalid assignment or user." });
      return;
    }

    if (alreadySubmitted) {
      toast({ title: "Already Submitted", description: "You have already submitted this assignment." });
      return;
    }

    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const plainText = rawContent.blocks.map(block => block.text).join('\n');

    if (!plainText.trim()) {
      toast({ title: "Error", description: "Please enter your response before submitting." });
      return;
    }

    try {
      const assignmentRef = doc(firestore, 'assignments', selectedAssignment.id);
      await updateDoc(assignmentRef, {
        submitted: arrayUnion({ email: userEmail, content: plainText }),
      });
      toast({ title: "Success", description: "Assignment submitted successfully." });
      setIsDialogOpen(false);
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast({ title: "Error", description: "Submission failed." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-4">
          <ArrowLeft className="h-5 w-5" /> Back to Dashboard
        </Link>
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{classDetails?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700"><b>Teacher:</b> {classDetails?.owner_email}</p>
            <p className="text-gray-700"><b>Subject:</b> {classDetails?.subject}</p>
            <p className="text-gray-600 mt-2">{classDetails?.description}</p>
          </CardContent>
        </Card>
        <Tabs defaultValue="ongoing" className="mt-6">
          <TabsList className="flex space-x-4 border-b pb-2">
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          <TabsContent value="ongoing">
            {assignments.filter(a => a.deadline > new Date()).map(a => (
              <Card key={a.id} className="mt-4 shadow-md cursor-pointer hover:shadow-lg transition" onClick={() => handleAssignmentClick(a)}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{a.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="expired">
            {assignments.filter(a => a.deadline <= new Date()).map(a => (
              <Card key={a.id} className="mt-4 shadow-sm bg-gray-100">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-500">{a.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAssignment?.title}</DialogTitle>
          </DialogHeader>
          {alreadySubmitted ? (
            <p className="text-green-600 font-semibold">You have already submitted this assignment.</p>
          ) : (
            <form onSubmit={handleSubmitText} className="space-y-4">
              <Label>Write your answer</Label>
              <div className="border rounded-md p-2 min-h-[150px]">
                <Editor editorState={editorState} onChange={setEditorState} placeholder="Type your answer here..." />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassPage;