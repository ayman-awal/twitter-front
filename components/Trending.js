import React from 'react'
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const Trending = () => {
  return (
    <div className='mt-5' style={{width:'350px'}}>
        <div className='searchbar flex text-center align-center justify-start flex-gap-20' style={{height: '45px'}}>
            <HiMiniMagnifyingGlass className='ml-15' style={{ fontSize: '20px' }} />
            <div className=''><input type='text' style={{border:'none'}} placeholder='Search'/></div>
        </div>

        <div className='searchbar mt-20' style={{height: '100px'}}>
            {/* <div><span>Trends for you</span></div> */}

        </div>

    </div>
    

  )
}


export default Trending