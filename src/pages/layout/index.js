import Aside from "../../components/aside";
import {useNavigate, useParams} from "react-router-dom";
import PlatformManage from "../platform_manage";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Modal from "../../components/modal/Modal";
import {useAtom,} from "jotai";
import {selUserByUserId} from "../../services/ManageUserAxios";
import {atom} from "jotai/index";
import {adminInfo, userInfo} from "../login/entity";
import {logOutAdmin, logOutUser} from "../../services/AuthAxios";
import Campaign from "../campaign";
import Settings from "../settings";
import Pixel from "../pixel";

export const AdminInfo = atom(adminInfo)
export const UserInfo = atom(userInfo)
function Layout(){
  const params = useParams()
  const navigate = useNavigate()
  const [adminInfoState,setAdminInfoState] = useAtom(AdminInfo)
  const [userInfoState,setUserInfoState] = useAtom(UserInfo)
  const [role,setRole] = useState(localStorage.getItem("role"))

  useEffect(() => {
    console.log(params)
    if(role==='NORMAL'){
      if(userInfoState.name ===''){
        selUserByUserId(localStorage.getItem("id")).then(response =>{
          setUserInfoState({
            name:response.managerName1,
            id:response.id
          })
          setRole('NORMAL')
        })
      }
    }else{
      if(adminInfoState.name ===''){
        /*selAdminInfo().then(response =>{
          setAdminInfoState({
            ...adminInfoState,
            name:response.name,
          })
          setRole('ADMIN')
        })*/
      }
    }
  }, []);
  const myPage = () =>{
    if(role==='NORMAL'){
      navigate('/board/myPage/user',{state:{id:userInfoState.id}})

    }else{
      navigate('/board/myPage/admin',{state:{id:localStorage.getItem("id")}})
    }

  }
  const pixel = () =>{
    navigate('/board/pixel')
  }
  const logOut = () => {
    const userInfo ={
      accessToken:localStorage.getItem("accessToken"),
      refreshToken:localStorage.getItem("refreshToken")
    }
    if(role==='NORMAL'){
      logOutUser(userInfo).then(response =>{
        if(response){
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("accessToken")
          localStorage.removeItem("role")
          localStorage.removeItem("id")
          localStorage.removeItem("username")
        }
      }).then(() =>
        {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/login')
        }
      )
    } else {
      logOutAdmin(userInfo).then(response =>{
        if(response){
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("accessToken")
          localStorage.removeItem("role")
          localStorage.removeItem("id")
          localStorage.removeItem("username")
        }
      }).then(() =>
        {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/login')
        }
      )
    }
  }

  const handleChangeConverted =() => {
    localStorage.removeItem('username')
    setAdminInfoState({
      ...adminInfoState,
      convertedUser: ''
    })
  }
  return(
    <div id={'container'}>
      <Aside />
      <BoardBody>
        <BoardHeader>
          <MyPage onClick={pixel}>픽셀 관리</MyPage>
          <UserName>
            <UserIcon/>
            <span>{role==='NORMAL'? userInfoState.name:adminInfoState.name}</span>
          </UserName>
          <MyPage onClick={myPage}>
            <span>마이페이지</span>
          </MyPage>
          <Logout>
            <button type={'button'} onClick={() => logOut()}>로그아웃</button>
          </Logout>
        </BoardHeader>
        {/*픽셀 관리*/}
        {['pixel','pixelDetail'].includes(params.id) && <Pixel/>}
        {['campaign','createCreative'].includes(params.id) && <Campaign/>}
        {/*설정*/}
        {['settings','settingsDetail','budgetEvent','budgetEventDetail','budgetTime','budgetTimeDetail'].includes(params.id) && <Settings/>}
        {/* 플랫폼 관리 */}
        {['platform','platformDetail','categoryManage','productManage'].includes(params.id) && <PlatformManage />}
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