import React from 'react'
import { CheckCircledIcon } from '@radix-ui/react-icons';

interface FormSuccessComponentProps {
    message?: string,
}

const FormSuccessComponent = ({message}: FormSuccessComponentProps) => {
    if (!message) return null;

  return (
    <div className='bg-emerald-500/15 p-3 flex items-center rounded-sm gap-x-2 text-sm text-emerald-500'>
        <CheckCircledIcon className='h-4 w-4'/>
        <p>{message}</p>
    </div>
  )
}

export default FormSuccessComponent