import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'sci', label: 'Science' },
  { value: 'eng', label: 'English' },
  { value: 'hist', label: 'History' },
  { value: 'comp', label: 'Computer Science' },
];

const AssignmentForm = () => {
  const { toast } = useToast();
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [assignmentId, setAssignmentId] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      const validTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload only DOC, DOCX, or PDF files",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName || !rollNo || !assignmentId || !subject || !selectedFile) {
      toast({
        title: "Error",
        description: "Please fill in all fields and upload a file",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate an upload
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      
      toast({
        title: "Success",
        description: "Your assignment has been uploaded successfully",
      });
      
      // Reset form after short delay
      setTimeout(() => {
        setStudentName('');
        setRollNo('');
        setAssignmentId('');
        setSubject('');
        setSelectedFile(null);
        setIsSuccess(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rollNo">Roll Number</Label>
          <Input
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter your roll number"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="assignmentId">Assignment ID</Label>
          <Input
            id="assignmentId"
            value={assignmentId}
            onChange={(e) => setAssignmentId(e.target.value)}
            placeholder="Enter the assignment ID"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subj) => (
                <SelectItem key={subj.value} value={subj.value}>
                  {subj.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Assignment File (Doc, PDF)</Label>
          <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".doc,.docx,.pdf"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
              {selectedFile ? (
                <div className="text-sm">
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">Click to upload</p>
                  <p>or drag and drop</p>
                </div>
              )}
            </label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isUploading || isSuccess}
        >
          {isUploading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Uploading...
            </span>
          ) : isSuccess ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4" />
              Uploaded Successfully
            </span>
          ) : (
            'Submit Assignment'
          )}
        </Button>
      </form>
    </div>
  );
};

export default AssignmentForm; 
