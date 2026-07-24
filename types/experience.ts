export type SiteConfig = {
  name: string;
  father: string;
  school: string;
  message: string;
  letter: {
    date: string;
    greeting: string;
    paragraphs: string[];
    highlight: string[];
    closing: string[];
    foldButton: string;
  };
  copy: {
    introFirst: string;
    introSecond: string;
    openGift: string;
    birthdayTitle: string;
    photosTitle: string;
    photosSubtitle: string;
    noPhotosTitle: string;
    noPhotosBody: string;
    schoolPreludeOne: string;
    schoolPreludeTwo: string;
    schoolLineBefore: string;
    schoolLineAfter: string;
    pride: string;
    finalTitle: string;
    finalBody: string;
    musicOn: string;
    musicOff: string;
  };
};

export type PhotoAsset = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  dateLabel?: string;
  variant: "calm" | "softZoom" | "tilt";
};

export type ExperienceAssets = {
  photos: PhotoAsset[];
  musicSrc?: string;
  schoolLogoSrc?: string;
};
