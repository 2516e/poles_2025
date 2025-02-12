import { clsx } from 'clsx';

import { Bounded } from '@/Components/Bounded';
import { LazyYoutubePlayer } from './LazyYoutubePlayer';

const MASK_CLASSES =
    '[mask-image:url(/storage/assets/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto]';

export default function VideoBlock() {
    return (
        <Bounded className="bg-texture bg-zinc-900" id='video-block'>
            <h2 className="sr-only">Video Reel</h2>
            <div className="relative aspect-video">
                <div
                    className={clsx(
                        MASK_CLASSES,
                        'absolute inset-0 bg-brand-lime ~translate-x-2/3 ~translate-y-2/3',
                    )}
                />
                <div
                    className={clsx(
                        MASK_CLASSES,
                        'absolute inset-0 bg-white ~translate-x-1/3 ~translate-y-1/2',
                    )}
                />
                <div
                    className={clsx(
                        MASK_CLASSES,
                        '/3 absolute inset-0 bg-white ~translate-x-1/2 ~-translate-y-1',
                    )}
                />
                <div className={clsx(MASK_CLASSES, 'relative h-full')}>
                    <LazyYoutubePlayer />
                    <img
                        src="/storage/assets/image-texture.png"
                        alt=""
                        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover opacity-25"
                    />
                </div>
            </div>
        </Bounded>
    );
}
