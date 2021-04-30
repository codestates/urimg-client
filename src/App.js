import React, { useState } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchResult from "./pages/SearchResult";
import Nav from "./components/Nav";
import Modal from "./components/Modal";

import { imagesData } from "./fakeData/images";

const App = ({ history }) => {
  const [ images, setImages ] = useState(imagesData);
  const [ searchImages, setSearchImages ] = useState(null);
  const [ searchKeyword, setSearchKeyword ] = useState('');
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ modalContent, setModalContent ] = useState('');

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

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const changeModalContent = (value) => {
    setModalContent(value);
  }

  return (
    <div className="App">
      <Modal isOpen={isModalOpen} close={closeModal} content={modalContent}/>
      <Nav handleButtonClick={getSearchImages} handleLogoClick={clearSearchImages}/>
      <Switch>
        <Route
        exact path='/main'
        render={() => (<Main images={images}/>)}
        />
        <Route
         exact path='/search'
         render={() => (<SearchResult searchImages={searchImages} searchKeyword={searchKeyword}/>)}
         />
        <Route
        exact path='/login'
        render={() => (<Login />)}
        />
        <Route
        exact path='/signup'
        render={() => <Signup />}
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
