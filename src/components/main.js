'use client'
import VideoCard from './VideoCard';
import React, { useContext } from 'react';
import { Context } from '@/context/contextApi';
const Main = () => {
    const {  loading, searchResult } = useContext(Context);
  
    return (
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                {!loading &&
                    searchResult.map((item, index) => {
                        if (item.type !== "video") return false;
                        return (
                            <VideoCard
                                key={index}
                                video={item?.video}
                            />
                        );
                    })}
            </div>
        </div>
    )
}

export default Main
