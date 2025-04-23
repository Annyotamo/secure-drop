import { Menu, Shield, X } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import Options from "./Options";
import { useAuth } from "react-oidc-context";

interface navbarPropTypes {
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mobileMenuOpen: boolean;
}

const Navbar = ({ setMobileMenuOpen, mobileMenuOpen }: navbarPropTypes) => {
    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "7p984uuatg03rhaapsjt3qqkhr";
        const logoutUri = "http://localhost:3000/";
        const cognitoDomain = "https://ap-south-14wnb9natu.auth.ap-south-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    return (
        <nav className="bg-blue-900 text-white">
            <div className="container mx-auto p-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Shield className="h-10 w-10 text-blue-300" />
                    <span className="text-4xl font-bold">SecureDrop</span>
                </div>

                {/* Desktop Navigation */}
                <Options />

                <div className="hidden md:block">
                    <button
                        onClick={() => auth.signinRedirect()}
                        className="p-2 px-4 text-blue-900 mr-2 bg-white rounded-md font-bold hover:bg-blue-100 transition-colors">
                        Sign In/Up
                    </button>
                    <button
                        onClick={() => signOutRedirect()}
                        className="p-2 px-4 bg-white text-red-500 rounded-md font-bold transition-colors">
                        Sign Out
                    </button>
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && <MobileNavbar signIn={() => auth.signinRedirect()} signOut={() => signOutRedirect()} />}
        </nav>
    );
};

export default Navbar;
