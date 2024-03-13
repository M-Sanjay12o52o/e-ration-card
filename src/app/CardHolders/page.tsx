import CardHolderView from '@/components/CardHoldersView'
import { FC } from 'react'

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    return <div className='mt-28'>
        <CardHolderView />
    </div>
}

export default Page