import React from 'react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMailOutline, IoPeopleOutline, IoPersonSharp} from "react-icons/io5";
import { CiViewList, CiCircleMore } from "react-icons/ci";
import { PiBookmarkSimple, PiHouseLight } from "react-icons/pi";
import { BsTwitterX } from "react-icons/bs";
import Link from 'next/link';
import PostModal from './PostModal';
import { useState } from 'react';


const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const sidebarIcons = [
    {
      title: 'Home',
      icon: <PiHouseLight />
    },
    {
      title: 'Explore',
      icon: <HiMiniMagnifyingGlass />
    },
    {
      title: 'Notifications',
      icon: <IoIosNotificationsOutline />
    },
    {
      title: 'Messages',
      icon: <PiHouseLight />
    },
    {
      title: 'Lists',
      icon: <CiViewList />
    },
    {
      title: 'Bookmarks',
      icon: <PiBookmarkSimple />
    },
    // {
    //   title: 'Communities',
    //   icon: <IoPeopleOutline />
    // },
    // {
    //   title: 'Premium',
    //   icon: <BsTwitterX />
    // },
    {
      title: 'Profile',
      icon: <IoPersonSharp />
    },
    // {
    //   title: 'More',
    //   icon: <CiCircleMore />
    // },
  ]

  return (

      <div style={{width: '275px', position: 'fixed'}}>

          <div className='pt-10'>
            <Link href="/">
              <BsTwitterX style={{ fontSize: '30px' }}/>
            </Link>


            {
              sidebarIcons.map((item, index) => (
                <div className='flex flex-gap-20 pt-20' key={index}>
                  <div style={{ fontSize: '28px' }}>{item.icon}</div>
                  <div>{item.title}</div>
                </div>
              ))
            }
            
          </div>

          <div className='p-15 mt-15' style={{backgroundColor:'#1D9BF0', borderRadius:'25px', width:'200px'}} onClick={handleOpenModal}>
            <div style={{width: '50%'}} className='m-auto text-center'>
              <span style={{color:'white'}}>Post</span>
            </div>
          </div>
          <PostModal show={showModal} handleClose={handleCloseModal} />


          <div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
      </div>
    
  )
}

export default Sidebar;