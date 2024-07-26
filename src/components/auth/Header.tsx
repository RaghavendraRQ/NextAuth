interface HeaderProps {
    label: string,
};

import React from 'react'

const HeaderComponent = ({label}: HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
        <h1 className='text-3xl font-semibold'>RQ Authentication</h1>
        <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}

export default HeaderComponent