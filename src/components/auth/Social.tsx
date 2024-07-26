'use client'

import React from 'react'
import { Button } from '../ui/button'
import { GitHubLogoIcon} from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'
import { DEFAULT_AUTH_ROUTE } from '@/routes'

const SocialComponent = () => {
  const handleSubmit = async (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_AUTH_ROUTE
    })
  }
  return (
    <div className='flex items-center w-full gap-x-2'>
        <Button size='lg' variant='outline' className='w-full' onClick={() => handleSubmit('google')}>
            Google
        </Button>
        <Button size='lg' variant='outline' className='w-full' onClick={() => handleSubmit('github')}>
            <GitHubLogoIcon/>
        </Button>
    </div>
  )
}

export default SocialComponent