import { createAsyncThunk } from "@reduxjs/toolkit";
import { I_imgInfo, IparamsForGetImages } from "../../types";

export const getDefaultImages:any = createAsyncThunk(
    'images/getDefaultImages',
    async (params: IparamsForGetImages):Promise<unknown> => {
        const link:string = 'https://api.unsplash.com/photos/?';
        const key:string = '&client_id=8pWnNGa4WyQtQs9z5CQMsqa7dQ1sBGBi2eU3LawxIQo';
    
        return new Promise((res:any, rej:any):void => {
            const response:Promise<Response> = fetch(`${link}page=${params.page}${key}`);
            res(response);
            rej(new Error());
        })
        .then(<Tres>(res:any):Tres => res.json())
        .then((res:any):I_imgInfo[] => {
            const data:I_imgInfo[] = [];

            console.log(res);
            res.map((el:any) => {
                data.push({
                    id: el.id,
                    title: el.alt_description,
                    description: el.description,
                    liked_by_user: false,
                    likes: el.likes,
                    created: el.created_at,
                    url_full: el.urls.full,
                    url_small: el.urls.small,
                });
            });
            return data;
        })
        .catch((rej:Error) => console.log(rej));
    }
);

export const getDesiredImages:any = createAsyncThunk(
    'images/getDesiredImages',
    async (params: IparamsForGetImages):Promise<unknown> => {
        const link:string = 'https://api.unsplash.com/search/photos/?';
        const query:string = `&query=${params.query}`;
        const key:string = '&client_id=8pWnNGa4WyQtQs9z5CQMsqa7dQ1sBGBi2eU3LawxIQo';
        return new Promise((res:any, rej:any):void => {
            const response:Promise<Response> = fetch(`${link}page=${params.page}${query}${key}`);
            res(response);
            rej(new Error());
        })
        .then(<Tres>(res:any):Tres => res.json())
        .then(<Tres>(res:any):Tres => res.results)
        .then((res:any):I_imgInfo[] => {
            const data:I_imgInfo[] = [];
            res.map((el:any) => {
                data.push({
                    id: el.id,
                    title: el.alt_description,
                    description: el.description,
                    liked_by_user: false,
                    likes: el.likes,
                    created: el.created_at,
                    url_full: el.urls.full,
                    url_small: el.urls.small,
                });
            });
            return data;
        })
        .catch((rej:Error) => console.log(rej));
    }
);