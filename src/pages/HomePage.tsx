import { Hero } from '../components/sections/Hero';
import { CatalogGrid } from '../components/catalog/CatalogGrid';
import { Authenticity } from '../components/sections/Authenticity';
import { AboutUs } from '../components/sections/AboutUs';
import { Consignment } from '../components/sections/Consignment';
import { ReviewWall } from '../components/sections/ReviewWall';
import { ContactForm } from '../components/sections/ContactForm';

export function HomePage() {
  return (
    <>
      <Hero />
      <CatalogGrid />
      <Authenticity />
      <AboutUs />
      <Consignment />
      <ReviewWall />
      <ContactForm />
    </>
  );
}
