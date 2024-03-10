import CreateCardHolder from '@/components/CreateCardHolder'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return <div className='mt-36'>
        <CreateCardHolder />
    </div>
}

export default page