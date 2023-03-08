import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { getImage } from 'components/services/PixabayAPI';
import { useState } from 'react';
import { Wrap } from './ImageGallery.styled';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const ImageGallary = ({ value }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isShowButton, setIsShowButton] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (!value) {
      return;
    }

    setLoading(true);
    setImages([]);
    setPage(1);

    getImage(value)
      .then(response => response.json())
      .then(images => {
        setImages(images.hits);
        setCurrentValue(value);
        if (Math.ceil(images.totalHits / 12) === 0) {
          toast.error(`No images on your request - ${value}!`);
          return;
        }

        if (images.totalHits > 12) {
          return setIsShowButton(true);
        }
        setIsShowButton(false);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [value]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    getImage(currentValue, page)
      .then(response => response.json())
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);

        if (page < Math.ceil(images.totalHits / 12)) {
          return setIsShowButton(true);
        }
        setIsShowButton(false);
      })
      .catch(error => console.log(error));
  }, [currentValue, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Wrap>
      {!loading ? (
        <ul className="ImageGallery">
          {images.map(img => {
            return <ImageGalleryItem key={img.id} img={img} />;
          })}
        </ul>
      ) : (
        <Loader />
      )}
      {isShowButton && <Button loadMore={loadMore} />}
    </Wrap>
  );
};

ImageGallary.propTypes = {
  value: PropTypes.string.isRequired,
};
