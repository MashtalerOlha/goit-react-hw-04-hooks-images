import s from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imageCard }) => {
  return (
    <div className="gallery">
      <ul className={s.ImageGallery}>
        <ImageGalleryItem imageCard={imageCard} />
      </ul>
    </div>
  );
};
