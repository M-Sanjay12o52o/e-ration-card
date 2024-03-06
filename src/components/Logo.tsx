import Image from 'next/image'
import { FC } from 'react'

interface LogoProps {
    height?: number;
    width?: number;
}

const Logo: FC<LogoProps> = () => {
    return <>
        <div className='flex mt-4 ml-4'>
            <div>
                <Image
                    src={"/Seal_of_Karnataka.png"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '75px', height: 'auto' }}
                    alt="seal of karnataka"
                />
            </div>
            <div>
                <h1 className='text-blue-950 font-semibold'>GOVERNMENT OF KARNATAKA</h1>
                <p>Official Website</p>
            </div>
        </div>
    </>
}

export default Logo