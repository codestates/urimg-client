import React, { useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

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

import { imagesData } from "./fakeData/images";
import { setImages,
  setSearchImages,
  setSearchKeyword, 
  setIsImageUploadModalOpen,
  setImageUrl,
  setSingleImage } from './actions/index';

const App = ({ history }) => {
  const dispatch = useDispatch();

  const loginInfo = useSelector(state => state.userReducer);
  const { isLogin, userinfo } = loginInfo;

  const imageInfo = useSelector(state => state.imageReducer);
  const { images, searchImages, searchKeyword,
    isImageUploadModalOpen, imageUrl, singleImage } = imageInfo;

  useEffect(() => getImages(), [])

  const getImages = () => {
    dispatch(setImages(imagesData));
  }

  const getSearchImages = (query) => {
    /*
    search 컴포넌트에서 받은 query로 서버에 서치 요청 => 리스트 받은 후 setSearchImages 예정
    아래는 기능 체크를 위해 하드코딩된 데이터에서 검색한 후
    이미지 리스트를 변경하는 코드를 임시로 작성한 것입니다
    */
    dispatch(setSearchKeyword(query));
    dispatch(
      setSearchImages(
        images.filter(image => image.alt_description.includes(query))
      )
    );

    history.push("/");
  }

  const clearSearchImages = () => {
    dispatch(setSearchImages([]));
    history.push("/");
  }

  const openImageUploadModal = () => {
    // history.push("/");
    dispatch(
      setIsImageUploadModalOpen(true)
    )
  }

  const closeImageUploadModal = () => {
    // history.goBack();
    dispatch(
      setIsImageUploadModalOpen(false)
    )
    setImageUrl('');
  }

  const handleFileChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      dispatch(setImageUrl(reader.result));
    }
    reader.readAsDataURL(file);
  }

  const uploadImage = () => {
    // 서버에 받은 이미지를 업로드하는 함수
  }

  const redirectToImage = (image) => {
    dispatch(setSingleImage(image));
    history.push("/image");
  }

  return (
    <div className="App">
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
      />
      <Switch>
        <Route
        exact path='/main'
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
          if (searchImages.length === 0) {
            return <Redirect to='/main' />;
          }
          return <Redirect to='/search' />;
        }}
        />
      </Switch>
    </div>
  )
}

export default withRouter(App);
