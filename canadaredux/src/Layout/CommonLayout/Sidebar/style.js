import styled from "styled-components";

export const MiniAsideLeftBar = styled.aside.attrs({className: "minileftbar", id: "minileftbar"})
`
  background: #22252b;
  text-align: center;
  width: 50px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 99;

  .menu_list {
    list-style: none;
    margin: 0;
    padding: 0;

    li a {
      padding: 10px;
      color: #fff;
    }

    .bars-icon {
      display: none;
      vertical-align: middle;
      margin: 0 auto;

      @media (max-width: 1150px) {
        display: block;
      }
    }

    .power {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .badgebit {
      position: relative;
    }

    .badgebit .notify {
      position: absolute;
      right: 20px;
      top: 20px;
    }

    @media (max-width: 1169px) {
      a.menu-sm {
        display: none !important;
      }
    }

    @media (max-width: 767px) {
      margin: -5px !important;
    }
  }
`;

export const MiniAsideRightMenu = styled.aside.attrs({className: "right-menu"})
` 
  .sidebar {
    display: inline-block;
    transition: all 0.5s;
    font-family: "Muli",sans-serif;
    border-radius: 0.1875rem;
    width: 250px !important;
    height: calc(100vh - 20px);
    background: #f4f7f6;
    position: fixed;
    top: 0px;
    left: 50px;
    z-index: 10;
    padding: 12px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &.show {
      display: block;
    }
    &.hide {
      @media (max-width: 1150px) {
        display: none;
      }
    }
    .menu {
      position: relative;
      .list {
        padding: 0 10px;       
        list-style: none;
        .user-info {
          text-align: center;
          margin-bottom: 10px;
          position: relative;
          border-bottom: 1px solid #eee;
          color: #424242;
          .image {
            img {
              width: 80px;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              -ms-border-radius: 50%;
              border-radius: 50%;
              vertical-align: bottom !important;
              border: 3px solid #fff;
              box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.5);
            }
            a {
              padding: 5px;
            }
          }
          .detail {
            margin-bottom: 10px;
            h6 {
              font-weight: 700;
              text-transform: uppercase;
            }
            a {
              display: inline-block !important;
              padding: 10px 5px !important;
            }
          }
        }
        a {
          color: #313740;
          position: relative;
          display: flex;
          align-items: center;
          padding: 15px 5px;
          font-size: 15px;
          img {
            min-width: 14px;
          }
          span {
            margin: 0 0 0 12px;
            &.badge {
              padding: 2px 8px;
              text-transform: uppercase;
              font-size: .7142em;
              line-height: 12px;
              background-color: rgba(0,0,0,0);
              border: 1px solid;
              border-radius: 2px;
            }
            &.badge-default {
              border-color: #888;
              color: #888 !important;
            }
            &.float-right {
              float: right!important;
            }
          }
          
          &.waves-effect {
            position: relative;
            cursor: pointer;
            overflow: hidden;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
          &:hover, &:focus, &:active {
            text-decoration: none !important;
            color: #525a65;
          }
          &.active {
            background: #313740;
            color: #afafaf;
            span {
              font-weight: 700;
              color: #fff;
            }
          }
        }
        .m-b-20 {
          margin-bottom: 20px;
        }
        .header {
          font-size: 11px;
          font-weight: 700;
          padding: 8px 12px;
          position: relative;
          color: #616161;
          margin-top: 15px;
        }
      }
    }
    .menu .list a span + span:last-child {
      margin-left: auto;
    }
  }
`;


export const OverlayWrapper = styled.div.attrs({className: 'overlay'})`
  @media (max-width: 1150px) {
    position: fixed;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    display: ${props => (props.overlay ? `block` : `none`)};
  }
`;