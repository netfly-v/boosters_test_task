export type StatsT = {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
};

export type RegionsT = {
  iso: string;
  name: string;
};

export enum ChartFilterValues {
  CONFIRMED = 'confirmed',
  DEATHS = 'deaths',
  RECOVERED = 'recovered',
}
