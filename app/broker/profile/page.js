import { fetchBrokerUser } from '@/app/api/getApi/getUser/user';
import Profile from '@/components/Admin/components/Profile/Profile'
import React from 'react'

const page = async () => {
  const { user , error} = await fetchBrokerUser();

  return (
    <Profile user={user} />
  )
}

export default page