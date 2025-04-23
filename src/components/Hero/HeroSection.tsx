import { Upload } from "lucide-react";
import HeroItem from "./HeroItem";
import { useAuth } from "react-oidc-context";

const HeroSection = () => {
    const auth = useAuth();
    return (
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16 md:py-24">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 ml-10 mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Manage Your S3 Files with Ease</h1>
                    <p className="text-xl mb-6 text-blue-100">
                        Upload, view, and manage your AWS S3 bucket files securely through our intuitive interface.
                    </p>
                    <div className="flex">
                        <button
                            onClick={() => auth.signinRedirect()}
                            className="px-6 py-3 bg-blue-300 text-blue-900 rounded-md hover:bg-blue-200 transition-colors font-medium flex items-center">
                            <Upload className="h-5 w-5 mr-2" />
                            Get Started
                        </button>
                    </div>
                </div>
                <HeroItem />
            </div>
        </div>
    );
};

export default HeroSection;
