import { RefreshCw, Search, Upload } from "lucide-react";
import React from "react";

interface functionalityPropTypes {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    handleFileUpload: () => void;
    isUploading: boolean;
}

const Functionalities = ({ searchQuery, setSearchQuery, handleFileUpload, isUploading }: functionalityPropTypes) => {
    return (
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search files..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button
                onClick={() => {
                    // Implement your refresh logic here
                    console.log("Refreshing files");
                }}
                className="flex items-center justify-center px-4 py-2 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
            </button>
            <button
                onClick={handleFileUpload}
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
    );
};

export default Functionalities;
