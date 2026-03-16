export interface ItemSliderType {
  name: string;
  src: string;
  desc: string;
}

export type LandmarksType = {
  title: string;
  description: string;
  imageUrl: string;
};
export type PackageType = {
  id: string;
  title: string;
  coverImageUrl: string;
  startingPrice: number;
  currency: string;
  availabilityStatus: string;
};
export interface HomeDataType {
  name: string;
  page: number;
  landmarks: LandmarksType[];
  packages: PackageType[];
}
