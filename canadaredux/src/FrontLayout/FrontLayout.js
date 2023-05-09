import React from "react";
import TrackOrder from '../Components/TrackOrder/TrackOrder'
import Main from './Main';

function FrontLayout() {
  return(
    <>
      <div id="topbar"></div>
      <header id="header" className="fixed-top"></header>
      <main>
        <Main></Main>
      </main>
    </>
  )
}
export default FrontLayout;