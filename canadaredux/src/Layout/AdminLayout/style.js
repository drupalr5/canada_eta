import styled from 'styled-components';

export const SectionStyled = styled.section.attrs({
  className: "home content",
})`
  margin: 0 0 0 280px;
    transition: .5s;
    z-index: 9;
    position: relative;
    border-radius: 0.55rem;
    padding-right: 10px;
    padding-top: 10px;
    padding-left: 10px;
    // background: #f4f7f6;
    // height: calc(100vh - 1px);
  @media (max-width: 1150px) {
    margin: 0 0 0 50px;
  }
`;

export const ContainerFluid = styled.div.attrs({
  className: "container-fluid",
})``;

export const MainWrapper = styled.div.attrs({
  className: "row clearfix",
})``;