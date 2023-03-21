import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {loginAdminParams} from "./entity";
import {loginAdmin} from "../../services/AuthAxios";
import {useForm} from "react-hook-form";
import {RowSpan, ValidationScript} from "../../assets/GlobalStyles";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'
import {useCookies} from "react-cookie";
import Checkbox from "../../components/common/Checkbox";

function AdminLogin() {
  const [loginParamsValue, setLoginParams] = useState(loginAdminParams);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['rememberAdminId'])
  const [isRemember, setIsRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {register,setValue, handleSubmit, formState: {errors}} = useForm()

  /**
   * 쿠키에 아이디 저장 삭제
   */
  useEffect(() => {
    if(cookies.rememberId !== undefined) {
      setLoginParams({
        ...loginParamsValue,
        email:cookies.rememberAdminId
      })
      setValue('email',cookies.rememberAdminId)
      setIsRemember(true)
    }
  }, [])

  /**
   * 아이디 저장 Cookie 이용
   * @param event
   */
  const handleChangeRemember = (event) => {
    console.log(loginParamsValue.username)
    setIsRemember(event.target.checked)
    if(event.target.checked) {
      setCookie('rememberAdminId', loginParamsValue.username)
    } else {
      removeCookie('rememberAdminId')
    }
  }

  /**
   * 관리자 이메일(아이디)입력
   * @param event
   */
  const handleChangeId = (event) => {
    setLoginParams({
      ...loginParamsValue,
      email: event.target.value
    })
    setValue('email',event.target.value)
    if(isRemember){
      setCookie('rememberAdminId', event.target.value)
    }
  }
  /**
   * 관리자 패스워드
   * @param event
   */
  const handleChangePassword = (event) => {
    setLoginParams({
      ...loginParamsValue,
      password: event.target.value
    })
  }
  /**
   * 관리자 로그인
   */
  const onSubmit = () => {
    loginAdmin(loginParamsValue).then((response) => {
      if (response) {
        navigate('/board/dashboard')
      } else {
        toast.info('아이디와 비밀번호를 확인해 주세요.')
      }
    });
  }
  const onError = (error) => console.log(error)
  return (
    <>
      <LoginContainer>
        <div>
          <div>
            <LoginLogo/>
            <div>
              <>
                <div>로그인 하시면 엠코퍼레이션에</div>
                <div>다양한 서비스를 이용하실 수 있습니다.</div>
              </>
            </div>
          </div>
        </div>
        <div>
          <LoginInputComponent>
            <Title>
              <h1><BlockLogo/></h1>
            </Title>
            <RowSpan style={{justifyContent: 'flex-end'}}>
              <Link to={'/login'}>사용자로그인</Link>
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
                    placeholder={'아이디'}
                    value={loginParamsValue.email || ''}
                    {...register('email', {
                      required: "아이디를 입력해주세요",
                      onChange: (e) => {
                        handleChangeId(e)
                      }
                    })}/>
                </div>
                {errors.email && <ValidationScript>{errors.email.message}</ValidationScript>}
              </InputGroup>
              <InputGroup>
                <LabelInline>
                  <span>비밀번호</span>
                </LabelInline>
                <div style={{position: 'relative'}}>
                  <input
                    type={!showPassword ? 'password' : 'text'}
                    placeholder={'비밀번호(8~12자)'}
                    value={loginParamsValue.password || ''}
                    {...register("password", {
                      required: "비밀번호를 입력해주세요",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                        message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                      },
                      onChange:handleChangePassword
                    })}/>
                  <ShowPassword
                    style={showPassword ? {backgroundImage: "url('/assets/images/login/hide.png')"} : {backgroundImage: "url('/assets/images/login/show.png')"}}
                    onClick={() => setShowPassword(!showPassword)}/>
                </div>
                {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
              </InputGroup>
              <InputGroup>
                <Button type={'submit'}>
                  Login
                </Button>
              </InputGroup>
            </form>
          </LoginInputComponent>
        </div>
      </LoginContainer>
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
    </>
  )
}

export default AdminLogin

const LoginContainer = styled.div`
  display: flex;

  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100vh;
    background-image: url('/assets/images/login/login_background.png');
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
    width: 40%;
    height: 100vh;
  }
`

const Title = styled.div`
  text-align: center;
  & h1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const LoginLogo = styled.div`
  width: 300px;
  height: 150px;
  background-image: url('/assets/images/logos/logo_inline_w.png');
  background-image: -webkit-image-set(url("/assets/images/logos/logo_inline_w.png") 1x, url("/assets/images/logos/logo_inline_w@2x.png") 2x, url("/assets/images/logos/logo_inline_w@3x.png") 3x);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

const BlockLogo = styled.div`
  width: 120px;
  height: 80px;
  background-image: url('/assets/images/logos/logo.png');
  background-image: -webkit-image-set(url("/assets/images/logos/logo.png") 1x, url("/assets/images/logos/logo@2x.png") 2x, url("/assets/images/logos/logo@3x.png") 3x);
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
  background-color: #f5811f;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #db7219;
  }
`

const LabelInline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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
