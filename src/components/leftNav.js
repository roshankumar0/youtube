'use client'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { Context } from '@/context/contextApi';
import { categories } from '@/utils/contents';
const LeftNav = () => {
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
    )
}

export default LeftNav
