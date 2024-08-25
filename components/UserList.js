import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {setClickedUser} from '../redux/slices/postsSlice';
import { useRouter } from 'next/router';
import {setFollowing, setFollowers} from '../redux/slices/authSlice'

const UserList = ({name, username, bio, userId}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    let loggedInUserId = useSelector((state) => state.auth.id);
    let isFollowing = loggedInUserId == userId ? null : useSelector((state) => state.auth.following.some(item => item.user === userId));
    const token = useSelector((state) => state.auth.token);

    const followingBtnStyle = {
        text: 'Following',
        style: {
            borderRadius: '25px', 
            borderColor: 'black', 
            borderStyle: 'solid', 
            borderWidth: '1px', 
            width: '90px'
        },
        textStyle: {
            color: 'black',
            fontSize: '14px'
        }
    };

    const followBtnStyle = {
        text: 'Follow',
        style: {
            backgroundColor: 'black', 
            borderRadius: '25px', 
            borderColor: 'black', 
            borderStyle: 'solid', 
            borderWidth: '1px', 
            width: '90px'
        },
        textStyle: {
            color: '#fff',
            fontSize: '14px'
        }
    };

    const [buttonState, setButtonState] = useState(!isFollowing ? followBtnStyle : followingBtnStyle);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const redirectProfile = (e) => {
        stopPropagation(e);
        const action = setClickedUser({ userId, username });
        console.log('Dispatching action:', action);
        dispatch(action);
        router.push(`/${username}`);

    }

    const handleBtnClick = async (btnValue) => {
        console.log('clickeddd ' + btnValue);
        try {
          if(btnValue == 'Follow'){
            const response = await axios.put(`http://localhost:5000/api/profile/follow/${userId}`, {}, {
              headers: {
                'x-auth-header': token,
                'Content-Type': 'application/json',
              }
            });
    
            if(response.status == 200){
              setButtonState(followingBtnStyle);
              dispatch(setFollowing(response.data.following));
              dispatch(setFollowers(response.data.followers));
            }
          }
          else if (btnValue == 'Following'){
            console.log('Entered followng');
            const response = await axios.put(`http://localhost:5000/api/profile/unfollow/${userId}`, {}, {
              headers: {
                'x-auth-header': token,
                'Content-Type': 'application/json',
              }
            });
            console.log('b4 response following');
    
            if(response.status == 200){
              setButtonState(followBtnStyle);
              dispatch(setFollowing(response.data.following));
              dispatch(setFollowers(response.data.followers));
            }
          }
          
        } catch (error) {
          
        }
      }

  return (
    <div className='tweet-container flex flex-column p-10'>
        <div className='flex flex-gap-10'>
            <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div>
            <div style={{width: '100%'}}>
                <div className='flex justify-between'>
                    <div className='flex flex-gap-10'>
                        {/* <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div> */}
                        <div className='flex flex-column'>
                            <span className='user-name underline' onClick={redirectProfile}>{name}</span>
                            <span className='user-handle' onClick={redirectProfile}>@{username}</span>
                        </div>
                    </div>
                    <div>
                        {
                            isFollowing == null ? (
                                <></>
                            ) : (
                                <div>
                                    <div className='p-10 flex align-center justify-center' onClick={() => handleBtnClick(buttonState.text)} style={buttonState.style}>
                                        <div className='flex align-center justify-center pointer'>
                                            <span style={buttonState.textStyle}>{buttonState.text}</span>
                                        </div>
                                    </div>
                                </div>
                                
                            ) 
                            /* 
                                <div className='p-10 flex align-center justify-center' value='' style={{ backgroundColor:'rgb(15, 20, 25)', borderRadius:'25px', width:'90px', height:'35px'}}>
                                    <div className='flex align-center justify-center pointer'>
                                        <span style={{color:'white', fontSize:'14px'}}>Follow</span>
                                    </div>
                                </div>
                             */
                        }
                    </div>
                </div>
                <p>{bio}</p>
            </div>
            
        </div>

       
    </div>
  )
}

export default UserList