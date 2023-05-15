import styled from "styled-components";
import {Link, useLocation, useParams} from "react-router-dom";
import {menuList, narrowStyle, reportsInfoAtom, selectedIcon, widenStyle} from "./entity";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {tokenResultAtom} from "../../pages/login/entity/Common";
import {
  retrieveCustomReportsList
} from "../../services/reports/ReportsAxios";
import {retrieveCustomReportsAdminList} from "../../services/reports/ReportsAdminAxios";

function AsideList (props) {
  const {id, mode} = props
  const [userName] = useState('')
  const params = useParams()
  const location = useLocation()
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [reportLists, setReportLists] = useState([])
  const [reportsInfo, setReportsInfo] = useAtom(reportsInfoAtom)
  /**
   * 대메뉴 권한 체크
   * @param item
   * @returns {boolean}
   */
  const checkPermissions = (item) => {
    if(tokenUserInfo.role === 'NORMAL' && ['reports','dashboard'].includes(item.name)) {
      return true
    }
    if(['ADMIN','SUPER_ADMIN'].includes(tokenUserInfo.role)) {
      return true
    }
  }

  /**
   * 메뉴 변경시 높이값 조정
   * @param item
   * @returns {*|string}
   */

  useEffect(() => {
    if(tokenUserInfo.role === 'NORMAL'){
      retrieveCustomReportsList(tokenUserInfo.id).then(response => {
        setReportLists(response)
      })
    } else {
      console.log(tokenUserInfo)
      if(tokenUserInfo.id !== '') {
        retrieveCustomReportsAdminList(tokenUserInfo.id).then(response => {
          setReportLists(response)
        })
      }

    }
  }, [tokenUserInfo, reportsInfo.id]);

  const handleChangeReportsInfo = (id,group) => {
    setReportsInfo({
      ...reportsInfo,
      id:id,
      groupBy: group
    })
  }

  return (
    <>
      {menuList.map((item,key) => {
        return(
          <div key={key}>
            {params.id !== undefined && checkPermissions(item)&&
            <li className={item.include.includes(id) ? "active" : null} style={mode? narrowStyle.li : widenStyle.li}>
              <Link to={`/board/${item.name}`} className={mode? "icon-mode" : "list-mode"}>
                <Icon style={id.indexOf(item.name) > -1? {backgroundImage: `url(${selectedIcon[item.name]})`, opacity: 1}: {backgroundImage: `url(${selectedIcon[item.name]})`, opacity: .5}}/>
                <span className={mode? "fadeOut" : "fadeIn"}>{item.header}</span>
                {item.child.length > 0 && <DropIcon className={mode? "fadeOut" : "fadeIn"} style={id.indexOf(item.name) > -1 ? narrowStyle.button : widenStyle.button}/>}
              </Link>
              {item.child.length > 0 &&
                <>
                {item.name === 'reports' ?
                  <SubMenu active={item.include.includes(id)}>
                    <div>
                      <div>
                        <Link to={`/board/reports`} style={id === 'reports' ? {color:'#fff'}:null}>보고서 생성</Link>
                      </div>
                      {reportLists.length !== 0 && reportLists.map((list, index) => {
                        return(
                          <div key={index}>
                            <Link to={`/board/customReports`} onClick={() =>handleChangeReportsInfo(list.id,list.groupByPeriod)} style={list.id === reportsInfo.id ? {color:'#fff'}:null}>{list.adverName} {list.reportName}</Link>
                          </div>
                        )
                      })}
                    </div>
                  </SubMenu>
                  :
                  <SubMenu active={item.include.includes(id)}>
                      {item.child.map((child, key) => {
                        return (
                          <div key={key}>
                            <div>
                              <Link to={`/board/${child.name}`}
                                    style={id === child.name || id === child.detail ? {color: '#fff'} : null}>{child.header}</Link>
                            </div>
                          </div>
                        )
                      })}
                    </SubMenu>
                  }
                </>
              }
            </li>
            }
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
          <AsideList id={params.id} mode={asideWidth} />
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
  transition-duration: 1s;
  overflow: auto;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left:52px;
  padding-top: ${props => props.active ?'10px':0};
  padding-bottom: ${props => props.active ?'10px':0};
  max-height: ${props => props.active ? '250px' : '0px'};
  & > div {
    & > div {
      color: #cccccc;
      font-size: 13px;
      padding: 8px 0;
    }
  }
`
