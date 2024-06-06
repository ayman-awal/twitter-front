import React from 'react'
import Sidebar from '../components/Sidebar';
import Trending from '../components/Trending';
import Profile from '../components/Profile';

const ProfilePage = () => {


  return (
    <div className='container flex'>
        <Sidebar />
        <main className='flex' style={{marginLeft: '275px'}}>
            <Profile />
            <Trending />
        </main>
    </div>
  )
}


export default ProfilePage;