'use client'
import { useSearchParams } from 'next/navigation';

const searchResult = () => {
    const searchParams = useSearchParams();
    const naem = searchParams.get('name');

    return (
        <div>
            <h1>Search result for: {naem}</h1>
        </div>
    );
};

export default searchResult;
