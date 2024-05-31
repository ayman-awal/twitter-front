import React from 'react'
import { useRouter } from 'next/router';
import { BsThreeDots } from "react-icons/bs";
import { PiChatsCircle } from "react-icons/pi";
import { FaRetweet } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { useState } from 'react';
import { PiDotsThree } from "react-icons/pi";
import Dropdown from 'react-bootstrap/Dropdown';
import { CiBookmark } from "react-icons/ci";
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeBookmark, setBookmarks } from '../redux/slices/bookmarksSlice';

const Tweet = ({ userName, content, id }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const [showDropdown, setShowDropdown] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const redirect = () => {
        router.push('aymtheman' + '/status/' + {id});
    }

    const handleOpenDropdown = () => {
      setShowDropdown(true);
    };
  
    const handleCloseDropdown = () => {
      setShowDropdown(false);
    };

    const stopPropagation = (e) => {
      e.stopPropagation();
    };

    const addBookmark = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/api/profile/bookmark/add/${id}`, {
          headers:{
            'x-auth-headers': token,
            'Content-Type': 'application/json'
          }
        });
        setBookmarked(true);
        dispatch(setBookmarks(response.data));
      } catch (error) {
        console.log(error);
      }
    }

    const removeBookmark = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/api/profile/bookmark/remove/${id}`, {
          headers:{
            'x-auth-headers': token,
            'Content-Type': 'application/json'
          }
        });
        setBookmarked(false);
        dispatch(setBookmarks(response.data));
      } catch (error) {
        console.log(error);
      }
    }

    const handleBookmark = (e) => {
        stopPropagation(e);
        if (bookmarked === false){
          addBookmark();
          console.log("bookmark added (I think lol)");
          // console.log("id: " + JSON.parse({id}));
          // console.log("content: " + JSON.parse({content}));
        } 
        else{
          removeBookmark();
          console.log("bookmark removed (I think lol)");
        }
    };

  return (
    <>
    <div onClick={redirect} className='p-20 flex flex-gap-10 tweet-container' style={{borderBottom: '0.5px #E1E8ED solid'}}>
        <div className='flex flex-gap-10' style={{width: '100%'}}>
            <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div>
            <div style={{width: '100%'}}>
                <div className='flex justify-between'> {/* className='flex justify-between' */}
                    <div className='flex flex-gap-5'>
                        <div><span className='user-name'>{userName}</span></div>
                        <div><span className='user-handle'>@aymtheman ·</span></div>
                        <div><span className='user-handle'>5h</span></div>
                    </div>

                    <div>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-custom-components">
                          <BsThreeDots /> 
                        </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                    </div>
                </div>

                <div className='mt-10' style={{width: '100%'}}>
                    <p className='tweet-body mb-10'>{content}</p>    
                    
                    <div className='slate'></div>

                    <div className='mt-30 flex justify-between'>
                        <div className='highlight-option'><PiChatsCircle /></div>
                        <div className='highlight-option'><FaRetweet /></div>
                        <div className='highlight-option'><IoMdHeartEmpty /></div>
                        <div className='highlight-option'><IoStatsChart /></div>
                        <div className='highlight-option' onClick={handleBookmark}><CiBookmark /></div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
      </>
    
    
  


  )
}

export default Tweet