import { FC } from 'react'
import Logo from "@/components/Logo";
import { Contact, Contact2, GraduationCap, HomeIcon, Monitor, Phone, School2Icon, UserRound } from "lucide-react";
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface Nav2Props {

}

const Nav2: FC<Nav2Props> = ({ }) => {
    return <div className='sticky pb-4 h-28'>
        <div className="text-black">
            <Logo />
        </div>
        <div className="flex flex-row ml-[650px]">
            <div className="flex flex-col items-center px-2">
                <Link href={'/'} className="flex items-center"><HomeIcon /></Link>
                <p>Home</p>
            </div>
            <div className="flex flex-col items-center px-2">
                <button className="flex items-center"><UserRound /></button>
                <p>about us</p>
            </div>
            <div className="flex flex-col items-center px-2">
                <Link href={'/CardHolders'} className="flex items-center"><School2Icon /></Link>
                <p>view</p>
            </div>
            <div className="flex flex-col items-center px-2">
                <button className="flex items-center"><GraduationCap /></button>
                <p>education</p>
            </div>
            <div className="flex flex-col items-center px-2">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center"><Monitor /></DropdownMenuTrigger>
                    <p>e-services</p>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>e-services</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex flex-col items-center px-2">
                <Link href={"./ePeople"} className="flex items-center"><Contact /></Link>
                <p>e-people</p>
            </div>
            <div className="flex flex-col items-center px-2">
                <button className="flex items-center"><Contact2 /></button>
                <p>Contact</p>
            </div>
            <div className="flex flex-col items-center px-2">
                <button className="flex items-center"><Phone /></button>
                <p>Helpline</p>
            </div>
        </div>
    </div>
}

export default Nav2