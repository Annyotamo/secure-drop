import { Loader2 } from "lucide-react"; // Using Loader2 for smoother spin animation

export function LoadingUI() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-lg shadow overflow-hidden p-8">
            {/* Header (matches FileListing's style) */}
            <div className="w-full border-b border-gray-200 bg-gray-50 px-4 py-3 grid grid-cols-12 text-sm font-medium text-gray-500 mb-6">
                <div className="col-span-6 md:col-span-5">File Name</div>
                <div className="col-span-2 hidden md:block">Size</div>
                <div className="col-span-3 md:col-span-3">Uploaded Date</div>
                <div className="col-span-3 md:col-span-2">Actions</div>
            </div>

            {/* Animated Loading Content */}
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <div className="relative">
                    {/* Outer ring (spinning) */}
                    <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin"></div>
                    {/* Inner icon (static) */}
                    <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Loading your files</h2>
                <p className="text-sm text-gray-500 max-w-md text-center">
                    Fetching your S3 bucket contents. This may take a moment...
                </p>
            </div>

            {/* Skeleton Placeholder (optional) */}
            <div className="w-full space-y-4 mt-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-14 bg-gray-50 rounded-md animate-pulse"></div>
                ))}
            </div>
        </div>
    );
}
