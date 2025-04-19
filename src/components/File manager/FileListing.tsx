import React, { useEffect, useState } from "react";
import UploadedFile from "./UploadedFile";
import { useAuth } from "react-oidc-context";
import { useGetFiles } from "../../hooks/useGetFiles";

interface fileListingPropTypes {
    getFileIcon: (type: string) => React.ReactElement;
    handleDeleteFile: (name: string) => void;
    searchQuery: string;
}

export default function FileListing({ getFileIcon, handleDeleteFile, searchQuery }: fileListingPropTypes) {
    const auth = useAuth();
    const userId = auth.user?.id_token;
    const [files, setFiles] = useState([]);

    useEffect(() => {
        async function getFiles() {
            if (userId) {
                const data = await useGetFiles(userId);
                console.log(data);
                setFiles(data.files);
            }
        }
        getFiles();
    }, [userId]);

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 grid grid-cols-12 text-sm font-medium text-gray-500">
                <div className="col-span-6 md:col-span-5">File Name</div>
                <div className="col-span-2 hidden md:block">Size</div>
                <div className="col-span-3 md:col-span-3">Uploaded Date</div>
                <div className="col-span-3 md:col-span-2">Actions</div>
            </div>

            {files.length > 0 ? (
                <div className="divide-y divide-gray-200">
                    {files.map((file: any) => (
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
                            handleDeleteFile={() => handleDeleteFile(file.id)}
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
