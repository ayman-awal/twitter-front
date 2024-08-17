import { useState, React, useEffect } from 'react'
import {useRouter} from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IoArrowBack } from "react-icons/io5";
import UserList from './UserList';


const ProfileTab = ({username, tab}) => {
    const router = useRouter();
    const token = useSelector((state) => state.auth.token);
    const [tabState, setTabState] = useState(tab);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    // console.log("TBBB");
    // console.log(tab);
    // console.log(username);

    useEffect(() => {
      const fetchData = async () => {
      
        console.log(tabState);
        router.push(`/${username}/${tabState}`);
        // console.log("AFTER ROUTEr");

        try {
          if(tabState === 'followers'){
            let followersId = await axios.get(`http://localhost:5000/api/profile/followers/${username}`, {
              headers: {
                'x-auth-header': token,
              },
            });

            console.log("FOLLOWERS");
            followersId = followersId.data;

            let fetchFollowers = await Promise.all(followersId?.map((follower) => {
              return axios.get(`http://localhost:5000/api/profile/user/${follower.user}`);
            }));
            fetchFollowers = fetchFollowers.map((user) => user.data);
            setFollowers(fetchFollowers);
            console.log(fetchFollowers);
          }
          else{
            let followingId = await axios.get(`http://localhost:5000/api/profile/following/${username}`, {
              headers: {
                'x-auth-header': token,
              },
            });
            console.log("FOLLOWing");

            followingId = followingId.data;
            console.log(followingId);
            
            let fetchFollowing = await Promise.all(followingId?.map((following) => {
              return axios.get(`http://localhost:5000/api/profile/user/${following.user}`);
            }));

            fetchFollowing = fetchFollowing.map((user) => user.data);
            setFollowing(fetchFollowing);
            console.log(fetchFollowing);
          }
          
        } catch (error) {
          
        }
      }

      fetchData();

    }, [tabState]);

    const changeTab = (tabState) => {
      console.log('entered');
      setTabState(tabState);
    }

    const home = () => {
        router.push('/home');
      }

  return (
    <div className='mr-10 ml-10' style={{width: '600px', borderLeft: '0.5px #E1E8ED solid', borderRight: '0.5px #E1E8ED solid'}}>
      <div className='ml-10 options_container flex text-center align-center justify-start'>
        <div className='options_container flex text-center align-center justify-center flex-gap-25'>
            <span onClick={home} className='pointer'><IoArrowBack size={20}/></span>
            <span style={{fontSize: '18px'}}>{username}</span>
        </div>
      </div>
      <div className='options_container flex text-center align-center justify-center' style={{borderBottom: '0.5px #E1E8ED solid'}}>
        <div className='feed_options pointer' onClick={() => changeTab('following')}><span>Following</span></div>
        <div className='feed_options pointer' onClick={() => changeTab('followers')}><span>Followers</span></div>
      </div>
      <div>
        {
          tabState === 'followers' ? (
            followers.length >= 1 ? (
              followers.map((follower) => (
                <UserList
                  key={follower.username}
                  username={follower.username}
                  name={follower.name}
                  bio={follower.bio}
                />
              ))
            ) : (
              <div>No followers found</div> 
            )
          ) : (
            following.length >= 1 ? (
              following.map((following) => (
                <UserList
                  key={following.username}
                  username={following.username}
                  name={following.name}
                  bio={following.bio}
                />
              ))
            ) : (
              <div>No following found</div> 
            ) 
          )
        }
      </div>
    </div>
  )
}

export default ProfileTab