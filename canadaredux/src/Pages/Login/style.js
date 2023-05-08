import styled from 'styled-components';
const inputPaddingX = '0.75rem';
const inputPaddingY =  '0.75rem';
export const MainContainer = styled.div.attrs({className: ''})``;
export const CardLogin = styled.div.attrs({className: ''})
  `
    max-width: 25rem;
    border: solid 3px #ccc !important;
`;

export const CardBody = styled.div.attrs({className: ''})
`
  .form-label-group {
    position: relative;
  }
  .form-label-group > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    -webkit-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }

  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(${inputPaddingY} + ${inputPaddingY} * (2 / 3));
    padding-bottom: calc(${inputPaddingY} / 3);
  }
  
  .form-label-group input:not(:placeholder-shown) ~ label {
    padding-top: calc(${inputPaddingY} / 3);
    padding-bottom: calc(${inputPaddingY} / 3);
    font-size: 12px;
    color: #777;
  }
  .form-label-group > input, .form-label-group > label {
    padding: ${inputPaddingY} ${inputPaddingX};
    height: auto;
  }
`;
export const CardHeader = styled.div.attrs({className: ''})``;