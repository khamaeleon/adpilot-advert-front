import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CancelButton, ColSpan1, ColSpan2, ColSpan3, ColTitle, Input, RelativeDiv,
  RowSpan, Span4, SubmitButton, SubmitContainer,
  TitleContainer, ValidationScript
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {atom} from "jotai/index";
import {adminInfo} from "./entity";
import {useAtom} from "jotai";
import {useLocation, useNavigate} from "react-router-dom";
import {selAdminInfo, updateAdmin} from "../../services/ManageAdminAxios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminInfo = atom(adminInfo)

function PlatformAdminDetail() {
  const [showPassword, setShowPassword] = useState(false)
  const [adminInfoState, setAdminInfoState] = useAtom(AdminInfo)
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: adminInfoState
  })
  const {state} = useLocation();
  const onError = (error) => console.log(error)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const navigate = useNavigate()

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
  }, [reset, setAdminInfoState, state.id])

  /**
   * 아이디 입력
   * @param event
   */
  const handleAdminId = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      email: event.target.value
    })
  }
  /**
   * 패스워드 입력
   * @param event
   */
  const handlePassword = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      password: event.target.value
    })
  }

  /**
   * 패스원드 컨펌
   * @param event
   */
  const handleConfirmPassword = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      confirmPassword: event.target.value
    })
  }
  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setAdminInfoState({
      ...adminInfoState,
      name: event.target.value
    })
  }
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
  /**
   * 사용여부
   * @param activeYn
   */
  const handleActiveYn = (activeYn) => {
    setAdminInfoState({
      ...adminInfoState,
      activeYn: activeYn
    })
  }

  const onSubmit = () => {
    updateAdmin(adminInfoState).then((response) => {
      if (response) {
        navigate('/board/platform2')
      } else {
        toast.warning("어드민 계정이 수정이 실패 하였습니다.")
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
                    {state.id !== 'NEW' ?
                      <Input
                        type={'text'}
                        placeholder={'이메일 형태 아이디를 입력해주세요'}
                        value={adminInfoState.email}
                        readOnly={true}
                      /> :
                      <Input
                        type={'text'}
                        placeholder={'이메일 형태 아이디를 입력해주세요'}
                        value={adminInfoState.email}
                        {...register("email", {
                          required: "관리자 아이디를 입력해주세요",
                        })}
                        onChange={(e) => handleAdminId(e)}
                      />
                    }
                    {errors.email && <ValidationScript>{errors.email?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>비밀번호</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                      {...register("password", {
                        required: "비밀번호를 입력해주세요",
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                          message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                        }
                      })}
                      value={adminInfoState.password}
                      onChange={(e) => handlePassword(e)}
                    />
                    {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
                <ColSpan1>
                  <div onClick={handleShowPassword}>
                    <span style={{
                      marginRight: 10,
                      width: 30,
                      height: 30,
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      backgroundImage: `url(/assets/images/common/checkbox_${showPassword ? 'on' : 'off'}_B.png)`
                    }}/>
                    <span>{showPassword ? '가리기' : '보기'}</span>
                  </div>
                </ColSpan1>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>비밀번호 확인</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                      {...register("confirmPassword", {
                        required: "비밀번호를 입력해주세요",
                        validate: (value) => {
                          if (watch('password') !== value) {
                            return "입력하신 비밀번호가 맞는지 확인부탁드립니다."
                          }
                        }
                      })}
                      value={adminInfoState.confirmPassword}
                      onChange={(e) => handleConfirmPassword(e)}
                    />
                    {errors.confirmPassword && <ValidationScript>{errors.confirmPassword?.message}</ValidationScript>}
                  </RelativeDiv>
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
                    {state.id === 'NEW' ?
                      <Input
                        type={'text'}
                        placeholder={'담당자 명을 입력해주세요'}
                        {...register("name", {
                          required: "담당자 명을 입력해주세요",
                        })}
                        value={adminInfoState.name}
                        onChange={(e) => handleManagerName(e)}
                      />
                      :
                      <Input
                        type={'text'}
                        placeholder={'담당자 명을 입력해주세요'}
                        value={adminInfoState.name}
                        readOnly={true}
                      />
                    }
                    {errors.name && <ValidationScript>{errors.name?.message}</ValidationScript>}
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
                      value={adminInfoState.phoneNumber}
                      onChange={(e) => handleManagerPhone(e)}
                    />
                    {errors.phoneNumber && <ValidationScript>{errors.phoneNumber?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
              {state.id !== 'NEW' &&
                <RowSpan>
                  <ColSpan1>
                    <ColTitle><Span4>사용 여부</Span4></ColTitle>
                    <RelativeDiv>
                      <input type={'radio'}
                             id={'use'}
                             name={'useManager'}
                             checked={adminInfoState.activeYn === 'Y' ? true : false}
                             onChange={() => handleActiveYn('Y')}/>
                      <label htmlFor={'use'}>사용</label>
                      <input type={'radio'}
                             id={'unuse'}
                             name={'useManager'}
                             checked={adminInfoState.activeYn === 'Y' ? false : true}
                             onChange={() => handleActiveYn('N')}/>
                      <label htmlFor={'unuse'}>미사용</label>
                    </RelativeDiv>
                  </ColSpan1>
                  <ColSpan2/>
                </RowSpan>
              }
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

