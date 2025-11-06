"use client";

import { useCallback, useState } from "react";
import { Upload, File as FileIcon, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  currentFile?: string;
}

const FileUpload = ({ onFileSelect, accept = ".pdf,.doc,.docx", maxSizeMB = 5, currentFile }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }
    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setError("");
  };

  return (
    <div className="w-full">
      {selectedFile || currentFile ? (
        <div className="border border-border rounded-lg p-4 flex items-center justify-between bg-muted">
          <div className="flex items-center gap-2">
            <FileIcon className="h-5 w-5 text-primary" />
            <span className="text-sm">{selectedFile?.name || currentFile}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
        
        >
          <input type="file" id="file-upload" accept={accept} onChange={handleChange} className="hidden" />
          <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <label htmlFor="file-upload" className="cursor-pointer text-sm text-foreground">
            <span className="text-primary hover:underline">Click to upload</span> or drag and drop
          </label>
          <p className="text-xs text-muted-foreground mt-2">Max file size: {maxSizeMB}MB</p>
        </div>
      )}

      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;



