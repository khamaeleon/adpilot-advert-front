import styled from "styled-components";
import {
  BoardContainer,
  DashBoardHeader,
  DashBoardCard,
  RowSpan,
  TitleContainer,
  DashBoardColSpan2, BoardSearchResult, TextMainColor, SubmitButton, CancelButton
} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";
import {
  accountInfoRevenue,
  accountProfile,
  accountInfoColumns,
  accountInfoList,
  accountInfoSetting, accountCreateInvoice,
} from "./entity";
import Table from "../../components/table";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {atom, useAtom} from "jotai";
import {modalController} from "../../store";
import {Tooltip} from "../../components/common/Tooltip";
import {useForm} from "react-hook-form";
import {
  accountUserProfile,
  accountRevenueStatus, accountCreateInvoiceRecord, accountMonthlyListTableData
} from "../../services/AccountAxios";
import {toast, ToastContainer} from "react-toastify";
import { decimalFormat, removeStr} from "../../common/StringUtils";
import {SearchUser} from "../../components/common/SearchUser";
import {adminInfo} from "../login/entity";
import {AdminInfo} from "../layout";

function ModalRequestAmount (props){
  const [,setModal] = useAtom(modalController)
  const {revenueStatus, tax, maxAmount} = props
  const [requestAmountValue, setRequestAmountValue] = useState(0)
  const [requestAmountVAT, setRequestAmountVAT] = useState(0)
  const [examinedAmount, setExaminedAmount] = useState(0)

  const {register, handleSubmit, setValue, setError, formState:{errors} } = useForm()

  useEffect(() => {
    tax !== 'Y' ? setRequestAmountVAT(0) : setRequestAmountVAT(requestAmountValue / 10)
  }, []);


  const cancelBtn = () => {
    setModal({
      isShow: false
    })
  }
  const handleChange = (value) => {
    let num = removeStr(value)
    let numberNum = Number(num)
    if(maxAmount < numberNum){
      setError('requestAmountValue', {type: 'required', message:'정산 신청금이 잔여 정산금을 초과하였습니다.'})
    } else {
      setRequestAmountValue(numberNum)
      setValue('requestAmountValue', numberNum)
      tax !== 'Y' ? setRequestAmountVAT(0) : setRequestAmountVAT(numberNum / 10)
      setExaminedAmount(numberNum+(numberNum/10))
      setError('requestAmountValue', '')
    }
  }
  const onSubmit = () => {
    requestAmountValue > 0 ? props.handleOnSubmit(requestAmountValue) :
      setError('requestAmountValue', {type: 'required', message:'정산 신청금을 입력해주세요.'})
  }
  const onError = () => console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <ModalHeader title={'정산 신청'}/>
      <ModalBody>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <RevenueScrollBox>
            <div>
              <p>수익금 최종 결산은 매월 5일까지의 통계 데이터를 기반으로 집계됩니다.</p>
              <p>수익금 정산 심사가 승인된 경우, 매월 10일 이전까지 세금계산서를 발행해주세요.</p>
              <p>정산 신청하지 않은 수익금은 자동으로 이월 처리됩니다.</p>
              <p>세금 계산서 발행은 지금 예정 금액으로 발행해주세요.</p>
            </div>
          </RevenueScrollBox>
          <RevenueBorderBox>
            <div className={'gray'}>
              <span>정산 가능 금액</span>
              <p className={'won color-black'}>{decimalFormat(maxAmount)}</p>
            </div>
          </RevenueBorderBox>
          <p style={{marginTop: 10}}>정산 신청금 입력</p>
          <RevenueBorderBox>
            <div>
              <span>정산 신청금</span>
              <div className={'flex-box'}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                  <p className={'won color-black'}>
                    <input type={'text'} value={decimalFormat(requestAmountValue)}
                           {...register("requestAmountValue", {
                             required: "정산 금액을 입력해주세요,",
                             pattern:{
                               value: /^[0-9,]+$/,
                               message: "숫자만 입력 가능합니다."
                             },
                             onChange:(e) => handleChange(e.target.value)
                           })}
                    />
                  </p>
                  {errors.requestAmountValue && <span style={{color: '#f55a5a', fontSize: 12}}>{errors.requestAmountValue.message}</span>}
                </div>

                <button type='button' onClick={() => handleChange(maxAmount)}>전액 신청</button>
              </div>
            </div>
            <div className={'gray small'}>
              <span>VAT</span>
              <p className={'won'}>{decimalFormat(requestAmountVAT)}</p>
            </div>
          </RevenueBorderBox>
          <RevenueBorderBox>
            <div>
              <span>지급 예정</span>
              <p className={'won'}><TextMainColor>{requestAmountValue === '0' ? '0' : decimalFormat(examinedAmount)}</TextMainColor></p>
            </div>
          </RevenueBorderBox>
        </div>
      </ModalBody>
      <ModalFooter style={{borderTop: 0, paddingTop: 0}}>
        <CancelButton type='button' onClick={()=> cancelBtn()}>취소</CancelButton>
        <SubmitButton type={'submit'}>정산 신청</SubmitButton>
      </ModalFooter>
    </form>
  )
}


const AccountProfileState = atom(accountProfile)
function Account(){
  const role = localStorage.getItem("role")
  const id = localStorage.getItem("id")
  const userName = localStorage.getItem("username")

  const [modal, setModal] = useAtom(modalController)
  const [adminInfoState,setAdminInfoState] = useAtom(AdminInfo)
  const [revenueState, setRevenueState] = useAtom(accountInfoRevenue)
  const [createInvoice, setCreateInvoice] = useState(accountCreateInvoice)
  const [accountProfile, setAccountProfile] = useAtom(AccountProfileState)
  const [accountInfoListData, setAccountInfoListData] = useState(accountInfoList)

  const maxAmount = revenueState.revenueBalance //정산 가능 금액
  useEffect(() => {
    createInvoice.requestAmount > 0 && accountCreateInvoiceRecord(createInvoice).then(response => {
      response && accountRevenueStatus(accountProfile.username).then(response => {
        response !== null && setRevenueState(response)
      })
    })
  }, [createInvoice])
  useEffect(() => {
    let userType = role !== 'NORMAL' ? '' : id
    accountRevenueStatus(userType).then(response => { // 정산 수익 현황
      response !== null && setRevenueState(response)
    })
    if(role === 'NORMAL'|| userName !== null) {
      accountUserProfile(userName !== null ? userName : id ).then(response => {
        setAccountProfile(response)
      })
    }
    accountMonthlyListTableData(userType).then(response => { // 월별 수익 현황
      response !== null && setAccountInfoListData(response)
    })
  }, [])

  /**
   * 모달안에 매체 검색 선택시
   */
  const handleSearchResult = (accountUserData) => {
    //매체 검색 api 호출
    accountUserProfile(accountUserData.username).then(response => {
      setAccountProfile(response)
      localStorage.setItem("username", accountUserData.username);
      (adminInfoState.convertedUser !== accountUserData.username) && setAdminInfoState({
        ...adminInfoState,
        convertedUser: accountUserData.username
      })
    })
  }

  const handleRevenueState = (data) => { //정산 신청 완료
    setCreateInvoice({
      ...createInvoice,
      username: accountProfile.username,
      requesterId: id,
      requestAmount: data
    })
    setModal({
      isShow: false
    })
  }

  const handleModalRequestAmount = () => {
    maxAmount !== 0 ? setModal({
      isShow: true,
      width: 700,
      modalComponent: () => {return <ModalRequestAmount tax={accountProfile.taxYn} revenueStatus={revenueState} handleOnSubmit={handleRevenueState} maxAmount={maxAmount}/>}
    })
      :
    toast.warning('정산 가능 금액이 없습니다.')
  }
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>정산 관리</h1>
          <RowSpan style={{marginTop: 0}}>
            <Navigator/>
            {
              userName !== null && <SearchUser title={'매체 계정 전환'} onSubmit={handleSearchResult} btnStyle={'AccountButton'}/>
            }
          </RowSpan>
        </TitleContainer>
        <RowSpan style={{gap:30, marginTop: 0}}>
          <DashBoardColSpan2>
            <DashBoardCard style={{paddingBottom: 20}}>
              <DashBoardHeader>수익 현황</DashBoardHeader>
              <StatusBoard>
                <div>
                  <p>수익금</p>
                  <p className='won'>{decimalFormat(revenueState.revenueAmount)}</p>
                </div>
                <ul>
                  <li>
                    <p>정산 신청</p>
                    <p className='won'>{decimalFormat(revenueState.invoiceRequestAmount)}</p>
                  </li>
                  {userName !== '' &&
                    <li>
                      <p>잔여 정산금</p>
                      <p className='won'>{decimalFormat(revenueState.revenueBalance)}</p>
                    </li>
                  }
                  <li>
                    <p>총 이월</p>
                    <p className='won'>{decimalFormat(revenueState.totalCarryOver)}</p>
                  </li>
                  <li>
                    <p>지급 예정</p>
                    <p className='won'>{decimalFormat(revenueState.examinedCompletedAmount)}</p>
                  </li>
                  <li>
                    <p>지급 완료</p>
                    <p className='won'>{decimalFormat(revenueState.paymentCompletedAmount)}</p>
                  </li>
                </ul>
              </StatusBoard>
              {
                userName !== null &&
                <div style={{display: "flex", justifyContent: "center"}}>
                  <AccountButton type={'button'} onClick={handleModalRequestAmount}>정산 신청</AccountButton>
                </div>
              }
            </DashBoardCard>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <DashBoardCard>
              <DashBoardHeader>정산 프로필</DashBoardHeader>
              {
                role !== 'NORMAL' ? (
                    userName !== null ?
                    <AccountBody>
                      <div>
                        <div className={'icon'}></div>
                        <span>사업자 정보</span>
                        <Tooltip text={accountProfile.businessName} maxLength={14}/>
                        <div className={'border-box'}>
                          <span>{accountProfile.businessNumber}</span>
                        </div>
                      </div>
                      <div>
                        <div className={'icon'}></div>
                        <span>담당자 정보</span>
                        <p>{accountProfile.managerName}</p>
                        <div className={'border-box'}>
                          <span>{accountProfile.managerPhone}</span>
                          <span className={'line-clamp_2'}>{accountProfile.managerEmail}</span>
                        </div>
                      </div>
                      <div>
                        <div className={'icon'}></div>
                        <span>정산 정보</span>
                        <p>{accountProfile.bankAccountNumber}</p>
                        <div className={'border-box'}>
                          <span>{accountProfile.bankType}</span>
                          <span>예금주 {accountProfile.accountHolder}</span>
                        </div>
                      </div>
                    </AccountBody>
                    :
                    <NoAccountBody>
                      <>
                        <p><TextMainColor>매체 계정으로 전환</TextMainColor>하여 정산 프로필 정보를 확인해주세요.</p>
                        <SearchUser title={'매체 계정 전환'} onSubmit={handleSearchResult} btnStyle={'AccountButton'} />
                      </>
                    </NoAccountBody>
                  )
                  :
                  <NoAccountBody>
                      <p>정산은 어드민만 가능</p>
                  </NoAccountBody>


              }
            </DashBoardCard>
          </DashBoardColSpan2>
        </RowSpan>
        <DashBoardCard>
          <DashBoardHeader style={{marginBottom: 0}}>월별 정산이력</DashBoardHeader>
          <BoardSearchResult style={{marginTop: 0}}>
            <Table columns={accountInfoColumns}
                   data={accountInfoListData}
                   titleTotal={false}
                   settings={accountInfoSetting}
                   style={{width: '100%'}}
            />
          </BoardSearchResult>
        </DashBoardCard>
      </BoardContainer>
      <ToastContainer position="top-center"
                      autoClose={1500}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      style={{zIndex: 9999999}}/>
    </main>
  )
}

export default Account

const profileHeight = '265px'

const AccountButton = styled.button`
  width: 175px; 
  height: 40px;
  border-radius: 5px;
  border: solid 1px #ddd;
  background-color: #f3f3f3;
  font-size: 15px;
  > span {
    padding-left: 10px;
  }
`
const NoAccountBody = styled.div`
  height: ${profileHeight};
  border: solid 1px #ddd;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > p {
    line-height: 23px;
    &:last-of-type {
      margin-bottom: 25px;
    }
  }
  > button {
    background-color: #fff;
  }
`
const AccountBody = styled.div`
  height: ${profileHeight};
  display: flex;
  > div {
    width: calc(100%/3 - 10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    &:first-child {
      padding-right: 20px;
      .icon {
        background-image: url("/assets/images/common/img_profile_01.png");
      } 
    }
    &:nth-child(2) {
      width: calc(100%/3 + 20px);
      border: 1px solid #e9ebee;
      border-top: 0;
      border-bottom: 0;
      padding: 0 20px;
      .icon {
        background-image: url("/assets/images/common/img_profile_02.png");
      }
    }
    &:last-child {
      padding-left: 20px;
      .icon {
        background-image: url("/assets/images/common/img_profile_03.png");
      }
    }
    .icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: solid 1px #ddd;
      background-color: #f3f3f3;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 60%;
      margin: 20px 0 10px;
    }
    > p {
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      margin: 5px 0 10px;
    }
    
    .border-box {
      width: 100%;
      border-radius: 10px;
      border: solid 1px #e9ebee;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      text-align: center;
      span {
        width: 100%;
        padding: 5px 0;
        &:nth-child(2) {
          border-top: solid 1px #e9ebee;
        }
      }
    }
  }
`
const StatusBoard = styled.div`
  > div, > ul > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  > div {
    border-top: solid 1px #e9ebee;
    &:first-child {
      height: 40px;
      & p:first-child {
        font-weight:500;
        font-size: 15px;
      }
      & p.won {
        font-size: 18px;
        font-weight: 600;
        color: #f5811f;
      }
    }
  }
  > ul {
    height: 170px;
    border: solid 1px #e9ebee;
    border-left: 0;
    border-right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-bottom: 15px;
  > li p.won {
    font-size: 16px;
    font-weight: 400;
  }
`
const RevenueBorderBox = styled.div`
  border: 1px solid #e5e5e5;
  margin: 10px 0;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    font-size: 13px;
    color: #777;
    &.gray {
      background-color: #f9f9f9;
      .won {
        font-weight: 400;
      }
      &.small {
        border-top: 1px solid #e5e5e5;
        padding-top: 10px;
        padding-bottom: 10px;
        .won {
          font-size: 13px;
        }
      }
    }
    .won {
      font-size: 20px;
      font-weight: 600;
      input {
        font-size: 20px;
        font-weight: 600;
        border: 0;
        text-align: right;
      }
      &:after {
        font-size: 13px;
        font-weight: 400;
      }
    }
    .color-black {
      color: #222;
    }
    .flex-box {
      display: flex;
      align-items: center;
      button {
        height: 24px;
        padding: 0 20px;
        margin-left: 20px;
        font-size: 12px;
        border-radius: 3px;
        border: solid 1px #e5e5e5;
        background-color: #fafafa;
      }
    }
  }
  
`
const RevenueScrollBox = styled.div`
  height: 100px;
  background-color: #f9f9f9;
  padding: 10px 5px 10px 20px;
  margin-bottom: 5px;
  > div {
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
`

