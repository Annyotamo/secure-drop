import { useState } from "react";
import { Lock, Shield, Upload, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    delay: number;
}

const FeatureHighlights = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent opacity-60"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
            <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-indigo-100 opacity-30 blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">
                        Powerful Features
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent mb-6">
                        Why Choose SecureDrop?
                    </h2>
                    <p className="text-lg text-blue-700">
                        Experience the perfect blend of security, simplicity, and performance with our cloud storage
                        solution.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Lock className="h-8 w-8" />}
                        title="AWS Integration"
                        description="Direct connection to your S3 buckets using secure API Gateway endpoints with end-to-end encryption."
                        color="blue"
                        delay={0.1}
                    />

                    <FeatureCard
                        icon={<Upload className="h-8 w-8" />}
                        title="Easy File Management"
                        description="Upload, download, and organize your files with an intuitive drag-and-drop interface and folder structure."
                        color="indigo"
                        delay={0.3}
                    />

                    <FeatureCard
                        icon={<Shield className="h-8 w-8" />}
                        title="Serverless Architecture"
                        description="Powered by AWS Lambda for scalable, reliable performance without server management or maintenance."
                        color="purple"
                        delay={0.5}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center">
                    <a
                        href="#more-features"
                        className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold transition-colors group">
                        Explore all features
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, description, color, delay }: FeatureCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const getGradientColors = () => {
        switch (color) {
            case "blue":
                return "from-blue-500 to-blue-700";
            case "indigo":
                return "from-indigo-500 to-indigo-700";
            case "purple":
                return "from-purple-500 to-purple-700";
            default:
                return "from-blue-500 to-blue-700";
        }
    };

    const getBackgroundColor = () => {
        switch (color) {
            case "blue":
                return "bg-blue-50 hover:bg-blue-100";
            case "indigo":
                return "bg-indigo-50 hover:bg-indigo-100";
            case "purple":
                return "bg-purple-50 hover:bg-purple-100";
            default:
                return "bg-blue-50 hover:bg-blue-100";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`rounded-2xl p-1 transition-all duration-300 group`}>
            <div
                className={`h-full rounded-xl shadow-lg ${getBackgroundColor()} backdrop-blur-sm border border-white transition-all p-8 md:p-10 relative overflow-hidden`}>
                {/* Animated background gradient */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r ${getGradientColors()} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Icon with animation */}
                <div className="mb-6 relative">
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={
                            isHovered
                                ? {
                                      scale: [1, 1.1, 1],
                                      transition: { duration: 1, repeat: Infinity },
                                  }
                                : { scale: 1 }
                        }
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradientColors()} flex items-center justify-center text-white shadow-lg`}>
                        {icon}
                    </motion.div>

                    {/* Decoration dots */}
                    <motion.div
                        className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-white"
                        animate={
                            isHovered
                                ? {
                                      y: [-2, 2, -2],
                                      opacity: [0.5, 1, 0.5],
                                      transition: { duration: 2, repeat: Infinity },
                                  }
                                : {}
                        }></motion.div>
                    <motion.div
                        className="absolute -right-4 top-2 w-2 h-2 rounded-full bg-white"
                        animate={
                            isHovered
                                ? {
                                      y: [2, -2, 2],
                                      opacity: [0.3, 0.7, 0.3],
                                      transition: { duration: 2, delay: 0.3, repeat: Infinity },
                                  }
                                : {}
                        }></motion.div>
                </div>

                <h3 className="text-2xl font-bold text-blue-900 mb-4">{title}</h3>
                <p className="text-blue-700 mb-6">{description}</p>

                {/* Feature list */}
                <ul className="space-y-2">
                    {[1, 2].map((item, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-2 text-sm text-blue-700">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {index === 0 ? "24/7 Security Monitoring" : "Full Audit Logging"}
                        </motion.li>
                    ))}
                </ul>

                {/* Learn more link */}
                <motion.div
                    className="absolute bottom-6 right-6"
                    initial={{ opacity: 0 }}
                    animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <a
                        href="#"
                        className="text-sm font-medium flex items-center gap-1 text-blue-700 hover:text-blue-900">
                        Learn more
                        <ArrowRight className="h-3 w-3" />
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FeatureHighlights;
