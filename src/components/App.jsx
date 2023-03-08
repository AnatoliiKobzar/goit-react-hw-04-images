import { useState } from 'react';
import { ImageGallary } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const [searchText, setSearchText] = useState('');

  const handelSubmit = searchText => {
    setSearchText(searchText);
  };

  return (
    <div className="App">
      <Toaster
        toastOptions={{
          duration: 1500,
          style: {
            background: '#363636',
            color: '#fff',
          },
          position: 'top-right',
        }}
      />
      <Searchbar onSearch={handelSubmit} />
      <ImageGallary value={searchText} />
    </div>
  );
};
