export interface Movie {
  id: string;
  title: string;
  premiere: number;
  // imgUrl: string;
}
export interface MovieWithoutId {
  title: string;
  premiere: number;
}
