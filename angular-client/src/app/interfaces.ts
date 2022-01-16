export interface Movie {
    _id: any;
    Film?: string;
    Genre?: string;
    "Lead Studio"?: string;
    "Audience score"?: number;
    "Profitability"?: number;
    "Rotten Tomatoes %"?: string;
    "Worldwide Gross"?: string;
    Year?: number;
    comments: Comment[];
  }

  export interface Comment {
      comment?: string;
      name?: string;
  }