'use client'
import RoleGateComponent from '@/components/auth/roleGate'
import FormSuccessComponent from '@/components/FormSuccess'
import { UserRole } from '@prisma/client'
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast} from 'sonner'
import { Admin } from '@/actions/admin'

function AdminPage() {
    const onApiRouteClick = () => {
        fetch('/api/admin').then((res) => {
            if (res.ok) {
                toast.success('API Route is working')
            } else {
                toast.error('API Route is not working')
            }
        })
    }
    const onServerActionClick = () => {
        Admin().then((res) => {
            if (res.ok) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        })
    }
  return (
    <Card className="w-[600px]">
        <CardHeader>
            <p className="text-2xl font-semibold text-center ">Admin Page</p>
        </CardHeader>
        <CardContent className=" space-y-4">
            <RoleGateComponent allowedRoles={UserRole.Admin}>
                <FormSuccessComponent message='You are authorized to see this content'/>
            </RoleGateComponent>
            <div className='flex items-center justify-between rounded-lg border p-3 shadow-md'>
                <p className='text-sm font-medium'>Admin Only API Route</p>
                <Button onClick={onApiRouteClick}>Click to test</Button>
            </div>
            <div className='flex items-center justify-between rounded-lg border p-3 shadow-md'>
                <p className='text-sm font-medium'>Admin Only Server Action</p>
                <Button onClick={onServerActionClick}>Click to test</Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default AdminPage