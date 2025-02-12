import { Bounded } from '@/Components/Bounded';
import { Heading } from '@/Components/Heading';
import { SlideIn } from '@/Components/SlideIn';
import { usePage } from '@inertiajs/react';
import SkateBoardProduct from './Components/Skateboards/SkateboardProduct';

export default function ProductGrid() {
    const { latestSkateboards } = usePage().props;

    return (
        <>
            <Bounded className="bg-texture bg-brand-gray" id={'product-grid'}>
                <SlideIn>
                    <Heading className="text-center ~mb-4/6">
                        🔥 Latest Drops 🔥
                    </Heading>
                </SlideIn>
                <SlideIn>
                    <div className="text-center ~mb-6/10">
                        <p>Grab our freshest designs before they sell out!</p>
                    </div>
                </SlideIn>
                <SlideIn delay={0.15}>
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {latestSkateboards && latestSkateboards.length > 0 ? (
                            latestSkateboards.map((skateboard) => (
                                <SkateBoardProduct
                                    key={skateboard.id}
                                    name={skateboard.name}
                                    image={skateboard.image}
                                    price={skateboard.price}
                                />
                            ))
                        ) : (
                            <p> No skateboards found </p>
                        )}
                    </div>
                </SlideIn>
            </Bounded>
        </>
    );
}
