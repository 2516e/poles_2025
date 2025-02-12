import { Bounded } from '@/Components/Bounded';
import { ButtonLink } from '@/Components/Buttonlink';
import { Heading } from '@/Components/Heading';

import { SlideIn } from '@/Components/SlideIn';
import { InteractiveSkateboard } from './Components/InteractiveSkateboard';
import { SVGFilters } from './Components/SVGFilters';
import { TallLogo } from './Components/TallLogo';
import { WideLogo } from './Components/WideLogo';

export default function Hero() {
    return (
        <>
            <Bounded
                id={'hero'}
                className="bg-texture relative h-dvh overflow-hidden bg-brand-pink text-zinc-800"
            >
                <div className="absolute inset-0 flex items-center pt-20">
                    <WideLogo className="hidden w-full text-brand-purple opacity-20 mix-blend-multiply lg:block" />
                    <TallLogo className="w-full text-brand-purple opacity-20 mix-blend-multiply lg:hidden" />
                </div>
                <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
                    <Heading className="relative max-w-2xl place-self-start">
                        Escape the Cul-de-sac
                    </Heading>
                    <div className="relative flex w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
                        <SlideIn>
                            <div className="max-w-[45ch] font-semibold ~text-lg/xl">
                                <p>
                                    Not just a board, <em>your</em> board.
                                    Design a board that's as real as the places
                                    you take it.
                                </p>
                            </div>
                        </SlideIn>
                        <SlideIn>
                            <ButtonLink
                                href="/"
                                icon="skateboard"
                                size="lg"
                                className="z-20 mt-2 block"
                            >
                                Build Your Board
                            </ButtonLink>
                        </SlideIn>
                    </div>
                </div>
                <InteractiveSkateboard />
            </Bounded>

            <SVGFilters />
        </>
    );
}
