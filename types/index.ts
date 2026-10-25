export interface LinkItem {
  id: string;
  title: string;
  url: string;
  clickCount: number;
}

export interface UserProfile {
  username: string;
  name: string;
  bio: string;
  photoUrl: string;
  links: LinkItem[];
}

export interface ClickRecord {
  linkId: string;
  username: string;
  timestamp: Date;
}
