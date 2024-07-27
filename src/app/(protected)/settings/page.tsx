'use client'
import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/useCurrentUser';

import { Button } from '@/components/ui/button';

const SettingsPage = () => {
  const user = useCurrentUser();
  const handleSignOut = () => {
    logout()
  }
  return (
    <div className='bg-white p-10 rounded-xl'>
        <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  )
}

export default SettingsPage