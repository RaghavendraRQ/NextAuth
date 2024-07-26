import React from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorComponentProps {
    message?: string,
}

const FormErrorComponent = ({message}: FormErrorComponentProps) => {
    if (!message) return null;

  return (
    <div className='bg-destructive/15 p-3 flex items-center rounded-sm gap-x-2 text-sm text-destructive'>
        <ExclamationTriangleIcon className='h-4 w-4'/>
        <p>{message}</p>
    </div>
  )
}

export default FormErrorComponent