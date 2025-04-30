// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Fishing spot related types
export interface FishingSpot {
  id: string;
  name: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: 'freshwater' | 'saltwater';
  description: string;
  imageUrl: string;
  fishSpecies: string[];
  bestSeason: string;
  popularityRating: number;
  amenities: string[];
}

// Fish species related types
export interface FishSpecies {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  habitat: string;
  diet: string;
  averageSize: string;
  imageUrl: string;
  conservationStatus: string;
  fishingTechniques: string[];
  bestSeasons: string[];
  funFacts: string[];
}

// Fishing technique related types
export interface FishingTechnique {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bestFor: string[];
  steps: string[];
  tips?: string[];
  imageUrl?: string;
  videoUrl?: string;
}

// Article related types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

// Settings related types
export interface UserPreferences {
  // Account settings
  name: string;
  email: string;
  bio: string;
  location: string;

  // Appearance settings
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  reducedMotion: boolean;
  highContrast: boolean;
  primaryColor: string;

  // Notification settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationPreferences: {
    messages: boolean;
    likes: boolean;
    follows: boolean;
    events: boolean;
    catches: boolean;
    newsletter: boolean;
    marketing: boolean;
  };

  // Privacy settings
  profileVisibility: 'public' | 'friends' | 'private';
  locationSharing: 'public' | 'friends' | 'private';
  catchesVisibility: 'public' | 'friends' | 'private';
  privacyPreferences: {
    showOnlineStatus: boolean;
    allowTagging: boolean;
    showInSearch: boolean;
    allowDataCollection: boolean;
  };

  // Security settings
  twoFactorEnabled: boolean;
  securityAlerts: {
    email: boolean;
    push: boolean;
  };
}

// Fishing License Settings
export interface FishingLicenseInfo {
  state: string;
  licenseNumber: string;
  expirationDate: string;
  licenseType: string;
  autoRenew: boolean;
  reminderDays: number;
}

// Conservation Settings
export interface ConservationPreferences {
  participateInCatchAndRelease: boolean;
  supportedOrganizations: string[];
  volunteerInterests: string[];
  donationPreferences: {
    monthlyDonation: boolean;
    donationAmount: number;
  };
  receiveConservationUpdates: boolean;
}

// Fishing Regulations Settings
export interface RegulationPreferences {
  preferredStates: string[];
  receiveRegulationUpdates: boolean;
  savedRegulations: {
    stateId: string;
    speciesIds: string[];
  }[];
}

// Gear Settings
export interface GearPreferences {
  ownedGear: {
    category: string;
    items: string[];
  }[];
  gearWishlist: string[];
  preferredBrands: string[];
  receiveGearReviews: boolean;
  receiveGearDeals: boolean;
}

// Events Calendar Settings
export interface EventPreferences {
  interestedEventTypes: string[];
  preferredLocations: string[];
  maxTravelDistance: number;
  reminderDays: number;
  addToCalendar: boolean;
  calendarType: 'google' | 'outlook' | 'apple' | 'other';
}

// Fishing License type
export interface FishingLicense {
  id: string;
  state: string;
  annualFee: string;
  requirements: string;
  validPeriod: string;
  website: string;
  additionalInfo: string;
  imageUrl: string;
}

// Conservation Initiative type
export interface ConservationInitiative {
  id: string;
  title: string;
  description: string;
  organization: string;
  location: string;
  imageUrl: string;
  category: string;
  impact: string;
  website: string;
  howToHelp: string[];
}

// Fishing Regulation type
export interface FishingRegulation {
  id: string;
  state: string;
  title: string;
  season: string;
  limits: Record<string, string>;
  specialRegulations: string[];
  licenseRequirements: string;
  prohibitedMethods: string[];
  protectedSpecies: string[];
  website: string;
  lastUpdated: string;
  imageUrl: string;
}

// Gear Review type
export interface GearReview {
  id: string;
  title: string;
  category: string;
  brand: string;
  model: string;
  rating: number;
  pros: string[];
  cons: string[];
  summary: string;
  fullReview: string;
  bestFor: string[];
  specifications: Record<string, string>;
  price: {
    msrp: string;
    streetPrice: string;
  };
  imageUrl: string;
  videoReviewUrl?: string;
  publishDate: string;
  author: string;
}

// Fishing Event type
export interface FishingEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  eventType: string;
  organizer: string;
  registrationRequired: boolean;
  registrationDeadline: string | null;
  registrationUrl: string | null;
  cost: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  imageUrl: string;
  featured: boolean;
  additionalDetails: string[];
}
