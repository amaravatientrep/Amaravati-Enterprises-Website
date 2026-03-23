import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, Package, CheckCircle2, Download } from "lucide-react";

const ProductCatalog = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubCategories, setExpandedSubCategories] = useState({});
  const [carouselIndices, setCarouselIndices] = useState({});

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubCategory = (id) => {
    setExpandedSubCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const nextCarouselImage = (categoryId) => {
    setCarouselIndices(prev => ({
      ...prev,
      [categoryId]: ((prev[categoryId] || 0) + 1)
    }));
  };

  const prevCarouselImage = (categoryId) => {
    setCarouselIndices(prev => ({
      ...prev,
      [categoryId]: Math.max(0, (prev[categoryId] || 0) - 1)
    }));
  };

  const productData = {
    hotelAmenities: {
      title: "Hotel Amenities",
      color: "gold",
      subCategories: {
        dryAmenities: {
          title: "Dry Amenities",
          packaging: [
            { name: "Laminated Paper Board Boxes", image: "/images/laminated-board-boxes.jpg" },
            { name: "Textured Card Boxes", image: "/images/textured-card-boxes.jpg" },
            { name: "Kraft Board Boxes", image: "/images/kraft-board-boxes.jpg" },
            { name: "Butter Paper Pouches", image: "/images/butter-paper-pouches.jpg" },
            { name: "Kraft Paper Pouches", image: "/images/kraft-paper-pouches.jpg" },
            { name: "Imported Kraft Paper Pouches", image: "/images/imported-kraft-pouches.jpg" }
          ],
          items: [
            { name: "Dental Kit", image: "/images/dental-kit.jpg" },
            { name: "Shaving Kit", image: "/images/shaving-kit.jpg" },
            { name: "Handle Comb", image: "/images/comb.jpg" },
            { name: "Shower Cap", image: "/images/shower-cap.jpg" },
            { name: "For Your Care Kit", image: "/images/for-your-care-kit.jpg" },
            { name: "Sewing Kit", image: "/images/sewing-kit.jpg" },
            { name: "Shoe Shiner", image: "/images/shoe-shine.jpg" },
            { name: "Laundry Bag", image: "/images/laundry-bag.jpg" },
            { name: "Slippers", image: "/images/slipper.jpg" },
            { name: "Patient Admission Kit", image: "/images/patient-admission-kit.jpg" },
            { name: "DND Card", image: "/images/dnd-card.jpg" },
            { name: "Toiletries Kit", images: ["/images/freshness-kit-1.jpg", "/images/freshness-kit-2.jpg"] }
          ]
        },
        wetAmenities: {
          title: "Wet Amenities",
          items: {
            "Soap": {
              variants: ["Glycerin Soap", "Cream Soap"],
              carouselImages: [
                "/images/soap-1.jpg",
                "/images/soap-2.jpg",
                "/images/soap-3.jpg",
                "/images/soap-4.jpg",
                "/images/soap-5.jpg",
                "/images/soap-6.jpg",
                "/images/soap-7.jpg"
              ]
            },
            "Shampoo, Shower Gel, Moisturiser, Conditioner": {
              variants: ["Available in 20ml, 25ml, 30ml, Tubes, 5lts Cans"],
              carouselImages: [
                "/images/wet-amenities-1.jpg",
                "/images/wet-amenities-2.jpg",
                "/images/wet-amenities-3.jpg",
                "/images/wet-amenities-4.jpg",
                "/images/wet-amenities-5.jpg"
              ]
            },
            "Wall Mount Dispensers": { variants: [], carouselImages: [] }
          }
        }
      }
    },
    purelySerene: {
      title: "Purely Serene Premium Amenities",
      color: "gold",
      carouselImages: [
        "/images/purely-serene-1.jpg",
        "/images/purely-serene-2.jpg",
        "/images/purely-serene-3.jpg",
        "/images/purely-serene-4.jpg",
        "/images/purely-serene-5.jpg",
        "/images/purely-serene-6.jpg",
        "/images/purely-serene-7.jpg",
        "/images/purely-serene-8.jpg",
        "/images/purely-serene-9.jpg",
        "/images/purely-serene-10.jpg"
      ],
      products: [
        "Glycerin Soap: Aloe Vera, Indian Spices",
        "Shampoo",
        "Shower Gel",
        "Moisturiser",
        "Conditioner",
        "500 ml Bottles",
        "5 Ltr Refill Cans"
      ]
    },
    stationery: {
      title: "Stationery",
      color: "charcoal",
      carouselImages: [
        "/images/stationery-1.jpg",
        "/images/stationery-2.jpg"
      ],
      products: [
        "Key Card Jacket",
        "Bottle Tag",
        "Scribbling Pad",
        "Pencil",
        "Pen",
        "Coaster",
        "Luggage Tag",
        "Valet Tag",
        "Menu Cards",
        "Envelopes",
        "Letter Heads"
      ]
    },
    housekeepingKitchen: {
      title: "House Keeping Supplies & Kitchen Consumables",
      color: "blue",
      cataloguePDF: "/housekeeping-kitchen-catalogue.pdf",
      categories: {
        "Carts & Trolleys": [
          "Janitorial Cart",
          "Linen Cart",
          "Restaurant Cart",
          "Bell Boy Trolley",
          "Platform Trolley",
          "Wringer Trolley"
        ],
        "House Keeping Fixtures & Equipment": [
          "Shoe Shiner Machine",
          "Shoe Cover Machine",
          "Fly Catcher",
          "Ladder",
          "Aerosol Dispenser",
          "Aroma Diffuser",
          "Queue Manager",
          "Safety Traffic Cones",
          "Hand Dryer",
          "Hair Dryer",
          "Iron",
          "Iron Board",
          "Soap Dispenser"
        ],
        "Paper Napkin & Holders": [
          "M fold Dispenser",
          "L Fold Dispenser",
          "HRT Roll Dispenser",
          "Kitchen Roll Dispenser",
          "Pop up Tissue Dispenser",
          "Leather Box Tissue Dispenser",
          "Toilet roll holder",
          "Soft Paper Napkin logo printed",
          "M Fold Napkins",
          "HRT & Utility Rolls",
          "Facial Tissue Refill",
          "Toiler Rolls"
        ],
        "Plastic Equipment & Dustbins": [
          "Plastic Wheel Dustbins 120 – 1100 lts",
          "Plastic Pedal Bin",
          "Plastic Bucket & Mug",
          "SS Swing, Ash Bin",
          "SS Perforated, Mesh, Pedal bin"
        ],
        "In Room Amenities & Fixtures": [
          "Wooden/ Plastic Hangers",
          "Glass Water Bottles",
          "Dry Iron & Iron Board",
          "Anti Theft Wall Mount Hair Dryer",
          "PVC Anti Skid Mats",
          "ABS Kettle Trays",
          "Wooden Kettle Trays",
          "Electric Kettle",
          "Amenities Tray",
          "Water Glass",
          "Coffee/ Tea Mug",
          "Ash Tray"
        ],
        "House Keeping Consumables": {
          items: [
            "Garbage Bags",
            "Dustbin Liners",
            "Soap Oil",
            "Phenyle",
            "Acid",
            "Caustic Soda",
            "Bleaching Powder",
            "Scrubbers",
            "Cloths",
            "Wet & Dry Mops",
            "Soft & Hard Brooms",
            "Wipers",
            "Hard/ Soft Brush",
            "Caution Boards",
            "Caddy Baskets",
            "Lobby Dust Pan",
            "Gloves",
            "Brushes",
            "Telescopic Pole",
            "Napthalene Balls"
          ],
          highlight: "Diversey Chemicals, TASKI, Suma, Crew, Clax"
        },
        "Kitchen Consumables": [
          "Plastic/ Paper/ Aluminum Containers",
          "Plastic/ Bagasse Meal Trays",
          "Plastic/ Bagasse Bowls",
          "Paper/ Plastic/ Ripple Glasses",
          "Paper/ Plastic/ Wooden Cutlery",
          "Cling Film",
          "Aluminum Foil"
        ]
      }
    },
    tcmSupplies: {
      title: "TCM Supplies",
      color: "green",
      carouselImages: [
        "/images/tcm-1.jpg",
        "/images/tcm-2.jpg",
        "/images/tcm-3.jpg",
        "/images/tcm-4.jpg",
        "/images/tcm-5.jpg",
        "/images/tcm-6.jpg",
        "/images/tcm-7.jpg",
        "/images/tcm-8.jpg"
      ],
      products: [
        "Goodwyn Tea Sachets: Assam Tea, Green Tea, Masala Tea, Chamomile Tea, Darjeeling Tea, Earl Grey Tea, English Breakfast Tea",
        "Sugar Sachets",
        "Brown Sugar Sachets",
        "Coffee Sachets",
        "Sugar Free Sachets",
        "Salt/ Pepper Sachets",
        "Wooden/ Plastic Stirrer",
        "Tea Spoon",
        "Kettle",
        "Tray"
      ]
    },
    biotique: {
      title: "Biotique Hotel Amenities",
      color: "green",
      cataloguePDF: "/biotique-catalogue.pdf",
      carouselImages: [
        "/images/biotique-1.jpg",
        "/images/biotique-2.jpg",
        "/images/biotique-3.jpg",
        "/images/biotique-4.jpg",
        "/images/biotique-5.jpg",
        "/images/biotique-6.jpg"
      ],
      products: [
        "Soaps: 15gm – 50gm",
        "Assorted Range 25ml & 35ml: Shampoo, Shower Gel, Moisturiser, Conditioner, Talcum Powder",
        "Orchid Tubes & Terraverde Tubes: Shampoo, Shower Gel, Moisturiser, Conditioner",
        "380ml Dispensers with Brackets: Farm Fresh, Assorted Range, Cypress Citrus & Neroli, Bergamot Patchouli",
        "5 Ltr Cans"
      ]
    },
    diverseyLape: {
      title: "Diversey Lape Hotel Amenities",
      color: "purple",
      categories: {
        "Premium 500ml Anti Theft Dispensers & 5 Ltr Cans": [
          "Shampoo & Conditioner (2 in 1)",
          "Shower Gel",
          "Body Lotion",
          "Hand Wash"
        ]
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Hotel Amenities */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gold/20">
        <button
          onClick={() => toggleCategory('hotelAmenities')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gold/10 to-transparent hover:from-gold/20 transition-all"
          data-testid="category-hotel-amenities"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-gold" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal">
              {productData.hotelAmenities.title}
            </h3>
          </div>
          {expandedCategories['hotelAmenities'] ? (
            <ChevronDown className="w-6 h-6 text-gold" />
          ) : (
            <ChevronRight className="w-6 h-6 text-gold" />
          )}
        </button>
        
        {expandedCategories['hotelAmenities'] && (
          <div className="p-6 space-y-6">
            {/* Dry Amenities */}
            <div className="border-l-4 border-gold pl-4">
              <button
                onClick={() => toggleSubCategory('dryAmenities')}
                className="w-full flex items-center justify-between mb-4 hover:text-gold transition-colors"
              >
                <h4 className="font-playfair text-xl font-bold text-charcoal">
                  Dry Amenities
                </h4>
                {expandedSubCategories['dryAmenities'] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
              
              {expandedSubCategories['dryAmenities'] && (
                <div className="space-y-4">
                  {/* Packaging Types */}
                  <div>
                    <h5 className="font-semibold text-charcoal mb-2 text-lg">Packaging Options:</h5>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {productData.hotelAmenities.subCategories.dryAmenities.packaging.map((pkg, idx) => (
                        <div key={idx} className="bg-ivory p-3 rounded-lg border border-gold/20 hover:border-gold/50 transition-all">
                          <p className="text-charcoal text-sm font-medium mb-2">{pkg.name}</p>
                          <div className="h-48 bg-gray-100 rounded overflow-hidden">
                            <img 
                              src={pkg.image} 
                              alt={pkg.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Dry Amenities Items */}
                  <div>
                    <h5 className="font-semibold text-charcoal mb-2 text-lg">Products:</h5>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {productData.hotelAmenities.subCategories.dryAmenities.items.map((item, idx) => (
                        <div key={idx} className={`bg-white p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all ${item.images ? 'md:col-span-2' : ''}`}>
                          {item.images ? (
                            // Multiple images for Toiletries Kit
                            <div>
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                {item.images.map((img, imgIdx) => (
                                  <div key={imgIdx} className="h-32 bg-gray-200 rounded overflow-hidden">
                                    <img 
                                      src={img} 
                                      alt={`${item.name} ${imgIdx + 1}`}
                                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                ))}
                              </div>
                              <p className="text-charcoal text-sm font-medium">{item.name}</p>
                            </div>
                          ) : (
                            // Single image or placeholder
                            <>
                              <div className="h-32 bg-gray-200 rounded mb-2 overflow-hidden flex items-center justify-center">
                                {item.image ? (
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <span className="text-xs text-gray-500">Image placeholder</span>
                                )}
                              </div>
                              <p className="text-charcoal text-sm font-medium">{item.name}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wet Amenities */}
            <div className="border-l-4 border-blue-500 pl-4">
              <button
                onClick={() => toggleSubCategory('wetAmenities')}
                className="w-full flex items-center justify-between mb-4 hover:text-blue-500 transition-colors"
              >
                <h4 className="font-playfair text-xl font-bold text-charcoal">
                  Wet Amenities
                </h4>
                {expandedSubCategories['wetAmenities'] ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
              
              {expandedSubCategories['wetAmenities'] && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(productData.hotelAmenities.subCategories.wetAmenities.items).map(([category, data], idx) => {
                    const hasCarousel = data.carouselImages && data.carouselImages.length > 0;
                    const currentIndex = carouselIndices[category] || 0;
                    const maxIndex = hasCarousel ? data.carouselImages.length - 1 : 0;
                    
                    return (
                      <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                        {hasCarousel ? (
                          // Carousel for Soap
                          <div className="relative h-48 bg-gray-200 rounded mb-2 overflow-hidden group">
                            <img 
                              src={data.carouselImages[currentIndex % data.carouselImages.length]} 
                              alt={`${category} ${currentIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {/* Carousel navigation buttons */}
                            {data.carouselImages.length > 1 && (
                              <>
                                <button
                                  onClick={() => prevCarouselImage(category)}
                                  disabled={currentIndex === 0}
                                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => nextCarouselImage(category)}
                                  disabled={currentIndex >= maxIndex}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                                {/* Carousel indicators */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                                  {data.carouselImages.map((_, imgIdx) => (
                                    <div
                                      key={imgIdx}
                                      className={`w-2 h-2 rounded-full ${
                                        imgIdx === currentIndex ? 'bg-gold' : 'bg-white/50'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-500">
                            Image placeholder
                          </div>
                        )}
                        <h5 className="font-semibold text-charcoal mb-1">{category}</h5>
                        {data.variants && data.variants.length > 0 && (
                          <ul className="text-sm text-charcoal-light space-y-1">
                            {data.variants.map((variant, vIdx) => (
                              <li key={vIdx}>• {variant}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Purely Serene Premium Amenities */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gold">
        <button
          onClick={() => toggleCategory('purelySerene')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gold/20 to-transparent hover:from-gold/30 transition-all"
          data-testid="category-purely-serene"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-gold" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal">
              {productData.purelySerene.title}
            </h3>
          </div>
          {expandedCategories['purelySerene'] ? (
            <ChevronDown className="w-6 h-6 text-gold" />
          ) : (
            <ChevronRight className="w-6 h-6 text-gold" />
          )}
        </button>
        
        {expandedCategories['purelySerene'] && (
          <div className="p-6">
            {/* Carousel */}
            <div className="relative h-96 bg-gray-200 rounded-lg mb-6 overflow-hidden group">
              <img 
                src={productData.purelySerene.carouselImages[(carouselIndices['purelySerene'] || 0) % productData.purelySerene.carouselImages.length]} 
                alt={`Purely Serene ${(carouselIndices['purelySerene'] || 0) + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Carousel navigation buttons */}
              <button
                onClick={() => prevCarouselImage('purelySerene')}
                disabled={(carouselIndices['purelySerene'] || 0) === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => nextCarouselImage('purelySerene')}
                disabled={(carouselIndices['purelySerene'] || 0) >= productData.purelySerene.carouselImages.length - 1}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              {/* Carousel indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {productData.purelySerene.carouselImages.map((_, imgIdx) => (
                  <div
                    key={imgIdx}
                    className={`w-2 h-2 rounded-full ${
                      imgIdx === (carouselIndices['purelySerene'] || 0) ? 'bg-gold w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Product List */}
            <div className="bg-gold/10 p-6 rounded-lg">
              <h4 className="font-playfair text-xl font-bold text-charcoal mb-4">Our Products:</h4>
              <ul className="grid md:grid-cols-2 gap-3">
                {productData.purelySerene.products.map((product, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-charcoal">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="font-medium">{product}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Stationery */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-charcoal/20">
        <button
          onClick={() => toggleCategory('stationery')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-charcoal/10 to-transparent hover:from-charcoal/20 transition-all"
          data-testid="category-stationery"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-charcoal" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal">
              {productData.stationery.title}
            </h3>
          </div>
          {expandedCategories['stationery'] ? (
            <ChevronDown className="w-6 h-6 text-charcoal" />
          ) : (
            <ChevronRight className="w-6 h-6 text-charcoal" />
          )}
        </button>
        
        {expandedCategories['stationery'] && (
          <div className="p-6">
            {/* Carousel */}
            <div className="relative h-96 bg-gray-200 rounded-lg mb-6 overflow-hidden group">
              <img 
                src={productData.stationery.carouselImages[(carouselIndices['stationery'] || 0) % productData.stationery.carouselImages.length]} 
                alt={`Stationery ${(carouselIndices['stationery'] || 0) + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Carousel navigation buttons */}
              {productData.stationery.carouselImages.length > 1 && (
                <>
                  <button
                    onClick={() => prevCarouselImage('stationery')}
                    disabled={(carouselIndices['stationery'] || 0) === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => nextCarouselImage('stationery')}
                    disabled={(carouselIndices['stationery'] || 0) >= productData.stationery.carouselImages.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  {/* Carousel indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {productData.stationery.carouselImages.map((_, imgIdx) => (
                      <div
                        key={imgIdx}
                        className={`w-2 h-2 rounded-full ${
                          imgIdx === (carouselIndices['stationery'] || 0) ? 'bg-charcoal w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product List */}
            <div className="bg-charcoal/10 p-6 rounded-lg">
              <h4 className="font-playfair text-xl font-bold text-charcoal mb-4">Our Products:</h4>
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {productData.stationery.products.map((product, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-charcoal">
                    <CheckCircle2 className="w-5 h-5 text-charcoal flex-shrink-0" />
                    <span className="font-medium">{product}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* House Keeping & Kitchen Consumables - Merged Category */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500/20">
        <button
          onClick={() => toggleCategory('housekeepingKitchen')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-transparent hover:from-blue-500/20 transition-all"
          data-testid="category-housekeeping-kitchen"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-600" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal">
              {productData.housekeepingKitchen.title}
            </h3>
          </div>
          {expandedCategories['housekeepingKitchen'] ? (
            <ChevronDown className="w-6 h-6 text-blue-600" />
          ) : (
            <ChevronRight className="w-6 h-6 text-blue-600" />
          )}
        </button>
        
        {expandedCategories['housekeepingKitchen'] && (
          <div className="p-6">
            {/* Download Catalogue Button */}
            <div className="mb-6 flex justify-center">
              <a 
                href={productData.housekeepingKitchen.cataloguePDF}
                download
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
                data-testid="download-hk-catalogue-btn"
              >
                <Download className="w-6 h-6" />
                Download Complete Catalogue (PDF)
              </a>
            </div>

            {/* Product Categories */}
            <div className="space-y-6">
              {Object.entries(productData.housekeepingKitchen.categories).map(([catName, items], idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-playfair text-xl font-bold text-charcoal mb-4">{catName}</h4>
                  {typeof items === 'object' && items.items ? (
                    <>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                        {items.items.map((item, iIdx) => (
                          <div key={iIdx} className="bg-ivory p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                            <p className="text-charcoal text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                      {items.highlight && (
                        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 mt-4">
                          <p className="text-blue-900 font-semibold text-lg text-center">
                            {items.highlight}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {items.map((item, iIdx) => (
                        <div key={iIdx} className="bg-ivory p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                          <p className="text-charcoal text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TCM Supplies */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-green-500/20">
        <button
          onClick={() => toggleCategory('tcm')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-green-500/10 to-transparent hover:from-green-500/20 transition-all"
          data-testid="category-tcm"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-green-600" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal">
              {productData.tcmSupplies.title}
            </h3>
          </div>
          {expandedCategories['tcm'] ? (
            <ChevronDown className="w-6 h-6 text-green-600" />
          ) : (
            <ChevronRight className="w-6 h-6 text-green-600" />
          )}
        </button>
        
        {expandedCategories['tcm'] && (
          <div className="p-6">
            {/* Carousel */}
            <div className="relative h-96 bg-gray-200 rounded-lg mb-6 overflow-hidden group">
              <img 
                src={productData.tcmSupplies.carouselImages[(carouselIndices['tcm'] || 0) % productData.tcmSupplies.carouselImages.length]} 
                alt={`TCM Supplies ${(carouselIndices['tcm'] || 0) + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Carousel navigation buttons */}
              {productData.tcmSupplies.carouselImages.length > 1 && (
                <>
                  <button
                    onClick={() => prevCarouselImage('tcm')}
                    disabled={(carouselIndices['tcm'] || 0) === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => nextCarouselImage('tcm')}
                    disabled={(carouselIndices['tcm'] || 0) >= productData.tcmSupplies.carouselImages.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  {/* Carousel indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {productData.tcmSupplies.carouselImages.map((_, imgIdx) => (
                      <div
                        key={imgIdx}
                        className={`w-2 h-2 rounded-full ${
                          imgIdx === (carouselIndices['tcm'] || 0) ? 'bg-green-600 w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product List */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-playfair text-xl font-bold text-charcoal mb-4">Our Products:</h4>
              <ul className="grid md:grid-cols-2 gap-3">
                {productData.tcmSupplies.products.map((product, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-charcoal">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium">{product}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Biotique */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-green-600/20">
        <button
          onClick={() => toggleCategory('biotique')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-green-600/10 to-transparent hover:from-green-600/20 transition-all"
          data-testid="category-biotique"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-green-700" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal">
              {productData.biotique.title}
            </h3>
          </div>
          {expandedCategories['biotique'] ? (
            <ChevronDown className="w-6 h-6 text-green-700" />
          ) : (
            <ChevronRight className="w-6 h-6 text-green-700" />
          )}
        </button>
        
        {expandedCategories['biotique'] && (
          <div className="p-6">
            {/* Carousel */}
            <div className="relative h-96 bg-gray-200 rounded-lg mb-6 overflow-hidden group">
              <img 
                src={productData.biotique.carouselImages[(carouselIndices['biotique'] || 0) % productData.biotique.carouselImages.length]} 
                alt={`Biotique ${(carouselIndices['biotique'] || 0) + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Carousel navigation buttons */}
              {productData.biotique.carouselImages.length > 1 && (
                <>
                  <button
                    onClick={() => prevCarouselImage('biotique')}
                    disabled={(carouselIndices['biotique'] || 0) === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => nextCarouselImage('biotique')}
                    disabled={(carouselIndices['biotique'] || 0) >= productData.biotique.carouselImages.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  {/* Carousel indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {productData.biotique.carouselImages.map((_, imgIdx) => (
                      <div
                        key={imgIdx}
                        className={`w-2 h-2 rounded-full ${
                          imgIdx === (carouselIndices['biotique'] || 0) ? 'bg-green-600 w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Download Catalogue Button */}
            <div className="mb-6 flex justify-center">
              <a 
                href={productData.biotique.cataloguePDF}
                download
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
                data-testid="download-biotique-catalogue-btn"
              >
                <Download className="w-6 h-6" />
                Download Biotique Catalogue (PDF)
              </a>
            </div>

            {/* Product List */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-playfair text-xl font-bold text-charcoal mb-4">Our Products:</h4>
              <ul className="grid md:grid-cols-2 gap-3">
                {productData.biotique.products.map((product, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-charcoal">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium">{product}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Diversey Lape */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-purple-500/20">
        <button
          onClick={() => toggleCategory('diversey')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-transparent hover:from-purple-500/20 transition-all"
          data-testid="category-diversey"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-purple-600" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal">
              {productData.diverseyLape.title}
            </h3>
          </div>
          {expandedCategories['diversey'] ? (
            <ChevronDown className="w-6 h-6 text-purple-600" />
          ) : (
            <ChevronRight className="w-6 h-6 text-purple-600" />
          )}
        </button>
        
        {expandedCategories['diversey'] && (
          <div className="p-6 space-y-6">
            {Object.entries(productData.diverseyLape.categories).map(([catName, items], idx) => (
              <div key={idx} className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-playfair text-xl font-bold text-charcoal mb-4">{catName}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:shadow-md transition-all">
                      <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-500">
                        Image placeholder
                      </div>
                      <p className="text-charcoal text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
