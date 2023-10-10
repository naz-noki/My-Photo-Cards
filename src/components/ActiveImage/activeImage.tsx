import { FC, useCallback, useEffect, useState, } from 'react';
import style from './activeImage.module.scss';
import { useAppSelector, useAppDispatch, } from '../../store/store';
import { I_imgInfo, } from '../../types';
import { imagesActions } from '../../store/Images/images.slice';

const ActiveImage:FC = () => {
    const currentImage = useAppSelector<I_imgInfo | undefined | null>((state) => state.imagesReducer.activeImage);
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleIsFavourite = ():void => {
        setIsFavourite((prev) => !prev);

        if(
            currentImage !== undefined &&
            currentImage !== null
        ) dispatch(imagesActions.setLikeForImage(currentImage.id));
    };

    const handleCLoseActiveImage = ():void => {
        dispatch(imagesActions.setNewActiveImage(null));
    };

    useEffect(() => {
        if(
            currentImage !== undefined &&
            currentImage !== null
        ) setIsFavourite(currentImage.liked_by_user);
    }, [currentImage]);

    return (
        <>
            <main className={currentImage === null ? style.wrapper__closed : style.wrapper}>
                {currentImage !== null && <>
                    <section className={style.block}>
                        <img 
                            src={currentImage?.url_full}
                            alt={currentImage?.title} 
                            className={style.block__img}
                        />
                    </section>
                    <section className={style.block}>                   
                        <div className={style.info}>
                            <div className={style.title}>
                                {currentImage?.title.toUpperCase()}
                            </div>
                            <div className={style.description}>
                                {currentImage?.description}
                            </div>
                            <div className={style.additionally}>
                                <b>Created: </b> 
                                {currentImage?.created.slice(0, 10)}
                            </div>
                            <div className={style.additionally}>
                                <b>Likes: </b> 
                                {currentImage?.likes}
                            </div>
                            <button 
                                className={style.liked_by_user__active}
                                onClick={() => handleIsFavourite()}
                            >
                                <img 
                                    src={`/img/favorite-${isFavourite}.png`}
                                    alt="favourite" 
                                    className={style.liked}
                                />
                            </button>
                        </div>
                        <button 
                            onClick={() => handleCLoseActiveImage()} 
                            className={style.close}
                        >
                            <img 
                                className={style.close__icon}
                                src="./img/close__icon.png" 
                                alt="close__icon" 
                            />
                        </button> 
                    </section>                
                </>}
            </main>
        </>
    );
};

export default ActiveImage;