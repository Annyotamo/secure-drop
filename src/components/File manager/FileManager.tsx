import { Download, File, RefreshCw, Search, Trash2, Upload } from "lucide-react";
import React from "react";

interface FileItem {
    id: number;
    name: string;
    size: string;
    uploaded: string;
    type: "pdf" | "image" | "doc" | "other";
}

export default function FileManager() {
    const filteredFiles: any[] = [];
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [isUploading, setIsUploading] = React.useState<boolean>(false);

    function getFileIcon(type: FileItem["type"]) {
        switch (type) {
            case "pdf":
                return <File className="h-5 w-5 text-red-500" />;
            case "doc":
                return <File className="h-5 w-5 text-blue-500" />;
            case "image":
                return <File className="h-5 w-5 text-green-500" />;
            default:
                return <File className="h-5 w-5 text-gray-500" />;
        }
    }

    function handleFileUpload() {}
    function handleDeleteFile() {}

    return (
        <div className="flex-grow bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 md:mb-0">Your S3 Files</h1>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                        <div className="relative">
                            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search files..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                onChange={() => {}}
                            />
                        </div>
                        <button
                            onClick={() => {}}
                            className="flex items-center justify-center px-4 py-2 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-50">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </button>
                        <button
                            onClick={() => {}}
                            className="flex items-center justify-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                            disabled={isUploading}>
                            {isUploading ? (
                                <>
                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Files
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* File Listing */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 grid grid-cols-12 text-sm font-medium text-gray-500">
                        <div className="col-span-6 md:col-span-5">File Name</div>
                        <div className="col-span-2 hidden md:block">Size</div>
                        <div className="col-span-3 md:col-span-3">Uploaded Date</div>
                        <div className="col-span-3 md:col-span-2">Actions</div>
                    </div>

                    {filteredFiles.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {filteredFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="px-4 py-3 grid grid-cols-12 items-center hover:bg-gray-50">
                                    <div className="col-span-6 md:col-span-5 flex items-center">
                                        {getFileIcon(file.type)}
                                        <span className="ml-2 truncate">{file.name}</span>
                                    </div>
                                    <div className="col-span-2 hidden md:block text-gray-500 text-sm">{file.size}</div>
                                    <div className="col-span-3 md:col-span-3 text-gray-500 text-sm">
                                        {file.uploaded}
                                    </div>
                                    <div className="col-span-3 md:col-span-2 flex space-x-2">
                                        <button className="p-1 text-blue-600 hover:text-blue-800">
                                            <Download className="h-5 w-5" />
                                        </button>
                                        <button
                                            className="p-1 text-red-600 hover:text-red-800"
                                            onClick={() => handleDeleteFile()}>
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                            {searchQuery ? "No files match your search" : "No files found in your S3 bucket"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
