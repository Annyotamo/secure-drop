import React, { useState, useRef } from "react";
import { X, Upload, FileText, Image, FileCheck, AlertCircle } from "lucide-react";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File, fileName: string, fileType: string) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [fileType, setFileType] = useState<string>("pdf");
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const validateFile = (file: File): boolean => {
        const fileExtensions = {
            pdf: [".pdf"],
            image: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
            doc: [".doc", ".docx"],
        };

        const validExtensions = fileExtensions[fileType as keyof typeof fileExtensions];
        const extension = "." + file.name.split(".").pop()?.toLowerCase();

        if (!validExtensions.includes(extension)) {
            setError(`Please select a valid ${fileType} file`);
            return false;
        }

        setError(null);
        return true;
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]; // Get only the first file
            if (validateFile(file)) {
                setSelectedFile(file);
                // Set default file name (without extension)
                const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
                setFileName(nameWithoutExt);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]; // Get only the first file
            if (validateFile(file)) {
                setSelectedFile(file);
                // Set default file name (without extension)
                const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
                setFileName(nameWithoutExt);
            }
        }
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileType(e.target.value);
        setSelectedFile(null);
        setFileName("");
        setError(null);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setError("Please select a file to upload");
            return;
        }

        if (!fileName.trim()) {
            setError("Please enter a name for your file");
            return;
        }

        onUpload(selectedFile, fileName.trim(), fileType);
        onClose();
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setFileName("");
    };

    const openFileSelector = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Upload File</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* File Type Selection */}
                <div className="px-6 py-4 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-3">Select file type:</p>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="fileType"
                                value="pdf"
                                checked={fileType === "pdf"}
                                onChange={handleTypeChange}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 flex items-center text-sm text-gray-700">
                                <FileText className="w-4 h-4 text-red-500 mr-1" /> PDF
                            </span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="fileType"
                                value="image"
                                checked={fileType === "image"}
                                onChange={handleTypeChange}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 flex items-center text-sm text-gray-700">
                                <Image className="w-4 h-4 text-green-500 mr-1" /> Image
                            </span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="fileType"
                                value="doc"
                                checked={fileType === "doc"}
                                onChange={handleTypeChange}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 flex items-center text-sm text-gray-700">
                                <FileText className="w-4 h-4 text-blue-500 mr-1" /> Word
                            </span>
                        </label>
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-6 py-4">
                    {!selectedFile ? (
                        /* Drop Zone */
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center ${
                                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                accept={
                                    fileType === "pdf"
                                        ? ".pdf"
                                        : fileType === "image"
                                          ? ".jpg,.jpeg,.png,.gif,.webp"
                                          : ".doc,.docx"
                                }
                            />

                            <div className="space-y-2">
                                <div className="flex justify-center">
                                    <Upload className="w-10 h-10 text-gray-400" />
                                </div>
                                <p className="text-sm text-gray-500">
                                    <span
                                        className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        onClick={openFileSelector}>
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    {fileType === "pdf" && "PDF files only (.pdf)"}
                                    {fileType === "image" && "Image files only (.jpg, .jpeg, .png, .gif, .webp)"}
                                    {fileType === "doc" && "Word documents only (.doc, .docx)"}
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* Selected File and Name Input */
                        <div className="space-y-4">
                            {/* Selected File */}
                            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded">
                                <div className="flex items-center">
                                    <FileCheck className="w-5 h-5 text-green-500 mr-2" />
                                    <span className="text-sm text-gray-700 truncate max-w-xs">{selectedFile.name}</span>
                                </div>
                                <button onClick={clearSelection} className="text-gray-400 hover:text-red-500">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* File Name Input */}
                            <div>
                                <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name your file:
                                </label>
                                <input
                                    type="text"
                                    id="fileName"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter file name (without extension)"
                                />
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mt-2 flex items-center text-sm text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            !selectedFile ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}
