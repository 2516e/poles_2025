import { Bounded } from '@/Components/Bounded';
import { ButtonLink } from '@/Components/ButtonLink';
import { Heading } from '@/Components/Heading';
import { SlideIn } from '@/Components/SlideIn';
import { clsx } from 'clsx';
import { ParallaxImage } from './Components/ParallaxImage';

export default function TextAndImage({
    theme,
    heading,
    body,
    buttonText,
    buttonLink,
    fgImage,
}) {
    const id = heading
        ? heading
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '')
        : 'default-page';

    return (
        <Bounded
            id={id}
            className={clsx('bg-texture sticky top-0', {
                'bg-brand-blue text-white': theme === 'Blue',
                'bg-brand-orange text-white': theme === 'Orange',
                'bg-brand-navy text-white': theme === 'Navy',
                'bg-brand-lime': theme === 'Lime',
            })}
        >
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
                <div
                    className={clsx(
                        'flex flex-col items-center gap-8 text-center md:items-start md:text-left', // Ajout de md:order-1 par défaut
                        {
                            'md:order-1':
                                theme === 'Orange' || theme === 'Lime', // Si Orange ou Lime, remplace par md:order-2
                        },
                    )}
                >
                    <Heading size="lg" as="h2">
                        {heading}
                    </Heading>
                    <SlideIn delay={-0.1}>
                        <div className="max-w-md text-lg leading-relaxed">
                            <p>{body}</p>
                        </div>
                    </SlideIn>
                    <SlideIn delay={-0.15}>
                        <ButtonLink
                            href={buttonLink}
                            color={theme === 'Lime' ? 'orange' : 'lime'}
                        >
                            {buttonText}
                        </ButtonLink>
                    </SlideIn>
                </div>
                <ParallaxImage foregroundImage={fgImage} />
            </div>
        </Bounded>
    );
}
