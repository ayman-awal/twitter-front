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
import { BsBookmark } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBookmarks } from '../redux/slices/authSlice';
import {setSingleTweetId, setTweetUser, setClickedUser} from '../redux/slices/postsSlice';

const Tweet = ({ userId, name, username, content, id}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const [showDropdown, setShowDropdown] = useState(false);
    const bookmarks = useSelector((state) => state.auth.bookmarks);
    let bookmarkTag = bookmarks.some(item => item.post === id);
    // const [bookmarked, setBookmarked] = useState(bookmarkTag);

    const stopPropagation = (e) => {
      e.stopPropagation();
    };

    const redirect = () => {
      dispatch(setSingleTweetId(id));
      dispatch(setTweetUser(username));

      // dispatch(setClickedUser(username));
      router.push(`${username}/status/${id}`);
    }

    const redirectProfile = (e) => {
      stopPropagation(e);
      console.log(username);
      dispatch(setClickedUser({userId, username}));
      console.log("dispatched username");

      router.push(`/${username}`);
    }

    const handleOpenDropdown = () => {
      setShowDropdown(true);
    };
  
    const handleCloseDropdown = () => {
      setShowDropdown(false);
    };

    
    const addBookmark = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/api/profile/bookmark/add/${id}`, {}, {
          headers:{
            'x-auth-header': token,
            'Content-Type': 'application/json'
          }
        });
        // setBookmarked(true);
        console.log("addBookmark: " + response.data);
        bookmarkTag = true;
        dispatch(setBookmarks(response.data));
      } catch (error) {
        console.log(error);
      }
    }

    const removeBookmark = async () => {
      console.log(`id: inside ${id}`);
      try {
        const response = await axios.put(`http://localhost:5000/api/profile/bookmark/remove/${id}`, {}, {
          headers:{
            'x-auth-header': token,
            'Content-Type': 'application/json'
          }
        });
        // setBookmarked(false);
        console.log("removeBookmark: " + response.data);
        bookmarkTag = false;
        dispatch(setBookmarks(response.data));
      } catch (error) {
        console.log(error);
      }
    }

    const handleBookmark = (e) => {
        stopPropagation(e);
        if (bookmarkTag === false){
          addBookmark();
          console.log("Token: " + token);
          console.log("id: " + id);
          console.log("bookmark added (I think lol)");
          // console.log("id: " + JSON.parse({id}));
          // console.log("content: " + JSON.parse({content}));
        } 
        else if (bookmarkTag === true){
          removeBookmark();
          console.log("Token: " + token);
          console.log("id: " + id);

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
                        <div><span className='user-name underline' onClick={redirectProfile}>{name}</span></div>
                        <div><span className='user-handle' onClick={redirectProfile}>@{username} ·</span></div>
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
                        
                        <div className='highlight-option' onClick={handleBookmark}>
                          {bookmarkTag ? <BsFillBookmarkFill/> : <BsBookmark />}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
      </>
    
    
  


  )
}

export default Tweet