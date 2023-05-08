import styled from 'styled-components';

export const MainContainer = styled.div.attrs({ className: '' })
`.form-group {
    position: relative;
    margin-bottom: 10px;
  }
  .form-group .form-control, .input-group .form-control {
    padding: 10px 18px 10px 18px;
  }
  .form-control {
    background-color: rgba(0,0,0,0);
    border: 1px solid #E3E3E3;
    border-radius: 30px;
    color: #2c2c2c;
    line-height: normal;
    font-size: .93em;
    -webkit-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    -moz-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    -o-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    -ms-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    -webkit-box-shadow: none;
    box-shadow: none;
    height: auto;
  }
  .btn {
    font-size: .93rem;
    padding: 11px 22px;
    @media screen and (max-width: 460px) {
      font-size: 12px;
    }
  }
  .btn-primary {
    background: #313740;
    border-color: #313740;
  }
  .blue-border {
    color: #f96332;
    font-size: 14px;
  }
  .blue-border:hover {
    color: #f96332;
  }
  .btn-success {
    background-color: #18ce0f;
    border-color: #18ce0f;
    color: #fff;
  }
  .btn-success:hover {
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.17);
    background-color: #1beb11;
  }
  .blue-btn {
    background-color: #18F;
    color: #ffffff;
    border: currentColor;
    font-size: 16px;
    font-weight: 600;
    padding: 9px 10px;
    display: inline-block;
    margin: 5px 1px;
    @media screen and (max-width: 460px) {
      font-size: 12px;
    }
  }
  .blue-btn:hover, .blue-btn:focus {
      background-color: #0b3157;
      color: #fff;
      text-decoration: none;
  }
  .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
    background-color: #E3E3E3;
    color: #888;
    cursor: not-allowed;
  }
  .btn-sm {
    font-size: 14px;
    border: 1px solid;
    padding: 10px 22px;
    background-color: rgba(0,0,0,0);
  }
  .btn-info {
    background-color: #2CA8FF;
    color: #fff;
  }
  .btn-round, .wizard>.actions a, .wizard>.actions .disabled a {
    border-width: 1px;
    border-radius: 30px !important;
    padding: 11px 23px;
  }
  .btn-info.btn-simple, .wizard>.actions .disabled a.btn-info {
    color: #2CA8FF;
    border-color: #2CA8FF;
  }
  .btn-sm.btn-simple, .wizard>.actions .disabled a.btn-sm {
    padding: 4px 14px;
  }
  .btn-success.btn-simple, .wizard>.actions .disabled a.btn-success {
    color: #18ce0f;
    border-color: #18ce0f;
  }
  .btn-success.btn-simple:hover {
    background-color: rgba(0,0,0,0);
  }
  .btn-simple, .wizard>.actions .disabled a {
    border: 1px solid;
    border-color: #888;
    padding: 10px 22px;
    background-color: rgba(0,0,0,0);
    margin: 5px 2px;
  }
`;
export const Card = styled.div.attrs()
  `
  transition: .5s;
  border: 0;
  position: relative;
  width: 100%;
  background: transparent;
  border-radius: 0.55rem;
`;

export const CardHeader = styled.div.attrs()
` color: #424242;
  padding: 20px 0;
  position: relative;
  box-shadow: none;
  h2 {
    font-size: 1rem;
    color: #212121;
    position: relative;
    margin : 0;
  }
`;


export const CardBody = styled.div.attrs()
` font-size: 14px;
  padding: 20px;
  text-align: left;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
  border-radius: 0.55rem;
  background: #fff;
  color: #616161;
  font-weight: 400;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 20px 0 rgba(0,0,0,0.1);
    transition: all 0.2s ease-in-out;
  }
`;
