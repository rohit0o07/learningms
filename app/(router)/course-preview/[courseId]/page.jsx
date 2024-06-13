"use client"
import React, { useEffect, useState } from 'react'
import CourseVideoDescription from './_components/CourseVideoDescription'
import GlobalApi from '@/app/_utils/GlobalApi'
import CourseEnrollSection from './_components/CourseEnrollSection'
import CourseContentSection from './_components/CourseContentSection'
import { useUser } from '@clerk/nextjs'


function CoursePreview({params}) {
    const {user} = useUser()
    const[courseInfo,setCourseInfo] = useState()
    const [isUserAlreadyEnrolled,setIsUserAlreadyEnrolled] = useState();

    useEffect(()=>{
           params && getCourseInfoById()    
    },[params])

    useEffect(() => {
        courseInfo&&user&&checkUserEnrolledTocourse();
    },[courseInfo,user])

    const getCourseInfoById = () => {
        GlobalApi.getCourseById(params?.courseId).then(resp => {
            setCourseInfo(resp?.courseList)
            
        })
    }

    //to check user already enrolled to 
    const checkUserEnrolledTocourse = () => {
        GlobalApi.checkUserEnrolledTocourse(courseInfo.slug,user?.primaryEmailAddress.emailAddress)
        .then(resp => {
            console.log(resp)
            if(resp?.userEnrollCourses)
                { 
                
                setIsUserAlreadyEnrolled(resp?.userEnrollCourses[0]?.id)
            }
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
            <CourseEnrollSection  courseInfo={courseInfo} isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>
            <CourseContentSection  courseInfo={courseInfo}/>
        </div>
    </div>
  )
}

export default CoursePreview
