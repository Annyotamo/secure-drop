import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import { useGetFiles } from "../../hooks/useGetFiles";
import { useQuery } from "@tanstack/react-query";
import FileListingError from "./FileListingError";
import FileListingLoading from "./FileListingLoading";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX, FolderOpen, ArrowUpDown, Trash2, Download } from "lucide-react";

interface FileListingPropTypes {
    getFileIcon: (type: string) => React.ReactElement;
    handleDeleteFile: (name: string, type: string) => void;
    searchQuery: string;
    isDeleting?: boolean;
}

type SortField = "name" | "size" | "uploaded";
type SortDirection = "asc" | "desc";

export default function FileListing({ getFileIcon, handleDeleteFile, searchQuery, isDeleting }: FileListingPropTypes) {
    const auth = useAuth();
    const userId = auth.user?.id_token;
    const [sortField, setSortField] = useState<SortField>("uploaded");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [hoveredHeader, setHoveredHeader] = useState<string | null>(null);

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["s3-data", userId],
        queryFn: async () => {
            if (!userId) throw new Error("User not authenticated");
            return await useGetFiles(userId);
        },
    });

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const filteredFiles = React.useMemo(() => {
        if (!data?.files) return [];

        // First filter by search query
        const filtered = data.files.filter((file: any) => file.name.toLowerCase().includes(searchQuery.toLowerCase()));

        // Then sort based on current sort field and direction
        return [...filtered].sort((a: any, b: any) => {
            let comparison = 0;

            switch (sortField) {
                case "name":
                    comparison = a.name.localeCompare(b.name);
                    break;
                case "size":
                    comparison = Number(a.size) - Number(b.size);
                    break;
                case "uploaded":
                    comparison = new Date(a.uploaded).getTime() - new Date(b.uploaded).getTime();
                    break;
            }

            return sortDirection === "asc" ? comparison : -comparison;
        });
    }, [data?.files, searchQuery, sortField, sortDirection]);

    if (isLoading) {
        return <FileListingLoading />;
    }

    if (isError) {
        return <FileListingError errorMessage={error.message} />;
    }

    const totalSize = filteredFiles.reduce((acc: number, file: any) => acc + Number(file.size), 0);
    const formatTotalSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
            {/* Header with stats */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 border-b border-blue-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center gap-3 mb-3 md:mb-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FolderOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-blue-900">Your Files</h2>
                            <p className="text-sm text-blue-600">
                                {filteredFiles.length} file{filteredFiles.length !== 1 ? "s" : ""}
                                {filteredFiles.length > 0 && ` • ${formatTotalSize(totalSize)}`}
                            </p>
                        </div>
                    </div>

                    {searchQuery && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1.5">
                            <span>Search: </span>
                            <span className="font-medium">{searchQuery}</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Table Header */}
            <div className="bg-blue-50 px-4 py-3 grid grid-cols-12 text-sm font-medium text-blue-900 border-b border-blue-100">
                <motion.div
                    className="col-span-6 md:col-span-5 flex items-center cursor-pointer group"
                    onClick={() => handleSort("name")}
                    onMouseEnter={() => setHoveredHeader("name")}
                    onMouseLeave={() => setHoveredHeader(null)}
                    whileHover={{ x: 3 }}>
                    <span>File Name</span>
                    {sortField === "name" && (
                        <ArrowUpDown
                            className={`ml-1 h-3.5 w-3.5 ${sortDirection === "asc" ? "text-blue-700" : "text-blue-700 rotate-180"}`}
                        />
                    )}
                    {hoveredHeader === "name" && sortField !== "name" && (
                        <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-blue-400 opacity-60" />
                    )}
                </motion.div>

                <motion.div
                    className="col-span-2 hidden md:flex items-center cursor-pointer group"
                    onClick={() => handleSort("size")}
                    onMouseEnter={() => setHoveredHeader("size")}
                    onMouseLeave={() => setHoveredHeader(null)}
                    whileHover={{ x: 3 }}>
                    <span>Size</span>
                    {sortField === "size" && (
                        <ArrowUpDown
                            className={`ml-1 h-3.5 w-3.5 ${sortDirection === "asc" ? "text-blue-700" : "text-blue-700 rotate-180"}`}
                        />
                    )}
                    {hoveredHeader === "size" && sortField !== "size" && (
                        <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-blue-400 opacity-60" />
                    )}
                </motion.div>

                <motion.div
                    className="col-span-3 md:col-span-3 flex items-center cursor-pointer group"
                    onClick={() => handleSort("uploaded")}
                    onMouseEnter={() => setHoveredHeader("uploaded")}
                    onMouseLeave={() => setHoveredHeader(null)}
                    whileHover={{ x: 3 }}>
                    <span>Uploaded</span>
                    {sortField === "uploaded" && (
                        <ArrowUpDown
                            className={`ml-1 h-3.5 w-3.5 ${sortDirection === "asc" ? "text-blue-700" : "text-blue-700 rotate-180"}`}
                        />
                    )}
                    {hoveredHeader === "uploaded" && sortField !== "uploaded" && (
                        <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-blue-400 opacity-60" />
                    )}
                </motion.div>

                <div className="col-span-3 md:col-span-2">Actions</div>
            </div>

            {/* File Listings */}
            <AnimatePresence initial={false}>
                {filteredFiles.length > 0 ? (
                    <motion.div
                        className="divide-y divide-blue-50"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <AnimatePresence initial={false}>
                            {filteredFiles.map((file: any, index: number) => (
                                <motion.div
                                    key={`${file.name}-${file.type}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: index * 0.03 }}>
                                    <UploadedFile
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
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="py-16 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <SearchX className="h-8 w-8 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium text-blue-900 mb-2">
                            {searchQuery ? "No files match your search" : "No files found"}
                        </h3>
                        <p className="text-blue-600 max-w-sm">
                            {searchQuery
                                ? `We couldn't find any files matching "${searchQuery}". Try a different search term.`
                                : "Upload your first file to get started with SecureDrop."}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer with pagination or additional info could go here */}
            {filteredFiles.length > 0 && (
                <div className="bg-blue-50 px-4 py-3 border-t border-blue-100 flex justify-between items-center text-sm text-blue-700">
                    <span>
                        Showing {filteredFiles.length} of {data?.files?.length || 0} files
                    </span>
                    <span>{formatTotalSize(totalSize)} total</span>
                </div>
            )}
        </motion.div>
    );
}

// You'll also want to update the UploadedFile component to match the design:

const UploadedFile = ({ data, getFileIcon, handleDeleteFile, isDeleting }: any) => {
    const [isHovered, setIsHovered] = useState(false);
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
            const {
                data: { url },
            } = await getDownloadUrl();

            if (url) {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to download file");
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.style.display = "none";
                a.href = blobUrl;
                a.download = `${data.name}.${data.type}`;

                document.body.appendChild(a);
                a.click();

                window.URL.revokeObjectURL(blobUrl);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
        px-4 py-3 grid grid-cols-12 items-center
        ${isAnimating ? "animate-pulse opacity-70" : ""}
        ${isHovered ? "bg-blue-50" : "bg-white"}
        transition-all duration-300 ease-in-out
      `}>
            <div className="col-span-6 md:col-span-5 flex items-center">
                <div
                    className={`
          p-1.5 rounded-lg mr-3
          ${isHovered ? "bg-blue-100" : "bg-gray-50"}
          transition-colors duration-300
        `}>
                    {getFileIcon(data.type)}
                </div>
                <span className="truncate font-medium text-blue-900">{data.name}</span>
                <span className="text-blue-400 text-xs ml-1.5">.{data.type}</span>
            </div>

            <div className="col-span-2 hidden md:block text-blue-700 text-sm">{formatFileSize(Number(data.size))}</div>

            <div className="col-span-3 md:col-span-3 text-blue-700 text-sm">{data.uploaded}</div>

            <div className="col-span-3 md:col-span-2 flex justify-end space-x-1">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
            p-1.5 rounded-lg transition-all duration-200
            ${isHovered ? "bg-blue-100 text-blue-700" : "text-blue-600"}
            ${isDownloading ? "opacity-70" : "hover:bg-blue-200 hover:text-blue-800"}
          `}
                    onClick={handleDownloadClick}
                    disabled={isDownloading}
                    aria-label={isDownloading ? "Preparing download..." : "Download file"}>
                    {isDownloading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    ) : (
                        <Download className="h-5 w-5" />
                    )}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
            p-1.5 rounded-lg transition-all duration-200
            ${isHovered ? "bg-red-100 text-red-600" : "text-red-500"}
            ${isDeleting ? "opacity-70" : "hover:bg-red-200 hover:text-red-700"}
          `}
                    onClick={handleDeleteClick}
                    disabled={isDeleting}
                    aria-label={isDeleting ? "Deleting file..." : "Delete file"}>
                    {isDeleting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                    ) : (
                        <Trash2 className="h-5 w-5" />
                    )}
                </motion.button>
            </div>
        </div>
    );
};

// Import needed for the updated UploadedFile component
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
