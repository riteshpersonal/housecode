import { fetchUser } from '@/app/api/getApi/getUser/user'
import Profile from '@/components/Admin/components/Profile/Profile'
import React from 'react'

const page = async () => {
  const { user , error} = await fetchUser();
  return (
    <Profile user={user.admins} />
  )
}

export default page