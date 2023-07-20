import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  ColSpan1,
  ColSpan2,
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
import {selAdminInfo, updateAdmin} from "../../services/Platform/ManageAdminAxios";
import {toast} from "react-toastify";

import {PwChange} from "./UserDetail";
import {modalController} from "../../store";
import {adminInfoAtom} from "./entity/Admin";

function PlatformAdminDetail() {
  const [, setModal] = useAtom(modalController)
  const [adminInfoState, setAdminInfoState] = useAtom(adminInfoAtom)
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: adminInfoState
  })
  const onError = (error) => console.log(error)

  useEffect(() => {
    selAdminInfo().then(response => {
      if (response) {
        setAdminInfoState({
              ...response,
              activeYn: response.status === 'NORMAL' ? 'Y' : 'N'
            })
        reset({
          ...response,
          activeYn: response.status === 'NORMAL' ? 'Y' : 'N'
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        toast.success("정보 변경이 완료되었습니다.")
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
        toast.success("비밀번호 변경이 완료되었습니다.")
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
            <BoardSearchDetail column={true}>
              <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan2>
                  <ColTitle><Span4>아이디</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'이메일 형태 아이디를 입력해주세요'}
                      value={adminInfoState !== null && adminInfoState.email}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan1>
                  <PwChange title={'비밀번호 변경'} modalInfo={'ADMIN'} onSave={handleSavePassword} onSubmit={onModalPw}/>
                </ColSpan1>
              </RowSpan>
            </BoardSearchDetail>
            <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
          </Board>
          <Board>
            <BoardHeader>담당자 정보</BoardHeader>
            <BoardSearchDetail column={true}>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>담당자명</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'담당자 명을 입력해주세요'}
                      value={adminInfoState !== null && adminInfoState.name}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>담당자 연락처</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'연락처를 입력해주세요.'}
                      {...register("phoneNumber", {
                        required: "담당자 연락처를 입력해주세요.",
                        pattern: {
                          value: /0([1-9][0-9]?){1,2}?([0-9]{3,4})?([0-9]{4})/g,
                          message: "숫자만 입력해주세요"
                        },
                        onChange: (e) => handleManagerPhone(e),
                        value: adminInfoState !== null && adminInfoState.phoneNumber
                      })}
                    />
                    {errors.phoneNumber && <ValidationScript>{errors.phoneNumber?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
            </BoardSearchDetail>
            <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
          </Board>
          <SubmitContainer>
            <SubmitButton type={"submit"}>저장</SubmitButton>
          </SubmitContainer>
        </BoardContainer>
      </form>
    </main>
  )
}

export default PlatformAdminDetail

