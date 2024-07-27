import { auth } from '@/auth'
import UserInfoComponent from '@/components/userInfo';
import React from 'react'

const ServerPage = async () => {
    const session = await auth();
  return (
    <div>
      <UserInfoComponent user={session?.user} label='Server Component'/>
    </div>
  )
}

export default ServerPage