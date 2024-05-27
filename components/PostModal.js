// components/PostModal.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const PostModal = ({ show, handleClose, addNewPost }) => {
  const [inputValue, setInputValue] = useState('');
  

    const inputChange = (event) => {
        setInputValue(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
      };

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial'}}
    >
      <Modal show={show} onHide={handleClose}>
        {/* <Button> */}
          <FaTimes />
        {/* </Button> */}
        <Modal.Body style={{height: '250px', borderRadius: '16px' }}>
            <div className='flex justify-end flex-column'>
                <div>
                    <div className='flex align-center justify-center flex-gap-10'>
                        <div className='rounded-50 flex-shrink' style={{width: '40px', height: '40px', backgroundColor:'black'}}></div>
                        <div style={{width: '100%'}}>
                            <textarea 
                                className='tweet-input'
                                type='text' 
                                placeholder='What is happening?!' 
                                rows="1" 
                                value={inputValue}
                                onChange={inputChange} />
                        </div>
                        
                    </div>
                </div>
                <div style={{backgroundColor:'#1D9BF0', borderRadius:'25px', width:'100px'}}>
                    <div style={{width: '50%'}} className='m-auto text-center'>
                        <span style={{color:'white'}}>Post</span>
                    </div>
                </div>

            </div>
            
            
            
            
        </Modal.Body>
        {/* <Button >
            Post
          </Button> */}
      </Modal>
    </div>
  );
};

export default PostModal;
