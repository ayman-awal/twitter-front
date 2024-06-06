import React, { useEffect } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { FaRegCalendarAlt } from "react-icons/fa";
import {useState} from 'react';
import axios from 'axios';
import Tweet from './Tweet';
import {useRouter} from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('Posts');
  const [tweets, setTweets] = useState([]);
  const name = useSelector((state) => state.auth.name);
  const username = useSelector((state) => state.auth.username);
  const token = useSelector((state) => state.auth.token);

  const options = [
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
  ]

  useEffect(() => {
    const getProfile = async () =>{
      try {
        const response = await axios.get('http://localhost:5000/api/profile/me', {
            headers: {
              'x-auth-header': token,
            },
          });
        // const posts = response.data.posts;
        const ids = response.data.posts.map(post => post._id);
        const tweets = ids.map((id) => axios.get(`http://localhost:5000/api/posts/${id}`,{
          headers: {
            'x-auth-header': token
          }
        }));

        const tweet = await Promise.all(tweets);
        const data = tweet.map((response) => response.data);
        console.log("TWEETS: " + data);
        setTweets(data);

        console.log("POSTS: PROFILE " + JSON.stringify(ids));
      } catch (error) {
        
      }
    }
    getProfile();
  }, []);
  
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
  
  return (
    <div className='mr-10 ml-10' style={{width: '600px', borderLeft: '0.5px #E1E8ED solid', borderRight: '0.5px #E1E8ED solid'}}>
      <div className='ml-10 options_container flex text-center align-center justify-start'>
        <div className='options_container flex text-center align-center justify-center flex-gap-25'>
            <span onClick={home} className='pointer'><IoArrowBack size={20}/></span>
            <span style={{fontSize: '18px'}}>{name}</span>
        </div>
      </div>

      <div style={{borderBottom: '0.5px #E1E8ED solid'}}>
        <div style={{backgroundColor: 'grey', height:'180px'}}></div>

        <div className='rounded-50 flex-shrink pro-pic' style={{width: '150px', height: '150px', backgroundColor:'black'}}></div>
        
        <div style={{height:'80px'}}>
          <div className='flex justify-end pt-10 mr-20'>
              <div className='text-center' style={{width: '50%', borderRadius:'25px', borderColor:'black', borderStyle: 'solid', borderWidth: '1px', width:'100px', cursor: 'pointer'}}>
                  <span>Edit Profile</span>
              </div>
          </div>
        </div>

        <div className='ml-20'>

          <div className='flex flex-column'>
            <span style={{fontSize: '18px'}}>{name}</span>
            <span style={{fontSize: '18px'}}>@{username}</span>
          </div>

          <div className='mt-15 flex flex-row flex-gap-10'>
            <span><FaRegCalendarAlt /></span>
            <span>Joined November 2012</span>
          </div>

          <div className='mt-15 flex flex-row flex-gap-10'>
            <span>88 Following</span>
            <span>55 Following</span>
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
                  
                  : selectedOption === 'Replies' ? 
                  <div>
                    Your Replies
                  </div> : selectedOption === 'Media' ? 
                  <div>
                    Here is your Media
                  </div> : selectedOption === 'Likes' ? 
                  <div>
                    Here are your Likes
                  </div> : null
              )
            }
          </div>
        </div>

        
    </div>
  )
}

export default Profile;