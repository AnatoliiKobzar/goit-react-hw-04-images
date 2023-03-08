import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { getImage } from 'components/services/PixabayAPI';
import React, { useState } from 'react';
import { Wrap } from './ImageGallery.styled';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// export class ImageGallary1 extends Component {
//   state = {
//     images: [],
//     loading: false,
//     page: 1,
//     totalPages: null,
//     isShowButton: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { page } = this.state;
//     const { value } = this.props;

//     if (prevProps.value !== value) {
//       this.setState({
//         loading: true,
//         images: [],
//         page: 1,
//       });

//       getImage(value.trim())
//         .then(response => response.json())
//         .then(images => {
//           this.setState({
//             images: images.hits,
//             totalPages: Math.ceil(images.totalHits / 12),
//           });

//           if (Math.ceil(images.totalHits / 12) === 0) {
//             toast.error('No images on your request!');
//             return;
//           }

//           if (page < Math.ceil(images.totalHits / 12)) {
//             return this.setState({ isShowButton: true });
//           }
//           this.setState({ isShowButton: false });
//         })
//         .catch(error => console.log(error))
//         .finally(() => this.setState({ loading: false }));
//     }

//     if (prevState.page !== page && page !== 1) {
//       getImage(value.trim(), page)
//         .then(response => response.json())
//         .then(images => {
//           this.setState({
//             images: [...prevState.images, ...images.hits],
//           });

//           if (page < Math.ceil(images.totalHits / 12)) {
//             return this.setState({ isShowButton: true });
//           }
//           this.setState({ isShowButton: false });
//         })
//         .catch(error => console.log(error));
//     }
//   }

//   loadMore = () => {
//     this.setState({ page: this.state.page + 1 });
//   };

//   render() {
//     const { loading, isShowButton } = this.state;

//     return (
//       <Wrap>
//         {!loading ? (
//           <ul className="ImageGallery">
//             {this.state.images.map(img => {
//               return <ImageGalleryItem key={img.id} img={img} />;
//             })}
//           </ul>
//         ) : (
//           <Loader />
//         )}
//         {isShowButton && <Button loadMore={this.loadMore} />}
//       </Wrap>
//     );
//   }
// }

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
