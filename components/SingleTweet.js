import React from 'react'
import { useState, useEffect } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { PiChatsCircle } from "react-icons/pi";
import { FaRetweet } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import Tweet from './Tweet';

const SingleTweet = () => {
    const [inputValue, setInputValue] = useState('');
    
    const inputChange = (event) => {
        setInputValue(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
      };
    
      const tweets = [1,2,3,4,5,6,7];

  return (
    <div className='mr-10 ml-10' style={{width: '600px', borderLeft: '0.5px #E1E8ED solid', borderRight: '0.5px #E1E8ED solid'}}>
      <div className='ml-10 options_container flex text-center align-center justify-start'>
        <div className='options_container flex text-center align-center justify-center flex-gap-25'>
            <IoArrowBack size={20}/>
            <span style={{fontSize: '25px'}}>Post</span>
        </div>
      </div>
      <div className='p-20 flex flex-gap-10 tweet-container' style={{borderBottom: '0.5px #E1E8ED solid'}}>
        <div className='flex flex-gap-10' style={{width: '100%'}}>
            <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div>
            <div style={{width: '100%'}}>
                <div> {/* className='flex justify-between' */}
                    <div className='flex flex-gap-5'>
                        <div><span className='user-name'>userName</span></div>
                        <div><span className='user-handle'>@aymtheman ·</span></div>
                        <div><span className='user-handle'>5h</span></div>
                    </div>
                    {/* <div><BsThreeDots /></div> */}
                </div>

                <div className='mt-10' style={{width: '100%'}}>
                    <p className='tweet-body mb-10'>content</p>    
                    
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
        <div className='flex align-center justify-center' style={{width: '100%', borderBottom: '0.5px #E1E8ED solid'}}>
        <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div>
          <textarea 
            className='tweet-input' 
            type='text' 
            placeholder='Post your reply' 
            rows="1" 
            value={inputValue}
            onChange={inputChange} />

          <div className='flex justify-end'>

              <div></div> {/* Icons */}

              <div className='p-15 mt-15 flex align-center justify-center' style={{cursor: 'pointer', backgroundColor:'#1D9BF0', borderRadius:'25px', width:'40px', height:'10px'}}>
                <div className='flex align-center justify-center' style={{width: '50%'}}>
                  <span style={{color:'white'}}>Reply</span>
                </div>
              </div>

          </div>
        </div>
        {
        tweets.map((i) => (
          <div key={i}>
            <Tweet 
              userName={"adasd"}
              // userHandle={/* assuming you have a field for user handle */}
              // timestamp={post.date}
              content={"adasdas"}
              id={i}
            />
          </div>
        ))
      }
        
    </div>

    
  )
}

export default SingleTweet;
