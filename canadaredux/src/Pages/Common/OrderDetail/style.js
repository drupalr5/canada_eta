import styled from 'styled-components'

export const OrderDetailCard = styled.div.attrs()
` transition: .5s;
  border: 0;
  position: relative;
  width: 100%;
  background: transparent;
  border-radius: 0.55rem;
`;

export const OrderDetailCardHeader = styled.div.attrs()
` padding: 0 0 10px;
  font-size: 20px;
  margin: 0 0 20px;
  border-bottom: 2px solid #cccccc;
  font-weight: bold;
  color: #000000;
  background: none;
  border-bottom: 2px solid #cccccc;
  font-family: 'Muli', Arial, Tahoma, sans-serif;
  .showing_entry-parent {
    float: right;
    div {
      font-size: 14px;
    }
  }
`;

export const OrderDetailSubHeader = styled.div.attrs()
` font-weight: bold;
  color: #000000;
  background: none;
  padding: 0;
  font-size: 18px;
  border: none;
  margin-bottom: 0;
  font-family: 'Muli', Arial, Tahoma, sans-serif;
  h5 {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const OrderDetailCardBody = styled.div.attrs()
` min-height: 190px;
  padding: 0;
  .table {
    color: #212529;
  }
  .table td, .table th {
    vertical-align: middle;
    white-space: nowrap;
    @media screen and (max-width: 820px) {
      white-space: initial;
    }
  }
  .table-bordered {
    border: 2px solid #dee2e6;
  }
  textarea.form-control {
    margin: 0 0 15px;
    border: 1px solid #e3e3e3;
  }
  input[type="checkbox"] + * {
    margin-right: 15px;
    margin-left: 5px;
  }
`;