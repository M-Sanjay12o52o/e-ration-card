import React from 'react'
import HelplineTable from '../../components/Helpline';

type Props = {}

const Helpline = (props: Props) => {
    return (
        <div className='bg-slate-300 mt-48 pt-4 w-screen h-screen overflow-auto'>
            <HelplineTable />
        </div>
    )
}

export default Helpline