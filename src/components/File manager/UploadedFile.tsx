import { Download, Trash2 } from "lucide-react";
import React from "react";

interface filePropTypes {
    getFileIcon: (type: "pdf" | "image" | "doc" | "other") => React.ReactElement;
    handleDeleteFile: () => void;
    data: any;
}

const UploadedFile = ({ data, getFileIcon, handleDeleteFile }: filePropTypes) => {
    return (
        <div key={data.id} className="px-4 py-3 grid grid-cols-12 items-center hover:bg-gray-50">
            <div className="col-span-6 md:col-span-5 flex items-center">
                {getFileIcon(data.type)}
                <span className="ml-2 truncate">{data.name}</span>
            </div>
            <div className="col-span-2 hidden md:block text-gray-500 text-sm">{data.size}</div>
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
