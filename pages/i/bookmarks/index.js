import React from 'react'
import Sidebar from '../../../components/Sidebar'
import Bookmarks from '../../../components/Bookmarks'
import Trending from '../../../components/Trending'

const BookmarksHome = () => {
  return (
    <div className='container flex'>
          <Sidebar />
          <main className='flex' style={{marginLeft: '275px'}}>
            {/* <Feed /> */}
            <Bookmarks />
            <Trending />
          </main>
      </div>
  )
}

export default BookmarksHome;