const MobileNavbar = ({ signIn, signOut }: { signOut: () => void; signIn: () => void }) => {
    return (
        <div className="md:hidden bg-blue-800 pb-4">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
                <a href="#" className="py-2 hover:text-blue-300 transition-colors">
                    Features
                </a>
                <a href="#" className="py-2 hover:text-blue-300 transition-colors">
                    How It Works
                </a>
                <div className="pt-2 flex gap-2">
                    <button
                        onClick={signIn}
                        className="flex-1 py-2 text-blue-900 font-bold bg-white rounded-md hover:bg-blue-100 transition-colors">
                        Sign In
                    </button>
                    <button
                        onClick={signOut}
                        className="flex-1 py-2 text-red-500 font-bold bg-white rounded-md hover:bg-red-100 transition-colors">
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileNavbar;
