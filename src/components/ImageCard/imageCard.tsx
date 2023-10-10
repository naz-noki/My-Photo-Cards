import { FC, memo, ReactElement } from 'react';
import style from './imageCard.module.scss';
import { I_imgInfo } from '../../types';
import { imagesActions } from '../../store/Images/images.slice';
import { useAppDispatch } from '../../store/store';

interface ImageCardProps {
    children: ReactElement,
    item: I_imgInfo,
}

const ImageCard:FC<ImageCardProps> = ({
    children,
    item,
}) => {
    const dispatch = useAppDispatch();

    const handlerSetNewActiveImage = ():void => {
        dispatch(imagesActions.setNewActiveImage(item));
        window.scrollTo(0, 0);
    };

    return (
        <>
            <li 
                className={style.container}
                onClick={() => handlerSetNewActiveImage()}
            >
                {children}
            </li>            
        </>
    );
};

export default memo(ImageCard);