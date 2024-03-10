import CardHolderView from '@/components/CardHoldersView'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return <div className='mt-28'>
        <CardHolderView />
    </div>
}

export default page