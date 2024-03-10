import { ArrowLeft, Bird, Castle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface PageProps { }

const Page: FC<PageProps> = ({ }) => {
    return (
        <div className='mt-48'>
            <Link href={"/"}>
                <ArrowLeft className='absolute mt-6 size-6 text-white font-semibold' />
            </Link>
            <div className='w-full bg-blue-500 h-20 text-4xl text-white font-semibold flex flex-row justify-around overflow-hidden'>
                <Bird className='text-cyan-200' size={90} />
                <p className='pt-4'>e-People</p>
                <Castle className='text-cyan-200' size={90} />
            </div>
            <div className='flex flex-row justify-around h-96 mt-10 border'>
                <div className="w-64 h-52 rounded-md shadow-4xl hover:shadow-none flex flex-col overflow-hidden">
                    <div className="relative h-1/2">
                        <Image
                            src="/survey-png.png"
                            alt="survey img"
                            className="object-cover rounded-t-md"
                            layout="fill"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-b-md">
                        <div className="flex items-center">
                            <Image
                                src="/survey-png.png"
                                alt="survey img"
                                width={85}
                                height={85}
                                className="rounded-full mr-2 border-2 border-white shadow-5xl"
                            />
                            <span className="text-gray-800">Survey</span>
                        </div>
                    </div>
                </div>

                <div className='w-64 h-52 rounded-md shadow-4xl hover:shadow-none flex flex-col overflow-hidden border'>
                    <div className="relative h-1/2">
                        <Image
                            src="/eparticipation.png"
                            alt="survey img"
                            className="object-cover rounded-t-md"
                            layout="fill"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-b-md">
                        <div className="flex items-center">
                            <Image
                                src="/eparticipation.png"
                                alt="survey img"
                                width={85}
                                height={85}
                                className="rounded-full mr-2 border-2 border-white shadow-5xl"
                            />
                            <span className="text-gray-800">
                                e-Participation
                            </span>
                        </div>
                    </div>
                </div>
                <div className='w-64 h-52 rounded-md shadow-4xl bg-green-700 hover:shadow-none flex flex-col overflow-hidden border'>
                    <div className="relative h-1/2">
                        <Image
                            src="/eparticipation.png"
                            alt="survey img"
                            className="object-cover rounded-t-md"
                            layout="fill"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-b-md">
                        <div className="flex items-center">
                            <Image
                                src="/images.png"
                                alt="survey img"
                                width={85}
                                height={85}
                                className="rounded-full mr-2 border-2 border-white shadow-5xl"
                            />
                            <span className="text-gray-800">
                                Video Guide
                            </span>
                        </div>
                    </div>
                </div>
                <div className='w-64 h-52 rounded-md shadow-4xl bg-yellow-700 hover:shadow-none flex flex-col overflow-hidden border'>
                    <div className="relative h-1/2">
                        <Image
                            src="/eparticipation.png"
                            alt="calendar img"
                            className="object-cover rounded-t-md"
                            layout="fill"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-b-md">
                        <div className="flex items-center">
                            <Image
                                src="/calendar.png"
                                alt="calendar img"
                                width={85}
                                height={85}
                                className="rounded-full mr-2 border-2 border-white shadow-5xl"
                            />
                            <span className="text-gray-800">
                                Upcoming Events
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
