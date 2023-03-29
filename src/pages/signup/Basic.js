import React, {useState} from "react";
import {useAtom} from "jotai/index";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {selValidUserId, signUp} from "../../services/ManageUserAxios";
import {CancelButton, DefaultButton, DeleteButton, Input, inputStyle, RelativeDiv} from "../../assets/GlobalStyles";
import {accountInfoAtom, hostList, nextStepAtom} from "./entity";
import {ButtonGroup, DuplicateButton, Form, SignUpVerify, ValidationScript, VerticalRule} from "./styles";
import Select from "react-select";
import {useSetAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import ImageUploading from "react-images-uploading";
import {accountFileUpload} from "../../services/AccountAxios";

function ModalCheckBusinessNumber() {
  return (
    <div>
      <ModalHeader title={"사업자 조회 결과"}/>
      <ModalBody>
        <div>
          <p>입력하신 사업자 등록번호 111-111-11111의 결과입니다.</p>
          <p>M corporation</p>
        </div>
        <VerticalRule/>
        <p>조회하신 사업자 정보로 등록하시겠습니까?</p>
      </ModalBody>
      <ModalFooter>
        <CancelButton>취소</CancelButton>
        <DefaultButton>등록</DefaultButton>
      </ModalFooter>
    </div>
  )
}

export default function Basic(props) {
  const [showPassword, setShowPassword] = useState(false)
  const [accountInfo, setAccountInfo] = useAtom(accountInfoAtom);
  const [agreeValidation, setAgreeValidation] = useAtom(nextStepAtom)
  const setModal = useSetAtom(modalController)

  const {register, handleSubmit, watch,  formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfo
  })


  const handleNextStep = () => {
    props.nextStep()
    setAgreeValidation({
      ...agreeValidation,
      validation: true
    })
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  /**
   * 대행사 여부
   * @param event
   */
  const handleChangeMediaType = (mediaType) => {
    setAccountInfo({
      ...accountInfo,
      mediaType: mediaType
    })
  }
  /**
   * 아이디 중복 체크
   */
  const checkUserId = () =>{
    if(accountInfo.username === ''){
      toast.warning('아이디를 입력해주세요')
    }else{
      selValidUserId(accountInfo.username).then(response => {
        console.log(response)
        if(response.validUsername){
          //사용가능한 아이디 입니다.
          toast.warning('사용가능한 아이디입니다')
        }else{
          toast.warning('중복된 아이디입니다')
        }
      })
    }
  }
  /**
   * 아이디 입력
   * @param event
   */
  const handleMemberId = (event) => {
    setAccountInfo({
      ...accountInfo,
      username: event.target.value
    })
  }

  /**
   * 패스워드 입력
   * @param event
   */
  const handlePassword = (event) => {
    setAccountInfo({
      ...accountInfo,
      password: event.target.value
    })
  }

  /**
   * 패스원드 컨펌
   * @param event
   */
  const handleConfirmPassword = (event) => {
    setAccountInfo({
      ...accountInfo,
      confirmPassword: event.target.value
    })
  }

  /**
   * 매체명 입력
   * @param event
   */
  const handleMediaName = (event) => {
    setAccountInfo({
      ...accountInfo,
      siteName: event.target.value
    })
  }
  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setAccountInfo({
      ...accountInfo,
      managerName: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    let num = event.target.value.replace(/[a-z]|[ㄱ-ㅎ]|[.-]/i, '')
    setAccountInfo({
      ...accountInfo,
      managerPhone: num
    })
  }
  /**
   * 호스트 입력
   * @param event
   */
  const handleSelectHosting = (event) => {
    setAccountInfo({
      ...accountInfo,
      selectHost: event.target.value
    })
  }
  /**
   * 상호명
   * @param event
   */
  const handleCorporationName = (event) => {
    setAccountInfo({
      ...accountInfo,
      corporationName: event.target.value
    })
  }
  /**
   *
   */
  const handleBusinessNumber = (event) => {
    setAccountInfo({
      ...accountInfo,
      businessNumber: event.target.value
    })
  }
  /**
   * 대표자 명
   * @param event
   */
  const handleCeoName = (event) => {
    setAccountInfo({
      ...accountInfo,
      businessNumber: event.target.value
    })
  }

  const handleBusinessType =  (event) => {
    setAccountInfo({
      ...accountInfo,
      businessType: event.target.value
    })
  }

  const handleCorporationAddress = (event) => {
    setAccountInfo({
      ...accountInfo,
      corporationAddress: event.target.value
    })
  }
  const handleBusinessLicense = (event) => {
    setAccountInfo({
      ...accountInfo,
      businessLicense: event.target.value
    })
  }

  const handleTaxEmail = (event)  => {
    setAccountInfo({
      ...accountInfo,
      businessLicense: event.target.value
    })
  }

  const handleCheckBusinessNumber = () => {
    setModal({
      isShow: true,
      width: 700,
      modalComponent: () => <ModalCheckBusinessNumber/>
    })
  }

  const onDrop = (pictureFiles) => {
    if(pictureFiles.length !== 0){
      const data = new FormData()
      const imagesLastIndex = pictureFiles.length-1;
      data.append('file', pictureFiles[imagesLastIndex].file, pictureFiles[imagesLastIndex].file.name)
      accountFileUpload(accountInfo.username, data,'LICENCE').then(response => {
        response !== false && setAccountInfo({
          ...accountInfo,
          businessLicenseCopy: pictureFiles[imagesLastIndex].file.name,
        })
      })
    }
  }
  /**
   * 회원가입
   */
  const onSubmit = (data) => {
    signUp(accountInfo).then(response => {
      if(response.responseCode.statusCode === 200){
        setAgreeValidation({
          terms: true,
          validation: true
        })
        handleNextStep()
      }else{
        toast.warning('회원가입에 실패하였습니다. 관리자에게 문의하세요')
      }
    })
  }
  const onError = (error) => console.log(error)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <article>
        <div><h2>기본 정보</h2></div>
        <VerticalRule style={{height: 3, backgroundColor: '#aaa'}}/>
        <Form>
          <h2>기본 정보 입력</h2>
          <div>
            <div>광고주 구분</div>
            <div>
              <input type={'radio'}
                     id={'direct'}
                     name={'direct'}
                     checked={accountInfo.mediaType === 'DIRECT' ? true : false}
                     onChange={() => handleChangeMediaType('DIRECT')}/>
              <label htmlFor={'direct'}>광고주</label>
              <input type={'radio'}
                     id={'agent'}
                     name={'agent'}
                     checked={accountInfo.mediaType === 'AGENT' ? true : false}
                     onChange={() => handleChangeMediaType('AGENT')}/>
              <label htmlFor={'agent'}>대행사</label>
            </div>
          </div>
          <RelativeDiv>
            <div>아이디</div>
            <div>
              <input
                type={'text'}
                placeholder={'아이디를 입력해주세요'}
                {...register("username", {
                  required: "아이디를 입력해주세요",
                  onChange: (e) => handleMemberId(e)
                })
                }
                value={accountInfo.username}
              />
              {errors.username && <ValidationScript>{errors.username?.message}</ValidationScript>}
              <DefaultButton onClick={()=>checkUserId()}>중복검사</DefaultButton>
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>비밀번호</div>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                    message: "비밀번호를 확인해주세요. 숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                  },
                  onChange: (e) => handlePassword(e)
                })}
                value={accountInfo.password}

              />
              {errors.password && <ValidationScript>{errors.password?.message}</ValidationScript>}
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
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>비밀번호 확인</div>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                {...register("confirmPassword", {
                  required: "비밀번호를 입력해주세요",
                  validate: (value) => {
                    if (watch('password') !== value) {
                      return "입력하신 비밀번호가 맞는지 확인부탁드립니다."
                    }
                  },
                  onChange: (e) => handleConfirmPassword(e)
                })}
                value={accountInfo.confirmPassword}
              />
              {errors.confirmPassword && <ValidationScript>{errors.confirmPassword?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>광고주 명</div>
            <div>
              <input
                type={'text'}
                placeholder={'광고주명을 입력해주세요'}
                {...register("siteName", {
                  required: "광고주명을 입력해주세요",
                  onChange: (e) => handleMediaName(e)
                })}
                value={accountInfo.siteName}

              />
              {errors.siteName && <ValidationScript>{errors.siteName?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>담당자명</div>
            <div>
              <input
                type={'text'}
                placeholder={'담당자 명을 입력해주세요'}
                {...register("managerName", {
                  required: "담당자 명을 입력해주세요",
                  onChange: (e) => handleManagerName(e)
                })}
                value={accountInfo.managerName}
              />
              {errors.managerName && <ValidationScript>{errors.managerName?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>담당자 연락처</div>
            <div>
              <input
                type={'text'}
                placeholder={'연락처를 입력해주세요.'}
                {...register("managerPhone1", {
                  required: "담당자 연락처를 입력해주세요.",
                  pattern: {
                    value: /0([1-9][0-9]?){1,2}[.-]?([0-9]{3,4})[.-]?([0-9]{4})/g,
                    message: "연락처 정보를 확인해주세요"
                  },
                  onChange: (e) => handleManagerPhone(e)
                })}
                value={accountInfo.managerPhone}
              />
              {errors.managerPhone && <ValidationScript>{errors.managerPhone?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>호스팅</div>
            <div>
              <Select options={hostList}
                      styles={inputStyle}
                      components={{IndicatorSeparator: () => null}}
                      value={''}
                      {...register("selectHost", {
                        required: "호스팅을 선택해주세요",
                        onChange: (e) => handleSelectHosting(e)
                      })}
              />
            </div>
          </RelativeDiv>
          <h2>사업자 정보</h2>
          <RelativeDiv>
            <div>상호명</div>
            <div>
              <input
                type={'text'}
                placeholder={'상호명 명을 입력해주세요'}
                {...register("corporationName", {
                  required: "담당자 명을 입력해주세요",
                  onChange: (e) => handleCorporationName(e)
                })}
                value={accountInfo.corporationName}
              />
              {errors.corporationName && <ValidationScript>{errors.corporationName?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>사업자 등록번호</div>
            <div>
              <input
                type={'text'}
                placeholder={'사업자 등록 번호'}
                {...register("businessNumber", {
                  required: "사업자 조회를 해주세요",
                  onChange:(e) => handleBusinessNumber(e)
                })}
                value={accountInfo.businessNumber}
                readOnly={true}
              />
              {errors.businessNumber && <ValidationScript>{errors.businessNumber?.message}</ValidationScript>}
              <DuplicateButton type={'button'}>사업자 조회</DuplicateButton>
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>사업자 등록증</div>
            <div>
              <input
                style={{paddingRight: 35}}
                type={'text'}
                placeholder={'사업자 등록증'}
                {...register("businessLicenseCopy", {
                  required: "사업자 등록증을 등록해주세요",
                })}
                value={accountInfo.businessLicenseCopy}
                readOnly={true}
              />
              {errors.businessLicenseCopy && <ValidationScript>{errors.businessLicenseCopy?.message}</ValidationScript>}
              <DeleteButton type={'button'} onClick={()=> handleBusinessLicense('del')} />
              <DuplicateButton type={'button'}>
                <ImageUploading
                  acceptType={["jpg", "gif", "png"]}
                  onChange={onDrop}
                  maxFileSize={10485760}
                  maxNumber={1}
                >
                  {({onImageUpload}) => (
                    <button
                      onClick={onImageUpload}
                      style={{width:'100%',height:'100%'}}
                    >파일 첨부</button>
                  )}
                </ImageUploading>
              </DuplicateButton>
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>대표자 명</div>
            <div>
              <Input
                type={'text'}
                placeholder={'이메일을 입력해주세요.'}
                value={accountInfo.ceoName}
                {...register("ceoName", {
                  required: "대표자 명을 입력해주세요",
                  onChange: (e) => handleCeoName(e)
                })}
              />
              {errors.ceoName && <ValidationScript>{errors.ceoName?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>업태</div>
            <div>
              <input
                type={'text'}
                placeholder={'업태'}
                {...register("business", {
                  required: "업태를 입력해주세요",
                  onChange:(e) => handleBusinessType(e)
                })}
                value={accountInfo.businessType}
              />
              {errors.businessType && <ValidationScript>{errors.businessType?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>사업자 주소</div>
            <div>
              <input
                type={'text'}
                placeholder={'주소를 입력해주세요.'}
                value={accountInfo.corporationAddress}
                {...register("corporationAddress", {
                  required: "주소를 입력해주세요",
                  onChange: (e) => handleCorporationAddress(e)
                })}
              />
              {errors.corporationAddress && <ValidationScript>{errors.corporationAddress?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
          <RelativeDiv>
            <div>세금계산서 발행 이메일</div>
            <div>
              <input
                type={'text'}
                placeholder={'이메일을 입력해주세요.'}
                value={accountInfo.taxEmail}
                {...register("taxEmail", {
                  required: "이메일을 입력해주세요",
                  onChange: (e) => handleTaxEmail(e)
                })}
              />
              {errors.taxEmail && <ValidationScript>{errors.taxEmail?.message}</ValidationScript>}
            </div>
          </RelativeDiv>
        </Form>
      </article>
      <ButtonGroup>
        <SignUpVerify type={"submit"}>회원가입</SignUpVerify>
      </ButtonGroup>
    </form>
  )
}