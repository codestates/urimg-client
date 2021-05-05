import React, { useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchResult from "./pages/SearchResult";
import Mypage from "./pages/Mypage";
import SetUserInfo from './pages/SetUserInfo';
import SetPassword from "./pages/SetPassword";
import ImageDetail from "./pages/ImageDetail";

import Nav from "./components/Nav";
import ImageUploadModal from "./components/ImageUploadModal";
import Modal from "./components/Modal";

import { imagesData } from "./fakeData/images";
import { 
  setLoginStatus,
  setImages,
  setSearchImages,
  setSearchKeyword, 
  setIsImageUploadModalOpen,
  setMessageModal,
  setImageUrl,
  setSingleImage } from './actions/index';

const App = ({ history }) => {
  
  const dispatch = useDispatch();

  const loginInfo = useSelector(state => state.userReducer);
  const { isLogin, userinfo } = loginInfo;

  const imageInfo = useSelector(state => state.imageReducer);
  const { images, searchImages, searchKeyword,
    isImageUploadModalOpen, messageModal,
    imageUrl, singleImage } = imageInfo;
  useEffect(() => getImages(), [])

  async function getImages() {
    // await axios.get(`${process.env.REACT_APP_API_URL}/img/list`)
    // .then((res) => {
    //   dispatch(setImages(res.data.data.images));
    // })
    // .catch((err) => {
    //   if (err) throw err;
    // })

    dispatch(setImages(imagesData));
  }

  async function getSearchImages(query) {
    // await axios.post(`${process.env.REACT_APP_API_URL}/img/search`, {
    //   query: query
    // }, {
    //   headers : {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then((res) => {
    //   dispatch(setSearchKeyword(query));
    //   dispatch(setSearchImages(res.data.data.images));
    // })
    // .catch((err) => {
    //   if (err) throw err;
    // });

    dispatch(setSearchKeyword(query));
    dispatch(
      setSearchImages(
        images.filter(image => image.alt_description.includes(query))
      )
    );
    history.push("/search");
  }

  const clearSearchImages = () => {
    dispatch(setSearchImages(null));
    history.push("/");
  }

  const openImageUploadModal = () => {
    dispatch(
      setIsImageUploadModalOpen(true)
    )
  }

  const closeImageUploadModal = () => {
    dispatch(
      setIsImageUploadModalOpen(false)
    )
    dispatch(setImageUrl(''));
  }

  const handleFileChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      dispatch(setImageUrl(reader.result));
    }
    reader.readAsDataURL(file);
  }

  async function uploadImage(query) {
    // await axios.post(`${process.env.REACT_APP_API_URL}/img/upload`, {
    //   filepath: imageUrl,
    //   description: query
    // }, {
    //   headers : {
    //     Authorization: `Bearer ${localStorage.accessToken}`
    //   }
    // })
    // .then(() => {
    //   dispatch(isModalOpen(true));

    //   dispatch(setIsImageUploadModalOpen(false));
    // })
    // .catch((err) => {
    //   if (err.response.data === "Refresh token expired") {
    //     dispatch(setLoginStatus(false));
    //     localStorage.removeItem('accessToken');
    //     history.push("/login");
    //   }
    //   if (err) throw err;
    // })

    dispatch(setMessageModal(true, '업로드가 완료되었습니다.'));
    dispatch(setIsImageUploadModalOpen(false));
  }

  const redirectToImage = (image) => {
    dispatch(setSingleImage(image));
    history.push("/image");
  }

  return (
    <div className="App">
      <Modal
        isOpen={messageModal.isModalOpen}
        content={messageModal.content}
      />
      <ImageUploadModal
        isOpen={isImageUploadModalOpen}
        close={closeImageUploadModal}
        handleFileChange={handleFileChange}
        uploadImage={uploadImage}
        imageUrl={imageUrl}
      />
      <Nav
        handleButtonClick={getSearchImages}
        handleLogoClick={clearSearchImages}
        openModal={openImageUploadModal}
        isLogin={isLogin}
        profileImage={userinfo.profile_image}
      />
      <Switch>
        <Route
        path='/main'
        render={() => (
          <Main
            images={images}
            redirectToImage={redirectToImage}
          />)}
        />
        <Route
         exact path='/search'
         render={() => (
          <SearchResult
            searchImages={searchImages}
            searchKeyword={searchKeyword}
            redirectToImage={redirectToImage}
          />)}
         />
        <Route
        exact path='/login'
        render={() => (<Login />)}
        />
        <Route
        exact path='/signup'
        render={() => <Signup />}
        />
        <Route
        exact path='/mypage'
        render={() => <Mypage userInfo={userinfo} isLogin={isLogin}/>}
        />
        <Route
        exact path='/setting/profile'
        render={() => (
          <SetUserInfo 
            handleFileChange={handleFileChange}
            imageUrl={imageUrl}
          />)}
        />
        <Route
        exact path='/setting/password'
        render={() => <SetPassword />}
        />
        <Route
        exact path='/image'
        render={() => <ImageDetail image={singleImage} isLogin={isLogin}/>}
        />
        <Route path='/' render={() => {
            return <Redirect to='/main' />;
          }}
        />
      </Switch>
    </div>
  )
}

export default withRouter(App);
