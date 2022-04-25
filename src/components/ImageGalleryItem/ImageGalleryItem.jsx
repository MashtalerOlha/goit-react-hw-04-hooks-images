import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imageCard }) => {
  return imageCard.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li className={s.ImageGalleryItem} key={id}>
      <a href={largeImageURL}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </a>
    </li>
  ));
};
