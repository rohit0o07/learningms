import React from 'react'
import VideoPlayer from './VideoPlayer'
import Markdown from 'react-markdown'

function CourseVideoDescription({courseInfo}) {
  return (
    <div className='text-[20px] font-semibold'>
    <h2 className='text-gray-500 text-[14px] mb-3'>{courseInfo.name}</h2>
    <h2>{courseInfo.author}</h2>
    {/*video Player*/}
        <VideoPlayer videoUrl={courseInfo?.chapter[0]?.video?.url}/>
    
    {/*description*/}
    <h2 className='mt-5 text-[17px] font-semibold'>About this Course Description</h2>
    <div>
        <Markdown className='text-[13px] font-light mt-2 leading-7'>
            {courseInfo.description}
        </Markdown>
    </div>
    
    </div>
  )
}

export default CourseVideoDescription
