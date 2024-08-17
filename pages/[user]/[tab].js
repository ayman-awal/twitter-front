import React from 'react'
import { useRouter } from 'next/router';
import Sidebar from '../../components/Sidebar';
import ProfileTab from '../../components/ProfileTab';
import Trending from '../../components/Trending';

const Tab = () => {
    const router = useRouter();
    const { user, tab } = router.query;
    console.log(user);
    
  return (

      <div className='container flex'>
          <Sidebar />
          <main className='flex' style={{marginLeft: '275px'}}>
            <ProfileTab
                username = {user}
                tab = {tab}
            />

            <Trending />
          </main>
      </div>

    
  )
}

export default Tab;