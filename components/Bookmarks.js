import React, { useEffect } from 'react'
import Tweet from './Tweet';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const token = useSelector((state) => state.auth.token);
    // const id = useSelector((state) => state.auth.id);


    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile/bookmarks/me',{
                    headers:{
                        'x-auth-header': token
                    },
                });
                setBookmarks(response.data);
                console.log(bookmarks);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookmarks();
    }, []);

  return (
    <div className='mr-10 ml-10' style={{width: '600px', borderLeft: '0.5px #E1E8ED solid', borderRight: '0.5px #E1E8ED solid'}}>
      <div className='ml-10 options_container'>
        <div className='options_container flex flex-column' /*text-center align-center justify-center*/>
            {/* <IoArrowBack size={20}/> */}
            <span style={{fontSize: '25px'}}>Bookmarks</span>
            <span style={{fontSize: '15px'}}>@aymtheman</span>
        </div>
      </div>

      {
        (bookmarks.length >= 1 ?  
        <div className='mt-10'>
            <Tweet />
        </div> :
        <div className='text-center mt-30'>
            <span style={{fontSize: '35px', fontWeight: 'bold'}}>Save posts for later</span>
        </div>
        )
      }



    </div>
  )
}

export default Bookmarks;
