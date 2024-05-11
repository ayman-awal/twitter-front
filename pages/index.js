import React from 'react';
import Image from 'next/image';
// import Options from '../components/landing/Options';
// import Logo from '../components/landing/Logo';

const Home = () => {
  return (
    <div className='flex justify-center align-center' style={{height: '100vh', align: 'center'}}>
      <div className='flex justify-between' style={{width: '55%'}}>
      <div>
          <div style={{padding: '45px'}}>
            <Image
                src="/Users/ayman.awal/iCloud Drive (Archive)/Desktop/twitter-front/public/landing/XLogo.png"
                width={270}
                height={300}
                // alt="Picture of the author"
            />
          </div>
      </div>
          


        <div>
            <div>
                <span style={{fontSize: '64px'}}>Happening now</span>
            </div>
            <div className='mt-30'>
                <span style={{fontSize: '31px'}}>Join today.</span>
            </div>

        </div>

      </div>
    </div>
    
  )
}

export default Home
