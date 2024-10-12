type Record<K extends keyof any, T> = {
    [P in K]: T;
};

export interface Post {
    name: string;
    image?: string;
    description: string;
    external_url: string;
    attributes: Record<string, any>[];
    file: File | null;
}

export interface PostSubGraph {
    id: string;
    idCampaign: string;
    idPost: string;
    kol: string;
    url: string;
  }