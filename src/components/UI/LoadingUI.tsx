import { Loader } from "lucide-react";

export function LoadingUI() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <h2 className="mt-6 text-xl font-semibold text-gray-800">Loading your files</h2>
                <p className="mt-2 text-gray-500">Please wait while we prepare your S3 files...</p>
            </div>
        </div>
    );
}
