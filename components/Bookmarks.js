import React, { useEffect, useState } from 'react'
import Tweet from './Tweet';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setBookmarks } from '../redux/slices/authSlice';
// import { IoArrowBack } from "react-icons/io5";


const Bookmarks = () => {
    const [tweets, setTweets] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.auth.username);
    const bookmarks = useSelector((state) => state.auth.bookmarks);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBookmarksAndTweets = async () => {
            try {
                let response = await axios.get('http://localhost:5000/api/profile/bookmarks/me',{
                    headers:{
                        'x-auth-header': token
                    },
                });

                const bookmarks = response.data;
                
                const tweetResponse = bookmarks.map((bookmark) => axios.get(`http://localhost:5000/api/posts/${bookmark}`, {
                    headers: {
                      'x-auth-header': token
                    }
                  }));

                const tweetResponses = await Promise.all(tweetResponse);
                const tweetsData = tweetResponses.map((response) => response.data);
                setTweets(tweetsData);
                dispatch(setBookmarks(tweetsData));
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookmarksAndTweets();
    }, []);


  return (
    <div className='mr-10 ml-10' style={{width: '600px', borderLeft: '0.5px #E1E8ED solid', borderRight: '0.5px #E1E8ED solid'}}>
      <div className='ml-10 options_container'>
        <div className='options_container flex flex-column' /*text-center align-center justify-center*/>
            {/* <IoArrowBack /> */}
            <span style={{fontSize: '25px'}}>Bookmarks</span>
            <span style={{fontSize: '15px'}}>@{username}</span>
        </div>
      </div>

      {
        (tweets.length >= 1 ?  (
          tweets.map((tweet, index) => (
            <div key={index} className='mt-10'>
              <Tweet 
                userId={tweet.user}
                name={tweet.name}
                username={tweet.username}
                // timestamp={post.date}
                content={tweet.text}
                id={tweet.id}
                // bookmarkTag={bookmarks.some(item => item.post === tweet.id)}
              />
            </div> 
          ))
        )
        :
        <div className='text-center mt-30'>
            <span style={{fontSize: '35px', fontWeight: 'bold'}}>Save posts for later</span>
        </div>
        )
      }

    </div>
  )
}

export default Bookmarks;
