import { request, gql } from 'graphql-request';

const MASTER_URL = `https://api-ap-south-1.hygraph.com/v2/${process.env.NEXT_PUBLIC_HYGRAPH_API_KEY}/master`;

const getAllCourseList = async () => {
  const query = gql`
   query MyQuery {
  courseLists(first: 10, orderBy: createdAt_DESC) {
    author
    name
    id
    free
    description
    demoUrl
    banner {
      url
    }
    chapter {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
    totalChapters
    sourceCode
    tags
    slug
  }
}

  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error('Error fetching course list:', error);
    throw error;
  }
};

const getSideBanner=async() => {
  const query = gql`query GetSideBanner {
  sideBanners {
    id
    name
    banner {
      id
      url
    }
  }
}
`
try {
  const result = await request(MASTER_URL, query);
  return result;
} catch (error) {
  console.error('Error fetching course list:', error);
  throw error;
}
}

const getCourseById= async(courseId)=> {
  const query = gql`
  query MyQuery {
  courseList(where: {slug: "python-course"}) {
    author
    banner {
      url
    }
    chapter {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
    demoUrl
    description
    free
    id
    name
  }
}
`
try {
  const result = await request(MASTER_URL, query);
  return result;
} catch (error) {
  console.error('Error fetching course list:', error);
  throw error;
}
}

const enrollToCourse = async (courseId, email) => {
  if (!courseId || !email) {
    throw new Error('Course ID and email are required');
  }

  const query = gql`
    mutation MyMutation {
      createUserEnrollCourse(
        data: {
          courseId: "${courseId}",
          userEmail: "${email}",
          courseList: { connect: { slug: "${courseId}" } }
        }
      ) {
        id
      }
      publishManyUserEnrollCoursesConnection {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const checkUserEnrolledTocourse = async(courseId,email) => {
  const query=gql`
  query MyQuery {
  userEnrollCourses(where: {courseId: "${courseId}", userEmail:  "${email}"}) {
    id
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}

export default {
  getAllCourseList,getSideBanner,getCourseById,enrollToCourse,checkUserEnrolledTocourse
};
