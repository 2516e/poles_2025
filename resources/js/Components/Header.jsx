import { ButtonLink } from '@/Components/Buttonlink';
import { Logo } from '@/Components/Logo';
import { Navbar } from '@/Components/Navbar';

export default function Header() {
    return (
        <header className="header hd:h-32 absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6">
            {/* Conteneur principal du header avec une grille */}
            <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
                {/* Logo du site */}
                <a href="/" className="justify-self-start">
                    <Logo className="text-brand-purple ~h-12/20" />
                </a>

                {/* Navbar (barre de navigation) */}
                <Navbar />

                {/* Bouton du panier à droite */}
                <div className="flex gap-5 justify-self-end">
                    <ButtonLink
                        href=""
                        icon="cart"
                        color="purple"
                        aria-label="Cart"
                    >
                        <span className="md:hidden"></span>
                        <span className="hidden md:inline">Cart ()</span>
                    </ButtonLink>

                    <ButtonLink
                        href="/profile"
                        icon="profile"
                        aria-label="Profile"
                        color="lime"
                    />
                </div>
            </div>
        </header>
    );
}
