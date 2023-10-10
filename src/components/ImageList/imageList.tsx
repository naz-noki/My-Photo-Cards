import { FC, useDeferredValue } from 'react';
import style from './imageList.module.scss';
import ImageCard from '../ImageCard/imageCard';
import ImageItem from '../ImageItem/imageItem';
import { I_imgInfo } from '../../types';

interface I_ImageListProps {
    images: I_imgInfo[],
};

const ImageList:FC<I_ImageListProps> = ({
    images,
}) => {
    const imagesList = useDeferredValue<I_imgInfo[]>(images);
   
    return (
        <ul className={style.wrapper}>
            {
                imagesList.map((el:I_imgInfo, idx:number) => (
                    <ImageCard key={idx} item={el}>
                        <ImageItem url_small={el.url_small} description={el.description} />
                    </ImageCard>
                ))
            }
        </ul>
    );
};

export default ImageList;