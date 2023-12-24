import { ColorRing } from 'react-loader-spinner';

import { LoaderOverlay } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderOverlay>
      <ColorRing
        
  visible={true}
  height="180"
  width="180"
  ariaLabel="blocks-loading"
  wrapperStyle={{position: 'absolute'}}
  wrapperClass="blocks-wrapper"
  colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
  
      />
    </LoaderOverlay>
  );
};











