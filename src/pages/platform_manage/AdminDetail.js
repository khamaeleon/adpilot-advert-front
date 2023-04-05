import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColTitle,
  Input,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer,
  TitleContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useAtom} from "jotai";
import {useLocation, useNavigate} from "react-router-dom";
import {selAdminInfo, updateAdmin} from "../../services/ManageAdminAxios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {PwChange} from "./UserDetail";
import {modalController} from "../../store";
import {tokenResultAtom} from "../login/entity";
import {adminInfoAtom} from "./entity/admin";


function PlatformAdminDetail() {
  const [, setModal] = useAtom(modalController)
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [adminInfoState, setAdminInfoState] = useAtom(adminInfoAtom)
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: adminInfoState
  })
  const onError = (error) => console.log(error)
  const state =useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    selAdminInfo().then(response => {
      if (response) {
        setAdminInfoState(response)
        reset(response)
      }
    })
  }, [])

  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      phoneNumber: event.target.value
    })
  }

  const onSubmit = () => {
    updateAdmin(adminInfoState).then((response) => {
      if (response) {
        navigate('/board/campaign')
      } else {
        toast.warning("어드민 계정이 수정이 실패 하였습니다.")
      }
    })
  }
  const onModalPw = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
  }

  const handleSavePassword = (data) =>{
    updateAdmin(data).then(response => {
      if (response) {
        setModal({
          isShow: false,
          modalComponent: null
        })
      } else {
        toast.warning("수정이 실패 하였습니다. 관리자한테 문의하세요")
      }
    })
  }
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <BoardContainer>
          <TitleContainer>
            <h1>나의 정보</h1>
            <Navigator/>
          </TitleContainer>
          <Board>
            <BoardHeader>기본 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>아이디</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'이메일 형태 아이디를 입력해주세요'}
                      value={adminInfoState !== null && adminInfoState.email}
                      readOnly={true}
                    />
                  </RelativeDiv>
                  <PwChange title={'비밀번호 변경'} modalInfo={'ADMIN'} onSave={handleSavePassword} onSubmit={onModalPw}/>
                </ColSpan3>
              </RowSpan>
            </BoardSearchDetail>
            <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
          </Board>
          <Board>
            <BoardHeader>담당자 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>담당자명</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'담당자 명을 입력해주세요'}
                      value={adminInfoState !== null && adminInfoState.name}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>담당자 연락처</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'연락처를 입력해주세요.'}
                      {...register("phoneNumber", {
                        required: "담당자 연락처를 입력해주세요.",
                      })}
                      value={adminInfoState !== null && adminInfoState.phoneNumber}
                      onChange={(e) => handleManagerPhone(e)}
                    />
                    {errors.phoneNumber && <ValidationScript>{errors.phoneNumber?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
            </BoardSearchDetail>
            <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
          </Board>
          <SubmitContainer>
            <SubmitButton type={"submit"}>저장</SubmitButton>
          </SubmitContainer>
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
      </form>
    </main>
  )
}

export default PlatformAdminDetail

