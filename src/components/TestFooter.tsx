import Link from 'next/link';
import { FC } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface FooterProps { }

const Footer: FC<FooterProps> = ({ }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8 px-4 md:px-8">
            <div>
                <h1 className="text-lg font-bold mb-2">Disclaimer</h1>
                <p className="text-sm">Please note that this Page also provides links to the websites / web Pages of Govt. Ministries/Departments/Organisations. The content of these websites are owned by the respective organisations and they may be contacted for any further information or suggestion.</p>
            </div>
            <div>
                <h1 className="text-lg font-bold mb-2">Website Policies</h1>
                <div>
                    <Link href="/about-us">About Us</Link>
                    <Link href="/sitemap">Sitemap</Link>
                    <Link href="/copyright-policy">Copyright Policy</Link>
                    <Link href="/hyperlinking-policy">Hyperlinking Policy</Link>
                    <Link href="/security-policy">Security Policy</Link>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/terms-and-conditions">Terms and Conditions</Link>
                    <Link href="/help">Help</Link>
                    <Link href="/screen-reader-access">Screen Reader Access</Link>
                    <Link href="/guidelines">Guidelines</Link>
                    <Link href="/faqs">FAQs</Link>
                    <Link href="/public-feedback">Public Feedback</Link>
                    <Link href="/e-participation-policy">e-Participation Policy</Link>
                </div>

            </div>
            <div>
                <h1 className="text-lg font-bold mb-2">Visitors</h1>
                <div>
                    <Link href={'/'} className="block text-sm mb-2">Last Updated: 25-10-2023</Link>
                </div>
                <div className="mt-4">
                    <Input placeholder="Enter your email" className="mb-2" />
                    <Button>Subscribe Now</Button>
                </div>
            </div>
            <div>
                <p className="text-sm">CONTENT OWNED AND MAINTAINED BY : Dept. of Information and Public Relation | Kannada and Culture Dept. | Directorate of Economics and Statistics For Help and suggestions Contact : Project Director, Web Portal, Centre for e-Governance Shantinagar Bengaluru. Phone: 08022230060 e-mail: pd.webportal@karnataka.gov.in</p>
            </div>
            <div>
                <p className="text-sm">Designed , Developed and Hosted by: ceg Center for e-Governance, Government of Karnataka © 2024, All Rights Reserved. Version : CeG/KRN 2.0</p>
            </div>
        </div >
    );
};

export default Footer;
