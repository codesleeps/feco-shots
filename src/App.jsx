import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductSection from './components/ProductSection';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import FeedbackModal from './components/FeedbackModal';
import CartDrawer from './components/CartDrawer';
import AdminOrdersModal from './components/AdminOrdersModal';
import AgeGateModal from './components/AgeGateModal';
import OwnerPinModal from './components/OwnerPinModal';
import ProductSearchBar from './components/ProductSearchBar';

export default function App() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAdminOrdersOpen, setIsAdminOrdersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('feco_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

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

  const handleSaveOrder = (newOrder) => {
    setOrders((prevOrders) => {
      const updated = [newOrder, ...prevOrders];
      localStorage.setItem('feco_orders', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) => {
      const updated = prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      localStorage.setItem('feco_orders', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) => {
      const updated = prevOrders.filter((order) => order.id !== orderId);
      localStorage.setItem('feco_orders', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearCompletedOrders = () => {
    setOrders((prevOrders) => {
      const updated = prevOrders.filter((order) => order.status !== 'Completed');
      localStorage.setItem('feco_orders', JSON.stringify(updated));
      return updated;
    });
  };

  // Add Item to Checkout Cart
  const handleAddToCart = (productName, defaultImgSrc, flavor, quantitySelect, basePrice, priceCalculator, imageMap) => {
    const itemPrice = priceCalculator ? priceCalculator(quantitySelect) : basePrice;
    
    // Resolve dynamic image based on flavor selection map
    const itemImgSrc = (imageMap && imageMap[flavor]) || defaultImgSrc;
    
    // Dynamic ID key based on properties
    const itemId = `${productName}-${flavor}-${quantitySelect}`;

    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === itemId);
      if (existingItem) {
        return prevCart.map((i) => 
          i.id === itemId ? { ...i, count: i.count + 1 } : i
        );
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            name: productName,
            imgSrc: itemImgSrc,
            flavor,
            quantitySelect,
            price: itemPrice,
            count: 1
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQty = (id, change) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.count + change;
          return newQty > 0 ? { ...item, count: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.count, 0);
  };

  // Product Lists
  const smokelessFlavors = [
    { value: 'Pineapple', label: 'Pineapple' },
    { value: 'Mango', label: 'Mango' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Orange', label: 'Orange' },
    { value: 'Grape', label: 'Grape' }
  ];

  const smokelessQuantities = [
    { value: '100mg', label: '100mg' },
    { value: '200mg', label: '200mg' },
    { value: '300mg', label: '300mg' },
    { value: '400mg', label: '400mg' },
    { value: '500mg', label: '500mg' }
  ];

  const calculateSmokelessPrice = (strength) => {
    switch (strength) {
      case '200mg': return 14.99;
      case '300mg': return 19.99;
      case '400mg': return 24.99;
      case '500mg': return 29.99;
      case '100mg':
      default:
        return 9.99;
    }
  };

  const shotsFlavors = [
    { value: 'Fruit Punch', label: 'Fruit Punch' },
    { value: 'Strawberry', label: 'Strawberry' },
    { value: 'Kola Champagne', label: 'Kola Champagne' },
    { value: 'Grape', label: 'Grape' },
    { value: 'Pineapple', label: 'Pineapple' },
    { value: 'Mango', label: 'Mango' },
    { value: 'Pineapple & Ginger', label: 'Pineapple & Ginger' },
    { value: 'S&G', label: 'Sorrel & Ginger (S&G)' },
    { value: 'Cherry', label: 'Cherry' }
  ];

  const genericQuantities = Array.from({ length: 7 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1)
  }));

  const chocolateFlavors = [
    { value: 'Baileys & Honeycomb', label: 'Baileys & Honeycomb 250mg' },
    { value: 'Cashews', label: 'Cashews 250mg' },
    { value: 'Dry Roasted Nuts', label: 'Dry Roasted Nuts 250mg' },
    { value: 'Fruit & Nut', label: 'Fruit & Nut 250mg' },
    { value: 'Honey Roasted Nuts', label: 'Honey Roasted Nuts 250mg' },
    { value: 'Milk Chocolate', label: 'Milk Chocolate 250mg' },
    { value: 'Rum & Raisin', label: 'Rum & Raisin 250mg' },
    { value: 'Vodka & Cranberries', label: 'Vodka & Cranberries 250mg' },
    { value: 'Whiskey & Fruits', label: 'Whiskey & Fruits 500mg' }
  ];

  // Image Mapping Sets (Map option value to local image file path)
  const smokelessImages = {
    Pineapple: '/img/smokeless/Smokeless - Pineapple.png',
    Mango: '/img/smokeless/Smokeless - Mango.png',
    Apple: '/img/smokeless/Smokeless - Apple.png',
    Orange: '/img/smokeless/Smokeless - Orange.png',
    Grape: '/img/smokeless/Smokeless - Grape.png'
  };

  const shotsImages = {
    'Fruit Punch': '/img/shots/FECO SHOTS - FRUIT PUNCH.png',
    Strawberry: '/img/shots/FECO_SHOTS_STRAWBERRY.png',
    'Kola Champagne': '/img/shots/FECO SHOTS - KOLA CHAMPAGNE.png',
    Grape: '/img/shots/FECO SHOTS - GRAPE (2).png',
    Pineapple: '/img/shots/FECO SHOTS - PINEAPPLE.png',
    Mango: '/img/shots/FECO SHOTS - MANGO.png',
    'Pineapple & Ginger': '/img/shots/FECO SHOTS - PINEAPPLE & GINGER.png',
    'S&G': '/img/shots/FECO SHOTS - SORREL & GINGER_LITE.png',
    Cherry: '/img/shots/FECO_SHOTS_CHERRY_LITE.webp'
  };

  const contenderImages = {
    'Fruit Punch': '/img/contender/CONTENDER FRUIT PUNCH (2).png',
    Strawberry: '/img/contender/CONTENDER STRAWBERRY (2).png',
    'Kola Champagne': '/img/contender/CONTENDER KOLA CHAMPAGNE (2).png',
    Grape: '/img/contender/CONTENDER GRAPE (2).png',
    Pineapple: '/img/contender/CONTENDER PINEAPPLE (2).png',
    Mango: '/img/contender/CONTENDER_MANGO400x280.webp',
    'S&G': '/img/contender/CONTENDER S&G.png',
    Cherry: '/img/contender/CONTENDER CHERRY (2).png'
  };

  const chocolateImages = {
    'Baileys & Honeycomb': './public/img/chocolates/BAILEYS & HONEYCOMB 250MG.png',
    Cashews: './public/img/chocolates/CASHEWS 250MG.png',
    'Dry Roasted Nuts': './public/img/chocolates/DRY ROASTED NUTS 250MG.png',
    'Fruit & Nut': './public/img/chocolates/FRUIT & NUT 250MG.png',
    'Honey Roasted Nuts': './public/img/chocolates/HONEY ROASTED NUTS 250MG.png',
    'Milk Chocolate': './public/img/chocolates/MILK CHOCOLATE 250MG.png',
    'Rum & Raisin': './public/img/chocolates/RUM & RAISIN 250MG.png',
    'Vodka & Cranberries': './public/img/chocolates/VODKA & CRANBERRIES 250MG.png',
    'Whiskey & Fruits': './public/img/chocolates/WHISKEY & FRUITS  500MG.png'
  };

  return (
    <div className="bg-black text-light min-vh-100">
      <Navbar 
        cartCount={getCartCount()} 
        onCartClick={() => setIsCartOpen(true)} 
        pendingOrdersCount={orders.filter((o) => o.status === 'Pending').length}
        onOpenAdminOrders={() => setIsPinModalOpen(true)}
      />
      <Hero />

      {/* Interactive Search & Category Filter Bar */}
      <ProductSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <section className="news-input p-4">
        <div className="container">
          <div className="d-md-flex justify-content-between align-items-center">
            <h2 className="mb-3 mb-md-0">Contact your local supplier...</h2>
          </div>
        </div>
      </section>

      <About />

      {/* Smokeless Section */}
      <ProductSection
        id="smokeless"
        title="Smokeless Selection"
        imgSrc="/img/about/smokeless_about.webp"
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
          imgSrc="/img/smokeless/Smokeless - Pineapple.png"
          imgAlt="CBD Fresh Fruit Juices"
          flavors={smokelessFlavors}
          quantities={smokelessQuantities}
          borderColorClass="border-warning"
          buttonId="feedbackButtonSmokeless"
          imageMap={smokelessImages}
          onAddToCart={(flavor, qty) => 
            handleAddToCart('Smokeless Juice', '/img/smokeless/Smokeless - Pineapple.png', flavor, qty, 9.99, calculateSmokelessPrice, smokelessImages)
          }
        />
      </ProductSection>

      {/* Shots Section */}
      <ProductSection
        id="shots"
        title="Shots Selection"
        imgSrc="/img/about/shots_selection_500x332.webp"
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
          imgSrc="/img/shots/FECO SHOTS - FRUIT PUNCH.png"
          imgAlt="Feco Shots Syrups"
          flavors={shotsFlavors}
          quantities={genericQuantities}
          borderColorClass="border-warning"
          buttonId="feedbackButtonShots"
          imageMap={shotsImages}
          onAddToCart={(flavor, qty) => 
            handleAddToCart('Feco Shot', '/img/shots/FECO SHOTS - FRUIT PUNCH.png', flavor, qty, 19.99, null, shotsImages)
          }
        />
      </ProductSection>

      {/* Cocktails Section */}
      <ProductSection
        id="cocktails"
        title="Contender Selection"
        imgSrc="/img/about/club_feco_500x282.webp"
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
          imgSrc="/img/contender/CONTENDER FRUIT PUNCH (2).png"
          imgAlt="CBD cocktails"
          flavors={shotsFlavors}
          quantities={genericQuantities}
          borderColorClass="border-success"
          buttonId="feedbackButtonCocktails"
          imageMap={contenderImages}
          onAddToCart={(flavor, qty) => 
            handleAddToCart('Contender Cocktail', '/img/contender/CONTENDER FRUIT PUNCH (2).png', flavor, qty, 24.99, null, contenderImages)
          }
        />
      </ProductSection>

      {/* Chocolate Section */}
      <ProductSection
        id="chocolates"
        title="Chocolate Selection"
        imgSrc="/img/about/chocolate_about_500x391.webp"
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
          imgSrc="./public/img/chocolates/BAILEYS & HONEYCOMB 250MG.png"
          imgAlt="CBD chocolates"
          flavors={chocolateFlavors}
          quantities={genericQuantities}
          borderColorClass="border-warning"
          buttonId="feedbackButtonChocolate"
          imageMap={chocolateImages}
          onAddToCart={(flavor, qty) => 
            handleAddToCart('Infused Chocolate Bar', './public/img/chocolates/BAILEYS & HONEYCOMB 250MG.png', flavor, qty, 14.99, null, chocolateImages)
          }
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

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/img/carousel/cannabisPlant.webp"
                loading="lazy"
                className="d-block w-100 rounded"
                alt="Cannabis Plant"
                style={{ height: '450px', objectFit: 'cover' }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="/img/about/chocolate_about_500x391.webp"
                loading="lazy"
                className="d-block w-100 rounded"
                alt="CBD Chocolates"
                style={{ height: '450px', objectFit: 'cover' }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="/img/carousel/tincturePipe.webp"
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

      {/* Floating Cart Button */}
      <button 
        className="floating-cart-btn" 
        onClick={() => setIsCartOpen(true)}
        aria-label="Open Shopping Cart"
      >
        <i className="fas fa-shopping-cart fa-lg"></i>
        {getCartCount() > 0 && (
          <span className="floating-cart-badge">{getCartCount()}</span>
        )}
      </button>

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

      {/* Checkout Cart Drawer Component */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
        clearCart={clearCart}
        onSaveOrder={handleSaveOrder}
      />

      {/* Store Owner Orders Management Modal */}
      <AdminOrdersModal
        isOpen={isAdminOrdersOpen}
        onClose={() => setIsAdminOrdersOpen(false)}
        orders={orders}
        onUpdateStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onClearCompleted={handleClearCompletedOrders}
      />

      {/* Owner PIN Verification Lock Modal */}
      <OwnerPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={() => {
          setIsPinModalOpen(false);
          setIsAdminOrdersOpen(true);
        }}
      />

      {/* Age Verification Gate (18+) */}
      <AgeGateModal />

      <FeedbackModal />
    </div>
  );
}
