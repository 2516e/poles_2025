import { useEffect, useState } from 'react';

export function ScrollToTop() {
    // État pour stocker la position du scroll
    const [scrollPosition, setScrollPosition] = useState(0);
    // État pour savoir si le scroll vers le haut est en cours
    const [isScrolling, setIsScrolling] = useState(false);

    // Fonction pour faire défiler la page vers le haut
    const scrollToTop = () => {
        setIsScrolling(true); // Active l'état "en train de scroller"
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll fluide vers le haut
    };

    useEffect(() => {
        // Fonction qui met à jour la position du scroll
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        // Fonction qui détecte la fin de l'animation de scroll
        const handleScrollEnd = () => {
            setTimeout(() => setIsScrolling(false), 200); // Attendre 200ms après la fin du scroll
        };

        // Ajoute les écouteurs d'événements
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scrollend', handleScrollEnd); // Détecte la fin du scroll

        // Nettoie les écouteurs quand le composant est démonté
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scrollend', handleScrollEnd);
        };
    }, []);

    // Calcul de la position du bouton : il descend progressivement jusqu'à 600px max
    const buttonPosition = Math.min(scrollPosition, 575);

    return (
        <button
            onClick={scrollToTop} // Déclenche le scroll vers le haut au clic
            className={`fixed right-1 -rotate-90 rounded-full border-2 border-white p-4 text-white transition-all duration-500 ease-in-out hover:scale-110 ${scrollPosition > 1000 ? 'opacity-75' : 'opacity-0'} // Rend le bouton après 1000px de scroll visible ${isScrolling ? 'pointer-events-none' : ''}`} // Désactive temporairement le bouton pendant le scroll
            style={{
                top: `${buttonPosition}px`, // Position verticale dynamique du bouton
            }}
            aria-label="Scroll to top" // Améliore l'accessibilité
        >
            <p>SCROLL TO TOP</p> {/* Texte du bouton */}
        </button>
    );
}
