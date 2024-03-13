import { FC, ReactNode } from 'react'

interface layoutProps {
    children: ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
    return <div className='bg-slate-400 w-screen h-screen mt-40'>{children}</div>
}

export default layout