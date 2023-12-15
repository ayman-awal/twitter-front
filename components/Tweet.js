import React from 'react'
import { BsThreeDots } from "react-icons/bs";

const Tweet = () => {
  return (
    <div className='p-20 flex flex-gap-10' style={{borderBottom: '0.5px #E1E8ED solid'}}>
        <div className='flex flex-gap-10'>
            <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div>
            <div>
                <div> {/* className='flex justify-between' */}
                    <div className='flex flex-gap-5'>
                        <div><span className='user-name'>Ayman Awal</span></div>
                        <div><span className='user-handle'>@aymtheman ·</span></div>
                        <div><span className='user-handle'>5h</span></div>
                    </div>
                    {/* <div><BsThreeDots /></div> */}
                </div>

                <div className='mt-10'>
                    <p className='tweet-body mb-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. </p>    
                    
                    <div className='slate'></div>
                </div>
            </div>
            
        </div>
        
    </div>
    
  


  )
}

export default Tweet