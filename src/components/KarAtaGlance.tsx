import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface KarAtaGlanceProps { }

const KarAtaGlance: FC<KarAtaGlanceProps> = () => {
    return (
        <div className="h-screen w-screen pt-40 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <Image
                        src="/Karnataka_map_latest_2021_en.png"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '200px', height: 'auto' }}
                        alt="Karnataka map" />
                </div>
                <div className="p-8">
                    <h1 className="text-xl font-semibold mb-4 text-blue-800">Karnataka at a Glance</h1>
                    <table className="w-full text-left border-collapse">
                        <tbody className='border-2'>
                            <tr className='border-2'>
                                <td className="py-2 border-2 pl-2 pr-2 font-semibold">Capital City</td>
                                <td className="py-2 pl-2 font-semibold">Bengaluru</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-2 border-2">Area:</td>
                                <td className="py-2 px-2 border-2">191,791 km²</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-2 border-2">Districts:</td>
                                <td className="py-2 px-2 border-2">31</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-2 border-2">Population:</td>
                                <td className="py-2 px-2 border-2">61,095,297</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-2 border-2">Literacy:</td>
                                <td className="py-2 px-2 border-2">75.36%</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <Link
                        href={'https://www.karnataka.gov.in/new-Page/Karnataka%20at%20a%20Glance/en'}
                        className='w-12 underline rounded-lg bg-sky-600'
                    >
                        Click here
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default KarAtaGlance;
