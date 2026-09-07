import { Hero } from '../components/sections/Hero';
import { AboutUs } from '../components/sections/AboutUs';
import { Authenticity } from '../components/sections/Authenticity';
import { CatalogGrid } from '../components/catalog/CatalogGrid';
import { Consignment } from '../components/sections/Consignment';
import { ReviewWall } from '../components/sections/ReviewWall';
import { ContactForm } from '../components/sections/ContactForm';

export function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Authenticity />
      <CatalogGrid />
      <Consignment />
      <ReviewWall />
      <ContactForm />
    </>
  );
}
