export interface SlideshowProps {
  images: string[];
  title1: string;
  title2: string;
}

export interface AboutProps {
  titleAbout: string;
  paragraphAbout: string;
}

export interface AlonePictureProps {
  image: string;
}

export interface SponsorPictureProps {
  image: string;
}

export interface NewsProps {
  id: number;
  titleNews: string;
  contentNews: string;
}
