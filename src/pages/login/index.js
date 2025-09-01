import styled, {css} from 'styled-components'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from 'react-cookie'
import Checkbox from "../../components/common/Checkbox";
import {findIdParams, findIdResult, findPasswordParams, loginParams, tokenResultAtom} from "./entity/Common";
import {login} from "../../services/auth/AuthAxios";
import {atom, useAtom, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {useForm} from "react-hook-form";
import {RowSpan, TextMainColor, ValidationScript} from "../../assets/GlobalStyles";
import {toast} from "react-toastify";
import {selChangePassword, selFindUserId} from "../../services/Platform/ManageUserAxios";
import {ComponentModalFindId, ComponentModalFindPassword} from "../../components/modal";
import {HorizontalRule} from "../../components/common/Common";

const mainColor = css`${props => props.theme.color.mainColor}`
export const FindIdResultAtom = atom(findIdResult)

function FindPassword(props) {
  const [findPasswordInfo, setFindPasswordInfo] = useState(findPasswordParams)
  const {register, handleSubmit, formState: {errors}} = useForm()
  const navigate = useNavigate()
  const handleFindPassword = () => {
    //axios 로 호출하여 서버쪽에서 이메일쪽으로 전송
    selChangePassword(findPasswordInfo).then(response => {
      console.log(findPasswordInfo)
      if (response) {
        //성공
        props.openModal(findPasswordInfo)
      } else {
        toast.warning('입력하신정보가 회원정보와 일치 하지 않습니다')
      }
    })
  }
  /**
   * 담당자 이메일
   * @param event
   */
  const handleManagerEmail = (event) => {
    setFindPasswordInfo({
      ...findPasswordInfo,
      email: event.target.value
    })
  }
  /**
   * 담당자 연락처
   * @param event
   */
  const handleManagerPhone = (event) => {
    setFindPasswordInfo({
      ...findPasswordInfo,
      phone: event.target.value
    })
  }
  /**
   * 담당자 아이디
   * @param event
   */
  const handleMemberId = (event) => {
    setFindPasswordInfo({
      ...findPasswordInfo,
      username: event.target.value
    })
  }

  const onSubmit = (data) => {
    handleFindPassword()
  }

  const onError = () => console.log(errors)

  return (
    <LoginInputComponent>
      <Title>
        <h1>비밀번호 찾기</h1>
      </Title>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <InputGroup>
          <LabelInline>
            <span>아이디</span>
          </LabelInline>
          <div>
            <input type={'text'}
                   placeholder={'아이디를 입력 해주세요'}
                   value={findPasswordInfo.username || ""}
                   {...register('username', {
                     required: "아이디를 입력 해주세요",
                     onChange: (e) => handleMemberId(e)
                   })}
            />
          </div>
          {errors.username && <ValidationScript>{errors.username.message}</ValidationScript>}
        </InputGroup>
        <InputGroup>
          <LabelInline>
            <span>담당자 연락처</span>
          </LabelInline>
          <FindCorporationNo>
            <input type={'text'}
                   placeholder={'연락처를 입력해주세요'}
                   value={findPasswordInfo.phone || ""}
                   {...register('phone', {
                     required: "연락처를 입력해주세요,",
                     onChange: (e) => handleManagerPhone(e)
                   })}
            />
          </FindCorporationNo>
          {errors.phone && <ValidationScript>{errors.phone.message}</ValidationScript>}
        </InputGroup>
        <InputGroup>
          <LabelInline>
            <span>담당자 이메일</span>
          </LabelInline>
          <div>
            <input type={'text'}
                   placeholder={'담당자 이메일을 입력해주세요.'}
                   value={findPasswordInfo.email || ""}
                   onChange={(e) => handleManagerEmail(e)}
                   {...register('email', {
                     required: "이메일을 입력해주세요,",
                     pattern: {
                       value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                       message: "이메일 형식을 확인해주세요"
                     },
                     onChange: (e) => handleManagerEmail(e)
                   })}
            />
          </div>
          {errors.email && <ValidationScript>{errors.email.message}</ValidationScript>}
        </InputGroup>
        <FindGroup/>
        <InputGroup style={{display: 'flex', justifyContent: 'space-between', gap: 5}}>
          <Button type={'submit'}>
            비밀번호 찾기
          </Button>
          <Button type={'button'} onClick={() => navigate('/')}>
            로그인
          </Button>
        </InputGroup>
      </form>
    </LoginInputComponent>
  )
}

function FindId(props) {
  const [findIdInfo, setFindIdInfo] = useState(findIdParams)
  const [, setFindIdResult] = useAtom(FindIdResultAtom)
  const {register, handleSubmit, formState: {errors}} = useForm()
  const success = true
  const navigate = useNavigate()
  const handleFindId = () => {
    if (success) {
      selFindUserId(findIdInfo).then(response => {

        const { data, statusCode } = response;
        console.log("selFindUserId:"+data)
        if(statusCode === 200){
          if (data.length !== 0) {
            setFindIdResult(response);
            props.openModal();
          } else {
            toast.info('등록된 아이디나 이메일이 없습니다.')
          }
        } else {
          toast.info('등록된 아이디나 이메일이 없습니다.')
        }
      })
    } else {
      toast.info('등록된 아이디나 이메일이 없습니다.')
    }
  }

  /**
   * 담당자 이메일
   * @param event
   */
  const handleManagerEmail = (event) => {
    setFindIdInfo({
      ...findIdInfo,
      email: event.target.value
    })
  }
  /**
   * 담당자 연락처
   * @param event
   */
  const handleManagerPhone = (event) => {
    setFindIdInfo({
      ...findIdInfo,
      phone: event.target.value
    })
  }
  const onSubmit = (data) => {
    handleFindId()
  }

  const onError = () => console.log(errors)

  return (
    <LoginInputComponent>
      <Title>
        <h1>아이디 찾기</h1>
      </Title>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <InputGroup>
          <LabelInline>
            <span>담당자 연락처</span>
          </LabelInline>
          <FindCorporationNo>
            <input type={'text'}
                   placeholder={'연락처를 입력해주세요'}
                   value={findIdInfo.phone}
                   {...register('phone', {
                     required: "연락처를 입력해주세요",
                     onChange: (e) => handleManagerPhone(e)
                   })}
            />
          </FindCorporationNo>
          {errors.phone && <ValidationScript>{errors.phone.message}</ValidationScript>}
        </InputGroup>
        <InputGroup>
          <LabelInline>
            <span>담당자 이메일</span>
          </LabelInline>
          <div>
            <input type={'text'}
                   placeholder={'담당자 이메일을 입력해주세요.'}
                   value={findIdInfo.email}
                   {...register('email', {
                     required: "담당자 이메일을 입력해주세요",
                     pattern: {
                       value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                       message: "이메일 형식을 확인해주세요"
                     },
                     onChange: (e) => handleManagerEmail(e)
                   })}
            />
          </div>
          {errors.email && <ValidationScript>{errors.email.message}</ValidationScript>}
        </InputGroup>
        <FindGroup/>
        <InputGroup style={{display: 'flex', justifyContent: 'space-between', gap: 5}}>
          <Button type={'submit'}>
            아이디 찾기
          </Button>
          <Button type={'button'} onClick={() => navigate('/')}>
            로그인
          </Button>
        </InputGroup>
      </form>
    </LoginInputComponent>
  )
}

function LoginComponent() {
  const [loginParamsValue, setLoginParams] = useState(loginParams);
  const [isRemember, setIsRemember] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['rememberAdverId'])
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const setTokenResult = useSetAtom(tokenResultAtom)
  const {register, setValue, handleSubmit, formState: {errors}} = useForm()

  /**
   * 사용자 아이디 입력
   * @param event
   */
  const handleChangeId = (event) => {
    setLoginParams({
      ...loginParamsValue,
      username: event.target.value
    })
    setValue('username', event.target.value)
    if (isRemember) {
      setCookie('rememberAdverId', event.target.value)
    }
  }
  /**
   * 사용자 패스원드
   * @param event
   */
  const handleChangePassword = (event) => {
    setLoginParams({
      ...loginParamsValue,
      password: event.target.value
    })
  }

  /**
   * 아이디 저장 Cookie 이용
   * @param event
   */
  const handleChangeRemember = (event) => {
    console.log(loginParamsValue.username)
    setIsRemember(event.target.checked)
    if (event.target.checked) {
      setCookie('rememberAdverId', loginParamsValue.username)
    } else {
      removeCookie('rememberAdverId')
    }
  }

  /**
   * 쿠키에 아이디 저장 삭제
   */
  useEffect(() => {
    if (cookies.rememberAdverId !== undefined) {
      setLoginParams({
        ...loginParamsValue,
        username: cookies.rememberAdverId
      })
      setValue('username', cookies.rememberAdverId)
      setIsRemember(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 로그인
   * id: uuid,
   * name: 회사명
   * role: 권한며으
   * token
   * username: 로그인 아이디
   */
  const onSubmit = () => {
    login(loginParamsValue).then(response => {
      if (response) {
        if (response === 'disabled') {
          toast.warning('로그인이 제한된 사용자입니다. 담당자에게 문의해주세요.')
        } else {
          setTokenResult({
            id: response.id,
            username: response.username,
            role: response.role,
            name: response.name,
            accessToken: response.token.accessToken,
            refreshToken: response.token.refreshToken
          });
          navigate('/board/dashboard');
        }
      } else {
        toast.info('아이디와 비밀번호를 확인해 주세요.')
      }
    });
  }
  const onError = (error) => console.log(error)

  return (
    <LoginInputComponent>
      <Title>
        <h1><BlockLogo/></h1>
      </Title>
      <RowSpan style={{justifyContent: 'flex-end', alignItems: 'center', gap: 10}}>
        <TextMainColor>사용자 로그인</TextMainColor>
        <HorizontalRule/>
        <Link to={'/adminLogin'}>관리자로그인</Link>
      </RowSpan>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <InputGroup>
          <LabelInline>
            <span>아이디</span>
            <Checkbox
              onChange={handleChangeRemember}
              isChecked={isRemember}
              label={'아이디 저장'}
              type={'a'}/>
          </LabelInline>
          <div>
            <input
              type={'text'}
              placeholder={'유저 아이디'}
              maxLength={20}
              value={loginParamsValue.username || ''}
              {...register('username', {
                required: "아이디를 입력해주세요.",
                pattern: {
                  value: /^[a-z]+[a-z0-9-_]{3,19}$/g,
                  message: "아이디는 3자리 이상 영문,숫자,특문(-, _)"
                },
                onChange: (e) => {
                  handleChangeId(e)
                }
              })}/>
          </div>
          {errors.username && <ValidationScript>{errors.username.message}</ValidationScript>}
        </InputGroup>
        <InputGroup>
          <LabelInline>
            <span>비밀번호</span>
          </LabelInline>
          <div style={{position: 'relative'}}>
            <input
              type={!showPassword ? 'password' : 'text'}
              placeholder={'비밀번호(8~12자)'}
              maxLength={16}
              value={loginParamsValue.password || ''}
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                  message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                },
                onChange: handleChangePassword
              })}/>
            <ShowPassword
              style={showPassword ? {backgroundImage: "url('/assets/images/login/hide.png')"} : {backgroundImage: "url('/assets/images/login/show.png')"}}
              onClick={() => setShowPassword(!showPassword)}/>
          </div>
          {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
        </InputGroup>
        <FindGroup>
          <Link to={'/findId'}>아이디찾기</Link>
          <HorizontalRule/>
          <Link to={'/findPassword'}>비밀번호 찾기</Link>
          <HorizontalRule/>
          <Link to={'/signUp'}>회원가입</Link>
        </FindGroup>
        <InputGroup>
          <Button type={'submit'}>
            Login
          </Button>
        </InputGroup>
      </form>
    </LoginInputComponent>
  )
}

function Login(props) {
  const setModal = useSetAtom(modalController)
  const handleModalFindId = () => {
    setModal({
      isShow: true,
      width: 500,
      modalComponent: () => {
        return <ComponentModalFindId/>
      }
    })
  }

  const handleModalFindPassword = (passwordParams) => {
    setModal({
      isShow: true,
      width: 500,
      modalComponent: () => {
        return <ComponentModalFindPassword params={passwordParams}/>
      }
    })
  }
  const LoginText = () => {
    if (props.match === 'findId' || props.match === 'findPassword') {
      return <>
        <div>{props.match === 'findPassword' ? "비밀번호" : "아이디"} 찾기가 불가한 회원님들께서는</div>
        <div>고객센터(070-1234-1234)로 연락 주시기 바랍니다.</div>
      </>
    } else {
      return <>
        <div>로그인 하시면 AdPilot의</div>
        <div>다양한 서비스를 이용하실 수 있습니다.</div>
      </>
    }
  }
  return (
    <>
      <LoginContainer>
        <div>
          <div>
            <LoginLogo/>
            <div>
              <LoginText/>
              {/*{location.pathname === '/findid' && location.pathname === '/findpassword'?*/}
              {/*  <>*/}
              {/*    <div>{location.pathname === '/findpassword' ? "비밀번호" : "아이디"} 찾기가 불가한 회원님들께서는</div>*/}
              {/*    <div>고객센터(070-1234-1234)로 연락 주시기 바랍니다.</div>*/}
              {/*  </>*/}
              {/*  :*/}
              {/*  <>*/}
              {/*    <div>로그인 하시면 AdPilot의</div>*/}
              {/*    <div>다양한 서비스를 이용하실 수 있습니다.</div>*/}
              {/*  </>*/}
              {/*}*/}
            </div>
          </div>
        </div>
        <div>
          {props.match === 'findId' &&
            <FindId openModal={() => handleModalFindId()}/>
          }
          {props.match === 'findPassword' &&
            <FindPassword openModal={(e) => handleModalFindPassword(e)}/>
          }
          {props.match === 'login' &&
            <LoginComponent/>
          }
        </div>
      </LoginContainer>

    </>
  )
}

export default Login

const LoginContainer = styled.div`
  display: flex;

  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100vh;
    //background-image: url('/assets/images/login/login_background.png');
    background-image: linear-gradient(to left, rgb(255,255,255), rgb(185,28,28));
    background-size: cover;
    text-align: center;

    & div > div:last-child {
      margin-top: 20px;

      & div {
        line-height: 5px;
        color: #fff;
        font-size: 1rem;
      }
    }

  }

  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 100vh;
  }
`

const FindGroup = styled.div`
  margin: 25px 0 50px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

// const HorizontalRule = styled.span`
//   display: inline-block;
//   width: 1px;
//   height: 10px;
//   background-color: #777;
// `

const Title = styled.div`
  text-align: center;

  & h1 {
    font-family: 'Roboto';
    font-size: 2.2rem;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const LoginLogo = styled.div`
  width: 300px;
  height: 150px;
  background-image: url('/assets/images/logos/adpilot/logo_inline_w.png');
  background-image: -webkit-image-set(url("/assets/images/logos/adpilot/logo_inline_w.png") 1x, url("/assets/images/logos/adpilot/logo_inline_w@2x.png") 2x, url("/assets/images/logos/adpilot/logo_inline_w@3x.png") 3x);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

const BlockLogo = styled.div`
  width: 120px;
  height: 80px;
  background-image: url('/assets/images/logos/adpilot/logo.png');
  background-image: -webkit-image-set(url("/assets/images/logos/adpilot/logo.png") 1x, url("/assets/images/logos/adpilot/logo@2x.png") 2x, url("/assets/images/logos/adpilot/logo@3x.png") 3x);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

const LoginInputComponent = styled.div`
  width: 350px;
`

const InputGroup = styled.div`
  position: relative;
  margin: 30px 0 15px 0;

  & input[type='text'], input[type='email'], input[type='password'] {
    width: 100%;
    height: 50px;
    padding: 15px;
    border: 1px solid #e9ebee;
    background-color: #f9fafb;
    border-radius: 10px;
    outline: 0;
  }

  & input[type='checkbox'] + label {
    font-size: 0.9rem;
    color: #777
  }
`

const Button = styled.button`
  padding: 16px;
  width: 100%;
  color: #fff;
  background-color: ${mainColor};
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: ${mainColor};
  }
`

const FindCorporationNo = styled.div`
  display: flex;
  align-items: center;
`


const ShowPassword = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background-image: url('/assets/images/login/hide.png');
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
`

const LabelInline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

