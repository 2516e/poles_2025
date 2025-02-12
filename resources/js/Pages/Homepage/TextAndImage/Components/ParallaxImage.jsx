import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

export function ParallaxImage({ foregroundImage, className }) {
    const fgRef = useRef(null);
    const bgRef = useRef(null);

    const targetPosition = useRef({ x: 0, y: 0 });
    const currentPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        function onMouseMove(event) {
            const { innerWidth, innerHeight } = window;

            const xPercent = (event.clientX / innerWidth - 0.5) * 2; // Entre -1 et 1
            const yPercent = (event.clientY / innerHeight - 0.5) * 2; // Entre -1 et 1

            targetPosition.current = {
                x: xPercent * -20, // Déplacement plus naturel
                y: yPercent * -20,
            };
        }

        function animationFrame() {
            const { x: targetX, y: targetY } = targetPosition.current;
            const { x: currentX, y: currentY } = currentPosition.current;

            // Lissage avec interpolation linéaire (lerp)
            const newX = currentX + (targetX - currentX) * 0.1;
            const newY = currentY + (targetY - currentY) * 0.1;

            currentPosition.current = { x: newX, y: newY };

            if (bgRef.current) {
                bgRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
            }
            if (fgRef.current) {
                fgRef.current.style.transform = `translate(${newX * 3}px, ${newY * 3}px)`;
            }

            requestAnimationFrame(animationFrame);
        }

        // Ajouter les écouteurs
        window.addEventListener('mousemove', onMouseMove);
        const frameID = requestAnimationFrame(animationFrame);

        return () => {
            // Nettoyage des écouteurs
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(frameID);
        };
    }, []);

    return (
        <div className={clsx('grid grid-cols-1 place-items-center', className)}>
            {/* Image de fond */}
            <div
                ref={bgRef}
                className="col-start-1 row-start-1 transition-transform"
            >
                <img
                    src="/storage/assets/images/paint-background.png"
                    alt=""
                    className="w-11/12"
                />
            </div>

            {/* Image de premier plan */}
            <div
                ref={fgRef}
                className="col-start-1 row-start-1 transition-transform"
            >
                <img
                    src={foregroundImage}
                    alt=""
                    height={600}
                    className="h-full max-h-[500px] w-auto"
                />
            </div>
        </div>
    );
}
