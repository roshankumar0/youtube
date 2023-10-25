'use client'
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/context/contextApi';
import LeftNav from '@/components/leftNav';
import fetchDataYoutube from '@/utils/api';
import Loader from '@/shared/loading';
const searchResult = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('name');
    const { setLoading, loading } = useContext(Context);
    const [resutl, setResult] = useState([])
    useEffect(() => {
        fetchSearchResult()
    }, [searchQuery])



    const fetchSearchResult = () => {
        setLoading(true);
        fetchDataYoutube(`search/?q=${searchQuery}`).then((res) => {
            console.log(res, 'flhssssssssssssssssssssssss');
            setResult(res?.contents);
            setLoading(false);
        });
    };

    return (
        <div className='flex flex-row h-screen bg-slate-300  text-white'>
            {loading && <Loader />}
            <div><LeftNav /></div>
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {resutl.map((item) => {
                        if (item.type !== 'video') return false
                        return <div key={item.videoId}>
                            {item + 'hello'}
                            <h1>{item.video?.descriptionSnippet}</h1>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default searchResult;
