import { Lock, Shield, Upload } from "lucide-react";

const FeatureHighlights = () => {
    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Why Choose SecureDrop?</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Lock className="h-6 w-6 text-blue-700" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2">AWS Integration</h3>
                        <p className="text-blue-800">
                            Direct connection to your S3 buckets using secure API Gateway endpoints.
                        </p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Upload className="h-6 w-6 text-blue-700" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2">Easy File Management</h3>
                        <p className="text-blue-800">
                            Upload, download, and organize your files with an intuitive interface.
                        </p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Shield className="h-6 w-6 text-blue-700" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2">Serverless Architecture</h3>
                        <p className="text-blue-800">
                            Powered by AWS Lambda for scalable, reliable performance without server management.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureHighlights;
