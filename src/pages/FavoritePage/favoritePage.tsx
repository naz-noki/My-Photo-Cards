import { FC } from 'react';
import { useAppSelector } from '../../store/store';
import { I_imgInfo } from '../../types';
import ImageList from '../../components/ImageList/imageList';

const FavoritePage:FC = () => {
  const images = useAppSelector<I_imgInfo[]>((state) => state.imagesReducer.favouriteImages);

  return (
    <section>
        <ImageList images={images} />
    </section>
  );
};
  
export default FavoritePage;