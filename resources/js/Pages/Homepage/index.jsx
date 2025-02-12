import { Head } from '@inertiajs/react';

import Hero from './Hero/Hero';

import ProductGrid from './ProductGrid/ProductGrid';

import Footer from '@/Components/Footer/Footer';
import Header from '@/Components/Header';
import { ScrollToTop } from '@/Components/ScrollToTop';
import TeamGrid from './TeamGrid/TeamGrid';
import { sections } from './TextAndImage/Components/sections';
import TextAndImage from './TextAndImage/TextAndImage';
import VideoBlock from './VideoBlock/VideoBlock';

// Import du tableau de sections

export default function Homepage() {
    return (
        <>
            <Head title="Homepage" />
            <Header />
            <Hero />
            <ProductGrid />
            <div id="about-section">
                {sections.map((section, index) => (
                    <TextAndImage key={index} {...section} />
                ))}
            </div>
            <VideoBlock />
            <TeamGrid />
            <Footer />

            <ScrollToTop />
        </>
    );
}
