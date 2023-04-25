import React, { useState } from "react";

function Image(props) {
  const [thuumb, setThumb] = useState(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  if (props.file!=undefined) {
    let reader = new FileReader();

    reader.onloadend = () => {
      setThumb(reader.result);
      setHeight(200);
      setWidth(200);
    };

    reader.readAsDataURL(props.file);
  }
  return (
    <>
      <img
        src={thuumb}
        alt={props?.fileUpload?.name}
        className="img-thumbnail mt-2"
        height={height}
        width={width}
      />
    </>
  );
}

export default Image;
