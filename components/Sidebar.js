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
import {useRouter} from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {setClickedUser} from '../redux/slices/postsSlice';


const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.id);

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

  const handleClickedIcon = (title) => {
    if (title === 'Bookmarks'){
      router.push('i/bookmarks');
    } else if(title === 'Home'){
      router.push('/home');
    }
    else if(title === 'Profile'){
      dispatch(setClickedUser({username, userId}));
      router.push('/' + username);
    }
  }

  return (

      <div style={{width: '275px', position: 'fixed'}}>

          <div className='pt-10 ml-15'>
            <Link href="/">
              <BsTwitterX style={{ fontSize: '30px' }}/>
            </Link>


            {
              sidebarIcons.map((item, index) => (
                <div onClick={() => handleClickedIcon(item.title)}  className='flex align-center pointer side-menu-div pt-20' key={index}>
                  <div className='flex align-center justify-center flex-gap-20 side-menu'>
                    <div style={{ fontSize: '28px' }}>{item.icon}</div>
                    <div>{item.title}</div>
                  </div>
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