// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://SandunMunasinghe20.github.io', 
    base: '/dev-nexus-hub',
    
    integrations: [
        sitemap(),
        starlight({
            title: 'DevNexus Architecture Hub',
        
            sidebar: [
                {
                    label: 'Spring & Kafka Microservices',
                    items: [{ autogenerate: { directory: 'microservices' } }]
                },
                {
                    label: 'Playwright & QA Automation',
                    items: [{ autogenerate: { directory: 'qa-automation' } }]
                },
                {
                    label: 'Applied Machine Learning',
                    items: [{ autogenerate: { directory: 'machine-learning' } }]
                },
                {
                    label: 'Compliance & Verification',
                    items: [
                        { label: 'Privacy Policy', slug: 'legal/privacy' },
                        { label: 'About the Author', slug: 'legal/about' },
                    ],
                },
            ],
        }),
    ],
});