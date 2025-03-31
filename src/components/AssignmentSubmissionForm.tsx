import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface AssignmentSubmissionFormProps {
  assignmentId: string;
}

const AssignmentSubmissionForm: React.FC<AssignmentSubmissionFormProps> = ({ assignmentId }) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/pdf'
      ) {
        setSelectedFile(file);
        setIsSuccess(false); // Reset success state when a new file is selected
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload only DOC, DOCX, or PDF files",
          variant: "destructive",
        });
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      if (
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/pdf'
      ) {
        setSelectedFile(file);
        setIsSuccess(false);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload only DOC, DOCX, or PDF files",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulating an API request
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);

      toast({
        title: "Success",
        description: "Your assignment has been submitted successfully",
      });

      // Reset form after short delay
      setTimeout(() => {
        setSelectedFile(null);
        setIsSuccess(false);
      }, 2000);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Assignment File (DOC, DOCX, or PDF)</Label>
        <div
          className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-secondary/50 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".doc,.docx,.pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="block w-full h-full cursor-pointer flex flex-col items-center">
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

      <Button type="submit" className="w-full" disabled={isUploading || isSuccess}>
        {isUploading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Uploading...
          </span>
        ) : isSuccess ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4" />
            Submitted Successfully
          </span>
        ) : (
          'Submit Assignment'
        )}
      </Button>
    </form>
  );
};

export default AssignmentSubmissionForm;
