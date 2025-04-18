import { Menu, Shield, X } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import Options from "./Options";

interface navbarPropTypes {
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mobileMenuOpen: boolean;
}

const Navbar = ({ setMobileMenuOpen, mobileMenuOpen }: navbarPropTypes) => {
    return (
        <nav className="bg-blue-900 text-white">
            <div className="container mx-auto p-8 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-blue-300" />
                    <span className="text-xl font-bold">SecureDrop</span>
                </div>

                {/* Desktop Navigation */}
                <Options />

                <div className="hidden md:block">
                    <button
                        onClick={() => {}}
                        className="px-4 py-1 text-blue-900 bg-white rounded-l-md hover:bg-blue-100 transition-colors">
                        Sign In/Up
                    </button>
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && <MobileNavbar />}
        </nav>
    );
};

export default Navbar;
