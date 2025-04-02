
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
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 px-4 md:px-8">
//       <div className="max-w-4xl mx-auto">
//         <Link to="/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-4">
//           <ArrowLeft className="h-5 w-5" /> Back to Dashboard
//         </Link>
//         <Card className="shadow-lg rounded-xl">
//           <CardHeader>
//             <CardTitle className="text-xl font-bold">{classDetails?.name}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-700"><b>Teacher:</b> {classDetails?.owner_email}</p>
//             <p className="text-gray-700"><b>Subject:</b> {classDetails?.subject}</p>
//             <p className="text-gray-600 mt-2">{classDetails?.description}</p>
//           </CardContent>
//         </Card>
//         <Tabs defaultValue="ongoing" className="mt-6">
//           <TabsList className="flex space-x-4 border-b pb-2">
//             <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
//             <TabsTrigger value="expired">Expired</TabsTrigger>
//           </TabsList>
//           <TabsContent value="ongoing">
//             {assignments.filter(a => a.deadline > new Date()).map(a => (
//               <Card key={a.id} className="mt-4 shadow-md cursor-pointer hover:shadow-lg transition" onClick={() => handleAssignmentClick(a)}>
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold">{a.title}</CardTitle>
//                 </CardHeader>
//               </Card>
//             ))}
//           </TabsContent>
//           <TabsContent value="expired">
//             {assignments.filter(a => a.deadline <= new Date()).map(a => (
//               <Card key={a.id} className="mt-4 shadow-sm bg-gray-100">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold text-gray-500">{a.title}</CardTitle>
//                 </CardHeader>
//               </Card>
//             ))}
//           </TabsContent>
//         </Tabs>
//       </div>
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
import { ArrowLeft, Calendar, User, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classId) return;

    const fetchData = async () => {
      setLoading(true);
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
        toast({
          variant: "destructive",
          title: "Failed to load class data",
          description: "Please try refreshing the page."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classId, firestore, toast]);

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
      toast({ 
        title: "Success", 
        description: "Assignment submitted successfully.",
        variant: "success" 
      });
      setIsDialogOpen(false);
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast({ 
        title: "Error", 
        description: "Submission failed. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysRemaining = (deadline) => {
    const now = new Date();
    const diff = deadline - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Expired';
    if (days === 0) return 'Due today';
    return `${days} day${days === 1 ? '' : 's'} left`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading class information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-5 w-5" /> 
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          {classDetails && (
            <Badge variant="outline" className="px-3 py-1 text-sm">
              {classDetails.subject}
            </Badge>
          )}
        </div>

        {classDetails && (
          <Card className="shadow-lg rounded-xl border-t-4 border-t-primary overflow-hidden mb-8">
            <CardHeader className="bg-gray-50 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-800">{classDetails.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">{classDetails.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">
                    <span className="font-medium">Teacher:</span> {classDetails.owner_email}
                  </span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">
                    <span className="font-medium">Course Code:</span> {classDetails.subject}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Assignments</h2>
          <Separator className="mb-4" />
        </div>

        <Tabs defaultValue="ongoing" className="mt-2">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
            <TabsTrigger value="ongoing" className="text-sm font-medium">Ongoing</TabsTrigger>
            <TabsTrigger value="expired" className="text-sm font-medium">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ongoing">
            {assignments.filter(a => a.deadline > new Date()).length > 0 ? (
              <div className="grid gap-4">
                {assignments
                  .filter(a => a.deadline > new Date())
                  .sort((a, b) => a.deadline - b.deadline)
                  .map(a => (
                    <Card 
                      key={a.id} 
                      className="transition-all hover:shadow-md border-l-4 border-l-blue-500"
                      onClick={() => handleAssignmentClick(a)}
                    >
                      <CardHeader className="pb-2 cursor-pointer">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-semibold text-gray-800">{a.title}</CardTitle>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {getDaysRemaining(a.deadline)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-0 cursor-pointer">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {a.description || "Complete this assignment before the deadline."}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-2 pb-3 cursor-pointer">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Due: {formatDate(a.deadline)}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">No ongoing assignments</p>
                <p className="text-gray-500 text-sm mt-1">All caught up! Check back later for new assignments.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired">
            {assignments.filter(a => a.deadline <= new Date()).length > 0 ? (
              <div className="grid gap-4">
                {assignments
                  .filter(a => a.deadline <= new Date())
                  .sort((a, b) => b.deadline - a.deadline)
                  .map(a => (
                    <Card key={a.id} className="bg-gray-50 border-l-4 border-l-gray-400">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-semibold text-gray-600">{a.title}</CardTitle>
                          <Badge variant="outline" className="bg-gray-200 text-gray-700">
                            Expired
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-0">
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {a.description || "This assignment has passed its deadline."}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-2 pb-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Was due: {formatDate(a.deadline)}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">No expired assignments</p>
                <p className="text-gray-500 text-sm mt-1">Stay on top of your current assignments!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedAssignment?.title}</DialogTitle>
            {selectedAssignment && (
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Due: {selectedAssignment ? formatDate(selectedAssignment.deadline) : ''}</span>
              </div>
            )}
          </DialogHeader>
          
          {selectedAssignment && selectedAssignment.description && (
            <div className="mb-4">
              <Label className="text-sm font-medium text-gray-700">Instructions:</Label>
              <p className="mt-1 text-gray-600 text-sm whitespace-pre-line">{selectedAssignment.description}</p>
              <Separator className="my-4" />
            </div>
          )}
          
          {alreadySubmitted ? (
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-medium">You have already submitted this assignment.</p>
              <p className="text-green-600 text-sm mt-1">Your work has been recorded.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitText} className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Your Answer:</Label>
                <div className="mt-2 border rounded-md p-3 min-h-[200px] bg-white focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                  <Editor 
                    editorState={editorState} 
                    onChange={setEditorState} 
                    placeholder="Type your answer here..." 
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="mt-2 sm:mt-0"
                >
                  Cancel
                </Button>
                <Button type="submit" className="ml-2">
                  Submit Assignment
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassPage;
