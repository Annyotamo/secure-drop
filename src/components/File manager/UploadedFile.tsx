import { Download, Trash2, Loader2 } from "lucide-react";
import React, { useState } from "react";

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

const UploadedFile = ({ data, getFileIcon, handleDeleteFile, isDeleting }: filePropTypes) => {
    const [isAnimating, setIsAnimating] = useState(false);

    function formatFileSize(bytes: number) {
        if (bytes < 1024) return `${bytes} B`;
        return `${Math.floor(bytes / 1024)} KB`;
    }

    const handleDeleteClick = () => {
        setIsAnimating(true);
        handleDeleteFile();
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
                <button className="p-1 text-blue-600 hover:text-blue-800" aria-label="Download file">
                    <Download className="h-5 w-5" />
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
