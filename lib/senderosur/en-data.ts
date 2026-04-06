import { cities, accommodations, routes } from "./data"

export const enDataTranslations = {
  cities: {
    "mar-del-plata": {
      description: "Coastal city with great tourist infrastructure, surfing, gastronomy and nightlife.",
      attractions: ["Beaches", "Port", "Casino", "Colon Theater"],
      activities: ["Surfing", "Gastronomy", "Nightlife", "Coastal culture"]
    },
    "las-grutas": {
      description: "Warm waters, cliffs and family tourism on the Patagonian coast.",
      attractions: ["Warm water beaches", "Cliffs", "Nature reserves"],
      activities: ["Diving", "Kayaking", "Wildlife viewing"]
    },
    "playas-doradas": {
      description: "Virgin beaches ideal for total disconnection and ecological experiences.",
      attractions: ["Virgin beaches", "Absolute tranquility"],
      activities: ["Disconnection", "Walking", "Stargazing"]
    },
    "puerto-piramides": {
      description: "Gateway to Peninsula Valdes, home of whales and marine fauna.",
      attractions: ["Peninsula Valdes", "Right Whales", "Sea lions"],
      activities: ["Whale watching", "Diving", "Kayaking"]
    },
    "camarones": {
      description: "Coastal town with pure nature, fishing and hiking.",
      attractions: ["Virgin coast", "Penguin colony", "Saint-Exupéry history"],
      activities: ["Fishing", "Hiking", "Penguin watching"]
    },
    "puerto-deseado": {
      description: "Nature reserve with marine fauna and history of explorers.",
      attractions: ["Deseado Estuary", "Penguin Island", "Darwin Expedition"],
      activities: ["Sailing", "Marine fauna", "History"]
    },
    "purmamarca": {
      description: "Village at the foot of the Hill of Seven Colors with crafts and Andean culture.",
      attractions: ["Hill of Seven Colors", "Craft fair", "Paseo de los Colorados"],
      activities: ["Trekking", "Shopping for crafts", "Photography"]
    },
    "cachi": {
      description: "Colonial architecture among snow-capped mountains and Calchaquí culture.",
      attractions: ["San Jose Church", "Archaeological Museum", "Nevado de Cachi"],
      activities: ["Walking", "Culture", "Photography"]
    },
    "cafayate": {
      description: "Capital of torrontés wine with high altitude wineries and unique landscapes.",
      attractions: ["Wineries", "Quebrada de las Conchas", "Amphitheater"],
      activities: ["Wine tourism", "Tastings", "Hiking"]
    },
    "fiambala": {
      description: "Natural hot springs, dunes and the famous Adobe Route.",
      attractions: ["Hot springs", "Tatón Dunes", "Adobe Route"],
      activities: ["Wellness", "Sandboarding", "Culture"]
    },
    "antofagasta-sierra": {
      description: "Lunar landscapes, volcanoes and the best astrotourism in the country.",
      attractions: ["Pumice Stone Field", "Galán Volcano", "Antofalla Salt Flat"],
      activities: ["Astrotourism", "4x4 Adventure", "Photography"]
    },
    "puerto-iguazu": {
      description: "Iguazu Falls, missionary jungle and triple border.",
      attractions: ["Iguazu Falls", "Missionary jungle", "Triple border"],
      activities: ["Tours", "Sightseeing", "Adventure"]
    },
    "san-ignacio": {
      description: "Jesuit ruins World Heritage Site and Guaraní culture.",
      attractions: ["San Ignacio Miní Ruins", "Paraná River", "Quiroga's House"],
      activities: ["History", "Guaraní culture", "Sailing"]
    },
    "colonia-pellegrini": {
      description: "Gateway to the Iberá Wetlands, paradise of native fauna.",
      attractions: ["Iberá Wetlands", "Iberá Lagoon", "Wildlife"],
      activities: ["Photo safari", "Kayaking", "Caiman watching"]
    },
    "clorinda": {
      description: "Border city with Pilcomayo river and riverside culture.",
      attractions: ["Pilcomayo River", "Border with Paraguay", "Riverside culture"],
      activities: ["Fishing", "Sailing", "Gastronomy"]
    },
    "formosa-capital": {
      description: "Waterfront on the Paraguay river with lagoons and crafts.",
      attractions: ["Waterfront", "Lagoons", "Wichí crafts"],
      activities: ["Walking", "Culture", "Gastronomy"]
    },
    "el-calafate": {
      description: "Gateway to the Perito Moreno Glacier and Argentino Lake.",
      attractions: ["Perito Moreno Glacier", "Argentino Lake", "Glaciarium"],
      activities: ["Sailing", "Ice trekking", "Astrotourism"]
    },
    "el-chalten": {
      description: "National capital of trekking with views of Fitz Roy.",
      attractions: ["Mount Fitz Roy", "Laguna de los Tres", "Viedma Glacier"],
      activities: ["Trekking", "Climbing", "Photography"]
    },
    "los-antiguos": {
      description: "Buenos Aires Lake, cherries and border with Chile.",
      attractions: ["Buenos Aires Lake", "Cherry farms", "Cave of the Hands"],
      activities: ["Kayaking", "Fishing", "Agrotourism"]
    },
    "esquel": {
      description: "Los Alerces National Park and the historic La Trochita train.",
      attractions: ["Los Alerces Park", "La Trochita", "Futalaufquen Lake"],
      activities: ["Hiking", "Sailing", "Welsh culture"]
    },
    "bariloche": {
      description: "City of lakes, chocolate and mountain sports.",
      attractions: ["Nahuel Huapi Lake", "Cerro Catedral", "Circuito Chico"],
      activities: ["Kayaking", "Skiing", "Craft breweries"]
    },
    "villa-traful": {
      description: "Crystal clear lake, submerged forest and absolute tranquility.",
      attractions: ["Traful Lake", "Submerged forest", "Traful Viewpoint"],
      activities: ["Fishing", "Kayaking", "Contemplation"]
    },
    "san-martin-andes": {
      description: "Elegant mountain village next to Lácar Lake.",
      attractions: ["Lácar Lake", "Chapelco Hill", "Historic center"],
      activities: ["Hiking", "Sailing", "Gastronomy"]
    },
    "volcan-lanin": {
      description: "Imposing snow-capped volcano and mapuche culture.",
      attractions: ["Lanín Volcano", "Huechulafquen Lake", "Lanín National Park"],
      activities: ["Trekking", "Fishing", "Mapuche culture"]
    },
    "mendoza": {
      description: "Capital of Argentine wine with world-class wineries.",
      attractions: ["Maipú Wineries", "Luján de Cuyo", "San Martín Park"],
      activities: ["Wine tourism", "Tastings", "City tour"]
    },
    "potrerillos": {
      description: "Reservoir with water sports and views of the mountain range.",
      attractions: ["Potrerillos Reservoir", "Andes Mountains", "Cacheuta Hot Springs"],
      activities: ["Kayaking", "Trekking", "Rafting"]
    },
    "calingasta": {
      description: "Valley with high altitude wines, clear skies and astronomical observatory.",
      attractions: ["El Leoncito Park", "Leoncito Pampa", "High altitude wineries"],
      activities: ["Astrotourism", "Horseback riding", "Land windsurfing"]
    },
    "san-juan": {
      description: "Syrah wines, olive route and Cuyo culture.",
      attractions: ["Wineries", "Olive Route", "Ullum Dam"],
      activities: ["Wine tourism", "City tour", "Gastronomy"]
    },
    "huaco": {
      description: "Historic gorge, colonial architecture and rocky landscapes.",
      attractions: ["Huaco Gorge", "Flour mills", "Museum"],
      activities: ["Hiking", "Photography", "History"]
    },
    "villa-union": {
      description: "Gateway to the Talampaya National Park.",
      attractions: ["Talampaya", "Valley of the Moon", "Rock formations"],
      activities: ["Excursions", "Astrotourism", "Geotourism"]
    },
    "la-rioja": {
      description: "Torrontés Route, hot springs and Rioja culture.",
      attractions: ["Chilecito Wineries", "Santa Teresita Hot Springs", "Historic center"],
      activities: ["Wine tourism", "Hot springs", "City tour"]
    }
  },
  accommodations: {
    "domo-mar-plata": {
      name: "Atlantic Dome",
      description: "Dome with panoramic views of the Atlantic Ocean, perfect for surfers.",
      amenities: ["Ocean view", "WiFi", "Breakfast", "Parking", "Surfboard"]
    },
    "domo-grutas": {
      name: "Warm Waters Dome",
      description: "Ecological dome near the warmest beaches in Argentina.",
      amenities: ["Near the beach", "WiFi", "Kitchen", "Grill"]
    },
    "domo-doradas": {
      name: "Wild Dome",
      description: "Total disconnection on virgin beaches, ideal for contemplation.",
      amenities: ["Isolation", "Fire pit", "Stargazing"]
    },
    "domo-piramides": {
      name: "Whales Dome",
      description: "Ocean view from where you can spot whales in season.",
      amenities: ["Ocean view", "Heating", "WiFi", "Tours included"]
    },
    "domo-camarones": {
      name: "Penguin Dome",
      description: "Rustic experience near the Cabo Dos Bahías penguin colony.",
      amenities: ["Rustic", "Fire pit", "Excursions"]
    },
    "domo-deseado": {
      name: "Explorer Dome",
      description: "Ecological dome focusing on the history of explorers.",
      amenities: ["Ecological", "WiFi", "Estuary tours", "Library"]
    },
    "domo-purmamarca": {
      name: "Seven Colors Dome",
      description: "Ecological dome with panoramic views to the Hill of Seven Colors.",
      amenities: ["Hill view", "Heating", "Andean breakfast", "WiFi"]
    },
    "domo-cachi": {
      name: "Calchaquí Dome",
      description: "Rustic-mountain style with views of snow-capped peaks.",
      amenities: ["Mountain view", "Heating", "Fire pit"]
    },
    "domo-cafayate": {
      name: "Wine Dome",
      description: "Integrated to vineyards with tastings included and regional gastronomy.",
      amenities: ["In vineyard", "Wine tasting", "Gastronomy", "Pool"]
    },
    "domo-fiambala": {
      name: "Thermal Dome",
      description: "Wellness and relaxation with exclusive access to natural hot springs.",
      amenities: ["Hot springs access", "Spa", "Massages", "Yoga"]
    },
    "domo-antofagasta": {
      name: "Lunar Dome",
      description: "Extreme adventure and astrotourism in unique lunar landscapes.",
      amenities: ["Total isolation", "Telescope", "4x4 Tours", "Guide"]
    },
    "domo-iguazu": {
      name: "Jungle Dome",
      description: "Premium jungle style with wildlife watching activities and regional gastronomy.",
      amenities: ["In jungle", "Pool", "Falls tours", "Spa"]
    },
    "domo-san-ignacio": {
      name: "Jesuit Dome",
      description: "Cultural rustic with historical experiences and craft workshops.",
      amenities: ["Ruins tour", "Workshops", "Guaraní culture"]
    },
    "domo-ibera": {
      name: "Wetlands Dome",
      description: "Elevated ecological dome overlooking the wetlands and nature activities.",
      amenities: ["Wetlands view", "Photo safari", "Kayaking", "Guide"]
    },
    "domo-clorinda": {
      name: "Riverside Dome",
      description: "Riverside style with sport fishing and sailing.",
      amenities: ["Fishing", "Sailing", "Local gastronomy"]
    },
    "domo-formosa": {
      name: "Urban Eco Dome",
      description: "Urban ecological integrated to cultural circuits.",
      amenities: ["Downtown", "Cultural tours", "WiFi", "AC"]
    },
    "domo-calafate": {
      name: "Glacier Dome",
      description: "Glacier style with lake views and efficient heating.",
      amenities: ["Lake view", "Heating", "Glacier tours", "Breakfast"]
    },
    "domo-chalten": {
      name: "Fitz Roy Dome",
      description: "Alpine adventure with services for demanding hikers.",
      amenities: ["Fitz Roy view", "Trekking gear", "Energy breakfast"]
    },
    "domo-antiguos": {
      name: "Buenos Aires Lake Dome",
      description: "Lacustrine with view of the largest lake in Argentina.",
      amenities: ["Lake view", "Fishing", "Kayaking", "Cherries"]
    },
    "domo-esquel": {
      name: "Alerces Dome",
      description: "Ecological in Andean forest near Los Alerces Park.",
      amenities: ["In forest", "Hiking", "La Trochita"]
    },
    "domo-bariloche": {
      name: "Nahuel Huapi Dome",
      description: "Alpine style integrated to the forest with lake view.",
      amenities: ["Lake view", "Chocolate", "Craft beer", "Ski"]
    },
    "domo-traful": {
      name: "Silence Dome",
      description: "Contemplation and total disconnection next to the crystal clear lake.",
      amenities: ["Absolute silence", "Submerged forest", "Kayaking"]
    },
    "domo-san-martin": {
      name: "Lácar Dome",
      description: "Mountain boutique with lake views and Patagonian gastronomy.",
      amenities: ["Lácar lake view", "Gastronomy", "Spa", "Ski"]
    },
    "domo-lanin": {
      name: "Volcano Dome",
      description: "Adventure and astrotourism with views of the imposing Lanín Volcano.",
      amenities: ["Volcano view", "Trekking", "Mapuche culture", "Fishing"]
    },
    "domo-mendoza": {
      name: "Malbec Dome",
      description: "In vineyards with spa and spectacular views to the mountain range.",
      amenities: ["In vineyard", "Spa", "Tastings", "Mountain range view"]
    },
    "domo-potrerillos": {
      name: "Reservoir Dome",
      description: "Lacustrine facing the reservoir and water sports.",
      amenities: ["Reservoir view", "Kayaking", "Rafting", "Trekking"]
    },
    "domo-barreal": {
      name: "Astronomical Dome",
      description: "Desert and astronomical with the clearest skies in the country.",
      amenities: ["Telescope", "Observatory", "Horseback riding", "High altitude wine"]
    },
    "domo-san-juan": {
      name: "Syrah Dome",
      description: "Modern desert integrated to the arid landscape with wine tourism.",
      amenities: ["Modern", "Wineries", "Olive trees", "Pool"]
    },
    "domo-huaco": {
      name: "Colonial Dome",
      description: "Rustic cultural integrated to the historic environment of the gorge.",
      amenities: ["Historic", "Hiking", "Photography"]
    },
    "domo-talampaya": {
      name: "Canyon Dome",
      description: "Desert style oriented to rock formations of Talampaya.",
      amenities: ["Talampaya tours", "Astrotourism", "Geotourism"]
    },
    "domo-rioja": {
      name: "Torrontés Dome",
      description: "Urban ecological integrated to wine circuits and hot springs.",
      amenities: ["Downtown", "Wineries", "Hot springs", "WiFi"]
    }
  },
  routes: {
    "costera-atlantica": {
      name: "Atlantic Coastal Route",
      description: "Discover the endless beaches, cliffs, and marine fauna of the Argentine coast from Buenos Aires to Santa Cruz.",
      theme: "Nature & Beaches",
      duration: "10 days / 9 nights",
      highlights: ["Beaches and cliffs", "Peninsula Valdes & whales", "Penguin colonies", "Fresh seafood"]
    },
    "andina-norte": {
      name: "Northern Andean Route",
      description: "A journey through the high mountains, salt flats, and pre-Columbian cultures of the Argentine northwest.",
      theme: "Culture & Landscapes",
      duration: "8 days / 7 nights",
      highlights: ["Hill of Seven Colors", "Calchaquí Valleys", "High altitude wines", "Inca heritage"]
    },
    "litoral": {
      name: "Littoral Route",
      description: "Immerse yourself in the missionary jungle, discover the mighty Iguazu Falls, and navigate through the wetlands.",
      theme: "Jungle & Rivers",
      duration: "7 days / 6 nights",
      highlights: ["Iguazu Falls", "Jesuit Ruins", "Iberá Wetlands", "Native fauna"]
    },
    "patagonica": {
      name: "Patagonian Route",
      description: "The ultimate adventure through ancient forests, majestic glaciers, and crystal alpine lakes.",
      theme: "Glaciers & Forests",
      duration: "14 days / 13 nights",
      highlights: ["Perito Moreno Glacier", "Mount Fitz Roy", "Los Alerces National Park", "Seven Lakes Route"]
    },
    "vinedos": {
      name: "Vineyards Route",
      description: "Taste the best wines of Argentina framed by the Andes Mountains and discover lunar landscapes.",
      theme: "Wine & Desert",
      duration: "9 days / 8 nights",
      highlights: ["Mendoza Wineries", "Aconcagua views", "Ischigualasto & Talampaya", "Astrotourism"]
    }
  }
}
