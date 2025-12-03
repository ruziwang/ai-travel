export interface Trip {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  days: number;
  image: string;
  status: 'planned' | 'ongoing' | 'completed';
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UserStats {
  name: string;
  value: number;
}
