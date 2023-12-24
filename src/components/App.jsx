import  { useState, useEffect} from 'react';
import Notiflix from 'notiflix';

import { fetchData } from './fetch';
import { notifySettings } from './fetch';

import { Container } from './App.styled';
import { StartText } from './StartText/StartText';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import DefaultPic from "./Images/default-image.jpg"

export const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [picsArr, setPicsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(DefaultPic);
  const [imageTags, setImageTags] = useState(null);

  // state = {
  //   // searchQuery: '',
  //   // page: 1,
  //   // picsArr: [],
  //   // isLoading: false,
  //   // showModal: false,
  //   // showLoadMoreBtn: false,
  //   largeImageURL: DefaultPic,
  //   imageTags: null,
  // };


  useEffect(() => { 

    setIsLoading(true);
    fetchQuery(searchQuery, page);

  },
    [searchQuery, page])
  
  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.searchQuery !== prevState.searchQuery ||
  //     this.state.page !== prevState.page
  //   ) {
  //     this.setState({ isLoading: true });
  //     this.fetchQuery(this.state.searchQuery, this.state.page);
  //   }
  // }

  const onSubmit = FormData => {
    const { query } = FormData;
    // this.setState({ searchQuery: query, page: 1, picsArr: [] });
    setSearchQuery(query);
    setPage(1);
    setPicsArr([]);
  };



  async function fetchQuery(query, page) {
    try {
      await fetchData(query, page).then(result => {
        const data = result.data;
        const total = data.totalHits;
        const picsArr = data.hits;
        const picsLeft = total - 12 * page;

        if (picsArr.length === 0) {
          // this.setState({ showLoadMoreBtn: false });
          setShowLoadMoreBtn(false);
         

          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
            notifySettings
          );

          return;

        } else {
          // this.setState(prevState => ({
          //   picsArr: [...prevState.picsArr, ...picsArr],
          // }));

          setPicsArr(prevState => [...prevState, ...picsArr]);
        }

        if (picsArr.length > 0 && page === 1) {
          Notiflix.Notify.success(
            `Hooray! We found ${total} images.`,
            notifySettings
          );
        }

        picsLeft > 0
          // ? this.setState({ showLoadMoreBtn: true })
          // : this.setState({ showLoadMoreBtn: false });
          ? setShowLoadMoreBtn(true)
          : setShowLoadMoreBtn(false);
        
      });
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure(
        'Sorry, something went wrong, please try again later',
        notifySettings
      );
    } finally {
      // this.setState({ isLoading: false });
      setIsLoading(false);
     
    }
  };


  const toggleModal = (largeImageURL, imageTags) => {
    // this.setState(prevState => ({
    //   showModal: !prevState.showModal,
    //   largeImageURL: largeImageURL,
    //   imageTags: imageTags,
    // }));

    setShowModal(prevState => !prevState);
    setLargeImageURL(largeImageURL);
    setImageTags(imageTags);
  };

 const  onLoadMoreBtnClick = () => {
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
   
   setPage(prevState => prevState + 1);
   
  };

  
  return (
      
    <>
      
        <Searchbar onSubmit={onSubmit} />

      {/* {this.state.picsArr.length === 0 && <StartText />} */}
      
        {picsArr.length === 0 && <StartText />}

      <Container>
        
          <ImageGallery
            // pics={this.state.picsArr}
            // showModal={this.toggleModal}
            pics={picsArr}
            showModal={toggleModal}
          />

          {/* {this.state.showLoadMoreBtn && (
            <Button
              text="Load more"
              status="load"
              onClick={this.onLoadMoreBtnClick}
              onLoaderPlay={this.state.isLoading}
            />
          )} */}
        
        {showLoadMoreBtn && (
          
            <Button
              text="Load more"
              status="load"
              onClick={onLoadMoreBtnClick}
              onLoaderPlay={isLoading}
            />
          )}
        </Container>

        {/* {this.state.isLoading && <Loader />} */}

        {isLoading && <Loader />}

        {/* {this.state.showModal && (
          <Modal
            src={this.state.largeImageURL}
            alt={this.state.imageTags}
            closeModal={this.toggleModal}
          />
        )} */}

        {showModal && (
          <Modal
            src={largeImageURL}
            alt={imageTags}
            closeModal={toggleModal}
          />
        )}

    </>
    
  );
  
  }
