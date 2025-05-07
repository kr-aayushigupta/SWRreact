'use client'

import useSWR from 'swr'

export default function UserInfo() {
  const { data, error, isLoading } = useSWR('/api/user')

  if (isLoading) return <p>Loading user...</p>
  if (error) return <p>Error loading user</p>

  return (
    <div>
      <h2 className="text-xl font-semibold">👤 {data.name}</h2>
    </div>
  )
}
