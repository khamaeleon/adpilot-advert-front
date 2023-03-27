import styled from "styled-components";
import {Link, useParams} from "react-router-dom";
import {menuList, narrowStyle, selectedIcon, widenStyle} from "./entity";
import {useEffect, useRef, useState} from "react";
import {AdminInfo} from "../../pages/layout";
import {useAtomValue} from "jotai/index";

function AsideList (props) {
  const {id, mode, role} = props
  const [userName, setUserName] = useState('')
  const adminInfoState = useAtomValue(AdminInfo)
  /**
   * 매체 전환시 리렌더링 일으키게 didupdate
   */
  useEffect(()=>{
    setUserName(adminInfoState.convertedUser)
  },[adminInfoState.convertedUser])

  return (
    <>
      {menuList.map((item,key) => {
        return(
          <div key={key}>
            <li className={id.indexOf(item.name) > -1 ? "active" : null} style={mode? narrowStyle.li : widenStyle.li}>
              <Link to={`/board/${item.name}`} className={mode? "icon-mode" : "list-mode"}>
                <Icon style={id.indexOf(item.name) > -1? {backgroundImage: `url(${selectedIcon[item.name]})`, opacity: 1}: {backgroundImage: `url(${selectedIcon[item.name]})`, opacity: .5}}/>
                <span className={mode? "fadeOut" : "fadeIn"}>{item.header}</span>
                {item.child.length > 0 && <DropIcon className={mode? "fadeOut" : "fadeIn"} style={id.indexOf(item.name) > -1 ? narrowStyle.button : widenStyle.button}/>}
              </Link>
              <SubMenu className={id.indexOf(item.name) > -1  ? "list slide-down-"+(item.child.length) : 'list'}>
                {item.child.map((child,key) => {
                  return (
                    <div key={key}>
                      <div>
                        <Link to={`/board/${child.name}`} style={id === child.name ? {color:'#fff'}:null}>{child.header}</Link>
                      </div>
                    </div>
                  )
                })}
              </SubMenu>
            </li>
          </div>
        )
      })
      }
    </>
  )
}

function Aside() {
  const params = useParams()
  const [asideWidth, setAsideWidth] = useState(false)
  const role = localStorage.getItem("role")
  /**
   * 가로 길이 변경
   */
  const handleChangeWidth = () => {
    setAsideWidth(!asideWidth)
  }

  return (
    <aside>
      <AsideContainer style={asideWidth ? {width: 84} : {width: 220}}>
        <Logo style={asideWidth ? narrowStyle.icon : widenStyle.icon}/>
        <Menu>
          <AsideList id={params.id} mode={asideWidth} role={role}/>
        </Menu>
        <Narrow>
          <button type={'button'} onClick={handleChangeWidth}>
            <BtnNarrow style={asideWidth ? narrowStyle.button : widenStyle.button}/>
          </button>
        </Narrow>
      </AsideContainer>
    </aside>
  )
}

export default Aside

const menuPL = '20px'

const AsideContainer = styled.div`
  position: relative;
  padding: 20px 0;
  height: 100vh;
  background-color: #141414;
  overflow: hidden;
  transition-duration: 0.5s;
`

const Logo = styled.div`
  margin-left: ${menuPL};
  height: 28px;
  background-image: url("/assets/images/logos/logo_inline_w@3x.png");
  background-size: contain;
  background-repeat: no-repeat;
`

const Menu = styled.ul`
  margin-top: 20px;
  width: 100%;

  & li {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition-duration: 0.5s;

    & > a {
      display: inline-block;
      padding-left: ${menuPL};
      width: 100%;
      height: 60px;
      color: #ccc;
      margin-left: 0px;
      transition-duration: 0.5s;

      &:hover {
        background-color: #f5811f;
      }

      & span {
        display: inline-block;
        margin-top: 19px;
        margin-left: 8px;
        vertical-align: middle;
        transition-duration: 0.5s;
        white-space: nowrap;
        font-size: 14px;
      }
    }
  }
`

const Icon = styled.div`
  float: left;
  width: 24px;
  height: 24px;
  background-size: 24px;
  background-repeat: no-repeat;
  margin: 18px 0;
`

const DropIcon = styled.div`
  float: right;
  width: 10px;
  height: 6px;
  margin: 27px 18px;
  background-image: url("/assets/images/common/icon_dropup.png");
  background-repeat: no-repeat;
`

const Narrow = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 14px;
  border-top: 1px solid #7e7e7e;

  & button {
    background-color: rgba(0, 0, 0, 0);
  }
`

const BtnNarrow = styled.div`
  width: 40px;
  height: 40px;
  background-image: url("/assets/images/aside/btn_close.png");
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  transition-duration: .5s;
`

const SubMenu = styled.div`
  background-color: #212020;
  transition-duration: 0.5s;
  transition-delay: 0.5s;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 52px;
  height: 0;

  & > div {
    color: #cccccc;

    & div {
      font-size: 13px;
      margin: 8px 0
    }
  }
`
