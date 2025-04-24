const FileListingLoading = () => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 grid grid-cols-12 text-sm font-medium text-gray-500">
                <div className="col-span-6 md:col-span-5">File Name</div>
                <div className="col-span-2 hidden md:block">Size</div>
                <div className="col-span-3 md:col-span-3">Uploaded Date</div>
                <div className="col-span-3 md:col-span-2">Actions</div>
            </div>
            {[...Array(3)].map((_, index) => (
                <div key={index} className="p-4 border-b border-gray-200 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );
};

export default FileListingLoading;
