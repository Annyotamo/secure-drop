import { useState } from "react";
import { Upload, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "react-oidc-context";
import { motion } from "framer-motion";

interface HeroSectionProps {
    className?: string;
}

const HeroSection = ({ className = "" }: HeroSectionProps) => {
    const auth = useAuth();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className={`relative overflow-hidden py-20 lg:py-32 ${className}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjIuNCAzIDEuMi44LjguMS4xIDAgMC0xLjYtMS40LTMuNi0xLjQtNS4yIDBIMzFjLTIuMiAwLTQgMS44LTQgNHYyYzAgMi4yIDEuOCA0IDQgNGg4YzIuMiAwIDQtMS44IDQtNHYtMmMwLTIuMi0xLjgtNC00LTRoLTN6IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')]"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full bg-indigo-600 opacity-20 blur-3xl animate-pulse"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Content */}
                    <motion.div
                        className="lg:w-1/2 text-center lg:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 leading-tight">
                            Manage Your S3 Files <br className="hidden sm:block" />
                            <span className="text-blue-300">with Ease</span>
                        </h1>

                        <p className="text-xl text-blue-100 mb-8 max-w-lg mx-auto lg:mx-0">
                            Upload, view, and manage your AWS S3 bucket files securely through our
                            <span className="font-semibold text-blue-200"> intuitive interface</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <motion.button
                                onClick={() => auth.signinRedirect()}
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium text-lg shadow-lg shadow-blue-500/30 flex items-center justify-center group"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}>
                                <Upload className={`h-5 w-5 mr-2 ${isHovered ? "animate-bounce" : ""}`} />
                                Get Started
                                <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </motion.button>

                            <motion.button
                                className="px-8 py-4 rounded-xl border-2 border-blue-400/30 text-blue-100 font-medium text-lg hover:bg-blue-900/30 transition-all flex items-center justify-center"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}>
                                <ShieldCheck className="h-5 w-5 mr-2 text-blue-300" />
                                Learn More
                            </motion.button>
                        </div>

                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={`w-8 h-8 rounded-full border-2 border-blue-900 bg-gradient-to-r from-blue-${i * 100 + 300} to-indigo-${i * 100 + 300}`}></div>
                                ))}
                            </div>
                            <p className="text-blue-200 font-medium">
                                Trusted by <span className="font-bold text-white">1000+</span> developers
                            </p>
                        </div>
                    </motion.div>

                    {/* Hero Card */}
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}>
                        <HeroItem />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

interface HeroItemProps {
    className?: string;
}

const HeroItem = ({ className = "" }: HeroItemProps) => {
    return (
        <div className={`relative ${className}`}>
            {/* Animated backgrounds */}
            <motion.div
                className="absolute -z-10"
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}>
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-blue-500/30 blur-3xl"></div>
            </motion.div>

            <motion.div
                className="absolute -z-10 right-0 bottom-0"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                    scale: [0.8, 1, 0.8],
                    opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1,
                }}>
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-indigo-600/20 blur-3xl"></div>
            </motion.div>

            {/* Glass card */}
            <motion.div
                className="w-full max-w-lg mx-auto"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <div className="backdrop-blur-xl bg-gradient-to-br from-blue-950/80 to-slate-900/90 rounded-2xl overflow-hidden shadow-2xl border border-blue-500/10">
                    {/* Card header */}
                    <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 p-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-full">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 2L4 6V12.5C4 17.5 7.5 22 12 23C16.5 22 20 17.5 20 12.5V6L12 2Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white">SecureDrop S3</h3>
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-blue-300"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card body */}
                    <div className="p-8">
                        <div className="mb-8 flex justify-center">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60 blur-lg group-hover:opacity-100 transition-all"></div>
                                <div className="relative bg-slate-900 rounded-xl p-6">
                                    <div className="w-32 h-32 flex items-center justify-center">
                                        <motion.div
                                            className="bg-gradient-to-br from-blue-400 to-indigo-600 p-4 rounded-full shadow-lg shadow-blue-500/20"
                                            whileHover={{
                                                scale: 1.1,
                                                boxShadow: "0 0 25px 5px rgba(59, 130, 246, 0.5)",
                                            }}>
                                            <svg
                                                width="48"
                                                height="48"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 text-center mb-8">
                            <h4 className="text-2xl font-bold text-white">Secure Cloud Access</h4>
                            <p className="text-blue-200 max-w-xs mx-auto">
                                Upload, download, and manage your files with enterprise-grade security
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 p-4 bg-blue-900/20 rounded-xl mb-2">
                                {[
                                    { label: "Files", value: "128" },
                                    { label: "Storage", value: "1.2 GB" },
                                    { label: "Users", value: "8" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <p className="text-lg font-bold text-white">{stat.value}</p>
                                        <p className="text-xs text-blue-300">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            <motion.button
                                className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20"
                                whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                                whileTap={{ scale: 0.98 }}>
                                Sign In to Access
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
