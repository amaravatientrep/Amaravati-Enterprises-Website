import { useState } from "react";
import { ChevronDown, ChevronRight, Package } from "lucide-react";

const ProductCatalog = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubCategories, setExpandedSubCategories] = useState({});

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubCategory = (id) => {
    setExpandedSubCategories(prev => ({ ...prev, [id]: !prev[id] }));
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
            "Soap": ["Glycerin Soap", "Cream Soap"],
            "Shampoo": [],
            "Shower Gel": [],
            "Moisturizer": [],
            "Conditioner": [],
            "Wall Mount Dispensers": []
          }
        }
      }
    },
    purelySerene: {
      title: "Purely Serene Premium Amenities",
      subtitle: "A Purely Serene Brand",
      color: "gold",
      items: [
        { name: "Glycerin Soap", variants: ["Aloe Vera", "Indian Spices"] },
        { name: "Shampoo" },
        { name: "Shower Gel" },
        { name: "Moisturiser" },
        { name: "Conditioner" },
        { name: "500 ml Bottles" },
        { name: "5 Ltr Refill Cans" }
      ]
    },
    stationery: {
      title: "Stationery",
      color: "charcoal",
      items: [
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
      ],
      hasCarousel: true
    },
    housekeeping: {
      title: "House Keeping Supplies",
      color: "blue",
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
        }
      }
    },
    kitchenConsumables: {
      title: "Kitchen Consumables",
      color: "orange",
      items: [
        "Plastic/ Paper/ Aluminum Containers",
        "Plastic/ Bagasse Meal Trays",
        "Plastic/ Bagasse Bowls",
        "Paper/ Plastic/ Ripple Glasses",
        "Paper/ Plastic/ Wooden Cutlery",
        "Cling Film",
        "Aluminum Foil"
      ]
    },
    tcmSupplies: {
      title: "TCM Supplies",
      color: "green",
      categories: {
        "Goodwyn Tea Sachets": [
          "Assam Tea",
          "Green Tea",
          "Masala Tea",
          "Chamomile Tea",
          "Darjeeling Tea",
          "Earl Grey Tea",
          "English Breakfast Tea"
        ],
        "Other Supplies": [
          "Sugar Sachets",
          "Brown Sugar Sachets",
          "Coffee Sachets",
          "Sugar Free Sachets",
          "Salt/ Pepper Sachets",
          "Wooden/ Plastic Stirrer",
          "Tea Spoon"
        ],
        "Equipment": ["Kettle (multiple images)", "Tray (multiple images)"]
      }
    },
    biotique: {
      title: "Biotique Hotel Amenities",
      color: "green",
      categories: {
        "Soaps": ["15gm – 50gm"],
        "Assorted Range 25ml & 35ml": [
          "Shampoo",
          "Shower Gel",
          "Moisturiser",
          "Conditioner",
          "Talcum Powder"
        ],
        "Orchid Tubes & Terraverde Tubes": [
          "Shampoo",
          "Shower Gel",
          "Moisturiser",
          "Conditioner"
        ],
        "380ml Dispensers with Brackets": [
          "Farm fresh",
          "Assorted Range",
          "Cypress Citrus & Neroli",
          "Bergamot Patchouli"
        ],
        "5 Ltr Cans": []
      }
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
                  {Object.entries(productData.hotelAmenities.subCategories.wetAmenities.items).map(([category, variants], idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                      <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-500">
                        Image placeholder
                      </div>
                      <h5 className="font-semibold text-charcoal mb-1">{category}</h5>
                      {variants.length > 0 && (
                        <ul className="text-sm text-charcoal-light space-y-1">
                          {variants.map((variant, vIdx) => (
                            <li key={vIdx}>• {variant}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
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
          <div>
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-gold" />
              <h3 className="font-playfair text-2xl font-bold text-charcoal">
                {productData.purelySerene.title}
              </h3>
            </div>
            <p className="text-sm text-gold italic ml-9">{productData.purelySerene.subtitle}</p>
          </div>
          {expandedCategories['purelySerene'] ? (
            <ChevronDown className="w-6 h-6 text-gold" />
          ) : (
            <ChevronRight className="w-6 h-6 text-gold" />
          )}
        </button>
        
        {expandedCategories['purelySerene'] && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {productData.purelySerene.items.map((item, idx) => (
                <div key={idx} className="bg-ivory p-4 rounded-lg border border-gold/30 hover:shadow-lg transition-all">
                  <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center text-xs text-gray-500">
                    Image placeholder
                  </div>
                  <h5 className="font-semibold text-charcoal mb-1">{item.name}</h5>
                  {item.variants && (
                    <ul className="text-sm text-charcoal-light space-y-1">
                      {item.variants.map((variant, vIdx) => (
                        <li key={vIdx}>• {variant}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
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
          <div className="p-6 space-y-6">
            {/* Carousel placeholder */}
            <div className="bg-gradient-to-r from-charcoal/5 to-charcoal/10 rounded-lg p-8 text-center">
              <p className="text-charcoal-light mb-4">Product Image Carousel</p>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Carousel images will be added here</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {productData.stationery.items.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                  <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-500">
                    Image placeholder
                  </div>
                  <p className="text-charcoal text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* House Keeping Supplies */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500/20">
        <button
          onClick={() => toggleCategory('housekeeping')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-transparent hover:from-blue-500/20 transition-all"
          data-testid="category-housekeeping"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-600" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal">
              {productData.housekeeping.title}
            </h3>
          </div>
          {expandedCategories['housekeeping'] ? (
            <ChevronDown className="w-6 h-6 text-blue-600" />
          ) : (
            <ChevronRight className="w-6 h-6 text-blue-600" />
          )}
        </button>
        
        {expandedCategories['housekeeping'] && (
          <div className="p-6 space-y-6">
            {Object.entries(productData.housekeeping.categories).map(([catName, items], idx) => (
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
        )}
      </div>

      {/* Kitchen Consumables */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-orange-500/20">
        <button
          onClick={() => toggleCategory('kitchen')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-transparent hover:from-orange-500/20 transition-all"
          data-testid="category-kitchen"
        >
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-orange-600" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal">
              {productData.kitchenConsumables.title}
            </h3>
          </div>
          {expandedCategories['kitchen'] ? (
            <ChevronDown className="w-6 h-6 text-orange-600" />
          ) : (
            <ChevronRight className="w-6 h-6 text-orange-600" />
          )}
        </button>
        
        {expandedCategories['kitchen'] && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productData.kitchenConsumables.items.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                  <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-500">
                    Image placeholder
                  </div>
                  <p className="text-charcoal text-sm font-medium">{item}</p>
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
          <div className="p-6 space-y-6">
            {Object.entries(productData.tcmSupplies.categories).map(([catName, items], idx) => (
              <div key={idx} className="border-l-4 border-green-500 pl-4">
                <h4 className="font-playfair text-xl font-bold text-charcoal mb-4">{catName}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-green-50 p-3 rounded-lg border border-green-200 hover:shadow-md transition-all">
                      <p className="text-charcoal text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-green-900 text-sm">Single image placeholder for tea/coffee sachets, stirrers, and spoons</p>
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
          <div className="p-6 space-y-6">
            {Object.entries(productData.biotique.categories).map(([catName, items], idx) => (
              <div key={idx} className="border-l-4 border-green-600 pl-4">
                <h4 className="font-playfair text-xl font-bold text-charcoal mb-4">{catName}</h4>
                {items.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {items.map((item, iIdx) => (
                      <div key={iIdx} className="bg-green-50 p-3 rounded-lg border border-green-200 hover:shadow-md transition-all">
                        <div className="h-24 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-500">
                          Image
                        </div>
                        <p className="text-charcoal text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-charcoal-light italic">Products available - Images to be added</p>
                )}
              </div>
            ))}
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
