// components/PostList.tsx
'use client'

import useSWRInfinite from 'swr/infinite'
import { fetcher } from '../utils/fetcher'

interface Post {
  id: number
  title: string
  body: string
}

const Polling = () => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    console.log("🚀 ~ getKey ~ previousPageData:", previousPageData)
    console.log("🚀 ~ getKey ~ pageIndex:", pageIndex)

    if (previousPageData && !previousPageData.length) return null

    return `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex + 1}&_limit=10`
  }

  const { data, size, isValidating } = useSWRInfinite(getKey, fetcher, {refreshInterval : 10000,revalidateOnFocus: true,})

  const posts = data ? [].concat(...data) : []

  if (isValidating && size === 1) return <p>Loading...</p>
  if (!data) return <p>No posts found!</p>

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded-xl shadow-sm">
          <h2 className="font-bold text-lg mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default Polling
