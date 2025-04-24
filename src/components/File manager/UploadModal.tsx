import React, { useState, useRef } from "react";
import { X, Upload, FileText, Image, FileCheck, AlertCircle, CheckCircle2 } from "lucide-react";

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

    const getFileTypeColor = (type: string) => {
        switch (type) {
            case "pdf":
                return "from-red-500 to-red-600";
            case "image":
                return "from-green-500 to-green-600";
            case "doc":
                return "from-blue-500 to-blue-600";
            default:
                return "from-gray-500 to-gray-600";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform">
                {/* Header */}
                <div className="relative px-6 py-5 border-b border-gray-100">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-800">Upload File</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* File Type Selection */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-600 mb-4">Select file type:</p>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { value: "pdf", label: "PDF", icon: <FileText className="w-4 h-4 text-red-500" /> },
                            { value: "image", label: "Image", icon: <Image className="w-4 h-4 text-green-500" /> },
                            { value: "doc", label: "Word", icon: <FileText className="w-4 h-4 text-blue-500" /> },
                        ].map((option) => (
                            <label
                                key={option.value}
                                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                                    fileType === option.value
                                        ? "bg-white shadow-md ring-2 ring-blue-500 ring-opacity-50"
                                        : "bg-white border border-gray-200 hover:bg-gray-50"
                                }`}>
                                <input
                                    type="radio"
                                    name="fileType"
                                    value={option.value}
                                    checked={fileType === option.value}
                                    onChange={handleTypeChange}
                                    className="sr-only" // Hide the actual radio button
                                />
                                <span className="flex items-center text-sm font-medium">
                                    {option.icon}
                                    <span className="ml-2">{option.label}</span>
                                    {fileType === option.value && (
                                        <CheckCircle2 className="ml-2 w-4 h-4 text-blue-500" />
                                    )}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-6 py-5">
                    {!selectedFile ? (
                        /* Drop Zone */
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                                dragActive
                                    ? `border-blue-500 bg-blue-50`
                                    : "border-gray-200 hover:border-blue-400 hover:bg-gray-50"
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

                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <div
                                        className={`p-4 rounded-full bg-gradient-to-br ${getFileTypeColor(fileType)} bg-opacity-10`}>
                                        <Upload
                                            className={`w-10 h-10 text-${fileType === "pdf" ? "red" : fileType === "image" ? "green" : "blue"}-500`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base text-gray-700">
                                        <span
                                            className="font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
                                            onClick={openFileSelector}>
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {fileType === "pdf" && "PDF files only (.pdf)"}
                                        {fileType === "image" && "Image files only (.jpg, .jpeg, .png, .gif, .webp)"}
                                        {fileType === "doc" && "Word documents only (.doc, .docx)"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Selected File and Name Input */
                        <div className="space-y-5">
                            {/* Selected File */}
                            <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white px-5 py-4 rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex items-center overflow-hidden">
                                    <div
                                        className={`p-2 mr-3 rounded-lg bg-gradient-to-br ${getFileTypeColor(fileType)} bg-opacity-90`}>
                                        <FileCheck className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="text-sm font-medium text-gray-700 block truncate max-w-xs">
                                            {selectedFile.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {(selectedFile.size / 1024).toFixed(1)} KB
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={clearSelection}
                                    className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors duration-200">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* File Name Input */}
                            <div>
                                <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Name your file:
                                </label>
                                <input
                                    type="text"
                                    id="fileName"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter file name (without extension)"
                                />
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mt-3 flex items-center text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile}
                        className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            !selectedFile
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg"
                        }`}>
                        {selectedFile ? "Upload File" : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
}
