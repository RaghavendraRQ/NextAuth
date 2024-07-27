import React from 'react'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-y-10'>
        {children}
    </div>
  )
}

export default ProtectedLayout