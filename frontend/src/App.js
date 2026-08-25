import { useState, useEffect } from "react";
import "@/App.css";
import ProductCatalog from "@/components/ProductCatalog";
import CatalogueDialog from "@/components/CatalogueDialog";
import { 
  Package, 
  Sparkles, 
  SprayCan, 
  ChefHat, 
  FileText, 
  CheckCircle2, 
  Truck, 
  Award, 
  ShieldCheck, 
  IndianRupee,
  Building2,
  Home,
  Hotel,
  Briefcase,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Download,
  ChevronDown,
  ChevronRight,
  MapPin,
  Users
} from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    hotelName: '',
    requirement: '',
    quantity: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [catalogueDialogOpen, setCatalogueDialogOpen] = useState(false);

  // Hero carousel images
  const heroCarouselImages = [
    "/images/clarion-amenities.jpg",
    "/images/white-leaf-amenities.jpg",
    "/images/deccan-serai-amenities.jpg",
    "/images/park-amenities.jpg"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'products', 'about', 'clients', 'solutions', 'catalogue', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % heroCarouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroCarouselImages.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', hotelName: '', requirement: '', quantity: '' });
    }, 3000);
  };

  const whyChooseUs = [
    {
      icon: ShieldCheck,
      title: "Consistent Quality",
      description: "Unwavering quality standards across all bulk orders, ensuring your brand reputation remains impeccable."
    },
    {
      icon: Award,
      title: "Custom Branding",
      description: "Private label options and custom packaging solutions tailored to your property's unique identity."
    },
    {
      icon: Package,
      title: "Comprehensive Range",
      description: "Complete hospitality supply solutions under one roof, simplifying your procurement process."
    },
    {
      icon: Truck,
      title: "Reliable Supply Chain",
      description: "Dependable delivery schedules and inventory management to keep your operations running smoothly."
    },
    {
      icon: IndianRupee,
      title: "Competitive Pricing",
      description: "Premium quality products at competitive wholesale rates, optimizing your operational costs."
    },
    {
      icon: Users,
      title: "Expo Participation",
      description: "Active participants in leading hospitality expos, staying updated with industry trends and innovations."
    }
  ];

  const clientTypes = [
    { icon: Hotel, title: "Hotels", description: "Full-service hospitality solutions" },
    { icon: Building2, title: "Resorts", description: "Luxury property supplies" },
    { icon: Home, title: "Boutique Stays", description: "Curated amenity packages" },
    { icon: Home, title: "Guest Houses", description: "Essential guest supplies" },
    { icon: Briefcase, title: "Corporate Facilities", description: "Professional workspace essentials" },
    { icon: Calendar, title: "Event Planners", description: "Event supply solutions" }
  ];

  const clientLogos = [
    { src: "/images/client-royalton-hotels.png", bg: "#10110C" },
    { src: "/images/client-iit-hyderabad.png" },
    { src: "/images/client-ellaa-hotel.png", bg: "#0D502F" },
    { src: "/images/client-regenta-place.png" },
    { src: "/images/client-greenpark-hotels.png" },
    { src: "/images/client-stae-hotels.png", bg: "#E94F37" },
    { src: "/images/client-priya.png" },
    { src: "/images/client-royal-orchid-transparent.png" },
    { src: "/images/client-lemon-tree-transparent.png" },
    { src: "/images/client-fairfield-marriott.png" },
    { src: "/images/client-daspalla.png" },
    { src: "/images/client-casa-hotel-suites.png", bg: "#8A4347" },
    { src: "/images/client-deccan-serai-hotels.png" },
    { src: "/images/client-avasa-hotels.png" },
    { src: "/images/client-ginger-ihcl.png" },
    { src: "/images/client-dhanturi-group.png", bg: "#123462" },
    { src: "/images/client-sarovar-hotels.png" },
    { src: "/images/client-monday-hotels.png", bg: "#003B95" },
    { src: "/images/client-clarks-inn-transparent.png" },
    { src: "/images/client-skyla-transparent.png" },
    { src: "/images/client-the-park-transparent.png" },
    { src: "/images/client-best-western.png" },
    { src: "/images/client-click-hotels-suba.png" },
    { src: "/images/client-trunk-and-trolley.png", bg: "#0D3455" },
    { src: "/images/client-clarion-choice-hotels.png" }
  ];

  return (
    <div className="App min-h-screen bg-ivory font-poppins">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1E283D] shadow-lg ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        data-testid="header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/amaravati-logo-transparent.png" 
                alt="Amaravati Enterprises" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
            
            <nav className="hidden md:flex space-x-8" data-testid="nav-menu">
              {[
                { id: 'home', label: 'Home' },
                { id: 'products', label: 'Products' },
                { id: 'about', label: 'About' },
                { id: 'clients', label: 'Clients' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-ivory/80 hover:text-gold'
                  }`}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              data-testid="header-get-quote-btn"
            >
              Get Quote
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ivory to-white" data-testid="hero-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
                Elevating Guest Experiences with Premium Hospitality Supplies
              </h1>
              <p className="text-lg md:text-xl text-charcoal-light leading-relaxed">
                From toiletries to housekeeping essentials and kitchen consumables — everything your property needs, delivered with consistency and elegance.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  data-testid="explore-products-btn"
                >
                  Explore Products
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCatalogueDialogOpen(true)}
                  className="bg-white border-2 border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                  data-testid="download-catalogue-btn"
                >
                  <Download className="w-5 h-5" />
                  Brochure
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-charcoal hover:bg-charcoal-light text-white px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  data-testid="get-quote-btn"
                >
                  Get Quote
                </button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="relative h-[500px] overflow-hidden rounded-lg shadow-2xl">
                {heroCarouselImages.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`Luxury hotel amenities ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentCarouselIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent"></div>
                
                {/* Carousel indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {heroCarouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCarouselIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentCarouselIndex ? 'bg-gold w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-ivory" data-testid="products-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Our Comprehensive Product Range
            </h2>
            <p className="text-lg text-charcoal-light max-w-3xl mx-auto">
              Complete hospitality supplies designed to exceed guest expectations and streamline your operations.
            </p>
          </div>

          <ProductCatalog />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ivory to-white" data-testid="about-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Why Choose Amaravati Enterprises
            </h2>
            <p className="text-lg text-charcoal-light max-w-3xl mx-auto">
              Your trusted partner for premium hospitality supplies across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group"
                data-testid={`feature-card-${index}`}
              >
                <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-gold group-hover:text-white" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-charcoal-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section with Logo Carousel */}
      <section id="clients" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" data-testid="clients-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Who We Serve
            </h2>
            <p className="text-lg text-charcoal-light max-w-3xl mx-auto">
              Partnering with hospitality leaders across diverse sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {clientTypes.map((client, index) => (
              <div 
                key={index}
                className="bg-ivory p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-4 group"
                data-testid={`client-type-${index}`}
              >
                <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-gold transition-all duration-300">
                  <client.icon className="w-6 h-6 text-gold group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-charcoal mb-1">{client.title}</h3>
                  <p className="text-sm text-charcoal-light">{client.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Logo Carousel */}
          <div className="bg-gradient-to-r from-ivory via-white to-ivory py-12 rounded-lg overflow-hidden">
            <h3 className="text-center font-playfair text-2xl font-bold text-charcoal mb-8">
              Trusted by Leading Hospitality Brands
            </h3>
            <div className="relative overflow-hidden py-16">
              <div className="flex animate-scroll" style={{ width: `calc(212px * ${clientLogos.length * 2})` }}>
                {[...clientLogos, ...clientLogos].map((logo, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: logo.bg || '#ffffff' }}
                    className="relative z-0 hover:z-20 hover:scale-[2] transition-transform duration-300 flex-shrink-0 w-[180px] h-[100px] mx-4 flex items-center justify-center rounded-lg shadow-md p-1.5"
                  >
                    <img
                      src={logo.src}
                      alt={`Client logo ${index + 1}`}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Solutions Section */}
      <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-charcoal to-charcoal-light text-white" data-testid="solutions-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Comprehensive B2B Bulk Supply Solutions
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Tailored for hospitality businesses requiring consistent, large-scale procurement with personalized service.
              </p>
              <ul className="space-y-4">
                {[
                  "Flexible Minimum Order Quantities (MOQ)",
                  "Custom Packaging & Private Label Options",
                  "Fast Dispatch & Reliable Delivery",
                  "Dedicated Account Management",
                  "Competitive Wholesale Pricing",
                  "Quality Assurance on Every Order"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="/images/purely-serene-2.jpg"
                alt="Purely Serene hospitality amenities arranged for bulk supply"
                width="1200"
                height="500"
                loading="lazy"
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/30 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Download Section */}
      <section id="catalogue" className="py-20 px-4 sm:px-6 lg:px-8 bg-gold text-white" data-testid="catalogue-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Download Our Complete Product Catalogue
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Explore our full range of hospitality supplies with detailed specifications, pricing, and MOQ information.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCatalogueDialogOpen(true)}
              className="bg-white text-gold hover:bg-ivory px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
              data-testid="catalogue-download-btn"
            >
              <Download className="w-6 h-6" />
              Brochure
            </button>
            <a
              href="https://wa.me/919494600101?text=Hi, I would like to request the product catalogue for Amaravati Enterprises"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-charcoal text-white hover:bg-charcoal-light px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
              data-testid="whatsapp-catalogue-btn"
            >
              <MessageCircle className="w-6 h-6" />
              Request via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" data-testid="contact-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-charcoal-light max-w-3xl mx-auto">
              Ready to elevate your hospitality supply chain? Contact us today for a customized quote.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-charcoal mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-light">Call us at</p>
                      <a href="tel:+919494600101" className="text-lg font-semibold text-charcoal hover:text-gold">
                        +91 94946 00101
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-light">Email us</p>
                      <a href="mailto:amaravatienterprises.info@gmail.com" className="text-lg font-semibold text-charcoal hover:text-gold break-all">
                        amaravatienterprises.info@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-light">Visit us</p>
                      <p className="text-lg font-semibold text-charcoal">
                        C3, Banjara Gardens, Banjara Hills<br />
                        Rd No 12, Hyderabad<br />
                        Telangana, India – 500 034
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-light">WhatsApp</p>
                      <a 
                        href="https://wa.me/919494600101"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-charcoal hover:text-gold"
                      >
                        Chat with us
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gold/10 to-gold/5 p-8 rounded-lg">
                <h4 className="font-playfair text-xl font-bold text-charcoal mb-4">
                  Why Partner with Us?
                </h4>
                <ul className="space-y-3">
                  {[
                    "Fast response to inquiries",
                    "Customized bulk pricing",
                    "Nationwide delivery network",
                    "Dedicated account support"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-charcoal">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-ivory p-8 rounded-lg shadow-lg">
              <h3 className="font-playfair text-2xl font-bold text-charcoal mb-6">
                Request a Quote
              </h3>
              {formSubmitted ? (
                <div className="bg-green-50 border-2 border-green-500 text-green-700 p-6 rounded-lg text-center" data-testid="form-success-message">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
                  <p>We've received your inquiry and will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6" data-testid="contact-form">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Enter your full name"
                      data-testid="form-name-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="hotelName" className="block text-sm font-medium text-charcoal mb-2">
                      Hotel / Business Name *
                    </label>
                    <input
                      type="text"
                      id="hotelName"
                      name="hotelName"
                      value={formData.hotelName}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Enter your hotel or business name"
                      data-testid="form-hotel-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="requirement" className="block text-sm font-medium text-charcoal mb-2">
                      Requirement *
                    </label>
                    <textarea
                      id="requirement"
                      name="requirement"
                      value={formData.requirement}
                      onChange={handleFormChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                      placeholder="Describe your product requirements"
                      data-testid="form-requirement-input"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-charcoal mb-2">
                      Expected Quantity
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="e.g., 500 units per month"
                      data-testid="form-quantity-input"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    data-testid="form-submit-btn"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E283D] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/amaravati-logo-transparent.png"
              alt="Amaravati Enterprises"
              loading="lazy"
              className="h-32 w-auto object-contain"
            />
          </div>
          <p className="text-gray-400 mb-6">
            Premium Hospitality Supplies Across India
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <span>© 2025 Amaravati Enterprises</span>
            <span>|</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919494600101?text=Hi, I'm interested in learning more about your hospitality products"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
        data-testid="floating-whatsapp-btn"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      <CatalogueDialog open={catalogueDialogOpen} onOpenChange={setCatalogueDialogOpen} />
    </div>
  );
}

export default App;
