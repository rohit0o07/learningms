import { Lock } from 'lucide-react'
import React from 'react'

function CourseContentSection({courseInfo}) {
  return (
    <div className='p-3 bg-white rounded-sm'>
      <h2>Contents</h2>
      {
        courseInfo.chapter.map((item,index) => (
        <div>
            <h2 className='p-2 text-[14px] flex justify-between m-2 hover:bg-gray-200 items-center border rounded-sm px-4 cursor-pointer'>
            {index}.{item.name}
            <Lock className='h-4 w-4'/></h2>
        </div>
      ))}
    </div>
  )
}

export default CourseContentSection
