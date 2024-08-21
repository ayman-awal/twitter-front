import React, { useEffect } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { FaRegCalendarAlt } from "react-icons/fa";
import {useState} from 'react';
import axios from 'axios';
import Tweet from './Tweet';
import {useRouter} from 'next/router';
import { setFollowing, setFollowers } from '../redux/slices/authSlice';

const Profile = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');
  const [profile, setProfile] = useState({});
  let loggedInUser = null, options = null, isFollowing = null;

  const [tweets, setTweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const loggedInUsername = useSelector((state) => state.auth.username);
  const username = useSelector((state) => state.posts.clickedUser);
  username == loggedInUsername ? loggedInUser = true : loggedInUser = false;
  const userId = useSelector((state) => state.posts.clickedUserId);
  // console.log("USERID: " + userId);
  !loggedInUser ? isFollowing = useSelector((state) => state.auth.following.some(item => item.user === userId)) : isFollowing = null;
  console.log('LOGGEDINUSER: ' + loggedInUser);
  console.log('ISFOLLOWING: ' + isFollowing);

  const followingBtnStyle = {
    text: 'Following',
    style: {
        width: '50%', 
        borderRadius: '25px', 
        borderColor: 'black', 
        borderStyle: 'solid', 
        borderWidth: '1px', 
        width: '100px'
    },
    textStyle: {
      color: 'black'
    }
  };

  const followBtnStyle = {
    text: 'Follow',
    style: {
        backgroundColor: 'black', 
        width: '50%', 
        borderRadius: '25px', 
        borderColor: 'black', 
        borderStyle: 'solid', 
        borderWidth: '1px', 
        width: '100px'
    },
    textStyle: {
      color: '#fff'
    }
  };
  const [buttonState, setButtonState] = useState(!isFollowing ? followBtnStyle : followingBtnStyle);
  const token = useSelector((state) => state.auth.token);

  const handleBtnClick = async (btnValue) => {
    try {
      if(btnValue == 'Follow'){
        const response = await axios.put(`http://localhost:5000/api/profile/follow/${userId}`, {}, {
          headers: {
            'x-auth-header': token,
            'Content-Type': 'application/json',
          }
        });

        if(response.status == 200){
          setButtonState(followingBtnStyle);
          dispatch(setFollowing(response.following));
          dispatch(setFollowers(response.followers));
        }
      }
      else if (btnValue == 'Following'){
        const response = await axios.put(`http://localhost:5000/api/profile/unfollow/${userId}`, {}, {
          headers: {
            'x-auth-header': token,
            'Content-Type': 'application/json',
          }
        });

        if(response.status == 200){
          setButtonState(followBtnStyle);
          dispatch(setFollowing(response.following));
          dispatch(setFollowers(response.followers));
        }
      }
      
    } catch (error) {
      
    }
  }

  const options1 = [
    {
      title: 'Posts',
    },
    {
      title: 'Replies',
    },
    {
      title: 'Media',
    },
    {
      title: 'Likes',
    }
  ];

  const options2 = [
    {
      title: 'Posts',
    },
    {
      title: 'Replies',
    },
    {
      title: 'Media',
    }
  ];

  loggedInUser ? options = options1 : options = options2;

  useEffect(() => {
    setSelectedOption("Posts");
  
    const getProfile = async () => {
    
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${username}`, {
          headers: {
            'x-auth-header': token,
          },
        });
        setProfile(response.data);
        // console.log(response.data);
  
        const tweetsId = response.data.posts.map(post => post.post);
        // console.log("tweetsId");
        // console.log(tweetsId);
  
        const fetchTweets = await Promise.all(tweetsId?.map((id) => {
          return axios.get(`http://localhost:5000/api/posts/${id}`, {
            headers: {
              'x-auth-header': token,
            },
          });
        }));
  
        // console.log("fetchTweets");
        // console.log(fetchTweets);
        setTweets(fetchTweets.map(res => res.data));
  
        const fetchReplies = await axios.get('http://localhost:5000/api/posts/comments/me', {
          headers: {
            'x-auth-header': token,
          },
        });
  
        // console.log("fetchReplies");
        // console.log(fetchReplies.data);
  
        setReplies(fetchReplies.data);
        
      } catch (error) {
        // console.error("An error occurred:", error);
      }
    };
  
    getProfile();
  }, []);
  // console.log("heylo?");
  const home = () => {
    router.push('/home');
  }

  const handleOption = (title) => {
    if(title === 'Posts'){
      setSelectedOption('Posts');
      // getTweets();
    }
    else if(title === 'Replies'){
      setSelectedOption('Replies');
    }
    else if(title === 'Media'){
      setSelectedOption('Media');
    }
    else if(title === 'Likes'){
      setSelectedOption('Likes');
    }
  }

  // console.log("replies: ");
  // console.log(replies);
  // console.log(tweets);

  const followingTab = () =>{
    router.push(`${username}/following`);
  }

  const followersTab = () => {
    router.push(`${username}/followers`);
  }

  return (
    <div className='mr-10 ml-10' style={{width: '600px', borderLeft: '0.5px #E1E8ED solid', borderRight: '0.5px #E1E8ED solid'}}>
      <div className='ml-10 options_container flex text-center align-center justify-start'>
        <div className='options_container flex text-center align-center justify-center flex-gap-25'>
            <span onClick={home} className='pointer'><IoArrowBack size={20}/></span>
            <span style={{fontSize: '18px'}}>{profile.name}</span>
        </div>
      </div>

      <div style={{borderBottom: '0.5px #E1E8ED solid'}}>
        <div style={{backgroundColor: 'grey', height:'180px'}}></div>

        <div className='rounded-50 flex-shrink pro-pic' style={{width: '150px', height: '150px', backgroundColor:'black'}}></div>
        
        <div style={{height:'80px'}}>
          <div className='flex justify-end pt-10 mr-20' >
              {
                loggedInUser ? (
                  <div className='text-center pointer' /*onClick={() => handleBtnClick('Edit')}*/ style={{width: '50%', borderRadius:'25px', borderColor:'black', borderStyle: 'solid', borderWidth: '1px', width:'100px'}}>
                      <span>Edit Profile</span>
                  </div>
                ) : (
                  <div className='text-center pointer' onClick={() => handleBtnClick(buttonState.text)} style={buttonState.style}>
                      <span style={buttonState.textStyle}>{buttonState.text}</span>
                  </div>
                )
              }
          </div>
        </div>

        <div className='ml-20'>

          <div className='flex flex-column'>
            <span style={{fontSize: '18px'}}>{profile.name}</span>
            <span style={{fontSize: '18px'}}>@{profile.username}</span>
          </div>

          <div className='mt-15 flex flex-row flex-gap-10'>
            <span><FaRegCalendarAlt /></span>
            <span>Joined November 2012</span>
          </div>

          <div className='mt-15 flex flex-row flex-gap-20'>
            <span className='pointer underline' onClick={followingTab}>{Array.isArray(profile.following) ? profile.following.length : 0} Following</span>
            <span className='pointer underline' onClick={followersTab}>{Array.isArray(profile.followers) ? profile.followers.length : 0}  Followers</span>
          </div>
        </div>

          <div className='flex justify-around align-center mt-10'>
            {
              (
                options.map((option, index) => (
                  <div key={index} onClick={() => handleOption(option.title)} className='mt-10 pointer' style={{fontSize: '18px'}}>
                    {option.title}
                  </div>
                ))
              )
            }
          </div>

          <div className='mt-20'>
            {
              (
                selectedOption === 'Posts' ? 
                  (
                    tweets && tweets.map((tweet, index) => (
                      <div key={index}>
                        <Tweet 
                          userId={tweet.user}
                          name={tweet.name}
                          username={tweet.username}
                          // timestamp={post.date}
                          content={tweet.text}
                          id={tweet.id}
                          bookmarkTag={tweet.bookmarked}
                        />
                      </div>
                    ))
                  )
                  
                  : 
                  
                  selectedOption === 'Replies' ? 
                  (
                    replies && replies.map((reply, index) => (
                      <div key={index}>
                        <Tweet
                          userId={reply.user}
                          name={reply.name}
                          username={reply.username}
                          // timestamp={post.date}
                          content={reply.text}
                          id={reply.id}
                          bookmarkTag={reply.bookmarked}
                        />
                      </div>
                    ))
                  )
                  
                  : selectedOption === 'Media' ? 
                  
                  (
                    <div>
                      Here is your Media
                    </div>
                  ) 
                  
                  : selectedOption === 'Likes' ? 
                  
                  (
                    <div>
                      Here are your Likes
                    </div>
                  ) 
                  
                  : null
              )
            }
          </div>
        </div>

        
    </div>
  )
}

export default Profile;