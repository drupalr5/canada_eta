import styled from "styled-components";

export const StyledHeader = styled.div.attrs({ className: "block-header" })`
  padding: 10px 0;
  color: #616161;
  margin-bottom: 15px;
  .breadcrumb {
    margin-bottom: 0;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    -ms-border-radius: 50px;
    border-radius: 50px;
    background: 0 0;
    display: -ms-flexbox;
    .breadcrumb-item {
      // font-size: 15px;
      a {
        outline: none !important;
        color: #f96332;
      }
    }
  }
  .padding-0,
  .breadcrumb {
    padding: 0 !important;
  }

  & li {
    // list-style: none;
  }
  .input-group .form-control {
    padding: 10px 18px;
    :first-child {
      border-right: 0;
    }
  }
  h2 {
    font-size: 20px;
    margin: 0px 0px 5px 0px;
    font-weight: 500;
    line-height: 1.2;
  }
  .m-b-0 {
    margin-bottom: 0px;
  }
  .form-control {
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #e3e3e3;
    border-radius: 30px;
    color: #2c2c2c;
    line-height: normal;
    font-size: 0.93em;
    -webkit-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
    -moz-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
    -o-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
    -ms-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
    transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
    -webkit-box-shadow: none;
    box-shadow: none;
    height: auto;
  }
  .form-control + .input-group-addon:not(:first-child) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .input-group-addon:last-child {
    border-left: 0;
  }
  .form-control + .input-group-addon {
    background-color: transparent;
  }
  .input-group .form-control + .input-group-addon {
    padding: 10px 18px 10px 0;
    //   border: 1px solid #e3e3e3;
    //   border-left: 0 none;
    //   border-radius: 30px;
    //   color: #2c2c2c;
    //   margin-left: -20px;
    //   z-index: 10;
    //   border-top-left-radius: 0;
    //   border-bottom-left-radius: 0;
  }
  .input-group-addon {
    border: 1px solid #e3e3e3;
    border-radius: 30px;
    color: #555;
  }
  .form-control:focus + .input-group-addon,
  .form-control:focus ~ .input-group-addon {
    border:1px solid #f96332;border-left:none;background-color:transparent
  }
  // .form-control:focus + .input-group-addon {
  //   border-left: 0;
  // }
  .input-group-addon svg{
    width: 17px;
    display: inline-block;
    font: normal normal normal 14px/1 'Material-Design-Iconic-Font';
    font-size: 18px;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
`;
