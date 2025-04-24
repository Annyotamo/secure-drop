import React from "react";
import UploadedFile from "./UploadedFile";
import { useAuth } from "react-oidc-context";
import { useGetFiles } from "../../hooks/useGetFiles";
import { useQuery } from "@tanstack/react-query";
import FileListingError from "./FileListingError";
import FileListingLoading from "./FileListingLoading";

interface FileListingPropTypes {
    getFileIcon: (type: string) => React.ReactElement;
    handleDeleteFile: (name: string, type: string) => void;
    searchQuery: string;
    isDeleting?: boolean;
}

export default function FileListing({ getFileIcon, handleDeleteFile, searchQuery, isDeleting }: FileListingPropTypes) {
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
        return <FileListingLoading />;
    }

    if (isError) {
        return <FileListingError errorMessage={error.message} />;
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
                            isDeleting={isDeleting}
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
