import { startTransition, } from "react";
import { PayloadAction, createSlice, } from "@reduxjs/toolkit";
import { I_imgInfo, isNull, } from "../../types";
import { getDesiredImages, getDefaultImages, } from './getImages';
import { I_initialState } from './types';

const initialState:I_initialState = {
    isLoaded: false,
    images: [],
    favouriteImages: [],
    query: '',
    activeImage: null,
};

const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setNewQuery: (state:I_initialState, action:PayloadAction<string>) => {
            state.query = action.payload;
            if(state.query !== '') {
                state.images = [];
            }
        },

        setNewActiveImage: (state:I_initialState, action:PayloadAction<I_imgInfo | null>) => {
            if(isNull(action.payload)) state.activeImage = null;
            else {
                state.activeImage = state.images.find((el:I_imgInfo) => el.id === action.payload?.id); 
            };
        },

        setLikeForImage: (state:I_initialState, action:PayloadAction<string>) => {
            for(const idx in state.images) {
                const el = state.images[idx];

                if(el.id === action.payload) {
                    if(el.liked_by_user === false) state.images[idx].likes += 1;
                    else state.images[idx].likes -= 1;

                    state.images[idx].liked_by_user = !el.liked_by_user;
                };
            };

            state.favouriteImages = state.images.filter((el: I_imgInfo) => el.liked_by_user === true);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDesiredImages.pending, (state:I_initialState) => {
                state.isLoaded = true;
            })
            .addCase(getDesiredImages.fulfilled, (state:I_initialState, action:PayloadAction<I_imgInfo[]>) => {
                if(action.payload) {
                    startTransition(() => {
                        state.images.unshift(...action.payload);
                    });
                } 
                state.isLoaded = false;
            })
            
            .addCase(getDefaultImages.pending, (state:I_initialState) => {
                state.isLoaded = true;
            })
            .addCase(getDefaultImages.fulfilled, (state:I_initialState, action:PayloadAction<I_imgInfo[]>) => {
                if(!JSON.stringify(state.images).includes(JSON.stringify(action.payload))) {
                    startTransition(() => {
                        state.images.push(...action.payload);
                    });
                }
                state.isLoaded = false;
            })

    }
});

export const { reducer: imagesReducer, actions: imagesActions } = imagesSlice;