const MobileNavbar = () => {
    return (
        <div className="md:hidden bg-blue-800 pb-4">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
                <a href="#" className="py-2 hover:text-blue-300 transition-colors">
                    Features
                </a>
                <a href="#" className="py-2 hover:text-blue-300 transition-colors">
                    How It Works
                </a>
                <div className="pt-2 flex">
                    <button
                        onClick={() => {}}
                        className="flex-1 py-2 text-blue-900 bg-white rounded-l-md hover:bg-blue-100 transition-colors">
                        Sign In/Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileNavbar;
