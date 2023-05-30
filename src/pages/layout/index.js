import Aside from "../../components/aside";
import {useNavigate, useParams} from "react-router-dom";
import PlatformManage from "../platform_manage";
import React, {useEffect} from "react";
import styled from "styled-components";
import Modal from "../../components/modal/Modal";
import {useAtom, useSetAtom,} from "jotai";
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
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";
import {CampaignLookOver} from "../campaign/steps/CampaignLookOver";
import {CampaignTwo} from "../campaign/steps/CampaignTwo";
import {FormProvider, useForm} from "react-hook-form";
import {CampaignThree} from "../campaign/steps/CampaignThree";
import {CampaignFour} from "../campaign/steps/CampaignFour";
import {stepCampaignAtom} from "../campaign/entity";
import {retrieveUserPoint, requestAmountPoint} from "./entity/UserPoint";
import {retrieveUserPointRequest} from "../../services/payment/user/RetrieveUserPointAxios";

function Layout() {
  const params = useParams()
  const navigate = useNavigate()
  const methods = useForm()
  const [tokenUserInfo, setTokenUserInfo] = useAtom(tokenResultAtom)
  const [userPoint, setUserPoint] = useAtom(retrieveUserPoint)
  const [requestAmount, ] = useAtom(requestAmountPoint)
  const setStepCampaign = useSetAtom(stepCampaignAtom)

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

  useEffect(() => {
    if(params.id !== 'campaign') {
      setStepCampaign({steps: null})
    }
  }, [params.id])
  //[d] 광고비 잔액
  useEffect(() => {
    if (tokenUserInfo.role === 'NORMAL') {
      const pointData = async () => {
        try {
          const userId = tokenUserInfo.id;
          const response = await retrieveUserPointRequest(userId);
          setUserPoint(response.availablePoint)
        } catch (error) {
          console.error("실패 응답 처리", error);
        }
      };
      pointData();
    }
  }, [tokenUserInfo]);




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
                  <small className={'won'}>{decimalFormat(userPoint + requestAmount)}</small>
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
        {params.id === 'dashboard' && <DashBoard/>}
        {/* 대시보드 캠페인명 수정*/}
        {params.id === 'campaignLookOver' && <main><BoardContainer><FormProvider {...methods}><CampaignLookOver/></FormProvider></BoardContainer></main>}
        {/* 대시보드 캠페인 예산 설정*/}
        {params.id === 'campaignTwo' && <main><BoardContainer><FormProvider {...methods}><CampaignTwo/></FormProvider></BoardContainer></main>}
        {/* 대시보드 광고 그룹 설정*/}
        {params.id === 'campaignThree' && <main><BoardContainer><FormProvider {...methods}><CampaignThree/></FormProvider></BoardContainer></main>}
        {/* 대시보드 크리에이티브 설정*/}
        {params.id === 'campaignFour' && <main><BoardContainer><FormProvider {...methods}><CampaignFour/></FormProvider></BoardContainer></main>}

        {/* 픽셀 관리*/}
        {['pixel', 'pixelDetail'].includes(params.id) && <Pixel/>}
        {/* 광고 관리 */}
        {['campaign', 'manageCreative'].includes(params.id) && <Campaign/>}
        {/* 보고서 */}
        {['reports', 'customReports'].includes(params.id) && <Reports/>}
        {/* 설정 */}
        {['settings', 'settingsDetail', 'budgetEvent', 'budgetEventDetail', 'budgetTime', 'budgetTimeDetail','budgetTimeList'].includes(params.id) &&
          <Settings/>}
        {/* 플랫폼 관리 */}
        {['platform', 'platformDetail', 'categoryManage', 'productManage', 'conversionManage', 'paymentManage','advertisingPayments'].includes(params.id) &&
          <PlatformManage/>}
        {params.id === 'paymentManageUser' && <PaymentManageUser/>}
        {params.id === 'myPageUser' && <main>
                                        <BoardContainer>
                                          <TitleContainer>
                                            <h1>나의 정보</h1>
                                            <Navigator/>
                                          </TitleContainer>
                                          <PlatformUserDetail/>
                                        </BoardContainer>
                                      </main>}
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

const AdvertisingBalance = styled.div`
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
