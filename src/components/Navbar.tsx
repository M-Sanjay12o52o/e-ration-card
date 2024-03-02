"use client"

import { MonitorUp, Moon, Search, Sun, UserRound } from 'lucide-react';
import { FC, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import { useRouter } from 'next/navigation';

interface NavbarProps { }

const Navbar: FC<NavbarProps> = ({ }) => {
    const [lang, setLang] = useState<"kannada" | "english">("kannada");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<string[]>([])
    const router = useRouter();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleSearch = () => {

    }

    return (
        <div className="bg-sky-800 text-white py-4 px-6 flex justify-between items-center h-14 sticky">
            <div className="flex items-center">
                <Link href={'/admin'} className="flex items-center justify-center mr-4 rounded-lg bg-white text-black w-24">
                    <UserRound className="mr-2" /> Sign In
                </Link>
                <button className='bg-blue-400 rounded-lg px-2' onClick={() => setLang(lang === "kannada" ? "english" : "kannada")}>
                    {lang}
                </button>
                <button className="ml-4 rounded-md bg-blue-400 px-2">Click here to visit CM Portal</button>
            </div>
            <div className="flex items-center">
                <Link href={'/login'} className="mr-4 bg-blue-400 px-2 rounded-lg">User Login</Link>
                <Link href={"/register"} className="mr-4 bg-blue-400 px-2 rounded-lg">User Registration</Link>
                <div className="flex items-center mr-4 bg-white rounded-lg p-1 w-15">
                    <button className="bg-black"><Moon size={25} /></button>
                    <button className='bg-yellow-300'><Sun size={25} /></button>
                </div>
                <div className="flex justify-between bg-white rounded-lg w-16 items-center mr-2">
                    <button className="text-black font-serif border-r border-black">A+</button>
                    <button className="text-black font-serif pr-1 border-r border-black">A</button>
                    <button className="text-black font-serif">A-</button>
                </div>
                <button className="flex items-center mr-2">
                    <MonitorUp />
                </button>
                {/* <Command>
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                <CommandItem>Calendar</CommandItem>
                                <CommandItem>Search Emoji</CommandItem>
                                <CommandItem>Calculator</CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Settings">
                                <CommandItem>Profile</CommandItem>
                                <CommandItem>Billing</CommandItem>
                                <CommandItem>Settings</CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command> */}
                <Dialog>
                    <div>
                        <div className="flex items-center bg-blue-500 rounded-md p-1">
                            <DialogTrigger>
                                Search
                            </DialogTrigger>
                            <Search size={18} />
                            <DialogContent>
                                <DialogHeader>
                                    <Command>
                                        <CommandInput placeholder="Type a command or search..." />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup heading="Suggestions">
                                                <CommandItem>
                                                    <Link href={"/notifications"}>Notifications</Link>
                                                </CommandItem>
                                                <CommandItem>
                                                    <Link href={"/createCardHolder"}>Create</Link>
                                                </CommandItem>
                                                <CommandItem>
                                                    <Link href={"/CardHolders"}>View</Link>
                                                </CommandItem>
                                                <CommandItem>
                                                    <Link href={"/admin"}>Admin</Link>
                                                </CommandItem>
                                                <CommandItem>
                                                    <Link href={"/ePeople"}>ePeople</Link>
                                                </CommandItem>
                                                <CommandItem>
                                                    <Link href={"/login"}>Login</Link>
                                                </CommandItem>
                                                <CommandItem>
                                                    <Link href={"/profile"}>Profile</Link>
                                                </CommandItem>
                                                <CommandItem>
                                                    <Link href={"/register"}>Register</Link>
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                    <Button>Search</Button>
                                </DialogHeader>
                            </DialogContent>
                        </div>
                    </div>
                </Dialog>
                <div
                    className="flex flex-row items-center ml-4 bg-gradient-to-b from-yellow-500  to-yellow-300 p-2 m-0 text-black rounded-md">
                    {/* TODO: Current location weather */}
                    <div className='pr-2'>
                        <div className="text-sm font-semibold">Bengaluru, IN </div>
                        <p className="text-xs">mist</p>
                    </div>
                    <div className='bg-white font-semibold'>
                        20C
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
