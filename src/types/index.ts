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
    offset: number,
    limit: number,
    total: number,
    count: number,
    results: Character[],
  };
}
