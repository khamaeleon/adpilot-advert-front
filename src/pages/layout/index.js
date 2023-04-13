import Aside from "../../components/aside";
import {useNavigate, useParams} from "react-router-dom";
import PlatformManage from "../platform_manage";
import React, {useEffect} from "react";
import styled from "styled-components";
import Modal from "../../components/modal/Modal";
import {useAtom,} from "jotai";
import {decimalFormat} from "../../common/StringUtils";
import {tokenResultAtom} from "../login/entity/Common";
import {logOutAdmin, logOutUser, refresh, refreshAdmin} from "../../services/auth/AuthAxios";
import Campaign from "../campaign";
import Settings from "../settings";
import Pixel from "../pixel";
import Reports from "../reports";
import PlatformUserDetail from "../platform_manage/UserDetail";
import PlatformAdminDetail from "../platform_manage/AdminDetail";
import PaymentManageUser from "../platform_manage/PaymentManageUser"
import DashBoard from "../dash_board";
import DashBoardIndex from "../dash_board/DashBoardIndex";

function Layout() {
  const params = useParams()
  const navigate = useNavigate()
  const [tokenUserInfo, setTokenUserInfo] = useAtom(tokenResultAtom)

  useEffect(() => {
      if (tokenUserInfo.role === '') {
        refreshAdmin().then(response => {
          if (response) {
            setTokenUserInfo({
              id: response.email,
              role: response.role,
              name: response.name,
              accessToken: response.token.accessToken
            })
          } else {
            refresh().then(response => {
              if (response) {
                setTokenUserInfo({
                  id: response.id,
                  username:response.username,
                  role: response.role,
                  name: response.name,
                  accessToken: response.token.accessToken
                })
              }else{
                // eslint-disable-next-line no-restricted-globals
                location.replace('/')
              }
            })
          }
        })
      }
    },[])

  const myPage = () => {
    if (tokenUserInfo.role === 'NORMAL') {
      navigate('/board/myPageUser', {state: {id: tokenUserInfo.id}})
    } else {
      navigate('/board/myPageAdmin', {state: {id: tokenUserInfo.id}})
    }
  }

  const logOut = () => {
    const userInfo = {
      accessToken: tokenUserInfo.accessToken,
      refreshToken: localStorage.getItem("refreshToken")
    }
    if (tokenUserInfo.role === 'NORMAL') {
      logOutUser(userInfo).then(response => {
        if (response) {
          localStorage.removeItem("refreshToken")
        }
      }).then(() => {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/')
        }
      )
    } else {
      logOutAdmin(userInfo).then(response => {
        if (response) {
          localStorage.removeItem("refreshToken")
        }
      }).then(() => {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/')
        }
      )
    }
  }


  const pixel = () => {
    navigate('/board/pixel')
  }

  const payment = () => {
    navigate('/board/paymentManageUser')
  }

  return (
    <div id={'container'}>
      <Aside/>
      <BoardBody>
        <BoardHeader>
          {tokenUserInfo.role === 'NORMAL'?
            <>
              <UserName>
                <UserIcon/>
                <span>{tokenUserInfo.name}</span>
                <AdvertisingBalance>
                  <div/>
                  <small>광고비 잔액</small>
                  <small className={'won'}>{decimalFormat(10000)}</small>
                </AdvertisingBalance>
              </UserName>
              {/*[d] 20230411 사용자 화면에서 픽셀 관리 노출 보류*/}
              {/*<MyPage onClick={pixel}>픽셀 관리</MyPage>*/}
              <MyPage onClick={payment}>결제</MyPage>
            </>
            :
            <>
              <MyPage onClick={pixel}>픽셀 관리</MyPage>
              <UserName>
                <UserIcon/>
                <span>{tokenUserInfo.name}</span>
              </UserName>
            </>
          }
          <MyPage onClick={myPage}>
            <span>마이페이지</span>
          </MyPage>
          <Logout>
            <button type={'button'} onClick={() => logOut()}>로그아웃</button>
          </Logout>
        </BoardHeader>
        {/* 대시보드 */}
        {['dashboard','campaignInfoDetail','campaignBudgetDetail','campaignGroupDetail','campaignCreativeDetail'].includes(params.id) && <DashBoard/>}
        {/* 픽셀 관리*/}
        {['pixel', 'pixelDetail'].includes(params.id) && <Pixel/>}
        {/* 광고 관리 */}
        {['campaign', 'createCreative', 'manageCreative'].includes(params.id) && <Campaign/>}
        {/* 보고서 */}
        {['reports', 'customReports'].includes(params.id) && <Reports/>}
        {/* 설정 */}
        {['settings', 'settingsDetail', 'budgetEvent', 'budgetEventDetail', 'budgetTime', 'budgetTimeDetail'].includes(params.id) &&
          <Settings/>}
        {/* 플랫폼 관리 */}
        {['platform', 'platformDetail', 'categoryManage', 'productManage', 'conversionManage', 'paymentManage'].includes(params.id) &&
          <PlatformManage/>}
        {params.id === 'paymentManageUser' && <PaymentManageUser/>}
        {params.id === 'myPageUser' && <PlatformUserDetail/>}
        {params.id === 'myPageAdmin' && <PlatformAdminDetail/>}
      </BoardBody>
      <Modal></Modal>
    </div>
  )
}

export default Layout

const BoardBody = styled.div`
  width: 100%;
`
const BoardHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #eee;
`

const UserName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-left: 1px solid #eee;
  padding-right: 28px;
`

const UserIcon = styled.div`
  margin: 0 20px 0 25px;
  background-color: #cccccc;
  padding: 3px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-image: url("/assets/images/common/icon_user.png");
  background-repeat: no-repeat;
  background-position: center;
`

const MyPage = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-left: 1px solid #eee;
  padding-left: 28px;
  margin-right: 28px;
`

const Logout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-left: 1px solid #eee;
  padding-left: 28px;
  margin-right: 28px;

  & button {
    font-size: 13px;
    padding: 4px 28px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 28px;
  }
`

const AdvertisingBalance = styled.p`
  display: flex;
  margin-left: 20px;
  color: #f5811f;
  >div{
    width: 18px;
    height: 18px;
    background-size: cover;
    background-image: url("/assets/images/common/icon_money.png");
    background-image: -webkit-image-set(url('/assets/images/common/icon_money.png') 1x,url('/assets/images/common/icon_money@2x.png') 2x, url('/assets/images/common/icon_money@3x.png') 3x);
    margin-right: 5px;
  }
  >small:first-child { 
    margin-right: 10px;
  }
  >small:last-child {
    
  }
`
