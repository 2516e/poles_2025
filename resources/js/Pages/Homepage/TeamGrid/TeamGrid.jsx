import { Bounded } from '@/Components/Bounded';
import { ButtonLink } from '@/Components/ButtonLink';
import { Heading } from '@/Components/Heading';
import { SlideIn } from '@/Components/SlideIn';
import React from 'react';
import { Skater } from './Components/Skater';
import { teamMembers } from './Components/teamMembers';

export default function TeamGrid() {
    return (
        <Bounded className="bg-texture bg-brand-navy" id="team-grid">
            <SlideIn>
                <Heading
                    as="h2"
                    size="lg"
                    className="mb-8 text-center text-white"
                >
                    The Team
                </Heading>
            </SlideIn>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {teamMembers.map((skater, index) => (
                    <React.Fragment key={index}>
                        {skater.data.firstName && (
                            <SlideIn>
                                <Skater skater={skater} index={index} />
                            </SlideIn>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="flex justify-center pt-16">
                <ButtonLink href="/customizer" size="lg">
                    Build theirs !
                </ButtonLink>
            </div>
        </Bounded>
    );
}
