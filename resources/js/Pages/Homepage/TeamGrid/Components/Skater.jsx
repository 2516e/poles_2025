import { clsx } from 'clsx';
import { SkaterScribble } from './SkaterScribble';

export function Skater({ skater, index }) {
    const colors = [
        'text-brand-blue',
        'text-brand-orange',
        'text-brand-pink',
        'text-brand-purple',
    ];

    const scribbleColor = colors[index];

    return (
        <div className="skater group relative flex flex-col items-center gap-4">
            <div className="stack-layout overflow-hidden">
                <img
                    src={skater.data.bgImg}
                    alt=""
                    width={500}
                    className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[0.2]"
                />
                <SkaterScribble className={clsx('relative', scribbleColor)} />
                <img
                    src={skater.data.fgImg}
                    alt=""
                    width={500}
                    className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
                />
                <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <h3 className="relative grid place-self-end justify-self-start p-2 font-sans text-brand-gray ~text-2xl/3xl">
                    <span className="mb-[-0.3em] block">
                        {skater.data.firstName}
                    </span>
                    <span className="block pt-1">{skater.data.lastName}</span>
                </h3>
            </div>
        </div>
    );
}
