import { Lock } from "lucide-react";

export function UnauthorizedUI() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
                <div className="flex justify-center">
                    <div className="bg-red-100 p-3 rounded-full">
                        <Lock className="w-8 h-8 text-red-500" />
                    </div>
                </div>
                <h2 className="mt-6 text-xl font-bold text-center text-gray-800">Access Denied</h2>
                <p className="mt-2 text-gray-600 text-center">You need to be authorized to access this file manager.</p>
                <div className="mt-6">
                    <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Sign In
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center">
                    If you believe this is an error, please contact support.
                </p>
            </div>
        </div>
    );
}
