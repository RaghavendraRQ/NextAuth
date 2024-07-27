'use client'
import UserInfoComponent from "@/components/userInfo"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const AboutPage = () => {
  const user = useCurrentUser()
  return (
    <UserInfoComponent user={user} label="👤Client Component" />
  )
}

export default AboutPage