'use client'
import React, { useContext } from 'react';
import { categories } from '@/utils/contents';
import { Context } from '@/context/contextApi';
import { useRouter } from 'next/navigation';
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
    return (
        <div className='flex flex-row h-[calc(100%-56px)] bg-slate-300'>
            <div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all
      ${mobileMenu ? 'translate-x-[0]' : ''}
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
        </div>
    );
};

export default Feed;
