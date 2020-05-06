import * as React from 'react';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import Feed from "../../components/Feed/feed"

function HomePage() {
    return (
        <>
        <Header />
        {/* <Search/> */}
        <Feed />
        </>
    );
  }
  
  export default HomePage;