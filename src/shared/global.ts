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
  packageId: string;
  packageName: string;
  packageImage: string;
  startingPrice: number;
  governorate: string;
  currency: string;
  availabilityStatus: string;
};
export interface HomeDataType {
  name: string;
  governorate: string;
  page: number;
  landmarks: LandmarksType[];
  packages: PackageType[];
}
