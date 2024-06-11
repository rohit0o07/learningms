import { request, gql } from 'graphql-request';

const MASTER_URL = `https://api-ap-south-1.hygraph.com/v2/${process.env.NEXT_PUBLIC_HYGRAPH_API_KEY}/master`;

const getAllCourseList = async () => {
  const query = gql`
    query MyQuery {
      couseLists(first: 10, orderBy: createdAt_DESC) {
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

export default {
  getAllCourseList
};
