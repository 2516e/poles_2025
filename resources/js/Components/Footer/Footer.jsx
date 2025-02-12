import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';
import { Heading } from '../Heading';
import { Logo } from '../Logo';
import { boardTextureURLs } from './boardTextureURLs';
import { FooterPhysics } from './FooterPhysics';

export default function Footer() {
    const links = [
        { name: 'About', targetId: 'about-section', emoji: '🗒️' },
        { name: 'Team', targetId: 'team-grid', emoji: '💉' },
        { name: 'Customizer', href: 'customizer', emoji: '🛹' },
        { name: 'Profile', href: 'profile', emoji: '💩' },
    ];
    // Fonction de smooth scroll pour la navigation
    const smoothScroll = (targetId) => {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-texture bg-zinc-800 text-white lg:grid lg:grid-cols-5">
            <div className="relative block h-32 lg:col-span-3 lg:h-full">
                <img
                    src="/storage/assets/images/pexels-artempodrez-4816744.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <FooterPhysics
                    boardTextureURLs={boardTextureURLs}
                    className="absolute inset-0 overflow-hidden"
                />
                <Logo className="pointer-events-none relative ml-5 mt-5 h-20 mix-blend-exclusion md:h-28" />
            </div>

            <div className="px-4 py-16 sm:px-6 lg:col-span-2 lg:px-8">
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <Heading as="h1" size="md" className="text-brand-lime">
                            {' '}
                            Call us !
                        </Heading>

                        <p>
                            <a
                                href="tel:9092771914"
                                className="block text-2xl font-medium transition-colors duration-150 hover:text-brand-orange sm:text-3xl"
                            >
                                (909)-277-1914
                            </a>
                        </p>

                        <ul className="mt-8 space-y-1 text-sm">
                            <li>Monday to Friday: 10am - 5pm</li>
                            <li>Weekend: 10am - 3pm</li>
                        </ul>

                        <ul className="mt-8 flex gap-6">
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="transition hover:text-brand-orange"
                                >
                                    <span className="sr-only">Facebook</span>

                                    <FaFacebookF size={24} />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-white transition hover:text-brand-orange"
                                >
                                    <span className="sr-only">Instagram</span>

                                    <FaInstagram size={24} />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-white transition hover:text-brand-orange"
                                >
                                    <span className="sr-only">Twitter</span>

                                    <FaTwitter size={24} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-[75%] border border-white" />
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={
                                        link.targetId
                                            ? `#${link.targetId}`
                                            : link.href
                                    } // Utilise targetId ou href si targetId n'existe pas
                                    onClick={(e) => {
                                        if (link.targetId) {
                                            // Si targetId est défini, alors faire le smooth scroll
                                            e.preventDefault(); // Empêche le comportement de défilement par défaut
                                            smoothScroll(link.targetId); // Défilement fluide vers la section
                                        }
                                    }}
                                    className="transition-colors duration-150 ~text-lg/xl hover:text-brand-orange"
                                >
                                    {link.emoji} {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="w-[75%] border border-white" />

                    <div className="sm:flex sm:items-center sm:justify-between">
                        <p className="mt-8 text-xs text-white sm:mt-0">
                            &copy; 2025. Suburbia. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
