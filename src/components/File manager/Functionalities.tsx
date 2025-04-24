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
        <div className="flex flex-col w-full lg:w-auto md:flex-row gap-4">
            <div className="relative w-full md:w-64 lg:w-80">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search files..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
                <button
                    onClick={handleRefresh}
                    className="flex items-center justify-center px-4 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isUploading}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    <span>Refresh</span>
                </button>

                <button
                    onClick={handleFileUpload}
                    className={`flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md font-medium flex-1 md:flex-none disabled:opacity-60 disabled:cursor-not-allowed ${isUploading ? "animate-pulse" : ""}`}
                    disabled={isUploading}>
                    {isUploading ? (
                        <div className="flex items-center">
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            <span>Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <Upload className="h-4 w-4 mr-2" />
                            <span>Upload Files</span>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Functionalities;
