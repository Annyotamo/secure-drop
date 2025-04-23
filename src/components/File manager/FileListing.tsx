import React from "react";
import UploadedFile from "./UploadedFile";
import { useAuth } from "react-oidc-context";
import { useGetFiles } from "../../hooks/useGetFiles";
import { useQuery } from "@tanstack/react-query";

interface FileListingPropTypes {
    getFileIcon: (type: string) => React.ReactElement;
    handleDeleteFile: (name: string, type: string) => void;
    searchQuery: string;
}

export default function FileListing({ getFileIcon, handleDeleteFile, searchQuery }: FileListingPropTypes) {
    const auth = useAuth();
    const userId = auth.user?.id_token;

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["s3-data", userId],
        queryFn: async () => {
            if (!userId) throw new Error("User not authenticated");
            return await useGetFiles(userId);
        },
    });

    const filteredFiles = React.useMemo(() => {
        if (!data?.files) return [];
        return data.files.filter((file: any) => file.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [data?.files, searchQuery]);

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 grid grid-cols-12 text-sm font-medium text-gray-500">
                    <div className="col-span-6 md:col-span-5">File Name</div>
                    <div className="col-span-2 hidden md:block">Size</div>
                    <div className="col-span-3 md:col-span-3">Uploaded Date</div>
                    <div className="col-span-3 md:col-span-2">Actions</div>
                </div>
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="p-4 border-b border-gray-200 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
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
                    <p className="mt-1 text-sm text-gray-500">{error?.message || "An unknown error occurred"}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 grid grid-cols-12 text-sm font-medium text-gray-500">
                <div className="col-span-6 md:col-span-5">File Name</div>
                <div className="col-span-2 hidden md:block">Size</div>
                <div className="col-span-3 md:col-span-3">Uploaded Date</div>
                <div className="col-span-3 md:col-span-2">Actions</div>
            </div>

            {filteredFiles.length > 0 ? (
                <div className="divide-y divide-gray-200">
                    {filteredFiles.map((file: any) => (
                        <UploadedFile
                            key={file.name}
                            data={{
                                name: file.name,
                                type: file.type,
                                size: file.size,
                                downloadUrl: file.downloadUrl,
                                uploaded: file.uploaded,
                            }}
                            getFileIcon={getFileIcon}
                            handleDeleteFile={() => handleDeleteFile(file.name, file.type)}
                        />
                    ))}
                </div>
            ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                    {searchQuery ? "No files match your search" : "No files found in your S3 bucket"}
                </div>
            )}
        </div>
    );
}
