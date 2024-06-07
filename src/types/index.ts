interface Character {
  id: number;
  name: string;
  description: string;
}

export interface CharactersData {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
  };
}

interface Comic {
  id: number;
  title: string;
  variantDescription: string;
  description: string;
}

export interface ComicsData {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comic[];
  };
}
