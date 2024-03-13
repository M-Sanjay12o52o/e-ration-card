import CreateCardHolder from '@/components/CreateCardHolder'
import { FC } from 'react'

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    return <div className='mt-36'>
        <CreateCardHolder />
    </div>
}

export default Page