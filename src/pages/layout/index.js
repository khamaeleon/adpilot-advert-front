import Aside from "../../components/aside";
import {useNavigate, useParams} from "react-router-dom";
import PlatformManage from "../platform_manage";
import React from "react";
import styled from "styled-components";
import Modal from "../../components/modal/Modal";
import {useAtom,} from "jotai";
import {tokenResultAtom} from "../login/entity";
import {logOutAdmin, logOutUser} from "../../services/AuthAxios";
import Campaign from "../campaign";
import Settings from "../settings";
import Pixel from "../pixel";
import Reports from "../reports";
import PlatformUserDetail from "../platform_manage/UserDetail";
import PlatformAdminDetail from "../platform_manage/AdminDetail";

function Layout(){
  const params = useParams()
  const navigate = useNavigate()
  const [tokenUserInfo] = useAtom(tokenResultAtom)

  const myPage = () =>{
    if(tokenUserInfo.role==='NORMAL'){
      navigate('/board/myPageUser',{state:{id:tokenUserInfo.id}})
    }else{
      navigate('/board/myPageAdmin',{state:{id:tokenUserInfo.id}})
    }
  }

  const logOut = () => {
    const userInfo ={
      accessToken:tokenUserInfo.accessToken,
      refreshToken:localStorage.getItem("refreshToken")
    }
    if(tokenUserInfo.role==='NORMAL'){
      logOutUser(userInfo).then(response =>{
        if(response){
          localStorage.removeItem("refreshToken")
        }
      }).then(() =>
        {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/')
        }
      )
    } else {
      logOutAdmin(userInfo).then(response =>{
        if(response){
          localStorage.removeItem("refreshToken")
        }
      }).then(() =>
        {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/')
        }
      )
    }
  }


  const pixel = () =>{
    navigate('/board/pixel')
  }

  return(
    <div id={'container'}>
      <Aside />
      <BoardBody>
        <BoardHeader>
          <MyPage onClick={pixel}>픽셀 관리</MyPage>
          <UserName>
            <UserIcon/>
            <span>{tokenUserInfo.name}</span>
          </UserName>
          <MyPage onClick={myPage}>
            <span>마이페이지</span>
          </MyPage>
          <Logout>
            <button type={'button'} onClick={() => logOut()}>로그아웃</button>
          </Logout>
        </BoardHeader>
        {/* 대시보드 */}
        {/* 픽셀 관리*/}
        {['pixel','pixelDetail'].includes(params.id) && <Pixel/>}
        {/* 광고 관리 */}
        {['campaign','createCreative','manageCreative'].includes(params.id) && <Campaign/>}
        {/* 보고서 */}
        {['reports','reportsDaily','reportsCPC'].includes(params.id) && <Reports/>}
        {/* 설정 */}
        {['settings','settingsDetail','budgetEvent','budgetEventDetail','budgetTime','budgetTimeDetail'].includes(params.id) && <Settings/>}
        {/* 플랫폼 관리 */}
        {['platform','platformDetail','categoryManage','productManage','conversionManage', 'paymentManage'].includes(params.id) && <PlatformManage />}
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