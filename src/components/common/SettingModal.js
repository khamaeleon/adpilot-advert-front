import styled from "styled-components";
import React, {useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {
  ColSpan1,
  ColSpan3,
  ColSpan4,
  ColTitle,
  Input,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton,
  ValidationScript
} from "../../assets/GlobalStyles";
import {useAtom} from "jotai";
import {modalController} from "../../store";
import {useForm} from "react-hook-form";

function SettingChangeModal(props) {
  const {data} = props
  const [showPassword, setShowPassword] = useState(false)
  const [, setModal] = useAtom(modalController)
  const [accountInfoState, setAccountInfoState] = useState(data)
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfoState
  })
  const onError = (error) => console.log(error)
  /**
   * 패스워드 입력
   * @param event
   */
  const handlePassword = (event) => {
    console.log(event.target.value)
    setAccountInfoState({
      ...accountInfoState,
      password: event.target.value
    })
  }
  /**
   * 패스원드 컨펌
   * @param event
   */
  const handleConfirmPassword = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      confirmPassword: event.target.value
    })
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
    console.log(showPassword)
  }

  const handleSave = (data) => {
    props.onSave(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSave, onError)}>
        <ModalHeader title={'비밀번호 변경'}/>
        <ModalBody>
          <RowSpan>
            <ColSpan4>
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
                  value={accountInfoState.password}
                  onChange={(e) => handlePassword(e)}
                />
                {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
              </RelativeDiv>
            </ColSpan4>
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
            <ColSpan3 style={{width: '80%'}}>
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
                  value={accountInfoState.confirmPassword}
                  onChange={(e) => handleConfirmPassword(e)}
                />
                {errors.confirmPassword && <ValidationScript style={{marginBottom: 5}}>{errors.confirmPassword?.message}</ValidationScript>}
              </RelativeDiv>
            </ColSpan3>
          </RowSpan>
        </ModalBody>
        <ModalFooter>
          <SubmitButton type={"submit"} >변경</SubmitButton>
        </ModalFooter>
      </form>
    </div>
  )
}

export function SettingAdd(props) {
  console.log(props)
  const {onSubmit, data, onSave, title} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 700,
      modalComponent: () => {
        return (
          <SettingChangeModal onSave={onSave} data={data} onSubmit={onSubmit}/>
        )
      }
    })
  }
  return <Button type={'button'} onClick={handleModalComponent}>{title}</Button>
}
export default SettingAdd

const Button = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 5px;
  background-color: #777777;
  color: #fff;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #535353;
  }
`