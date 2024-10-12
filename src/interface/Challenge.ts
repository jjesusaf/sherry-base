export interface Challenge {
    id_challenge: number;
    id_post: string;
    title: string;
    description: string;
    image: string;
    external_url: string;
    votes: number
    kol: Kol;
  }

  interface Kol {
    id_kol: number;
    name: string;
    username: string;
    avatar: string;
  }