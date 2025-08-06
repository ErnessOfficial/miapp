
export interface User {
  fullName: string;
  email: string;
  age?: number | string;
  gender?: string;
  country?: string;
}

export interface MoodEntry {
  day: string;
  mood: number; // e.g., 1 for Sad, 5 for Happy
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface WellbeingHistoryEntry {
  score: number;
  date: string;
  category: 'leve' | 'moderado' | 'alto';
}

export interface WellbeingQuestion {
  id: number;
  questionKey: string;
  options: {
    textKey: string;
    score: number;
  }[];
}

export interface PostPlanQuestion {
  id: number;
  questionKey: string;
  options: {
    textKey: string;
    score: number;
  }[];
}

export interface JournalInfluence {
    id: string;
    text: string;
    isCustom: boolean;
}

export interface JournalEntry {
    id: string;
    date: string;
    emotion: string;
    influences: JournalInfluence[];
    text: string;
    reflection?: string;
    color?: string;
    imageUrl?: string;
    song?: string;
    lastModified?: string;
}

export interface PlanProgress {
    highestCompletedDay: number;
}

export interface CycleReflections {
    [day: number]: string;
}

export interface WisdomDrop {
    id: string;
    cycleNumber: number;
    story: string;
    inspiringWords: CycleReflections;
    date: string;
    isNew: boolean;
}
