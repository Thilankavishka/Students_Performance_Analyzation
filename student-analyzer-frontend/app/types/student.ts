export interface Student {
  _id?: string;
  name: string;
  math: number;
  science: number;
  english: number;
}

export interface Prediction {
  name: string;
  average: number;
  grade: string;
}

export interface AnalysisResultType {
  average: {
    math: number;
    science: number;
    english: number;
  };
  predictions: Prediction[];
  topStudent: string;
  insights: string;
}
