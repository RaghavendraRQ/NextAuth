import React from 'react'
import CardWrapperComponent from '@/components/auth/CardWrapper'
import {ExclamationTriangleIcon} from '@radix-ui/react-icons'

const AuthErrorPage = () => {
  return (
    <CardWrapperComponent
    headerLabel='RQ Authentication'
    backButtonLabel='Go back to Login'
    backButtonHref='/login'
    >
        <div className='text-destructive flex items-center justify-center w-full'>
        <ExclamationTriangleIcon />
        </div>
    </CardWrapperComponent>
  )
}

export default AuthErrorPage