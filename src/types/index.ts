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

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

export interface FishingTechnique {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bestFor: string[];
  steps: string[];
  tips: string[];
  imageUrl: string;
  videoUrl?: string;
}