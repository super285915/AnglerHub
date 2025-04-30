import { GearReview } from '../types';

export const gearReviews: GearReview[] = [
  {
    id: '1',
    title: 'Shimano Stradic FL Spinning Reel Review',
    category: 'Reels',
    brand: 'Shimano',
    model: 'Stradic FL 3000',
    rating: 4.8,
    pros: [
      'Smooth drag system',
      'Lightweight design',
      'Excellent line lay',
      'Durable construction',
      'Water-resistant design'
    ],
    cons: [
      'Higher price point',
      'No spare spool included'
    ],
    summary: 'The Shimano Stradic FL continues the legacy of the Stradic series with improved features and performance. This spinning reel offers exceptional smoothness, durability, and casting performance that makes it worth the investment for serious anglers.',
    fullReview: 'The Shimano Stradic FL represents the latest evolution in Shimano\'s popular Stradic lineup. Featuring Shimano\'s MicroModule Gear II system and X-Protect water resistance, this reel delivers incredibly smooth operation even under heavy loads. The Long Stroke Spool design improves casting distance, while the lightweight HAGANE Body provides excellent rigidity without adding unnecessary weight. In our testing across freshwater and light saltwater applications, the Stradic FL performed flawlessly, with the drag system providing consistent pressure throughout its range. While the price point is higher than some competitors, the performance and durability justify the investment for anglers who fish regularly.',
    bestFor: ['Bass fishing', 'Inshore saltwater', 'Trout fishing', 'Walleye fishing'],
    specifications: {
      weight: '7.9 oz',
      gearRatio: '6.0:1',
      dragPower: '20 lbs',
      bearings: '6+1'
    },
    price: {
      msrp: '$199.99',
      streetPrice: '$179.99'
    },
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoReviewUrl: 'https://www.youtube.com/watch?v=example',
    publishDate: '2023-05-15',
    author: 'Michael Johnson'
  },
  {
    id: '2',
    title: 'St. Croix Premier Spinning Rod Review',
    category: 'Rods',
    brand: 'St. Croix',
    model: 'Premier PS70MF',
    rating: 4.7,
    pros: [
      'Excellent sensitivity',
      'Lightweight design',
      'Premium cork handle',
      'Made in USA',
      'Great warranty'
    ],
    cons: [
      'Guides could be higher quality',
      'Limited cosmetic options'
    ],
    summary: 'The St. Croix Premier spinning rod offers exceptional performance at a mid-range price point. With its SCII graphite construction and premium components, it delivers the sensitivity and durability that anglers expect from the St. Croix brand.',
    fullReview: 'The St. Croix Premier series has long been a favorite among anglers looking for quality rods without breaking the bank. The PS70MF model we tested is a 7\' medium power, fast action spinning rod that excels for a variety of techniques. The SCII graphite blank provides excellent sensitivity while maintaining enough backbone for solid hooksets. The premium cork handle is comfortable during long fishing sessions, and the aluminum oxide guides allow for smooth casting. During our testing, this rod performed admirably for techniques ranging from drop-shotting to throwing medium-sized crankbaits. The fast tip provides good feel for detecting subtle bites, while the medium backbone offers enough power to fight larger fish. While some might prefer higher-end guides found on more expensive models, the overall performance and value of this rod are outstanding.',
    bestFor: ['Bass fishing', 'Walleye fishing', 'Trout fishing', 'General freshwater use'],
    specifications: {
      length: '7\'0"',
      power: 'Medium',
      action: 'Fast',
      pieces: '1',
      lineWeight: '6-12 lb',
      lureWeight: '1/8-3/8 oz'
    },
    price: {
      msrp: '$150.00',
      streetPrice: '$130.00'
    },
    imageUrl: 'https://images.pexels.com/photos/2131904/pexels-photo-2131904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoReviewUrl: 'https://www.youtube.com/watch?v=example2',
    publishDate: '2023-04-20',
    author: 'Sarah Williams'
  },
  {
    id: '3',
    title: 'Rapala Rippin\' Rap Lipless Crankbait Review',
    category: 'Lures',
    brand: 'Rapala',
    model: 'Rippin\' Rap 07',
    rating: 4.6,
    pros: [
      'Unique rattling sound',
      'Excellent vibration',
      'Good hook quality',
      'Versatile fishing applications',
      'Wide range of color options'
    ],
    cons: [
      'Can snag in heavy cover',
      'Premium price compared to similar lures'
    ],
    summary: 'The Rapala Rippin\' Rap combines the best features of lipless crankbaits and rattle baits into one highly effective lure. Its unique action and sound make it a standout choice for targeting aggressive fish in various conditions.',
    fullReview: `The Rapala Rippin\' Rap has quickly become a staple in many anglers\' tackle boxes, and for good reason. This lipless crankbait features a distinctive BB rattle system that produces a loud, aggressive sound that triggers reaction strikes. The lure's tight wobble and strong vibration can be felt through the rod, allowing for excellent feedback during retrieval. We tested the Rippin\' Rap in various conditions, from clear reservoirs to stained rivers, and found it consistently effective for species including bass, walleye, and pike. The lure performs well with steady retrieves, yo-yo techniques, and even vertical jigging through ice. The VMC black nickel hooks are sharp and strong, providing solid hookups. While the price point is slightly higher than some competing lipless crankbaits, the versatility and durability of the Rippin\' Rap justify the investment.`,
    bestFor: ['Bass fishing', 'Walleye fishing', 'Pike fishing', 'Ice fishing'],
    specifications: {
      size: '2-3/4"',
      weight: '7/8 oz',
      diveDepth: 'Variable',
      hookSize: '#4'
    },
    price: {
      msrp: '$9.99',
      streetPrice: '$8.49'
    },
    imageUrl: 'https://images.pexels.com/photos/5560911/pexels-photo-5560911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoReviewUrl: 'https://www.youtube.com/watch?v=example3',
    publishDate: '2023-03-10',
    author: 'Robert Chen'
  },
  {
    id: '4',
    title: 'Simms G3 Guide Waders Review',
    category: 'Apparel',
    brand: 'Simms',
    model: 'G3 Guide Stockingfoot Waders',
    rating: 4.9,
    pros: [
      'Exceptional durability',
      'Comfortable fit',
      'Excellent breathability',
      'Multiple pockets and attachment points',
      'Made in USA'
    ],
    cons: [
      'Premium price point',
      'Heavier than some ultralight options'
    ],
    summary: 'The Simms G3 Guide Waders represent the gold standard in fishing waders, offering unmatched durability, comfort, and functionality for serious anglers who demand the best from their gear.',
    fullReview: 'Simms has long been the industry leader in high-quality fishing waders, and the G3 Guide model continues this tradition of excellence. Constructed with GORE-TEX Pro Shell fabric, these waders offer the perfect balance of durability and breathability. The 4-layer fabric in the lower legs and seat provides exceptional puncture resistance in high-wear areas, while the 3-layer upper allows for better mobility and comfort. During our testing across multiple seasons and fishing environments, the G3 Guide waders proved to be completely waterproof while still allowing moisture to escape during strenuous hiking and wading. The anatomical fit with articulated knees provides excellent freedom of movement, and the numerous pockets and attachment points offer convenient storage for essential gear. The built-in gravel guards and wading belt add additional functionality and safety. While these waders represent a significant investment, their durability and performance make them a value proposition for anglers who spend significant time on the water.',
    bestFor: ['Fly fishing', 'Steelhead fishing', 'Professional guides', 'Cold weather fishing'],
    specifications: {
      material: 'GORE-TEX Pro Shell',
      bootSize: 'Multiple options available',
      pockets: '8 total (2 zippered chest, 1 reach-through, 1 internal)',
      warranty: 'Limited lifetime'
    },
    price: {
      msrp: '$599.95',
      streetPrice: '$549.95'
    },
    imageUrl: 'https://images.pexels.com/photos/2131882/pexels-photo-2131882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoReviewUrl: 'https://www.youtube.com/watch?v=example4',
    publishDate: '2023-02-15',
    author: 'Lisa Rodriguez'
  },
  {
    id: '5',
    title: 'Humminbird HELIX 10 CHIRP MEGA SI+ GPS G4N Review',
    category: 'Electronics',
    brand: 'Humminbird',
    model: 'HELIX 10 CHIRP MEGA SI+ GPS G4N',
    rating: 4.7,
    pros: [
      'Outstanding side imaging clarity',
      'Intuitive user interface',
      'Dual spectrum CHIRP sonar',
      'Excellent screen visibility',
      'Networking capabilities'
    ],
    cons: [
      'Higher price point',
      'Learning curve for advanced features'
    ],
    summary: 'The Humminbird HELIX 10 CHIRP MEGA SI+ GPS G4N offers cutting-edge fish finding technology with exceptional imaging clarity and a feature-rich platform that will satisfy the most demanding anglers.',
    fullReview: 'The Humminbird HELIX 10 G4N represents the latest evolution in Humminbird\'s popular HELIX series. The 10.1" display offers excellent visibility even in direct sunlight, with crisp, detailed imaging that makes structure and fish identification easier than ever. The MEGA Side Imaging+ provides incredible detail up to 200 feet on either side of your boat, while the Dual Spectrum CHIRP sonar delivers excellent target separation and bottom tracking. During our testing on both large reservoirs and smaller lakes, the unit performed flawlessly, with the intuitive interface making it easy to switch between different sonar views and navigation functions. The built-in GPS and Humminbird Basemap provide solid navigation capabilities, with the option to upgrade to more detailed LakeMaster or Navionics charts. The unit also offers networking capabilities through Ethernet and Bluetooth, allowing for integration with other electronics and mobile devices. While the price point is higher than entry-level units, the performance and features make this a worthwhile investment for serious anglers looking to maximize their time on the water.',
    bestFor: ['Bass fishing', 'Walleye fishing', 'Structure fishing', 'Tournament anglers'],
    specifications: {
      screenSize: '10.1"',
      resolution: '1024 x 600',
      sonarTypes: 'Dual Spectrum CHIRP, MEGA Side Imaging+, MEGA Down Imaging+',
      powerOutput: '1000W RMS',
      gpsAccuracy: '2.5 meters'
    },
    price: {
      msrp: '$1,999.99',
      streetPrice: '$1,799.99'
    },
    imageUrl: 'https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoReviewUrl: 'https://www.youtube.com/watch?v=example5',
    publishDate: '2023-01-20',
    author: 'James Wilson'
  },
  {
    id: '6',
    title: 'Daiwa Tatula Elite Signature Series Casting Rod Review',
    category: 'Rods',
    brand: 'Daiwa',
    model: 'Tatula Elite Brent Ehrler Finesse Casting Rod',
    rating: 4.8,
    pros: [
      'Incredible sensitivity',
      'Perfect action for finesse techniques',
      'Premium components',
      'Lightweight design',
      'Comfortable handle'
    ],
    cons: [
      'Premium price point',
      'Specialized for specific techniques'
    ],
    summary: 'The Daiwa Tatula Elite Signature Series Brent Ehrler Finesse Casting Rod is a specialized tool designed for serious bass anglers who demand the ultimate in sensitivity and performance for finesse techniques.',
    fullReview: 'The Daiwa Tatula Elite Signature Series represents Daiwa\'s premium rod offerings, designed in collaboration with professional anglers. The Brent Ehrler Finesse model we tested is a 7\'1" medium-light casting rod specifically designed for techniques like drop shotting, Ned rigging, and light Texas rigs. The SVF (Super Volume Fiber) graphite blank provides exceptional sensitivity while maintaining surprising strength for a rod in this power rating. The X45 bias graphite construction eliminates blank twist during casting and hooksets, resulting in improved accuracy and power transfer. During our testing, we were impressed by the rod\'s ability to detect even the slightest bites while still having enough backbone to drive hooks home and control fish effectively. The Fuji Torzite guides with titanium frames reduce weight and improve casting performance, while the custom reel seat provides excellent comfort and sensitivity transmission. The split-grip EVA handle offers a good balance of comfort and weight reduction. While this rod comes at a premium price point, its performance justifies the investment for anglers who specialize in finesse techniques.',
    bestFor: ['Drop shot', 'Ned rig', 'Light Texas rig', 'Shaky head'],
    specifications: {
      length: '7\'1"',
      power: 'Medium-Light',
      action: 'Fast',
      pieces: '1',
      lineWeight: '6-14 lb',
      lureWeight: '1/8-3/8 oz'
    },
    price: {
      msrp: '$274.99',
      streetPrice: '$249.99'
    },
    imageUrl: 'https://images.pexels.com/photos/5560947/pexels-photo-5560947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoReviewUrl: 'https://www.youtube.com/watch?v=example6',
    publishDate: '2022-12-15',
    author: 'Emily Chang'
  },
  {
    id: '7',
    title: 'Plano Edge Tackle Box System Review',
    category: 'Storage',
    brand: 'Plano',
    model: 'Edge 3700 Series',
    rating: 4.6,
    pros: [
      'Innovative Rustrictor technology',
      'Watertight seal',
      'Customizable dividers',
      'Durable construction',
      'Easy-to-use latch system'
    ],
    cons: [
      'Higher price than standard Plano boxes',
      'Heavier than some competitors'
    ],
    summary: 'The Plano Edge tackle storage system represents a significant advancement in tackle organization, with innovative features designed to protect your valuable fishing gear from rust, water, and damage.',
    fullReview: 'Plano has long been the industry standard for fishing tackle storage, and the Edge series takes organization to the next level. The standout feature is the Rustrictor technology, which infuses the base with a rust-inhibiting vapor that helps prevent hooks and metal components from corroding. During our six-month test period, lures stored in the Edge boxes showed noticeably less corrosion compared to standard tackle storage. The Dri-Loc O-ring seal creates a watertight barrier that keeps moisture out, while the Water Wick divider contains a desiccant that absorbs any residual moisture inside the box. The customizable divider system allows for flexible organization, accommodating lures of various sizes. The one-handed latch system is easy to operate, even with wet hands or while wearing gloves. The crystal-clear DuraView lid makes it easy to identify contents without opening the box. While the Edge series commands a premium price compared to standard Plano boxes, the added protection and durability make these boxes a worthwhile investment for anglers with a significant investment in lures and terminal tackle.',
    bestFor: ['Crankbait storage', 'Terminal tackle organization', 'Saltwater fishing gear', 'Long-term lure storage'],
    specifications: {
      dimensions: '14" x 9" x 2"',
      compartments: 'Customizable',
      waterproof: 'Yes',
      material: 'Durable plastic with TPE seals'
    },
    price: {
      msrp: '$39.99',
      streetPrice: '$34.99'
    },
    imageUrl: 'https://images.pexels.com/photos/5560972/pexels-photo-5560972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoReviewUrl: 'https://www.youtube.com/watch?v=example7',
    publishDate: '2022-11-10',
    author: 'Marcus Johnson'
  },
  {
    id: '8',
    title: 'Garmin Livescope LVS34 System Review',
    category: 'Electronics',
    brand: 'Garmin',
    model: 'Livescope LVS34',
    rating: 4.9,
    pros: [
      'Revolutionary real-time sonar imaging',
      'Excellent target separation',
      'Multiple viewing modes',
      'Easy to interpret display',
      'Durable construction'
    ],
    cons: [
      'Premium price point',
      'Requires compatible Garmin display',
      'Power consumption'
    ],
    summary: 'The Garmin Livescope LVS34 system has revolutionized fishing electronics with its real-time sonar imaging that allows anglers to watch fish react to lures in real-time, creating a truly game-changing fishing experience.',
    fullReview: 'The Garmin Livescope system represents the cutting edge of fishing technology, providing real-time, high-definition sonar images that must be seen to be believed. Unlike traditional sonar that provides historical data, Livescope shows you what\'s happening under the water in real-time, allowing you to watch fish approach and react to your lure. The system offers three viewing modes: Forward, Down, and Perspective, each providing different advantages depending on your fishing situation. Forward mode is excellent for scanning structure ahead of the boat, Down mode provides a traditional vertical view beneath the boat, and Perspective mode offers a unique view that combines aspects of both. During our testing across various fishing scenarios, from deep offshore structure to shallow flats, the Livescope consistently provided clear, detailed images that made finding and catching fish significantly more effective. The target separation is exceptional, allowing you to distinguish between individual fish even in tight schools. The transducer mounting system is well-designed and durable, though it does require careful installation to achieve optimal performance. While the system represents a significant investment, particularly when paired with a compatible Garmin chartplotter, the advantage it provides is undeniable for serious anglers looking to maximize their success on the water.',
    bestFor: ['Bass fishing', 'Crappie fishing', 'Ice fishing', 'Structure fishing'],
    specifications: {
      range: 'Up to 200 feet',
      fieldOfView: '135 degrees',
      transducerFrequency: '530-1100 kHz CHIRP',
      powerRequirement: '10-35V DC',
      compatibleDisplays: 'Garmin ECHOMAP Ultra, GPSMAP 8400/8600, GPSMAP 7400/7600, GPSMAP 10x2/12x2'
    },
    price: {
      msrp: '$1,499.99',
      streetPrice: '$1,399.99'
    },
    imageUrl: 'https://images.pexels.com/photos/6485191/pexels-photo-6485191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoReviewUrl: 'https://www.youtube.com/watch?v=example8',
    publishDate: '2022-10-05',
    author: 'David Thompson'
  }
];
