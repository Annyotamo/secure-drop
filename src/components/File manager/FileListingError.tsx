import React from "react";

const FileListingError = ({ errorMessage }: { errorMessage: string }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Failed to load files</h3>
                <p className="mt-1 text-sm text-gray-500">{errorMessage || "An unknown error occurred"}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                    Retry
                </button>
            </div>
        </div>
    );
};

export default FileListingError;
