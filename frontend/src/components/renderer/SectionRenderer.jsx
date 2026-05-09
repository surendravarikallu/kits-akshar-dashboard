import { Suspense, lazy } from 'react';

const HeroSection = lazy(() => import('./../sections/HeroSection.jsx'));
const AboutSection = lazy(() => import('./../sections/AboutSection.jsx'));
const DepartmentsSection = lazy(() => import('./../sections/DepartmentsSection.jsx'));
const PlacementsSection = lazy(() => import('./../sections/PlacementsSection.jsx'));
const EventsSection = lazy(() => import('./../sections/EventsSection.jsx'));
const GallerySection = lazy(() => import('./../sections/GallerySection.jsx'));
const TestimonialsSection = lazy(() => import('./../sections/TestimonialsSection.jsx'));
const StatsSection = lazy(() => import('./../sections/StatsSection.jsx'));
const FAQSection = lazy(() => import('./../sections/FAQSection.jsx'));
const InnovationSection = lazy(() => import('./../sections/InnovationSection.jsx'));

const SECTION_COMPONENTS = {
  hero: HeroSection,
  about: AboutSection,
  departments: DepartmentsSection,
  placements: PlacementsSection,
  events: EventsSection,
  gallery: GallerySection,
  testimonials: TestimonialsSection,
  stats: StatsSection,
  faq: FAQSection,
  innovation: InnovationSection,
};

export default function SectionRenderer({ sections }) {
  if (!sections || !Array.isArray(sections)) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {sections.map((section, index) => {
        const type = section.type || section.sectionType?.name;
        const Component = SECTION_COMPONENTS[type];
        
        if (!Component) {
          console.warn(`No component found for section type: ${type}`);
          return null;
        }

        return (
          <Suspense key={section.id || index} fallback={<div className="w-full h-32 flex items-center justify-center bg-kits-black text-kits-gold font-mono text-sm tracking-widest uppercase">Loading Section...</div>}>
            <Component data={section.content} order={section.order} />
          </Suspense>
        );
      })}
    </div>
  );
}
