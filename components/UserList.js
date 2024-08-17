import React from 'react'
// import {setClickedUser} from '../redux/slices/postsSlice';

const UserList = ({name, username, bio}) => {

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
                    <div className='p-10 flex align-center justify-center' style={{ backgroundColor:'rgb(15, 20, 25)', borderRadius:'25px', width:'90px', height:'35px'}}>
                        <div className='flex align-center justify-center pointer'>
                            <span style={{color:'white', fontSize:'14px'}}>Follow</span>
                        </div>
                    </div>
                </div>
                <p>{bio}</p>
            </div>
            
        </div>

       
    </div>
  )
}

export default UserList