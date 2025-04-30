import { FishingRegulation } from '../types';

export const fishingRegulations: FishingRegulation[] = [
  {
    id: '1',
    state: 'California',
    title: 'California Freshwater Fishing Regulations',
    season: 'Year-round for most waters, with special regulations for trout season',
    limits: {
      trout: '5 per day, 10 in possession',
      bass: '5 per day, 10 in possession',
      catfish: '10 per day, no possession limit'
    },
    specialRegulations: [
      'Barbless hooks required in fly-fishing-only waters',
      'Special low-flow restrictions on certain rivers',
      'Some waters have slot limits for certain species'
    ],
    licenseRequirements: 'All anglers 16 years and older must have a valid fishing license',
    prohibitedMethods: [
      'Use of more than one line without a second-rod stamp',
      'Snagging',
      'Use of explosive or toxic substances'
    ],
    protectedSpecies: ['Delta smelt', 'Green sturgeon', 'Coho salmon'],
    website: 'https://wildlife.ca.gov/Fishing/Inland',
    lastUpdated: '2023-03-01',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    state: 'Florida',
    title: 'Florida Saltwater Fishing Regulations',
    season: 'Year-round for most species, with closed seasons for certain species',
    limits: {
      redfish: '1 per harvester per day, slot limit 18-27 inches',
      snook: 'Closed Dec 15-Jan 31 and May 1-Aug 31, slot limit 28-33 inches',
      grouper: 'Varies by species, generally 2-4 per harvester'
    },
    specialRegulations: [
      'Snook permit required in addition to fishing license',
      'Special regulations in state parks and marine protected areas',
      'Some species require careful release techniques'
    ],
    licenseRequirements: 'All anglers 16 years and older must have a valid fishing license, unless exempt',
    prohibitedMethods: [
      'Use of multiple hooks with live or dead natural bait for reef fish',
      'Spearfishing in freshwater',
      'Use of explosives, poisons, or electricity'
    ],
    protectedSpecies: ['Goliath grouper', 'Nassau grouper', 'Sawfish'],
    website: 'https://myfwc.com/fishing/saltwater/recreational/',
    lastUpdated: '2023-01-15',
    imageUrl: 'https://images.pexels.com/photos/2131904/pexels-photo-2131904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    state: 'Texas',
    title: 'Texas Freshwater and Saltwater Regulations',
    season: 'Year-round for most species, with some seasonal restrictions',
    limits: {
      bass: '5 per day, 14-inch minimum length',
      catfish: '25 per day (blue and channel combined)',
      redfish: '3 per day, 20-28 inch slot limit'
    },
    specialRegulations: [
      'Special limits on certain lakes and rivers',
      'Free Fishing Day on first Saturday in June',
      'Different regulations for border waters'
    ],
    licenseRequirements: 'All anglers 17 years and older must have a valid fishing license',
    prohibitedMethods: [
      'Snagging or jerking devices',
      'Use of electricity or explosives',
      'Taking game fish with nets or traps'
    ],
    protectedSpecies: ['Paddlefish', 'Alligator gar (special regulations)', 'Shoal bass'],
    website: 'https://tpwd.texas.gov/regulations/outdoor-annual/fishing/',
    lastUpdated: '2023-02-10',
    imageUrl: 'https://images.pexels.com/photos/5560911/pexels-photo-5560911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    state: 'Michigan',
    title: 'Michigan Fishing Regulations',
    season: 'Varies by species and water body, check specific regulations',
    limits: {
      trout: 'Varies by stream type and species',
      walleye: '5 per day on most waters',
      pike: '2 per day on most waters'
    },
    specialRegulations: [
      'Type 1-4 trout stream designations with different rules',
      'Special regulations on Great Lakes',
      'Quality fishing zones on certain waters'
    ],
    licenseRequirements: 'All anglers 17 years and older must have a valid fishing license',
    prohibitedMethods: [
      'Use of more than 3 lines per angler',
      'Spearing or netting game fish (with exceptions)',
      'Use of explosives or poisons'
    ],
    protectedSpecies: ['Sturgeon (catch and immediate release in most waters)', 'Cisco in certain lakes'],
    website: 'https://www.michigan.gov/dnr/things-to-do/fishing',
    lastUpdated: '2023-04-01',
    imageUrl: 'https://images.pexels.com/photos/2131882/pexels-photo-2131882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    state: 'New York',
    title: 'New York State Fishing Regulations',
    season: 'Varies by species and water body',
    limits: {
      trout: '5 per day in most waters',
      bass: '5 per day, 12-inch minimum in most waters',
      walleye: '5 per day, 15-inch minimum in most waters'
    },
    specialRegulations: [
      'Special regulations for Great Lakes tributaries',
      'Catch and release only for certain wild trout streams',
      'Different regulations for boundary waters'
    ],
    licenseRequirements: 'All anglers 16 years and older must have a valid fishing license',
    prohibitedMethods: [
      'Use of more than 2 lines in most waters',
      'Snagging fish',
      'Use of explosives or poisons'
    ],
    protectedSpecies: ['Atlantic sturgeon', 'Mooneye', 'Round whitefish'],
    website: 'https://www.dec.ny.gov/outdoor/fishing.html',
    lastUpdated: '2023-01-01',
    imageUrl: 'https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    state: 'Colorado',
    title: 'Colorado Fishing Regulations',
    season: 'Year-round for most waters, with some seasonal closures',
    limits: {
      trout: '4 per day, 8 in possession in most waters',
      walleye: '5 per day, 10 in possession in most waters',
      bass: '5 per day, 10 in possession in most waters'
    },
    specialRegulations: [
      'Gold Medal Waters with special regulations',
      'Wild trout waters with special regulations',
      'Special regulations for high mountain lakes'
    ],
    licenseRequirements: 'All anglers 16 years and older must have a valid fishing license',
    prohibitedMethods: [
      'Use of more than one line per angler',
      'Chumming in most waters',
      'Use of explosives, toxicants, or electricity'
    ],
    protectedSpecies: ['Greenback cutthroat trout', 'Colorado pikeminnow', 'Razorback sucker'],
    website: 'https://cpw.state.co.us/thingstodo/Pages/Fishing.aspx',
    lastUpdated: '2023-03-15',
    imageUrl: 'https://images.pexels.com/photos/5560947/pexels-photo-5560947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '7',
    state: 'Minnesota',
    title: 'Minnesota Fishing Regulations',
    season: 'Varies by species, with specific opener dates',
    limits: {
      walleye: 'Varies by water body, generally 6 per day',
      northern_pike: '3 per day with size restrictions in most zones',
      muskellunge: '1 per day, minimum size 54 inches'
    },
    specialRegulations: [
      'Northern pike zones with different regulations',
      'Special regulations on border waters',
      'Designated trout streams and lakes with special rules'
    ],
    licenseRequirements: 'All anglers 16 years and older must have a valid fishing license',
    prohibitedMethods: [
      'Use of more than one line per angler in summer',
      'Use of whole or parts of game fish as bait',
      'Depositing fish entrails or remains in public waters'
    ],
    protectedSpecies: ['Lake sturgeon (catch and release only in many waters)', 'Paddlefish'],
    website: 'https://www.dnr.state.mn.us/fishing/index.html',
    lastUpdated: '2023-02-20',
    imageUrl: 'https://images.pexels.com/photos/5560972/pexels-photo-5560972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '8',
    state: 'Alaska',
    title: 'Alaska Sport Fishing Regulations',
    season: 'Varies by species and region',
    limits: {
      salmon: 'Varies by species and region',
      trout: 'Varies by species and region',
      halibut: '2 per day, size restrictions apply'
    },
    specialRegulations: [
      'Special regulations for king salmon',
      'Different regulations by region (Southeast, Southcentral, etc.)',
      'Emergency orders may change regulations during the season'
    ],
    licenseRequirements: 'All anglers 18 years and older must have a valid sport fishing license',
    prohibitedMethods: [
      'Snagging (except where allowed)',
      'Use of bait in fly-fishing-only waters',
      'Use of felt-soled wading boots in freshwater'
    ],
    protectedSpecies: ['King salmon (in some areas)', 'Steelhead (in some areas)', 'Shark species'],
    website: 'https://www.adfg.alaska.gov/index.cfm?adfg=fishingSport.main',
    lastUpdated: '2023-01-01',
    imageUrl: 'https://images.pexels.com/photos/6485191/pexels-photo-6485191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];
