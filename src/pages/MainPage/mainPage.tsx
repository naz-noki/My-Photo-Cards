import { FC, useEffect, useLayoutEffect, useState, } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getDefaultImages, getDesiredImages, } from '../../store/Images/getImages';
import { I_imgInfo } from '../../types';
import Spinner from '../../components/Spinner/spiner';
import ImageList from '../../components/ImageList/imageList';

const MainPage:FC = () => {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const images = useAppSelector<I_imgInfo[]>((state) => state.imagesReducer.images);
    const isLoaded = useAppSelector<boolean | null | undefined>((state) => state.imagesReducer.isLoaded);
    const query = useAppSelector<string | null | undefined>((state) => state.imagesReducer.query);
    
    const setNewImages = ():void => {
        if(query !== '') dispatch(getDesiredImages({
            query, 
            page,
        }));
        else dispatch(getDefaultImages({page}));
    };

    const handlerScroll = ():void => {
        const currentHeight:number = Math.ceil(document.documentElement.scrollTop);
        const pageMaxHeight:number = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if(pageMaxHeight === currentHeight) setPage((prev:number) => prev+=1);
    }; 

    useLayoutEffect(() => {
        setNewImages();
    }, [page, query]); 
    
    
    useEffect(() => {
        document.addEventListener('scroll', handlerScroll);

        return () => {
            document.removeEventListener('scroll', handlerScroll);
        };
    }, []);

    if(isLoaded){
        return (
            <Spinner />
        );
    };

    return (
        <section>
            <ImageList images={images} />
        </section>
    );
};

export default MainPage;