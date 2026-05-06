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
isBestSeller:boolean
  governorate: string;
  currency: string;
  availabilityStatus: string;
};
export type PackageDetailsType = {
  packageId: string;
  packageName: string;
  packageImage: string;
  startingPrice: number;
  description: string;
  destinations: string[];
  included: string[];
  excluded: string[];
  customizations: {
    title: string;
    groupId: string;
    options: {
      id: string;
      name: string;
    }[];
    maxSelect: number;
  }[];
  governorate: string;
  currency: string;
  availabilityStatus: string;
};
export interface HomeDataType {
  packageTitle: string

  governorate: string;
  page: number;
  landmarks: LandmarksType[];
  packages: PackageType[];
}
