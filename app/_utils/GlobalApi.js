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



export default {
  getAllCourseList,getSideBanner,getCourseById
};