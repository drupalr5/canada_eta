import React from "react";
import siteLogo from "../../Allassets/assets/images/canada_logo.jpg";

function Logo({width, style}) {
  return (
    <>
      <img id="profile_pic" src={siteLogo} alt="User" width={width} style={style}/>
    </>
  );
}

export default Logo;
