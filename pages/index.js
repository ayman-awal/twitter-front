// import React from 'react';
// // import Image from 'next/image';
// import { useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { SET_NAME } from '../redux/reducers/profileTest';

// function DisplayName(){
//   const {name} = useSelector((state) => state.profile);

//   return (
//     <p>Hello {name}</p>
//   )
// }

// const Home = () => {
//   const name = useRef();
//   const dispatch = useDispatch();

//   function userName(){
//     console.log(name.current.value);
//     dispatch(SET_NAME(name.current.value));
//   }
//   return (
//     // <div className='flex justify-center align-center' style={{height: '100vh'}}>
//     //   <div style={{width: '1000px', textAlign: 'center'}}>
//     //     <Image
//     //             src="/../public/landing/XLogo.jpeg"
//     //             width={270}
//     //             height={300}
//     //             // alt="Picture of the author"
//     //         />
//     //   </div>
//     //   <div style={{height: '100%', backgroundColor: 'red'}}>
//     //     <div style={{width: '800px', backgroundColor: 'yellow', padding: '20px'}}>
//     //       <div style={{lineHeight: '84px', margin: '48px 0'}}>
//     //         <span style={{color: 'rgb(15, 20, 25)', fontSize: '64px', fontFamily: 'Verdana, TwitterChirpExtendedHeavy', fontWeight: '700'}}>Happening now</span>
//     //       </div>
//     //       <div style={{lineHeight: '36px'}}>
//     //         <span style={{color: 'rgb(15, 20, 25)', fontSize: '31px', fontFamily: 'Verdana, TwitterChirpExtendedHeavy', fontWeight: '700', marginBottom: '32px'}}>Join today.</span>
//     //       </div>
//     //     </div>
//     //   </div>
      
      
//     // </div>

//     <div>
//       <p>Whats your name: </p>
//       <input ref={name}/>
//       <button onClick={userName}>Submit</button>
//       <DisplayName />
//     </div>
    
//   )
// }

// export default Home
