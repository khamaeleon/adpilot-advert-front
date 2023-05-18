import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "./Modal";
import styled from "styled-components";
import {FindIdResultAtom} from "../../pages/login";

// 문자열 검색해서 중간 글자 *로 만들기
// 2글자면 마지막 글자만
const maskingName = (strName) => {
  if (strName.length > 2) {
    var originName = strName.split('');
    originName.forEach(function(name, i) {
      if (i === 0 || i === originName.length - 1) return;
      originName[i] = '*';
    });
    var joinName = originName.join();
    return joinName.replace(/,/g, '');
  } else {
    var pattern = /.$/; // 정규식
    return strName.replace(pattern, '*');
  }
};

export function ComponentModalFindId(){
  const navigate = useNavigate()
  const [, setModal] = useAtom(modalController)
  const [findIdResult] = useAtom(FindIdResultAtom)
  const handleNavigate = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    navigate('/')
  }

  return (
    <div>
      <ModalHeader title={"아이디 찾기 결과"}/>
      <ModalBody>
        <FindIdResult>아이디 찾기 결과 <span>{findIdResult !== undefined && findIdResult.length}개</span>의 아이디가 존재합니다.</FindIdResult>
        <ModalBodyInner>
          {findIdResult.length !== 0 && findIdResult.map((item,index) => {
            return (
              <p key={index}>{maskingName(item)}</p>
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
    navigate('/')
  }

  return(
    <div>
      <ModalHeader title={"비밀번호 찾기 결과"}/>
      <ModalBody>
        <ModalBodyInner>
          <EmailId>{maskingName(passwordParams.params.email)}</EmailId>으로 임시 비밀번호가 발급되었습니다.
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