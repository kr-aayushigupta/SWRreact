// components/PostList.tsx
'use client'

import useSWRInfinite from 'swr/infinite'
import { fetcher } from '../utils/fetcher'

interface Post {
  id: number
  title: string
  body: string
}

const PostList = () => {

  console.log("🚀 1");
  
  const getKey = (pageIndex: number, previousPageData: any) => {
    

    if (previousPageData && !previousPageData.length) return null

    return `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex + 1}&_limit=2`
  }

  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher)
  console.log("🚀 ~ PostList ~ size:", size)
  console.log("🚀2");
  

  const posts = data ? [].concat(...data) : []

  if (isValidating && size === 1) return <p>Loading...</p>
  if (!data) return <p>No posts found!</p>


  // ==============================================================================
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded-xl shadow-sm">
          <h2 className="font-bold text-lg mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))}

      <div className="text-center mt-6">
        <button
          onClick={() => setSize(size + 1)}
          disabled={isValidating}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {isValidating ? 'Loading more...' : 'Load More'}
        </button>
      </div>
    </div>
  )
}

export default PostList
