import { Download, Trash2 } from "lucide-react";
import React from "react";

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
}

const UploadedFile = ({ data, getFileIcon, handleDeleteFile }: filePropTypes) => {
    console.log(data);

    function formatFileSize(bytes: number) {
        if (bytes < 1024) return `${bytes} B`; // Show in bytes if < 1 KB
        return `${Math.floor(bytes / 1024)} KB`; // Show whole-number KB if ≥ 1 KB
    }

    return (
        <div key={data.name} className="px-4 py-3 grid grid-cols-12 items-center hover:bg-gray-50">
            <div className="col-span-6 md:col-span-5 flex items-center">
                {getFileIcon(data.type)}
                <span className="ml-2 truncate">{data.name}</span>
            </div>
            <div className="col-span-2 hidden md:block text-gray-500 text-sm">{formatFileSize(Number(data.size))}</div>
            <div className="col-span-3 md:col-span-3 text-gray-500 text-sm">{data.uploaded}</div>
            <div className="col-span-3 md:col-span-2 flex space-x-2">
                <button className="p-1 text-blue-600 hover:text-blue-800">
                    <Download className="h-5 w-5" />
                </button>
                <button className="p-1 text-red-600 hover:text-red-800" onClick={() => handleDeleteFile()}>
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default UploadedFile;
