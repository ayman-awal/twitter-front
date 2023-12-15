import React from 'react'
import Sidebar from '../../components/Sidebar';
import Feed from '../../components/Feed';
import Trending from '../../components/Trending';

const Home = () => {
  return (

      <div className='container flex'>
          <Sidebar />
          <main className='flex' style={{marginLeft: '275px'}}>
            <Feed />
            <Trending />
          </main>
      </div>

    
  )
}

export default Home;