import { File } from "lucide-react";
import { useEffect, useState } from "react";
import UploadedFile from "./UploadedFile";
import { useAuth } from "react-oidc-context";
import Functionalities from "./Functionalities";
import { LoadingUI } from "../UI/LoadingUI";
import { UnauthorizedUI } from "../UI/Unauthorized";

interface FileItem {
    id: number;
    name: string;
    size: string;
    uploaded: string;
    type: "pdf" | "image" | "doc" | "other";
}

export default function FileManager() {
    const auth = useAuth();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const filteredFiles: any[] = []; // Assuming you'll have logic to populate this

    useEffect(() => {
        if (auth.user) {
            setAccessToken(auth.user.id_token);
        }
    }, [auth.user]);

    useEffect(() => {
        async function testConnection() {
            if (accessToken) {
                try {
                    setIsLoading(false);
                    const res = await fetch("https://vib7rvzf3a.execute-api.ap-south-1.amazonaws.com/dev/", {
                        method: "GET",
                        headers: {
                            "Auth-Token": `Bearer ${accessToken}`,
                        },
                    });
                    const data = await res.json();
                    console.log(data);
                } catch (error) {
                    console.log("Error: ", error);
                }
            }
        }
        testConnection();
    }, [accessToken]);

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

    function handleFileUpload() {
        // Implement file upload logic
    }

    function handleDeleteFile(id: number) {
        // Implement file deletion logic
    }

    if (isLoading) {
        return <LoadingUI />;
    }

    if (!auth.user) {
        return <UnauthorizedUI />;
    }

    return (
        <div className="flex-grow bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 md:mb-0">Your S3 Files</h1>
                    <Functionalities
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        isUploading={isUploading}
                        handleFileUpload={handleFileUpload}
                    />
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
                                <UploadedFile
                                    key={file.id} // Assuming your FileItem has an 'id'
                                    data={file}
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
            </div>
        </div>
    );
}
