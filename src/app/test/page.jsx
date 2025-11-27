import React from 'react';

const page = () => {
    return (
        <div className="flex min-h-screen">
           
            <div className="w-1/4 sticky top-4 self-start h-max bg-gray-200 p-4">
                Sidebar (sticky)
            </div>

         
            <div className="w-3/4 p-4">
                <div className="h-[2000px]">
                    Very tall content to enable scrolling
                </div>
            </div>
        </div>

    );
};

export default page;