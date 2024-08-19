import React from 'react'
import { useSelector } from 'react-redux';
// import authSlice from '../redux/slices/authSlice';

const UserList = ({name, username, bio, userId}) => {
    let loggedInUserId = useSelector((state) => state.auth.id);
    let isFollowing = loggedInUserId == userId ? null : useSelector((state) => state.auth.following.some(item => item.user === userId));
    console.log([username, isFollowing]);
    console.log(loggedInUserId == userId);
    console.log("loggedInUserId: " + loggedInUserId);
    console.log("userId: " + userId);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const redirectProfile = (e) => {
        stopPropagation(e);
    //   console.log(username);
    //   dispatch(setClickedUser(username));
    //   console.log("dispatched username");

    //   router.push(`/${username}`);

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
                            ) : isFollowing ? (
                                <div className='unfollow-hover'>
                                    <div className='p-10 flex align-center justify-center following-btn' style={{ border: '1px solid black', borderRadius:'25px', width:'90px', height:'35px'}}>
                                        <div className='flex align-center justify-center pointer'>
                                            <span style={{color:'black', fontSize:'14px'}} className='following-text'>Following</span>
                                        </div>
                                    </div>
                                    <div className='p-10 flex align-center justify-center unfollow-btn' style={{display: 'none', backgroundColor:'rgba(224, 36, 94, 0.1)', border: '1px solid #E0245E', borderRadius:'25px', width:'90px', height:'35px'}}>
                                        <div className='flex align-center justify-center pointer'>
                                            <span style={{color:'#E0245E', fontSize:'14px' }} className="unfollow-text">Unfollow</span>
                                        </div>
                                    </div>
                                </div>
                                
                            ) : (
                                <div className='p-10 flex align-center justify-center' value='' style={{ backgroundColor:'rgb(15, 20, 25)', borderRadius:'25px', width:'90px', height:'35px'}}>
                                    <div className='flex align-center justify-center pointer'>
                                        <span style={{color:'white', fontSize:'14px'}}>Follow</span>
                                    </div>
                                </div>
                            )
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