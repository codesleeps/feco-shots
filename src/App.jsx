import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductSection from './components/ProductSection';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import FeedbackModal from './components/FeedbackModal';

export default function App() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Data
  const smokelessFlavors = [
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'mango', label: 'Mango' },
    { value: 'apple', label: 'Apple' },
    { value: 'orange', label: 'Orange' }
  ];

  const smokelessQuantities = [
    { value: '100mg', label: '100mg' },
    { value: '200mg', label: '200mg' },
    { value: '300mg', label: '300mg' },
    { value: '400mg', label: '400mg' },
    { value: '500mg', label: '500mg' }
  ];

  const shotsFlavors = [
    { value: 'fruit_punch', label: 'Fruit Punch' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'kola_champagne', label: 'Kola Champagne' },
    { value: 'grape', label: 'Grape' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'mango', label: 'Mango' },
    { value: 's_g', label: 'S&G' }
  ];

  const genericQuantities = Array.from({ length: 7 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1)
  }));

  const chocolateFlavors = [
    { value: 'dry_roasted', label: 'Dry roasted' },
    { value: 'fruit_and_nut', label: 'Fruit & Nut' },
    { value: 'rum_and_raisin', label: 'Rum & Raisin' },
    { value: 'cashews', label: 'Cashews' }
  ];

  return (
    <div className="bg-black text-light min-vh-100">
      <Navbar />
      <Hero />

      {/* Contact supplier header bar */}
      <section className="news-input p-4">
        <div className="container">
          <div className="d-md-flex justify-content-between align-items-center">
            <h2 className="mb-3 mb-md-0">Contact your local supplier...</h2>
          </div>
        </div>
      </section>

      <About />

      {/* Smokeless Selection */}
      <ProductSection
        id="smokeless"
        title="Smokeless Selection"
        imgSrc="/app/img/about/smokeless_about.webp"
        imgAlt="CBD Fresh Juices in Glasses"
        subTitle="CBD with a Burst of Freshness"
        description="Our CBD-infused fresh juices offer a delightful way to incorporate CBD into your daily routine. Sourced from premium hemp extracts, our CBD is blended with the purest, juiciest fruits to create a truly refreshing and revitalizing experience. Each sip provides a moment of relaxation and rejuvenation, making it the perfect addition to your morning routine or as a pick-me-up throughout the day."
        bullets={[
          '100% Pure & Natural.',
          'Various strengths available',
          'A Refreshing Twist on Wellness',
          'Vegan Friendly'
        ]}
      >
        <ProductCard
          imgSrc="/app/img/smokeless/pineappleSmokeless-transformed.webp"
          imgAlt="CBD Fresh Fruit Juices"
          flavors={smokelessFlavors}
          quantities={smokelessQuantities}
          borderColorClass="border-warning"
          buttonId="feedbackButtonSmokeless"
        />
      </ProductSection>

      {/* Shots Selection */}
      <ProductSection
        id="shots"
        title="Shots Selection"
        imgSrc="/app/img/about/shots_selection_500x332.webp"
        imgAlt="CBD Tincture Bottles"
        subTitle="Pure, Potent, and Packed with Benefits"
        description="We've taken the last 7 years to perfect our recipe because we specialize in only providing the Highest Quality Best Tasting infused syrups. No other syrup compares to Feco Shots! Just like our other CBD products, our canna-infused syrups undergo rigorous quality testing to ensure they meet Our High Standards. We take pride in delivering a pure and potent experience that you can trust."
        bullets={[
          '100% Pure Sugar Cane Rum.',
          'Rapid Long Lasting Effects',
          'A Unique Blend Formulated by A.I.',
          'Official Collector\'s Edition Rum'
        ]}
      >
        <ProductCard
          imgSrc="/app/img/shots/feco_shots.png"
          imgAlt="Jar of topicals cream"
          flavors={shotsFlavors}
          quantities={genericQuantities}
          borderColorClass="border-warning"
          buttonId="feedbackButtonShots"
        />
      </ProductSection>

      {/* Cocktails Selection */}
      <ProductSection
        id="cocktails"
        title="Cocktails Selection"
        imgSrc="/app/img/about/club_feco_500x282.webp"
        imgAlt="Various CBD drinks in glasses"
        subTitle="Embrace the spirit of adventure"
        description="Prepare to transcend ordinary spirits with our unparalleled fusion of high-end oils and Jamaican White Rum. Meticulously crafted for versatility, it seamlessly combines with a multitude of spirits and cocktails, offering a truly unique and indulgent experience."
        bullets={[
          '100% Pure Sugar Cane Rum',
          'An Exceptional Blend Perfected by Artificial Intelligence',
          'Encounter Swift and Enduring Pleasures',
          'The Apex of Distinction',
          'An Official Collector\'s Edition Rum'
        ]}
      >
        <ProductCard
          imgSrc="/app/img/contender/CONTENDER_MANGO400x280.webp"
          imgAlt="CBD cocktails"
          flavors={shotsFlavors} // Cocktails uses the same flavor list in original HTML
          quantities={genericQuantities}
          borderColorClass="border-success"
          buttonId="feedbackButtonCocktails"
        />
      </ProductSection>

      {/* Chocolate Selection */}
      <ProductSection
        id="chocolates"
        title="Chocolate Selection"
        imgSrc="/app/img/about/chocolate_about_500x391.webp"
        imgAlt="CBD Chocolate Selection"
        subTitle="CBD-Infused Chocolates: A Decadent Delight"
        description="We use a variety of chocolates according to each recipe to ensure that we achieve a unique set of chocolates for our infusion."
        bullets={[
          'Delicious Wellness',
          'Various strengths available',
          'New Alcohol Infused Chocolates',
          'Wide selection available'
        ]}
      >
        <ProductCard
          imgSrc="/app/img/chocolates/VODKA & CRANBERRIES 500MG.webp"
          imgAlt="CBD chocolates"
          flavors={chocolateFlavors}
          quantities={genericQuantities}
          borderColorClass="border-warning"
          buttonId="feedbackButtonChocolate"
        />
      </ProductSection>

      {/* Carousel */}
      <section className="bg-black py-5">
        <div
          id="carouselDarkVariant"
          className="carousel slide carousel-fade carousel-dark mx-auto"
          data-mdb-ride="carousel"
          style={{ maxWidth: '800px' }}
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            <button
              data-mdb-target="#carouselDarkVariant"
              data-mdb-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              data-mdb-target="#carouselDarkVariant"
              data-mdb-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              data-mdb-target="#carouselDarkVariant"
              data-mdb-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          {/* Inner */}
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <img
                src="/app/img/carousel/cannabisPlant.webp"
                loading="lazy"
                className="d-block w-100 rounded"
                alt="Cannabis Plant"
                style={{ height: '450px', objectFit: 'cover' }}
              />
            </div>
            {/* Slide 2 */}
            <div className="carousel-item">
              <img
                src="/app/img/about/chocolate_about_500x391.webp"
                loading="lazy"
                className="d-block w-100 rounded"
                alt="CBD Chocolates"
                style={{ height: '450px', objectFit: 'cover' }}
              />
            </div>
            {/* Slide 3 */}
            <div className="carousel-item">
              <img
                src="/app/img/carousel/tincturePipe.webp"
                loading="lazy"
                className="d-block w-100 rounded"
                alt="CBD Tincture Collection"
                style={{ height: '450px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          id="myBtn"
          title="Go to top"
          className="d-block"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '30px',
            zIndex: 99,
            border: 'none',
            outline: 'none',
            backgroundColor: '#ffb338',
            color: '#000',
            cursor: 'pointer',
            padding: '12px 18px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          top
        </button>
      )}

      {/* MDB modal handles state internally via triggers */}
      <FeedbackModal />
    </div>
  );
}
