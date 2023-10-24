'use client'
import React, { useContext } from 'react';
import { categories } from '@/utils/contents';
import { Context } from '@/context/contextApi';
import { useRouter } from 'next/navigation';
import { abbreviateNumber } from 'js-abbreviation-number';
import { BsFillCheckCircleFill } from "react-icons/bs";
import Link from 'next/link';
import VideoLength from '@/shared/VideoLength';
import VideoCard from './VideoCard';
const Feed = () => {

    const { setselectCategories, selectcategories, mobileMenu, loading, searchResult } = useContext(Context);
    const router = useRouter();

    const handlerAction = (name, type) => {
        switch (type) {
            case 'category':
                return setselectCategories(name);
            case 'home':
                return setselectCategories(name);
            case 'menu':
                return setselectCategories(name);
            default:
                break;
        }
    };
    // const renderSearchResult = () => {
    //     if (loading) {
    //         return <div>Loading...</div>;
    //     }

    //     if (!searchResult) {
    //         return <div>No results found.</div>;
    //     }

    //     const filteredSearchResult = searchResult.filter(item => item.type === 'video');

    //     return filteredSearchResult.map((video) => (
    //         <Link href={`/video/${video?.videoId}`}>
    //             <div className="flex flex-col mb-8">
    //                 <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
    //                     <img
    //                         className="h-full w-full object-cover"
    //                         src={video.video?.thumbnails[0]?.url}
    //                     />
    //                     {video.lengthSeconds && (
    //                         <VideoLength time={video?.lengthSeconds} />
    //                     )}
    //                 </div>
    //                 <div className="flex text-white mt-3">
    //                     <div className="flex items-start">
    //                         <div className="flex h-9 w-9 rounded-full overflow-hidden">
    //                             <img
    //                                 className="h-full w-full object-cover"
    //                                 src={video.author?.avatar[0]?.url}
    //                             />
    //                         </div>
    //                     </div>
    //                     <div className="flex flex-col ml-3 overflow-hidden">
    //                         <span className="text-sm font-bold line-clamp-2">
    //                             {video?.title}
    //                         </span>
    //                         <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
    //                             {video?.author?.title}
    //                             {video?.author?.badges[0]?.type ===
    //                                 "VERIFIED_CHANNEL" && (
    //                                     <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
    //                                 )}
    //                         </span>
    //                         <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
    //                             <span>{`${abbreviateNumber(
    //                                 video?.stats?.views,
    //                                 2
    //                             )} views`}</span>
    //                             <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
    //                                 .
    //                             </span>
    //                             <span className="truncate">
    //                                 {video?.publishedTimeText}
    //                             </span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </Link>
    //     ));
    // };


    return (
        <div className='flex flex-row h-[calc(100%-56px)] bg-slate-300'>
            <div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all
      ${mobileMenu ? 'translate-x-0' : ''}
      `}>
                <div className='flex px-5 flex-col'>
                    {categories.map((item, index) => {
                        return (
                            <div onClick={() => { handlerAction(item.name, item.type), router.push('/'); }} key={index} className={`h-9 flex items-center rounded-lg hover:bg-white/[0.15] px-3    mb-[1px] text-white text-sm cursor-pointer
              ${selectcategories === item.name ? 'bg-white/[0.15]' : ''}`}>
                                <ul >
                                    <li className='flex items-center'>
                                        <span className='text mr-5'>{item.icon}</span>
                                        <span className=''>{item.type === 'home' ? 'Home' : item.name}</span>
                                    </li>
                                </ul>
                                {item.divider && (
                                    <hr className='my-5 border-white/[0.5]' />
                                )}
                            </div>
                        );
                    })}
                    <hr className='my-5 border-white/[0.5]' />
                    <div className='text-white/[0.5] text-[12px]'>Clone by:Roshan</div>
                </div>
            </div>
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {!loading &&
                        searchResult.map((item,index) => {
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
        </div>
    );
};

export default Feed;
