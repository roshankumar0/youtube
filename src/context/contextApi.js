'use client'
import { useEffect, useState, createContext } from 'react'
import fetchDataYoutube from '@/utils/api'
export const Context = createContext();
const AppContext = (props) => {
    const [loading, setLoading] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [selectcategories, setselectCategories] = useState('New')
    const [mobileMenu, setMobileMenu] = useState(false)
    useEffect(() => {
        fetchSelectedselectCategories(selectcategories)
    }, [selectcategories])
    
    const fetchSelectedselectCategories = (query) => {
        setLoading(true)
        fetchDataYoutube(`search/?q=${query}`).then(({contents}) => {
            console.log(contents)
            setSearchResult(contents)
            setLoading(false)
        })
    }
    return (
        <Context.Provider value={
            {
                loading,
                setLoading,
                searchResult,
                setSearchResult,
                selectcategories,
                setselectCategories,
                mobileMenu,
                setMobileMenu
            }
        }>
            {props.children}
        </Context.Provider>
    )
}
export default AppContext