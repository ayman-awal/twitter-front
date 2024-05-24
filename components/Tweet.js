import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { PiChatsCircle } from "react-icons/pi";
import { FaRetweet } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";

import { CiShare2 } from "react-icons/ci";


const Tweet = ({ userName, content }) => {
  return (
    <div className='p-20 flex flex-gap-10 tweet-container' style={{borderBottom: '0.5px #E1E8ED solid'}}>
        <div className='flex flex-gap-10' style={{width: '100%'}}>
            <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div>
            <div style={{width: '100%'}}>
                <div> {/* className='flex justify-between' */}
                    <div className='flex flex-gap-5'>
                        <div><span className='user-name'>{userName}</span></div>
                        <div><span className='user-handle'>@aymtheman ·</span></div>
                        <div><span className='user-handle'>5h</span></div>
                    </div>
                    {/* <div><BsThreeDots /></div> */}
                </div>

                <div className='mt-10' style={{width: '100%'}}>
                    <p className='tweet-body mb-10'>{content}</p>    
                    
                    <div className='slate'></div>

                    <div className='mt-30 flex justify-between'>
                        <div><PiChatsCircle /></div>
                        <div><FaRetweet /></div>
                        <div><IoMdHeartEmpty /></div>
                        <div><IoStatsChart /></div>
                        <div><CiShare2 /></div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
    
  


  )
}

export default Tweet