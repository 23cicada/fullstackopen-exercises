type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
type Visibility = "great" | "good" | "ok" | "poor";

interface NewDiaryEntry {
  weather: Weather;
  visibility: Visibility;
  date: string;
  comment: string;
}

interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

export type { DiaryEntry, NewDiaryEntry, Weather, Visibility }
