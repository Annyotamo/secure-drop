import { useState, useEffect } from "react";
import { Shield, Menu, X, ChevronRight } from "lucide-react";
import { useAuth } from "react-oidc-context";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const auth = useAuth();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const signOutRedirect = () => {
        const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
        const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_REDIRECT;
        const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navClasses = `fixed w-full z-50 transition-all duration-500 ${
        scrolled
            ? "bg-gradient-to-r from-blue-900/95 to-indigo-900/95 backdrop-blur-md shadow-xl py-2 border-b border-blue-700/30"
            : "bg-gradient-to-r from-blue-900 to-indigo-900 py-4"
    }`;

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
            },
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    const linkHoverClass = "relative overflow-hidden group";

    return (
        <nav className={navClasses}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative">
                            <motion.div
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <Shield className="h-8 w-8 text-blue-300 drop-shadow-md" />
                            </motion.div>
                            <div className="absolute -inset-1 bg-blue-400 rounded-full blur-md opacity-30 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                        <div className="relative">
                            <span className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                                SecureDrop
                            </span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                        </div>
                    </div>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <div className="hidden md:flex items-center space-x-8">
                        <DesktopNavLink href="#features" title="Features" />
                        <DesktopNavLink href="#how-it-works" title="How It Works" />

                        <div className="flex items-center space-x-3 ml-4">
                            <button
                                onClick={() => auth.signinRedirect()}
                                className="py-2 px-5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5">
                                Sign In
                            </button>
                            <button
                                onClick={() => signOutRedirect()}
                                className="py-2 px-5 rounded-lg border border-red-400 text-red-400 font-medium hover:bg-red-400/10 shadow-sm hover:shadow-red-500/20 transition-all transform hover:-translate-y-0.5">
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Hamburger Icon - Only visible on mobile */}
                    <button
                        className="md:hidden flex items-center justify-center p-2 rounded-full bg-blue-800/50 hover:bg-blue-700/70 backdrop-blur-sm border border-blue-700/30 transition-colors shadow-md z-50"
                        onClick={toggleMenu}
                        aria-label="Toggle menu">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={menuOpen ? "close" : "menu"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}>
                                {menuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="md:hidden overflow-hidden">
                            <div className="py-6 border-t border-blue-800/50 mt-4 grid gap-6">
                                <div className="grid gap-4">
                                    <MobileNavLink
                                        href="#features"
                                        title="Features"
                                        toggleMenu={toggleMenu}
                                        hoverClass={linkHoverClass}
                                    />
                                    <MobileNavLink
                                        href="#how-it-works"
                                        title="How It Works"
                                        toggleMenu={toggleMenu}
                                        hoverClass={linkHoverClass}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <button
                                        onClick={() => {
                                            auth.signinRedirect();
                                            toggleMenu();
                                        }}
                                        className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1">
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => {
                                            signOutRedirect();
                                            toggleMenu();
                                        }}
                                        className="py-3 px-6 rounded-xl border border-red-400 text-red-400 font-semibold hover:bg-red-400/10 hover:text-red-300 shadow-md transition-all transform hover:-translate-y-1">
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

// Desktop NavLink Component
const DesktopNavLink = ({ href, title }: { href: string; title: string }) => {
    return (
        <a href={href} className="relative group text-gray-100 hover:text-white font-medium transition-colors">
            <span>{title}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
        </a>
    );
};

// Mobile NavLink Component with dropdown capability
interface MobileNavLinkProps {
    href: string;
    title: string;
    toggleMenu: () => void;
    hoverClass: string;
}

const MobileNavLink = ({ href, title, toggleMenu, hoverClass }: MobileNavLinkProps) => {
    return (
        <a
            href={href}
            className={`flex items-center justify-between text-lg text-white font-medium ${hoverClass} py-2 px-1 transition-all rounded-lg hover:bg-blue-800/30`}
            onClick={toggleMenu}>
            <div className="flex items-center space-x-2">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span>{title}</span>
            </div>
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <ChevronRight className="h-5 w-5 text-blue-300" />
            </motion.div>
        </a>
    );
};

export default Navbar;
