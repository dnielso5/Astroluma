import React from "react";

const NiceDrag = () => {

    return (
        <div className="relative">
            <div className="bg-internalDragColor p-10 rounded-3xl shadow-md transform transition-transform">
                <div className='flex items-center justify-center p-8'>
                    <div className="bg-internalDragStripColor h-20 w-20 rounded-full animate-pulse" />
                </div>
                <div className='flex items-center justify-center text-center overflow-hidden !min-h-20 !max-h-20'>
                    <div className="bg-internalDragStripColor h-5 w-full rounded animate-pulse" />
                </div>
                <div className="absolute top-0 right-0 p-2 cursor-pointer opacity-50 m-2 transition-opacity">
                    <div className="bg-internalDragStripColor h-5 w-5 rounded animate-pulse" />
                </div>
            </div>
        </div>
    )
}

const MemoizedComponent = React.memo(NiceDrag);
export default MemoizedComponent;
