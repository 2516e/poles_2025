import { ButtonLink } from '@/Components/ButtonLink';
import { HorizontalLine, VerticalLine } from '@/Components/Line';
import { clsx } from 'clsx';
import { FaCartShopping, FaStar } from 'react-icons/fa6';
import { Scribble } from '../Scribble';
import { useEffect, useState } from 'react';

const VERTICAL_LINE_CLASSES =
    'absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400';

const HORIZONTAL_LINE_CLASSES =
    '-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400';

const scribble_colors = [
    '#4876ff',
    '#d9f154',
    '#2e3192',
    '#ff7347',
    '#692e54',
];
const usedColors = new Set();

export default function SkateBoardProduct({ name, image, price }) {
    const [rdmColor, setRdmColor] = useState(null);

    useEffect(() => {
        let availableColors = scribble_colors.filter(
            (color) => !usedColors.has(color),
        );

        if (availableColors.length === 0) {
            usedColors.clear(); // Réinitialiser si toutes les couleurs ont été utilisées
            availableColors = [...scribble_colors];
        }

        const newColor =
            availableColors[Math.floor(Math.random() * availableColors.length)];
        usedColors.add(newColor);
        setRdmColor(newColor);
    }, []);

    return (
        <div className="group relative mx-auto w-full max-w-72 px-8 pt-4">
            <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, 'left-4')} />
            <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, 'right-4')} />
            <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />
            <div className="flex items-center justify-between ~text-sm/2xl">
                <span>${price}</span>
                <span className="inline-flex items-center gap-1">
                    5<FaStar className="text-yellow-400" />
                </span>
            </div>
            <div className="-mb-1 overflow-hidden py-4">
                <Scribble
                    className="absolute inset-0 h-full w-full"
                    color={rdmColor}
                />
                <img
                    src={`/storage/${image}`} // On suppose ici que l'image est dans le dossier public/storage
                    alt={name}
                    width={150}
                    className="mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
                />
            </div>
            <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />
            <h3 className="my-2 text-center font-sans leading-tight ~text-lg/xl">
                {name.toUpperCase()}
            </h3>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ButtonLink href="/" color="purple">
                    Add to <FaCartShopping />
                </ButtonLink>
                <ButtonLink href="/">Customize</ButtonLink>
            </div>
        </div>
    );
}
