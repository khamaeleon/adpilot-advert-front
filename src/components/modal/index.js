import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "./Modal";
import styled from "styled-components";
import {FindIdResultAtom} from "../../pages/login";

export function ComponentModalFindId(){
  const navigate = useNavigate()
  const [, setModal] = useAtom(modalController)
  const [findIdResult] = useAtom(FindIdResultAtom)
  const handleNavigate = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    navigate('/login')
  }
  return (
    <div>
      <ModalHeader title={"아이디 찾기 결과"}/>
      <ModalBody>
        <FindIdResult>아이디 찾기 결과 <span>{findIdResult !== undefined && findIdResult.length}개</span>의 아이디가 존재합니다.</FindIdResult>
        <ModalBodyInner>
          {findIdResult.length !== 0 && findIdResult.map((item) => {
            return (
              <p>{item}</p>
            )
          })}
        </ModalBodyInner>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={() => {
          navigate('/findPassword')
          setModal({
            isShow: false,
            modalComponent: null
          })
        }} style={{marginRight: 10,backgroundColor:'#fff',color:'#222',border: "1px solid #535353"}}>비밀번호 찾기</ModalButton>
        <ModalButton onClick={handleNavigate}>로그인</ModalButton>
      </ModalFooter>
    </div>
  )
}

export function ComponentModalFindPassword(props) {
  const navigate = useNavigate()
  const [modal, setModal] = useAtom(modalController)
  const passwordParams = props
  const handleNavigate = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    navigate('/login')
  }

  return(
    <div>
      <ModalHeader title={"비밀번호 찾기 결과"}/>
      <ModalBody>
        <ModalBodyInner>
          <EmailId>{passwordParams.params.email}</EmailId>으로 임시 비밀번호가 발급되었습니다.
          로그인 후 반드시 비밀번호를 변경해주시기 바랍니다.
        </ModalBodyInner>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleNavigate}>로그인</ModalButton>
      </ModalFooter>
    </div>
  )
}

const FindIdResult = styled.div`
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  & span {
    color: #f5811f;
  }
`

const ModalBodyInner = styled.div`
  padding: 20px 35px; 
  border-radius: 10px;
  background-color: #f9f9f9;
`

const ModalButton = styled.button`
  padding: 13px 0;
  width: 200px;
  background-color: #535353;
  color: #fff;
  font-size: 16px;
`

const EmailId = styled.span `
  color: #f5811f;
`