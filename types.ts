
export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface LocalContext {
  area: string;
  time: string;
  weather: string;
}

export interface Slang {
  term: string;
  meaning: string;
  usage: string;
}
