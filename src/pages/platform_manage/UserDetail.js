import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  CancelButton,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  ColTitle,
  DeleteButton,
  Input,
  inputStyle,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer,
  TitleContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import {atom, useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {selUserInfo, updateUser, accountFileUpload} from "../../services/ManageUserAxios";
import {toast} from "react-toastify";
import Select from "react-select";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {modalController} from "../../store";
import {accountInfoAtom, adminInfoAtom} from "./entity";

export function PwChange(props) {
  const {onSubmit, modalInfo,onSave,title} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 700,
      modalComponent: () => {
        return (
          <PwChangeModal onSave={onSave} modalInfo={modalInfo} onSubmit={onSubmit}/>
        )
      }
    })
  }
  return <DuplicateButton type={'button'} onClick={handleModalComponent}>{title}</DuplicateButton>
}

function PwChangeModal(props) {
  const [showPassword, setShowPassword] = useState(false)
  const [accountInfoState, setAccountInfoState] = useAtom(props.modalInfo==='USER'? accountInfoAtom: adminInfoAtom)
  const {register, handleSubmit, watch, formState: {errors}} = useForm({
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

function PlatformUserDetail() {
  const [, setModal] = useAtom(modalController)
  const [accountInfoState, setAccountInfoState] = useAtom(accountInfoAtom)
  const {register, handleSubmit, setValue, setError, reset ,formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfoState
  })
  const onError = (error) => console.log(error)
  const navigate =useNavigate()
  const {state} = useLocation();

  useEffect(() => {
    selUserInfo(state.id).then(response => {
      setAccountInfoState({
        ...response,
        activeYn: response.status ==='NORMAL'? 'Y' :'N'
      })
      reset({
        ...response,
        activeYn: response.status ==='NORMAL'? 'Y' :'N'
      })
    })
  }, [])

  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerName1: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerPhone1: event.target.value
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerEmail1: event.target.value
    })
  }
  const handleBusinessNumber = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      businessNumber: event.target.value,
      businessName: '',
      ceoName:'',
    })
  }

  const handleBusiness = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      business: event.target.value
    })
  }

  const handleBusinessType = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      businessType: event.target.value
    })
  }

  const handleAddress = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      address: event.target.value
    })
  }

  const imageDel = () => {
      setAccountInfoState({
        ...accountInfoState,
        businessLicenseCopy: '',
        businessLicenseCopyName: '',
      })
      setValue('businessLicenseCopyName', '')
  }

  const handleBusinessLicense = (pictureFiles) => {
    if(pictureFiles.length !== 0){
      const data = new FormData()
      const imagesLastIndex = pictureFiles.length-1;
      data.append('file', pictureFiles[imagesLastIndex].file, pictureFiles[imagesLastIndex].file.name)
      accountFileUpload('', data,'LICENCE').then(response => {
        if(response !== false) {
          setAccountInfoState({
            ...accountInfoState,
            businessLicenseCopy: response,
            businessLicenseCopyName: pictureFiles[imagesLastIndex].file.name
          })
          setValue('businessLicenseCopyName', pictureFiles[imagesLastIndex].file.name)
          setError('businessLicenseCopyName', '')
        }
      })
    }
  }

  /**
   * 사용여부
   * @param activeYn
   */
  const handleActiveYn =(activeYn) =>{
    setAccountInfoState({
      ...accountInfoState,
      activeYn: activeYn
    })
  }

  const onSubmit = () => {
    // 최종데이터
    updateUser(accountInfoState).then(response =>{
      if(response){
        navigate('/board/platform')
      }else{
        toast.warning("수정이 실패 하였습니다. 관리자한테 문의하세요")
      }
    })
  }
  const handleSavePassword = (data) =>{
    updateUser(data).then(response => {
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

  const onModalPw = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Board>
          <BoardHeader>기본 정보</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>광고주 구분</Span4></ColTitle>
                <div>{(accountInfoState.mediaType ==='DIRECT') ? '매체사' :'대행사'}</div>
              </ColSpan2>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start'}}>
              <ColSpan2>
                <ColTitle><Span4>아이디</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'아이디를 입력해주세요'}
                    value={accountInfoState.username}
                    readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan2>
              <ColSpan1>
                <PwChange title={'비밀번호 변경'} modalInfo={'USER'} onSave={handleSavePassword} onSubmit={onModalPw}/>
              </ColSpan1>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>광고주명</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'광고주명을 입력해주세요'}
                    value={accountInfoState.siteName}
                    readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>담당자명</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'담당자 명을 입력해주세요'}
                    {...register("managerName", {
                      required: "담당자 명을 입력해주세요",
                      onChange:(e) => handleManagerName(e)
                    })}
                    value={accountInfoState.managerName1}
                  />
                  {errors.managerName && <ValidationScript>{errors.managerName?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>담당자 연락처</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'담당자 연락처를 입력해주세요'}
                    {...register("managerPhone", {
                      required: "담당자 연락처를 입력해주세요.",
                      pattern: {
                        value: /0([1-9][0-9]?){1,2}[.-]?([0-9]{3,4})[.-]?([0-9]{4})/g,
                        message: "연락처 정보를 확인해주세요"
                      },
                      onChange : (e) => handleManagerPhone(e)
                    })}
                    value={accountInfoState.managerPhone}
                  />
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>담당자 이메일</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'담당자 이메일을 입력해주세요.'}
                    {...register("managerEmail", {
                      required: "담당자 이메일을 입력해주세요.",
                      pattern: {
                        value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                        message: "이메일 형식을 확인해주세요"
                      },
                      onChange: (e) => handleManagerEmail(e)
                    })}
                    value={accountInfoState.managerEmail}

                  />
                  {errors.managerEmail && <ValidationScript>{errors.managerEmail?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>호스팅</Span4></ColTitle>
                <RelativeDiv>
                  <Select styles={inputStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={[]}
                          value={''}
                          //onChange={}
                  />
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
        </Board>
        <Board>
          <BoardHeader>사업자 정보</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>상호명</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'상호명'}
                    value={accountInfoState.businessName}
                    readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start'}}>
              <ColSpan2>
                <ColTitle><Span4>사업자 등록 번호</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'사업자 등록 번호'}
                    {...register("businessNumber", {
                      required: "사업자 조회를 해주세요",
                      onChange:(e) => handleBusinessNumber(e)
                    })}
                    value={accountInfoState.businessNumber}
                    readOnly={true}
                  />
                  {errors.businessNumber && <ValidationScript>{errors.businessNumber?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan2>
              <ColSpan1>
                <DuplicateButton type={'button'}>사업자 조회</DuplicateButton>
              </ColSpan1>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>대표자 성명</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'대표자 성명'}
                    value={accountInfoState.ceoName}
                    readOnly={true}
                  />
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>업태</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'업태'}
                    {...register("business", {
                      required: "업태를 입력해주세요",
                      onChange:(e) => handleBusiness(e)
                    })}
                    value={accountInfoState.business}
                  />
                  {errors.business && <ValidationScript>{errors.business?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>종목</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'종목'}
                    {...register("businessType", {
                      required: "종목을 입력해주세요",
                      onChange:(e) => handleBusinessType(e)
                    })}
                    value={accountInfoState.businessType}
                  />
                  {errors.businessType && <ValidationScript>{errors.businessType?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>사업장 주소</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'사업장 주소'}
                    {...register("address", {
                      required: "주소를 입력해주세요",
                      onChange:(e) => handleAddress(e)
                    })}
                    value={accountInfoState.address}
                  />
                  {errors.address && <ValidationScript>{errors.address?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start'}}>
              <ColSpan2>
                <ColTitle><Span4>사업자 등록증</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    style={{paddingRight: 35}}
                    type={'text'}
                    placeholder={'사업자 등록증'}
                    {...register("businessLicenseCopy", {
                      required: "사업자 등록증을 등록해주세요",
                    })}
                    value={accountInfoState.businessLicenseCopy}
                    readOnly={true}
                  />
                  {errors.businessLicenseCopy && <ValidationScript>{errors.businessLicenseCopy?.message}</ValidationScript>}
                  <DeleteButton type={'button'} onClick={()=> imageDel()} />
                </RelativeDiv>
              </ColSpan2>
              <ColSpan1>
                <DuplicateButton type={'button'}>
                  <ImageUploading
                    acceptType={["jpg", "gif", "png"]}
                    onChange={handleBusinessLicense}
                    maxFileSize={10485760}
                    maxNumber={1}
                  >
                    {({onImageUpload}) => (
                      <DuplicateButton
                        type={'button'}
                        onClick={onImageUpload}
                      >파일 첨부</DuplicateButton>
                    )}
                  </ImageUploading>
                  파일 첨부
                </DuplicateButton>
              </ColSpan1>
            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>세금계산서 발행 이메일</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'세금계산서 발행 이메일을 입력해주세요.'}
                    {...register("managerEmail", {
                      required: "세금계산서 발행 이메일을 입력해주세요.",
                      pattern: {
                        value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                        message: "이메일 형식을 확인해주세요"
                      },
                      onChange: (e) => handleManagerEmail(e)
                    })}
                    value={accountInfoState.managerEmail}

                  />
                  {errors.managerEmail && <ValidationScript>{errors.managerEmail?.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan2>
            </RowSpan>
            {state.id !== 'NEW' &&
              <RowSpan>
                <ColSpan1>
                  <ColTitle><Span4>사용 여부</Span4></ColTitle>
                  <RelativeDiv>
                    <input type={'radio'}
                           id={'use'}
                           name={'useManager'}
                           checked={accountInfoState.activeYn === 'Y' ? true : false}
                           onChange={() => handleActiveYn('Y')}/>
                    <label htmlFor={'use'}>사용</label>
                    <input type={'radio'}
                           id={'unuse'}
                           name={'useManager'}
                           checked={accountInfoState.activeYn === 'Y' ? false : true}
                           onChange={() => handleActiveYn('N')}/>
                    <label htmlFor={'unuse'}>미사용</label>
                  </RelativeDiv>
                </ColSpan1>
              </RowSpan>
            }
          </BoardSearchDetail>
          <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
        </Board>
        <SubmitContainer>
          <CancelButton onClick={()=>navigate('/board/platform')}>목록</CancelButton>
          <SubmitButton type={"submit"}>저장</SubmitButton>
        </SubmitContainer>
      </form>
  )
}

export default PlatformUserDetail

const DuplicateButton = styled.button`
  width: 150px;
  height: 45px;
  background-color: #777;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
  &:hover {
    background-color: #535353;
  }
`

