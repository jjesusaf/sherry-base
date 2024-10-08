type Record<K extends keyof any, T> = {
    [P in K]: T;
};

export interface Post {
    name: string;
    image?: string;
    file: File,
    description: string;
    external_url: string;
    attributes: Record<string, any>[];
}