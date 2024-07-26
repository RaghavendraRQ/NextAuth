'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CardWrapperComponent from '@/components/auth/CardWrapper';
import { newVerification} from '@/actions/verification'
import FormErrorComponent from '@/components/FormError';
import FormSuccessComponent from '@/components/FormSuccess';

const page = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const searchParams = useSearchParams();
    const token = searchParams.get('token')
    const onSubmit = useCallback(() => {
        if (!token) {
            setError('Token not found')
            return;
        } 
        newVerification(token).then((data) => {
            setError(data?.error)
            setSuccess(data?.success)
        })
    }, [token])
    useEffect(() => {
        onSubmit()
    }, [onSubmit])

  return (
    <CardWrapperComponent
    headerLabel='RQ Authentication'
    backButtonLabel='Back to login'
    backButtonHref='/login'
    >
        { !error && !success && (<div>please Wait ...</div>) }
        {error && <FormErrorComponent message={error}/>}
        {success && <FormSuccessComponent message={success}/>}

    </CardWrapperComponent>
  )
}

export default page