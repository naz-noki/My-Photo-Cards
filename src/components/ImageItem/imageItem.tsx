import React, { memo, }  from "react";
import style from './imageItem.module.scss';

interface ImageCardProps {
    url_small: string,
    description: string,
}

const ImageItem:React.FC<ImageCardProps> = ({
    url_small,
    description,    
}) => {

    return (
        <>
            <img 
                src={url_small}  
                alt={description}  
                className={style.item}
                loading={"lazy"}
            />
        </>
    );
};

export default memo(ImageItem);