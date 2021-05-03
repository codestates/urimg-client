import React, { useState } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { useSelector } from 'react-redux';

import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchResult from "./pages/SearchResult";
import Mypage from "./pages/Mypage";
import SetUserInfo from './pages/SetUserInfo';
import SetPassword from "./pages/SetPassword";

import Nav from "./components/Nav";
import ImageUploadModal from "./components/ImageUploadModal";

import { imagesData } from "./fakeData/images";
import ImageDetail from "./pages/ImageDetail";

const App = ({ history }) => {
  const [ images, setImages ] = useState(imagesData);
  const [ searchImages, setSearchImages ] = useState(null);
  const [ searchKeyword, setSearchKeyword ] = useState('');
  const [ isImageUploadModalOpen, setIsImageUploadModalOpen ] = useState(false);
  const [ imageUrl, setImageUrl ] = useState('');
  const [ singleImage, setSingleImage ] = useState(imagesData[0]);

  const state = useSelector(state => state.userReducer);
  const { loginStatus, userinfo } = state;

  const getImages = () => {
    // 서버에서 이미지를 불러와서 setImages
  }

  const getSearchImages = (query) => {
    /*
    search 컴포넌트에서 받은 query로 서버에 서치 요청 => 리스트 받은 후 setSearchImages 예정
    아래는 기능 체크를 위해 하드코딩된 데이터에서 검색한 후
    이미지 리스트를 변경하는 코드를 임시로 작성한 것입니다
    */
    setSearchKeyword(query);
    setSearchImages(
      images.filter(image => image.alt_description.includes(query))
    );
    history.push("/");
  }

  const clearSearchImages = () => {
    setSearchImages(null);
    history.push("/");
  }

  const openImageUploadModal = () => {
    // history.push("/");
    setIsImageUploadModalOpen(true);
  }

  const closeImageUploadModal = () => {
    // history.goBack();
    setIsImageUploadModalOpen(false);
    setImageUrl('');
  }

  const handleFileChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setImageUrl(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const uploadImage = () => {
    // 서버에 받은 이미지를 업로드하는 함수
  }

  const redirectToImage = (image) => {
    setSingleImage(image);
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
        loginStatus={loginStatus}
      />
      <Switch>
        <Route
        exact path='/main'
        render={() => (<Main images={images} redirectToImage={redirectToImage}/>)}
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
        render={() => <Mypage userInfo={userinfo} loginStatus={loginStatus} />}
        />
        <Route
        exact path='/setting/profile'
        render={() => (<SetUserInfo />)}
        />
        <Route
        exact path='/setting/password'
        render={() => <SetPassword />}
        />
        <Route
        exact path='/image'
        render={() => <ImageDetail image={singleImage}/>}
        />
        <Route path='/' render={() => {
          if (!searchImages) {
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
