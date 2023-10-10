export interface I_imgInfo {
    id: string,
    title: string,
    description: string,
    liked_by_user: boolean,
    likes: number,
    created: string,
    url_full: string,
    url_small: string,
};

export interface IparamsForGetImages {
    query?: string, 
    page: number, 
};

export const isNull = (value: unknown): value is null => {
    return value === null;
};