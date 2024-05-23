import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Tweet from './Tweet';

const Feed = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);
  const { token } = useSelector((state) => state.auth);


  // const array = [1,2,3,4,5,6,7,8,9,10]

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            'x-auth-header': token,
          },
        });
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [token]);

  const inputChange = (event) => {
    setInputValue(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  return (
    <div className='mr-10 ml-10' style={{width: '600px', borderLeft: '0.5px #E1E8ED solid', borderRight: '0.5px #E1E8ED solid'}}>

      <div className='options_container flex text-center align-center justify-center' style={{borderBottom: '0.5px #E1E8ED solid'}}>
        <div className='feed_options'><span>For you</span></div>
        <div className='feed_options'><span>Following</span></div>
      </div>

      <div className='p-20 flex flex-gap-10' style={{minHeight:'100px', borderBottom: '0.5px #E1E8ED solid'}}>
        <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div>
        <div style={{width: '100%'}}>
          <textarea 
            className='tweet-input' 
            type='text' 
            placeholder='What is happening?!' 
            rows="1" 
            value={inputValue}
            onChange={inputChange} />

          <div className='flex justify-end'>

              <div></div> {/* Icons */}

              <div className='p-15 mt-15 flex align-center justify-center' style={{ backgroundColor:'#1D9BF0', borderRadius:'25px', width:'40px', height:'10px'}}>
                <div className='flex align-center justify-center' style={{width: '50%'}}>
                  <span style={{color:'white'}}>Post</span>
                </div>
              </div>

          </div>
        </div>

      </div>
      
      {
        posts.map((post, index) => (
          <div key={index}>
            <Tweet 
              userName={post.name}
              // userHandle={/* assuming you have a field for user handle */}
              // timestamp={post.date}
              content={post.text}
            />
          </div>
        ))
      }


    </div>
  )
}

export default Feed;
