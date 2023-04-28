import React from "react";
import siteLogo from "../../Allassets/assets/images/canada_logo.jpg";

function Logo({width}) {
  return (
    <>
      <img id="profile_pic" src={siteLogo} alt="User" width={width}/>
    </>
  );
}

export default Logo;
