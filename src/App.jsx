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
import WhatsAppButton from './components/WhatsAppButton';
import NewsletterSignup from './components/NewsletterSignup';
import DeliveryZoneChecker from './components/DeliveryZoneChecker';
import WishlistDrawer from './components/WishlistDrawer';
import OrderTracking from './components/OrderTracking';
import ProductReviewsModal from './components/ProductReviewsModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAdminOrdersOpen, setIsAdminOrdersOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [activeReviewProduct, setActiveReviewProduct] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('feco_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('feco_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('feco_current_user');
  };
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('feco_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleOpenReviews = (key, title) => {
    setActiveReviewProduct({ key, title });
    setIsReviewsOpen(true);
  };
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(null);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
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
  const handleAddToCart = (productName, defaultImgSrc, flavor, strength, amount, basePrice, priceCalculator, imageMap) => {
    const itemPrice = priceCalculator ? priceCalculator(strength) : basePrice;
    const totalUnits = parseInt(amount, 10) || 1;
    
    const itemImgSrc = (imageMap && imageMap[flavor]) || defaultImgSrc;
    
    const itemId = `${productName}-${flavor}-${strength}`;

    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === itemId);
      if (existingItem) {
        return prevCart.map((i) => 
          i.id === itemId ? { ...i, count: i.count + totalUnits } : i
        );
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            name: productName,
            imgSrc: itemImgSrc,
            flavor,
            strength,
            amount: totalUnits,
            price: itemPrice,
            count: totalUnits
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

  const addToWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      const updated = [...prev, item];
      localStorage.setItem('feco_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      localStorage.setItem('feco_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const moveToCart = (id) => {
    const item = wishlist.find((i) => i.id === id);
    if (item) {
      handleAddToCart(item.name, item.imgSrc, item.flavor, item.strength, '1', item.price, null, {});
      removeFromWishlist(id);
    }
  };

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      let updated;
      if (exists) {
        updated = prev.filter((i) => i.id !== item.id);
      } else {
        updated = [...prev, item];
      }
      localStorage.setItem('feco_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (id) => wishlist.some((i) => i.id === id);

  const reorder = (order) => {
    order.items.forEach((item) => {
      handleAddToCart(item.name, item.imgSrc, item.flavor, item.strength, String(item.count || 1), item.price, null, {});
    });
  };

  const wishlistCount = wishlist.reduce((sum, item) => sum + item.count, 0);

  const smokelessFlavors = [
    { value: 'Pineapple', label: 'Pineapple' },
    { value: 'Mango', label: 'Mango' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Orange', label: 'Orange' },
    { value: 'Grape', label: 'Grape' }
  ];

  const smokelessStrengths = [
    { value: '100mg', label: '100mg' },
    { value: '250mg', label: '250mg' },
    { value: '500mg', label: '500mg' },
    { value: '1000mg', label: '1000mg' }
  ];

  const genericAmounts = Array.from({ length: 7 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1)
  }));

  const calculateSmokelessPrice = (strength) => {
    switch (strength) {
      case '250mg': return 20.00;
      case '500mg': return 30.00;
      case '1000mg': return 50.00;
      case '100mg':
      default:
        return 10.00;
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

  const shotsStrengths = [
    { value: '250mg', label: '250mg' },
    { value: '500mg', label: '500mg' },
    { value: '1000mg', label: '1000mg' }
  ];

  const calculateShotsPrice = (strength) => {
    switch (strength) {
      case '500mg': return 30.00;
      case '1000mg': return 50.00;
      case '250mg':
      default:
        return 20.00;
    }
  };

  const chocolateFlavors = [
    { value: 'Baileys & Honeycomb', label: 'Baileys & Honeycomb' },
    { value: 'Cashews', label: 'Cashews' },
    { value: 'Dry Roasted Nuts', label: 'Dry Roasted Nuts' },
    { value: 'Fruit & Nut', label: 'Fruit & Nut' },
    { value: 'Honey Roasted Nuts', label: 'Honey Roasted Nuts' },
    { value: 'Milk Chocolate', label: 'Milk Chocolate' },
    { value: 'Rum & Raisin', label: 'Rum & Raisin' },
    { value: 'Vodka & Cranberries', label: 'Vodka & Cranberries' },
    { value: 'Whiskey & Fruits', label: 'Whiskey & Fruits' }
  ];

  const chocolateStrengths = [
    { value: '100mg', label: '100mg' },
    { value: '250mg', label: '250mg' },
    { value: '500mg', label: '500mg' },
    { value: '1000mg', label: '1000mg' }
  ];

  const calculateChocolatePrice = (strength) => {
    switch (strength) {
      case '250mg': return 20.00;
      case '500mg': return 30.00;
      case '1000mg': return 50.00;
      case '100mg':
      default:
        return 10.00;
    }
  };

  const contenderStrengths = [
    { value: '2000mg', label: '2000mg' },
    { value: '3000mg', label: '3000mg' },
    { value: '4000mg', label: '4000mg' }
  ];

  const calculateContenderPrice = (strength) => {
    switch (strength) {
      case '3000mg': return 120.00;
      case '4000mg': return 150.00;
      case '2000mg':
      default:
        return 80.00;
    }
  };

  // Image Mapping Sets (Map option value to local image file path)
  const smokelessImages = {
    Pineapple: './img/smokeless/Smokeless - Pineapple.png',
    Mango: './img/smokeless/Smokeless - Mango.png',
    Apple: './img/smokeless/Smokeless - Apple.png',
    Orange: './img/smokeless/Smokeless - Orange.png',
    Grape: './img/smokeless/Smokeless - Grape.png'
  };

  const shotsImages = {
    'Fruit Punch': './img/shots/FECO SHOTS - FRUIT PUNCH.png',
    Strawberry: './img/shots/FECO_SHOTS_STRAWBERRY.png',
    'Kola Champagne': './img/shots/FECO SHOTS - KOLA CHAMPAGNE.png',
    Grape: './img/shots/FECO SHOTS - GRAPE (2).png',
    Pineapple: './img/shots/FECO SHOTS - PINEAPPLE.png',
    Mango: './img/shots/FECO SHOTS - MANGO.png',
    'Pineapple & Ginger': './img/shots/FECO SHOTS - PINEAPPLE & GINGER.png',
    'S&G': './img/shots/FECO SHOTS - SORREL & GINGER_LITE.png',
    Cherry: './img/shots/FECO_SHOTS_CHERRY_LITE.webp'
  };

  const contenderImages = {
    'Fruit Punch': './img/contender/CONTENDER FRUIT PUNCH (2).png',
    Strawberry: './img/contender/CONTENDER STRAWBERRY (2).png',
    'Kola Champagne': './img/contender/CONTENDER KOLA CHAMPAGNE (2).png',
    Grape: './img/contender/CONTENDER GRAPE (2).png',
    Pineapple: './img/contender/CONTENDER PINEAPPLE (2).png',
    Mango: './img/contender/CONTENDER_MANGO400x280.webp',
    'S&G': './img/contender/CONTENDER S&G.png',
    Cherry: './img/contender/CONTENDER CHERRY (2).png'
  };

  const chocolateImages = {
    'Baileys & Honeycomb': './img/chocolates/BAILEYS & HONEYCOMB 250MG.png',
    Cashews: './img/chocolates/CASHEWS 250MG.png',
    'Dry Roasted Nuts': './img/chocolates/DRY ROASTED NUTS 250MG.png',
    'Fruit & Nut': './img/chocolates/FRUIT & NUT 250MG.png',
    'Honey Roasted Nuts': './img/chocolates/HONEY ROASTED NUTS 250MG.png',
    'Milk Chocolate': './img/chocolates/MILK CHOCOLATE 250MG.png',
    'Rum & Raisin': './img/chocolates/RUM & RAISIN 250MG.png',
    'Vodka & Cranberries': './img/chocolates/VODKA & CRANBERRIES 250MG.png',
    'Whiskey & Fruits': './img/chocolates/WHISKEY & FRUITS  500MG.png'
  };

  return (
    <div className="bg-black text-light min-vh-100">
      <Navbar 
        cartCount={getCartCount()} 
        onCartClick={() => setIsCartOpen(true)}
        wishlistCount={wishlistCount}
        onWishlistClick={() => setIsWishlistOpen(true)}
        pendingOrdersCount={orders.filter((o) => o.status === 'Pending').length}
        onOpenAdminOrders={() => setIsPinModalOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
      <Hero />


      <section className="bg-black py-4 border-top border-secondary">
        <div className="container">
          <DeliveryZoneChecker onDeliveryAvailable={setDeliveryAvailable} />
        </div>
      </section>

      <About />

      {/* Smokeless Section */}
      <ProductSection
          id="smokeless"
          title="Smokeless Selection"
          imgSrc="./img/about/smokeless_about.webp"
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
            imgSrc="./img/smokeless/Smokeless - Pineapple.png"
            imgAlt="CBD Fresh Fruit Juices"
            flavors={smokelessFlavors}
            strengths={smokelessStrengths}
            amounts={genericAmounts}
            borderColorClass="border-warning"
            buttonId="feedbackButtonSmokeless"
            imageMap={smokelessImages}
            productKey="smokeless"
            wishlistIds={wishlist.map((i) => i.id)}
            onToggleWishlist={toggleWishlist}
            onOpenReviews={handleOpenReviews}
            onAddToCart={(flavor, strength, amount) => 
              handleAddToCart('Smokeless Juice', './img/smokeless/Smokeless - Pineapple.png', flavor, strength, amount, 10.00, calculateSmokelessPrice, smokelessImages)
            }
          />
          </ProductSection>

      {/* Shots Section */}
      <ProductSection
          id="shots"
          title="Shots Selection"
          imgSrc="./img/about/shots_selection_500x332.webp"
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
            imgSrc="./img/shots/FECO SHOTS - FRUIT PUNCH.png"
            imgAlt="Feco Shots Syrups"
            flavors={shotsFlavors}
            strengths={shotsStrengths}
            amounts={genericAmounts}
            borderColorClass="border-warning"
            buttonId="feedbackButtonShots"
            imageMap={shotsImages}
            productKey="shots"
            wishlistIds={wishlist.map((i) => i.id)}
            onToggleWishlist={toggleWishlist}
            onOpenReviews={handleOpenReviews}
            onAddToCart={(flavor, strength, amount) => 
              handleAddToCart('Feco Shot', './img/shots/FECO SHOTS - FRUIT PUNCH.png', flavor, strength, amount, 20.00, calculateShotsPrice, shotsImages)
            }
          />
        </ProductSection>

      {/* Cocktails Section */}
        <ProductSection
          id="cocktails"
          title="Contender Selection"
          imgSrc="./img/about/club_feco_500x282.webp"
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
            imgSrc="./img/contender/CONTENDER FRUIT PUNCH (2).png"
            imgAlt="CBD cocktails"
            flavors={shotsFlavors}
            strengths={contenderStrengths}
            amounts={genericAmounts}
            borderColorClass="border-success"
            buttonId="feedbackButtonCocktails"
            imageMap={contenderImages}
            productKey="contender"
            wishlistIds={wishlist.map((i) => i.id)}
            onToggleWishlist={toggleWishlist}
            onOpenReviews={handleOpenReviews}
            onAddToCart={(flavor, strength, amount) => 
              handleAddToCart('Contender Cocktail', './img/contender/CONTENDER FRUIT PUNCH (2).png', flavor, strength, amount, 80.00, calculateContenderPrice, contenderImages)
            }
          />
        </ProductSection>

      {/* Chocolate Section */}
        <ProductSection
          id="chocolates"
          title="Chocolate Selection"
          imgSrc="./img/about/chocolate_about_500x391.webp"
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
            imgSrc="./img/chocolates/BAILEYS & HONEYCOMB 250MG.png"
            imgAlt="CBD chocolates"
            flavors={chocolateFlavors}
            strengths={chocolateStrengths}
            amounts={genericAmounts}
            borderColorClass="border-warning"
            buttonId="feedbackButtonChocolate"
            imageMap={chocolateImages}
            productKey="chocolate"
            wishlistIds={wishlist.map((i) => i.id)}
            onToggleWishlist={toggleWishlist}
            onOpenReviews={handleOpenReviews}
            onAddToCart={(flavor, strength, amount) => 
              handleAddToCart('Infused Chocolate Bar', './img/chocolates/BAILEYS & HONEYCOMB 250MG.png', flavor, strength, amount, 10.00, calculateChocolatePrice, chocolateImages)
            }
          />
        </ProductSection>

      {/* Carousel */}
      <section className="bg-black py-5">
        <div
          id="carouselDarkVariant"
          className="carousel slide carousel-fade mx-auto"
          style={{ maxWidth: '800px' }}
        >
          <div className="carousel-inner">
            {[
              { src: './img/carousel/cannabisPlant.webp', alt: 'Cannabis Plant' },
              { src: './img/about/chocolate_about_500x391.webp', alt: 'CBD Chocolates' },
              { src: './img/carousel/tincturePipe.webp', alt: 'CBD Tincture Collection' }
            ].map((slide, index) => (
              <div
                key={index}
                className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
              >
                <img
                  src={slide.src}
                  loading="lazy"
                  className="d-block w-100 rounded"
                  alt={slide.alt}
                  style={{ height: '450px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
            style={{ width: '50px', height: '50px', top: '50%', transform: 'translateY(-50%)', marginLeft: '10px' }}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
            style={{ width: '50px', height: '50px', top: '50%', transform: 'translateY(-50%)', marginRight: '10px' }}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </button>

          <div className="carousel-indicators d-flex justify-content-center gap-2 mt-3">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`rounded-circle border-0 ${index === currentSlide ? 'bg-warning' : 'bg-secondary'}`}
                style={{ width: '12px', height: '12px' }}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {/* Discreet Small Back To Top Arrow Button (Hidden when cart or modal is open) */}
      {!isCartOpen && !isAdminOrdersOpen && !isPinModalOpen && showScrollBtn && (
        <button
          onClick={scrollToTop}
          id="myBtn"
          title="Go to top"
          className="d-flex align-items-center justify-content-center shadow-sm"
          style={{
            position: 'fixed',
            bottom: '15px',
            right: '15px',
            zIndex: 50,
            border: 'none',
            outline: 'none',
            backgroundColor: '#ffb338',
            color: '#000',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            fontSize: '14px'
          }}
        >
          <i className="fas fa-arrow-up"></i>
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
        deliveryAvailable={deliveryAvailable}
        onReorder={reorder}
        pastOrders={orders}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={removeFromWishlist}
        onMoveToCart={moveToCart}
      />

      {/* Order Tracking Modal */}
      <OrderTracking
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
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

      {/* Product Reviews & Feedback Modal */}
      <ProductReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        activeProduct={activeReviewProduct}
      />

      {/* Customer Auth & Account Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        userOrders={orders.filter((o) => currentUser && o.customer && o.customer.name && o.customer.name.toLowerCase().includes(currentUser.name.toLowerCase()))}
      />

      {/* Age Verification Gate (18+) */}
      <AgeGateModal />

      <FeedbackModal />
    </div>
  );
}
