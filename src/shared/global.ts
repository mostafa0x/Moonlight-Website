export interface ItemSliderType {
  name: string;
  src: string;
  desc: string;
}

export type LandmarksType = {
  id: string;
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
  id: string;
  slug: string;
  name: string;
  landmarks: LandmarksType[];
  packages: PackageType[];
}
