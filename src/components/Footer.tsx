import Link from 'next/link'
import { FC } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArrowRightCircle } from 'lucide-react'

interface FooterProps {

}

const Footer: FC<FooterProps> = ({ }) => {
    return <div className='bg-gray-700 text-white text-sm'>
        <div className='flex flex-row'>
            <div className='w-1/3 p-6 border-r-2 border-r-blue-400'>
                <div className='border-t-yellow-300 border-l-yellow-300 border-b-red-700 border-r-red-700 border-2 bg-gray-800 w-auto inline-block px-6 py-1 text-2xl ml-20'>Disclaimer : </div>
                <br />
                <br />
                <p>
                    Please note that this Page also provides links to the websites / web Pages of Govt.
                </p>
                <p>
                    Ministries/Departments/Organisations. The content of these websites are owned by the respective organisations and they may be contacted for any further information or suggestion.
                </p>
            </div>
            <div className='w-1/3 p-6 border-r-2 border-r-blue-400'>
                <div className='border-t-yellow-300 border-l-yellow-300 border-b-red-700 border-r-red-700 border-2 bg-gray-800 w-auto inline-block px-6 py-1 text-2xl ml-20'>
                    Website Policies
                </div>
                <br />
                <br />
                <div className="flex flex-col">
                    <div className='flex flex-row'>
                        <div className='pr-4'>
                            <Link href="/about-us" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">About Us</span>
                            </Link>
                            <Link href="/sitemap" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Sitemap</span>
                            </Link>
                            <Link href="/copyright-policy" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Copyright Policy</span>
                            </Link>
                            <Link href="/hyperlinking-policy" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Hyperlinking Policy</span>
                            </Link>
                            <Link href="/security-policy" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Security Policy</span>
                            </Link>
                            <Link href="/privacy-policy" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Privacy Policy</span>
                            </Link>
                            <Link href="/terms-and-conditions" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Terms and Conditions</span>
                            </Link>
                        </div>
                        <div>
                            <Link href="/help" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Help</span>
                            </Link>
                            <Link href="/screen-reader-access" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Screen Reader Access</span>
                            </Link>
                            <Link href="/guidelines" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Guidelines</span>
                            </Link>
                            <Link href="/faqs" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">FAQs</span>
                            </Link>
                            <Link href="/public-feedback" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">Public Feedback</span>
                            </Link>
                            <Link href="/e-participation-policy" className="flex items-center mb-2">
                                <ArrowRightCircle size={15} />
                                <span className="ml-1">e-Participation Policy</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-1/3 p-6'>
                <div className='border-t-yellow-300 border-l-yellow-300 border-b-red-700 border-r-red-700 border-2 bg-gray-800 w-auto inline-block px-6 py-1 text-2xl ml-20'>Visitors</div>
                <br />
                <br />
                <Link href={'/'} className='flex items-center mb-1'>
                    <ArrowRightCircle size={15} />
                    <span className='ml-1'>
                        Last Updated: 25-10-2023
                    </span>
                </Link>
                <Link href={'/'} className='flex items-center mb-1'>
                    <ArrowRightCircle size={15} />
                    <span className="ml-1">
                        Visitors Counter: 162346
                    </span>
                </Link>
                <Link href={'/'} className='flex items-center mb-1'>
                    <ArrowRightCircle size={15} />
                    <span className="ml-1">
                        Version: 2.0
                    </span>
                </Link>
                <p className='mb-2'>
                    Best viewed in Chrome v-87.0.4280.141, Microsoft Edge v-87.0.664.75, Firefox -v-83.0 Browsers.
                </p>
                <p className='mb-2'>
                    Resolution : 1280x800 to 1920x1080
                </p>
                <p className='mb-2'>
                    Subscribe to our newsletter
                </p>
                <Input placeholder='Subscribe to NewsLetter' />
                <br />
                <Button>Subscribe Now</Button>
            </div>
        </div>
        <div className='flex flex-col items-center'>
            <br />
            <div className='h-16 py-8 border-t-2 border-white'>
                <p className='px-16'>
                    CONTENT OWNED AND MAINTAINED BY : Dept. of Information and Public Relation |Kannada and Culture Dept.|Directorate of Economics and Statistics.
                </p>
                <p>
                    For Help and suggestions Contact : Project Director, Web Portal, Centre for e-Governance Shantinagar Bengaluru. Phone: 08022230060 e-mail: pd.webportal@karnataka.gov.in
                </p>
            </div>
            <div className='mt-8 border-t-2 border-white pt-2'>
                <p>
                    Designed , Developed and Hosted by: ceg Center for e-Governance, Government of Karnataka © 2024, All Rights Reserved. Version : CeG/KRN 2.0
                </p>
            </div>
        </div>
    </div >
}

export default Footer