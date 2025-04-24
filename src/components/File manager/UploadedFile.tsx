import { Download, Trash2, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

type dataType = {
    name: string;
    type: string;
    size: string;
    downloadUrl: string;
    uploaded: string;
};

interface filePropTypes {
    getFileIcon: (type: string) => React.ReactElement;
    handleDeleteFile: () => void;
    data: dataType;
    isDeleting?: boolean;
}

const fetchSignedUrl = async (fileName: string, fileType: string, authToken?: string) => {
    const response = await fetch(
        `https://vib7rvzf3a.execute-api.ap-south-1.amazonaws.com/dev/download?fileName=${fileName}.${fileType}`,
        {
            headers: {
                "Auth-Token": authToken || "",
            },
        }
    );
    if (!response.ok) throw new Error("Failed to get download URL");
    return await response.json();
};

const UploadedFile = ({ data, getFileIcon, handleDeleteFile, isDeleting }: filePropTypes) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const auth = useAuth();
    const authToken = auth.user?.id_token;

    const { isLoading: isDownloading, refetch: getDownloadUrl } = useQuery({
        queryKey: ["download-url", data.name, data.type],
        queryFn: () => fetchSignedUrl(data.name, data.type, authToken),
        enabled: false,
        retry: false,
    });

    function formatFileSize(bytes: number) {
        if (bytes < 1024) return `${bytes} B`;
        return `${Math.floor(bytes / 1024)} KB`;
    }

    const handleDeleteClick = () => {
        setIsAnimating(true);
        handleDeleteFile();
    };

    const handleDownloadClick = async () => {
        try {
            // 1. Get the signed URL from your API
            const {
                data: { url },
            } = await getDownloadUrl();

            if (url) {
                // 2. Fetch the file as a blob
                const response = await fetch(url, {
                    mode: "cors", // Important for CORS requests
                    credentials: "include", // Include cookies if needed
                });

                if (!response.ok) throw new Error("Failed to download file");

                const blob = await response.blob();

                // 3. Create object URL from blob
                const blobUrl = window.URL.createObjectURL(blob);

                // 4. Create invisible anchor element
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = blobUrl;

                // Set the desired filename
                a.download = `${data.name}.${data.type}`;

                // 5. Trigger click programmatically (this will show native download dialog)
                document.body.appendChild(a);
                a.click();

                // 6. Clean up
                window.URL.revokeObjectURL(blobUrl);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error("Download failed:", error);
            // Add your error notification here
        }
    };

    return (
        <div
            key={data.name}
            className={`
                px-4 py-3 grid grid-cols-12 items-center
                ${isAnimating ? "animate-pulse opacity-70" : "hover:bg-gray-50"}
                transition-all duration-300 ease-in-out
            `}>
            <div className="col-span-6 md:col-span-5 flex items-center">
                {getFileIcon(data.type)}
                <span className="ml-2 truncate">{data.name}</span>
            </div>
            <div className="col-span-2 hidden md:block text-gray-500 text-sm">{formatFileSize(Number(data.size))}</div>
            <div className="col-span-3 md:col-span-3 text-gray-500 text-sm">{data.uploaded}</div>
            <div className="col-span-3 md:col-span-2 flex space-x-2">
                <button
                    className="p-1 text-blue-600 hover:text-blue-800"
                    onClick={handleDownloadClick}
                    disabled={isDownloading}
                    aria-label={isDownloading ? "Preparing download..." : "Download file"}>
                    {isDownloading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                </button>
                <button
                    className={`
                        p-1 text-red-600 hover:text-red-800
                        ${isDeleting ? "opacity-70" : ""}
                        transition-opacity duration-200
                    `}
                    onClick={handleDeleteClick}
                    disabled={isDeleting}
                    aria-label={isDeleting ? "Deleting file..." : "Delete file"}>
                    {isDeleting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                </button>
            </div>
        </div>
    );
};

export default UploadedFile;
