import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Core from "./containers/base/Core";
import LoadingPage from "./pages/LoadingPage";
import RegisterPage from "./pages/RegisterPage";
import styled, { ThemeProvider } from "styled-components";
import Theme from "./lib/styles/Theme";
import Footer from "./components/common/Footer";

//메인 화면을 한 곳에 동일한 사이즈로 보이도록 추가함.
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

// Core : 모달팝업 / 배경 레이어 ..
//ThemeProvider에 theme을 Theme.ts로 정의해줌으로써 Theme.ts에 정리해놓은
//폰트, 색깔 등을 사용한 Components를 추가할 수 있다.
function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Switch>
          <Wrapper>
            <Route path="/" component={HomePage} exact />
            <Route path="/auth" component={LoadingPage} />
            <Route path="/regist" component={RegisterPage} />
            <Footer />
          </Wrapper>
        </Switch>
        <Core />
      </ThemeProvider>
    </>
  );
}

export default App;
