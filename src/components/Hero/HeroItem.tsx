import { Lock } from "lucide-react";

const HeroItem = () => {
    return (
        <div className="md:w-1/2 flex justify-center">
            <div className="relative">
                {/* Background elements */}
                <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-400 bg-opacity-20 rounded-full blur-sm animate-pulse absolute -top-6 -left-6"></div>
                <div className="w-32 h-32 bg-indigo-500 bg-opacity-20 rounded-full blur-sm absolute -bottom-4 -right-4 animate-pulse"></div>

                {/* Main card */}
                <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl backdrop-blur-lg relative overflow-hidden p-6">
                    {/* Card gloss effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/5"></div>

                    {/* Top card pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 opacity-20 rounded-bl-full"></div>

                    {/* Content container */}
                    <div className="border-2 border-blue-400/30 border-dashed rounded-lg h-full flex items-center justify-center flex-col">
                        {/* Icon with glow */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-blue-400 opacity-20 blur-md rounded-full"></div>
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-full shadow-lg">
                                <Lock className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        {/* Text */}
                        <h3 className="text-xl font-semibold text-white mb-2">Secure Access</h3>
                        <p className="text-center text-blue-200 mb-6">Sign in to access your S3 files</p>

                        {/* Button */}
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-blue-500/20 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroItem;
