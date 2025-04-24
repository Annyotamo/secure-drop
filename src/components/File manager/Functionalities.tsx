import { RefreshCw, Search, Upload } from "lucide-react";
import React from "react";
import { queryClient } from "../../main";

interface functionalityPropTypes {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    handleFileUpload: () => void;
    isUploading: boolean;
    setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Functionalities = ({
    searchQuery,
    setSearchQuery,
    handleFileUpload,
    isUploading,
    setIsRefreshing,
}: functionalityPropTypes) => {
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await queryClient.invalidateQueries({ queryKey: ["s3-data"] });
        } catch (error) {
            console.error("Refresh failed:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

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
                onClick={handleRefresh}
                className="flex items-center justify-center px-4 py-2 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-50 hover:cursor-pointer disabled:opacity-50"
                disabled={isUploading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
            </button>
            <button
                onClick={handleFileUpload}
                className="flex items-center justify-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:opacity-50 hover:cursor-pointer"
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
