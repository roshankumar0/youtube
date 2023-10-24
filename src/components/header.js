'use client'
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { Context } from '@/context/contextApi';
import { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/shared/loading";
import Image from "next/image";
import ytLogo from '@/components/images/yt-logo.png'
import ytLogomobile from '@/components/images/yt-logo-mobile.png'
import Link from "next/link";
const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { mobileMenu, loading, setMobileMenu } = useContext(Context);
    const router = useRouter();

    const searchQueryHandler = (e) => {
        if ((e.key === 'Enter' || e === 'searchButton') && searchQuery.length > 0) {
            router.push(`/searchresult/?name=${searchQuery}`)
        }
    };
    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu)
    }
    const pathname = usePathname()
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];
    return (
        <div className="sticky z-10 top-0 h-14 flex flex-row items-center justify-between md:px-5 bg-black">
            {loading && <Loading />}
            <div className="flex h-5 items-center">
                {pageName !== 'video' && (
                    <div className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]" onClick={mobileMenuToggle}>
                        {mobileMenu ? (<CgClose className="text-white text-xl" />) : (<SlMenu className="text-white text-xl" />)}
                    </div>
                )}
                <Link href={`/`} className="flex items-center">
                    <Image className="hidden md:block" src={ytLogo} height={125} width={125} alt="logo" />
                    <Image className="md:hidden" src={ytLogomobile} height={40} width={40} alt="logo" />
                </Link>
            </div>
            <div className="group flex items-center">
                <div
                    className="flex h-8 md:h-10 md:ml-10 md:pl-5 border-[#303030] rounded-tl-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0"
                >
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-3xl" />
                    </div>
                </div>
                <input
                    className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                />
                <button onClick={()=>searchQueryHandler('searchButton')} className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.6]"><IoIosSearch className="text-white text-3xl" /></button>
            </div>
        </div>
    )
}

export default Header;
