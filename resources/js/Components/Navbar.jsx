export function Navbar() {
    const links = [
        { name: 'About', targetId: 'about-section' },
        { name: 'Team', targetId: 'team-grid' },
        { name: 'Customizer', href: 'customizer' },
    ];

    // Fonction de smooth scroll pour la navigation
    const smoothScroll = (targetId) => {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            aria-label="Main"
            className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
        >
            <ul className="flex flex-wrap items-center justify-center gap-8">
                {links.map((link, index) => (
                    <li key={index}>
                        <a
                            href={
                                link.targetId ? `#${link.targetId}` : link.href
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
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
