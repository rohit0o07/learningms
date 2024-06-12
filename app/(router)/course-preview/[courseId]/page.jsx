"use client"
import React, { useEffect, useState } from 'react'
import CourseVideoDescription from './_components/CourseVideoDescription'
import GlobalApi from '@/app/-utils/GlobalApi'
import CourseEnrollSection from './_components/CourseEnrollSection'


function CoursePreview({params}) {
    const[courseInfo,setCourseInfo] = useState()
    useEffect(()=>{
           params && getCourseInfoById()    
    },[params])

    const getCourseInfoById = () => {
        GlobalApi.getCourseById(params?.courseId).then(resp => {
            setCourseInfo(resp?.courseList)
        })
    }
  return courseInfo &&(
    <div  className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
    {/*Title video ,description*/}
        <div className='col-span-2 bg-white p-3'>
            <CourseVideoDescription courseInfo={courseInfo}/>
        </div>
        {/*Course Contetn*/}
        <div>
            <CourseEnrollSection/>
        </div>
    </div>
  )
}

export default CoursePreview
