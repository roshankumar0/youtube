'use client'
import Feed from '@/components/feed'
import Header from '@/components/header'
import React, { useContext } from 'react'
import { Context } from '@/context/contextApi'
import Loader from '@/shared/loading'
const page = () => {
  const{loading}=useContext(Context)
  return (
    <>
      <div className='h-screen '>
        {loading && <Loader/>}
        <Header />
        <Feed />
      </div>

    </>
  )
}

export default page
