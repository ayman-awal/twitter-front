import React from 'react'
import Sidebar from '../../../components/Sidebar';
import SingleTweet from '../../../components/SingleTweet';
import Trending from '../../../components/Trending';

const TweetView = () => {
  return (

      <div className='container flex'>
          <Sidebar />
          <main className='flex' style={{marginLeft: '275px'}}>
            {/* <Feed /> */}
            <SingleTweet />

            <Trending />
          </main>
      </div>

    
  )
}

export default TweetView;