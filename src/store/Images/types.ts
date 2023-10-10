import { I_imgInfo } from "../../types";

export interface I_initialState {
    isLoaded: boolean,
    images: I_imgInfo[],
    favouriteImages: I_imgInfo[],
    query: string,
    activeImage: I_imgInfo | null | undefined,
};