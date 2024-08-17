import React, { useEffect } from 'react'
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Trending = () => {
    const loggedInUsername = useSelector((state) => state.auth.username);
    const array = [1,2,3,4,5,6]
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile');
                const filteredData = response.data.filter((res) => res.username !== loggedInUsername);
                setUsers(filteredData);
            } catch (error) {
                
            }
        }
        fetchUsers();
    }, []);


  return (
    <div className=' ml-20' style={{width:'350px', marginTop:'5px'}}>
        <div className='trending flex text-center align-center justify-start flex-gap-20' style={{height: '45px'}}>
            <HiMiniMagnifyingGlass className='ml-15' style={{ fontSize: '20px' }} />
            <div className=''><input type='text' style={{border:'none'}} placeholder='Search'/></div>
        </div>

        <div className='trending mt-20 p-15' style={{minHeight: '100px'}}>
            <div><span className='title'>Trends for you</span></div>

            {
                array.map((item, index) => (
                    <div className='mt-30 flex flex-column' key={index}>
                        <span style={{fontSize:'15px', fontWeight:700, }}>#Trending {item}</span>
                        <span style={{fontSize:'13px', fontWeight:400, }}>15.3k</span>
                    </div>
                ))
            }

        </div>

        <div className='trending mt-20 p-15' style={{minHeight: '100px'}}>
            <div><span className='title'>Who to follow</span></div>

            {
                users.map((item, index) => (
                    <div className='mt-30 ' key={index}>
                        <div className='flex justify-between'>
                            <div className='flex flex-gap-10'>
                                <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div>
                                <div>
                                    <div><span className='user-name'>{item.user.name}</span></div>
                                    <div><span className='user-handle'>@{item.username}</span></div>
                                </div>
                            </div>
                            <div className='p-10 flex align-center justify-center' style={{ backgroundColor:'rgb(15, 20, 25)', borderRadius:'25px', width:'50px', height:'5px'}}>
                                <div className='flex align-center justify-center'>
                                    <span style={{color:'white', fontSize:'12px'}}>Follow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>

    </div>
    

  )
}


export default Trending