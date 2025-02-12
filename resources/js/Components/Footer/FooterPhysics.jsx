'use client';

import {
    Bodies,
    Engine,
    Mouse,
    MouseConstraint,
    Render,
    Runner,
    World,
} from 'matter-js';
import { useEffect, useRef, useState } from 'react';

export function FooterPhysics({ boardTextureURLs = [], className }) {
    const scene = useRef(null); // Référence au conteneur de rendu
    const engine = useRef(Engine.create()); // Création du moteur physique
    const [inView, setInView] = useState(false); // État pour suivre si l'élément est visible
    const [isMobile, setIsMobile] = useState(false); // État pour détecter si l'utilisateur est sur mobile

    useEffect(() => {
        // Gestion du redimensionnement pour détecter les appareils mobiles
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setIsMobile(window.matchMedia('(max-width: 768px)').matches);
            }
        };

        handleResize(); // Vérification initiale
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Limite le nombre de textures en fonction de la taille de l'écran
    const limitedBoardTextures = isMobile
        ? boardTextureURLs.slice(0, 0)
        : boardTextureURLs;

    useEffect(() => {
        // Observer pour détecter si l'élément est visible dans le viewport
        const currentScene = scene.current;
        if (!currentScene) return;

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.6 },
        );

        observer.observe(currentScene);
        return () => observer.unobserve(currentScene);
    }, []);

    useEffect(() => {
        if (!scene.current || !inView) return;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (prefersReducedMotion) return;

        const cw = scene.current.clientWidth;
        const ch = scene.current.clientHeight;

        engine.current.gravity.y = 0.5; // Ajout de la gravité

        // Configuration du rendu Matter.js
        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: cw,
                height: ch,
                pixelRatio: window.devicePixelRatio,
                wireframes: false,
                background: 'transparent',
            },
        });

        // Création des limites de la scène
        let boundaries = createBoundaries(cw, ch);
        World.add(engine.current.world, boundaries);

        // Configuration de la souris pour interagir avec les objets
        const mouse = Mouse.create(render.canvas);
        mouse.element.removeEventListener('wheel', mouse.mousewheel);

        const mouseConstraint = MouseConstraint.create(engine.current, {
            mouse,
            constraint: { stiffness: 0.2, render: { visible: false } },
        });

        World.add(engine.current.world, mouseConstraint);

        // Gestion du redimensionnement de la scène
        const onResize = () => {
            if (!scene.current) return;
            const cw = scene.current.clientWidth;
            const ch = scene.current.clientHeight;
            render.canvas.width = cw;
            render.canvas.height = ch;
            render.options.width = cw;
            render.options.height = ch;
            Render.setPixelRatio(render, window.devicePixelRatio);

            World.remove(engine.current.world, boundaries);
            boundaries = createBoundaries(cw, ch);
            World.add(engine.current.world, boundaries);
        };

        window.addEventListener('resize', onResize);

        function createBoundaries(width, height) {
            return [
                Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true }),
                Bodies.rectangle(-10, height / 2, 20, height, {
                    isStatic: true,
                }),
                Bodies.rectangle(width / 2, height + 10, width, 20, {
                    isStatic: true,
                }),
                Bodies.rectangle(width + 10, height / 2, 20, height, {
                    isStatic: true,
                }),
            ];
        }

        // Lancement du moteur et du rendu
        const runner = Runner.create();
        Runner.run(runner, engine.current);
        Render.run(render);

        return () => {
            window.removeEventListener('resize', onResize);
            Render.stop(render);
            Runner.stop(runner);
            World.clear(engine.current.world, false);
            Engine.clear(engine.current);
            render.canvas.remove();
            render.textures = {};
        };
    }, [inView]);

    useEffect(() => {
        if (!scene.current || !inView) return;

        const world = engine.current.world;
        const cw = scene.current.clientWidth;
        const ch = scene.current.clientHeight;

        // Préchargement des images
        const loadedTextures = [];
        let imagesLoaded = 0;

        limitedBoardTextures.forEach((texture, index) => {
            const img = new Image();
            img.src = texture;
            img.onload = () => {
                // Redimensionner l'image en ajustant la hauteur
                const newHeight = 600; // Définissez la nouvelle hauteur ici
                const aspectRatio = img.width / img.height;
                const newWidth = newHeight * aspectRatio;

                // Créez un canevas pour redimensionner l'image
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = newWidth;
                canvas.height = newHeight;

                // Dessinez l'image redimensionnée sur le canevas
                context.drawImage(
                    img,
                    0,
                    0,
                    img.width,
                    img.height,
                    0,
                    0,
                    newWidth,
                    newHeight,
                );

                // Convertir l'image redimensionnée en URL
                const resizedTexture = canvas.toDataURL();

                // Sauvegarder l'image redimensionnée dans le tableau
                loadedTextures[index] = resizedTexture;
                imagesLoaded++;

                if (imagesLoaded === limitedBoardTextures.length) {
                    addBodiesToWorld(loadedTextures);
                }
            };
            img.onerror = () =>
                console.error(`Erreur de chargement de l'image : ${texture}`);
        });

        function addBodiesToWorld(textures) {
            const boards = textures.map((texture) => {
                const x = Math.random() * cw;
                const y = Math.random() * (ch / 2 - 100) + 50;
                const rotation = ((Math.random() * 100 - 50) * Math.PI) / 180;
                return Bodies.rectangle(x, y, 80, 285, {
                    chamfer: { radius: 40 },
                    angle: rotation,
                    restitution: 0.8,
                    friction: 0.005,
                    render: { sprite: { texture, xScale: 0.5, yScale: 0.5 } },
                });
            });
            if (boards.length > 0) {
                World.add(engine.current.world, boards);
            }
        }

        return () => World.clear(world);
    }, [limitedBoardTextures, inView]);

    return <div ref={scene} className={className} />;
}
