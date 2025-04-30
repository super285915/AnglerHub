import { ConservationInitiative } from '../types';

export const conservationInitiatives: ConservationInitiative[] = [
  {
    id: '1',
    title: 'Trout Habitat Restoration Project',
    description: 'Restoring critical spawning grounds and improving water quality in mountain streams to support native trout populations.',
    organization: 'Trout Unlimited',
    location: 'Rocky Mountains, CO',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Habitat Restoration',
    impact: '500 miles of stream habitat restored, 25% increase in trout population',
    website: 'https://www.tu.org/',
    howToHelp: [
      'Volunteer for stream cleanup events',
      'Donate to support restoration projects',
      'Practice catch and release fishing',
      'Report pollution incidents'
    ]
  },
  {
    id: '2',
    title: 'Coastal Fisheries Conservation',
    description: 'Protecting and restoring coastal habitats to ensure sustainable fisheries and healthy marine ecosystems.',
    organization: 'Coastal Conservation Association',
    location: 'Gulf Coast, FL/AL/MS/LA/TX',
    imageUrl: 'https://images.pexels.com/photos/2131904/pexels-photo-2131904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Marine Conservation',
    impact: 'Established 3 new marine protected areas, restored 1,200 acres of coastal wetlands',
    website: 'https://ccaflorida.org/',
    howToHelp: [
      'Join local chapter meetings',
      'Participate in reef building projects',
      'Support sustainable fishing practices',
      'Advocate for science-based fisheries management'
    ]
  },
  {
    id: '3',
    title: 'Salmon Recovery Program',
    description: 'Comprehensive effort to restore wild salmon populations through habitat improvement, dam removal, and sustainable fishing practices.',
    organization: 'Wild Salmon Center',
    location: 'Pacific Northwest, WA/OR',
    imageUrl: 'https://images.pexels.com/photos/5560911/pexels-photo-5560911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Species Recovery',
    impact: 'Removed 2 obsolete dams, opened 150 miles of spawning habitat, 15% increase in returning salmon',
    website: 'https://www.wildsalmoncenter.org/',
    howToHelp: [
      'Support dam removal initiatives',
      'Volunteer for habitat restoration',
      'Practice selective harvest techniques',
      'Reduce water usage during drought periods'
    ]
  },
  {
    id: '4',
    title: 'Great Lakes Fishery Protection',
    description: 'Combating invasive species and pollution to protect the native fish populations of the Great Lakes ecosystem.',
    organization: 'Great Lakes Fishery Commission',
    location: 'Great Lakes Region, MI/WI/MN/NY/PA/OH',
    imageUrl: 'https://images.pexels.com/photos/2131882/pexels-photo-2131882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Invasive Species Management',
    impact: 'Reduced sea lamprey population by 90%, implemented new ballast water regulations',
    website: 'http://www.glfc.org/',
    howToHelp: [
      'Clean boats and equipment between water bodies',
      'Never release bait or aquarium fish into natural waters',
      'Report invasive species sightings',
      'Support research and control efforts'
    ]
  },
  {
    id: '5',
    title: 'Bass Conservation Foundation',
    description: 'Promoting sustainable bass fishing through research, education, and habitat enhancement projects.',
    organization: 'B.A.S.S. Conservation',
    location: 'Nationwide, USA',
    imageUrl: 'https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Sportfish Conservation',
    impact: 'Installed 5,000 artificial fish habitats, educated 25,000 anglers on conservation practices',
    website: 'https://www.bassmaster.com/conservation-news',
    howToHelp: [
      'Participate in catch-photo-release tournaments',
      'Volunteer for habitat enhancement projects',
      'Properly handle and release fish',
      'Support fishing regulations based on scientific data'
    ]
  },
  {
    id: '6',
    title: 'Freshwater Mussels Recovery',
    description: 'Protecting endangered freshwater mussel species that serve as natural water filters and indicators of stream health.',
    organization: 'Freshwater Mollusk Conservation Society',
    location: 'Appalachian Region, TN/KY/VA/WV',
    imageUrl: 'https://images.pexels.com/photos/5560947/pexels-photo-5560947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Endangered Species',
    impact: 'Established captive breeding program for 12 endangered mussel species, improved water quality in 8 river systems',
    website: 'https://molluskconservation.org/',
    howToHelp: [
      'Support clean water initiatives',
      'Reduce fertilizer and pesticide use',
      'Report mussel die-offs',
      'Educate others about the importance of mussels'
    ]
  },
  {
    id: '7',
    title: 'Sustainable Fishing Practices Initiative',
    description: 'Promoting responsible angling techniques to minimize impact on fish populations and aquatic ecosystems.',
    organization: 'Keep Fish Wet',
    location: 'Nationwide, USA',
    imageUrl: 'https://images.pexels.com/photos/5560972/pexels-photo-5560972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Angler Education',
    impact: 'Reduced fish mortality by 30% in participating fishing tournaments, trained 10,000 anglers in proper fish handling',
    website: 'https://www.keepfishwet.org/',
    howToHelp: [
      'Use barbless hooks',
      'Minimize air exposure when releasing fish',
      'Use proper landing and handling techniques',
      'Share best practices with other anglers'
    ]
  },
  {
    id: '8',
    title: 'Watershed Protection Alliance',
    description: 'Safeguarding entire watersheds to ensure clean water and healthy fish populations from headwaters to estuaries.',
    organization: 'American Rivers',
    location: 'Multiple watersheds, USA',
    imageUrl: 'https://images.pexels.com/photos/6485191/pexels-photo-6485191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Watershed Conservation',
    impact: 'Protected 15,000 acres of riparian buffer zones, removed 25 tons of trash from waterways',
    website: 'https://www.americanrivers.org/',
    howToHelp: [
      'Participate in river cleanup events',
      'Plant native trees and shrubs along streambanks',
      'Advocate for watershed protection policies',
      'Conserve water at home and work'
    ]
  }
];
