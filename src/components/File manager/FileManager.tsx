import { File } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import Functionalities from "./Functionalities";
import { LoadingUI } from "../UI/LoadingUI";
import { UnauthorizedUI } from "../UI/Unauthorized";
import UploadModal from "./UploadModal";
import { useFileUpload } from "../../hooks/useFileUpload";
import FileListing from "./FileListing";

interface FileItem {
    id: number;
    name: string;
    size: string;
    uploaded: string;
    type: string;
}

export default function FileManager() {
    const auth = useAuth();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

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
        setIsUploadModalOpen(true);
    }

    async function handleUploadComplete(file: File, fileName: string, fileType: string) {
        setIsUploading(true);

        if (accessToken) {
            const data = await useFileUpload(file, fileName, fileType, accessToken);
            console.log(data);
        }

        setTimeout(() => {
            setIsUploading(false);
        }, 2000);
    }

    function handleDeleteFile(name: string) {
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
                <FileListing getFileIcon={getFileIcon} searchQuery={searchQuery} handleDeleteFile={handleDeleteFile} />
            </div>

            {/* Upload Modal */}
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUpload={handleUploadComplete}
            />
        </div>
    );
}
