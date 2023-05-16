import styled from "styled-components";

export const MainFolder = styled.div.attrs({
  className: "row clearfix main-folder-section",
})`
  .m-b-20 {
    margin-bottom: 20px;
  }
  .m-b-10 {
    margin-bottom: 10px;
  }
`;
export const StyledCard = styled.div.attrs({
  className: "col-lg-2 col-md-6 top-folder",
})`
  width: 20%;
  flex: 0 0 20%;
  max-width: 20%;
  margin: 0 0 15px;
  @media only screen and (max-width: 1500px) {
    padding: 0 10px;
  }
  @media only screen and (max-width: 991px) {
    width: 33.33%;
    flex: 0 0 33.33%;
    max-width: 33.33%;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 767px) {
    width: 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media only screen and (max-width: 460px) {
    width: 100%;
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }
  & .card {
    margin: 0;
    .body {
      font-size: 14px;
      padding: 10px;
      text-align: left;
      padding-left: 80px;
      padding-right: 5px;
      @media only screen and (max-width: 1500px) {
        padding-left: 60px;
      }
      @media only screen and (max-width: 1299px) {
        padding-left: 45px;
      }
    }
    p {
      width: 50px;
      height: 50px;
      padding: 7px;
      border-radius: 8px;
      position: absolute;
      left: 12px;
      top: 50%;
      margin-top: -25px;
      margin-bottom: 0;
      box-shadow: 0 0 18px rgba(0, 0, 0, 0.08);
      text-align: center;
      @media only screen and (max-width: 1500px) {
        width: 40px;
        height: 40px;
        padding: 5px;
        margin-top: -20px;
        left: 10px;
      }
      @media only screen and (max-width: 1299px) {
        width: 34px;
        height: 34px;
        padding: 3px;
        left: 7px;
        margin-top: -17px;
      }
      img {
        max-width: 100%;
        border-radius: 1px;
      }
    }
    span {
      font-size: 13px;
      font-weight: 600;
      @media only screen and (max-width: 1299px) {
        font-size: 11px;
      }
      @media only screen and (max-width: 991px) {
        font-size: 13px;
      }
    }
    h3 {
      font-size: 22px;
      margin: 0;
      line-height: 1.4em;
      @media only screen and (max-width: 1500px) {
        font-size: 19px;
      }
    }
    a {
      text-decoration: none;
    }
  }
`;
