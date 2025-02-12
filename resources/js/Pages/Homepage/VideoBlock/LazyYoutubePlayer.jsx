import { useEffect, useRef, useState } from 'react';

export function LazyYoutubePlayer() {
    // État pour savoir si la vidéo est visible dans l'écran
    const [isVisible, setIsVisible] = useState(false);

    // État pour savoir si la vidéo est muette ou non
    const [isMuted, setIsMuted] = useState(true);

    // Référence pour le conteneur de la vidéo
    const playerRef = useRef(null);

    // État pour stocker l'instance du lecteur YouTube
    const [player, setPlayer] = useState(null);

    /**
     * Fonction pour charger l'API YouTube dynamiquement
     * afin d'éviter les erreurs si `window.YT` n'est pas encore disponible.
     */
    const loadYouTubeAPI = () => {
        if (!window.YT) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            script.onload = () => {
                if (window.YT && isVisible) {
                    createPlayer();
                }
            };
            document.body.appendChild(script);
        } else if (isVisible) {
            createPlayer();
        }
    };

    /**
     * Fonction pour initialiser le lecteur YouTube une fois l'API chargée
     */
    const createPlayer = () => {
        if (!player) {
            const newPlayer = new window.YT.Player('youtube-player', {
                events: {
                    onReady: (event) => {
                        event.target.setVolume(50); // Définir le volume à 50%
                        if (!isMuted) {
                            event.target.unMute();
                        }
                    },
                    onStateChange: (event) => {
                        // Assurer que la vidéo reste muette si l'utilisateur n'a pas activé le son
                        if (
                            event.data === window.YT.PlayerState.PLAYING &&
                            isMuted
                        ) {
                            event.target.mute();
                        }
                    },
                },
            });
            setPlayer(newPlayer);
        }
    };

    /**
     * useEffect pour observer l'élément et détecter s'il entre dans l'écran
     */
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (entry.isIntersecting) {
                    loadYouTubeAPI();
                }
            },
            { threshold: 0.5 }, // Détecte lorsque 50% de la vidéo est visible
        );

        if (playerRef.current) {
            observer.observe(playerRef.current);
        }

        return () => {
            if (playerRef.current) {
                observer.unobserve(playerRef.current);
            }
        };
    }, []);

    /**
     * Fonction pour activer/désactiver le son de la vidéo
     */
    const toggleSound = () => {
        if (player) {
            if (isMuted) {
                player.unMute();
                player.setVolume(50); // Ajuste le volume à 50%
            } else {
                player.mute();
            }
        }
        setIsMuted(!isMuted);
    };

    return (
        <div ref={playerRef} className="relative h-full w-full">
            {isVisible ? (
                <>
                    {/* Conteneur du lecteur YouTube */}
                    <div id="youtube-player" className="h-full w-full">
                        <iframe
                            title="YouTube Video"
                            id="youtube-iframe"
                            src={`https://www.youtube-nocookie.com/embed/6-8E4Nirh9s?enablejsapi=1&autoplay=1&loop=1&playlist=6-8E4Nirh9s&mute=${isMuted ? 1 : 0}&controls=0`}
                            className="h-full w-full border-0"
                            style={{ border: 'none' }}
                        />
                    </div>

                    {/* Bouton pour activer/désactiver le son */}
                    <button
                        onClick={toggleSound}
                        className="absolute bottom-10 right-9 rounded bg-black bg-opacity-50 px-4 py-2 text-white hover:bg-opacity-90"
                    >
                        {isMuted ? 'Sound 🔇' : 'Sound 🔊'}
                    </button>
                </>
            ) : (
                // Affichage d'un message de chargement lorsque la vidéo n'est pas encore visible
                <div className="flex h-full w-full items-center justify-center bg-black">
                    <p className="text-white">Chargement...</p>
                </div>
            )}
        </div>
    );
}
