export interface INote {
  slug: string;
  date: string;
  thumbnail: string;
  title: string;
  description: string;
  tags: string[];
  published: boolean;
  updated: string;
  importance: string;
  evergreen: string;
  review: string;
  series: string;
  seriesUrl: string;
  readingtime: string;
  area: string;
}
