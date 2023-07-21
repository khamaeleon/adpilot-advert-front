import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  CancelButton,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  ColTitle,
  DownLoadButton,
  Input,
  RelativeDiv,
  RowSpan,
  selectStyle,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {
  accountFileUpload,
  selUserInfo,
  selUserMyPageInfo,
  updateMyPageUser,
  updateUser
} from "../../services/Platform/ManageUserAxios";
import {toast} from "react-toastify";
import Select from "react-select";
import ImageUploading from "react-images-uploading";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {modalController} from "../../store";
import {phoneNumFormat} from "../../common/StringUtils";
import {hostList} from "../signup/entity/Common";
import {accountInfoAtom} from "./entity/User";
import {adminInfoAtom} from "./entity/Admin";
import {DuplicateButton, InputValidationCon} from "./styles/common";
import {tokenResultAtom} from "../login/entity/Common";
import {IMAGE_SERVER} from "../../constants/GlobalConst";

export function PwChange(props) {
  const {onSubmit, modalInfo, onSave, title} = props;
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
  const [accountInfoState, setAccountInfoState] = useAtom(props.modalInfo === 'USER' ? accountInfoAtom : adminInfoAtom)
  const {register, handleSubmit, watch, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfoState,
  })
  const onError = (error) => console.log(error)
  /**
   * 패스워드 입력
   * @param event
   */
  const handlePassword = (event) => {
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
  }

  const handleSave = (data) => {
    props.onSave(data)
  }
  console.log(accountInfoState)
  return (
    <div>
      <form onSubmit={handleSubmit(handleSave, onError)}>
        <ModalHeader title={'비밀번호 변경'}/>
        <ModalBody>
          <RowSpan>
            <ColSpan4 style={{marginBottom: 10}}>
              <ColTitle><Span4>비밀번호</Span4></ColTitle>
              <RelativeDiv>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={'숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)'}
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                      message: "숫자, 영문, 특수 기호를 포함 (10자 ~ 16자)"
                    },
                    onChange: (e)=> handlePassword(e)
                  })}
                  value={accountInfoState.password !== undefined ? accountInfoState.password : ''}
                  //onChange={(e) => handlePassword(e)}
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
                  value={accountInfoState.confirmPassword !== undefined ? accountInfoState.confirmPassword : ''}
                  {...register("confirmPassword", {
                    required: "비밀번호를 입력해주세요",
                    validate: (value) => {
                      if (watch('password') !== value) {
                        return "입력하신 비밀번호를 확인해주세요."
                      }
                    },
                    onChange: (e)=> handleConfirmPassword(e)
                  })}
                  //onChange={(e) => handleConfirmPassword(e)}
                />
                {errors.confirmPassword && <ValidationScript style={{marginBottom: 5, bottom: '-22px'}}>{errors.confirmPassword?.message}</ValidationScript>}
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
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const {register, handleSubmit, setValue, setError, reset ,formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountInfoState
  })
  const onError = (error) => console.log(error)
  const navigate =useNavigate()
  const {state} = useLocation();

  useEffect(() => {
    if(tokenUserInfo.role ==='NORMAL'){
      selUserMyPageInfo(state.id).then(response => {
        if(response) {
          setAccountInfoState(response)
          reset(response)
        }
      })
    }else{
      selUserInfo(state.id).then(response => {
        if(response){
          setAccountInfoState(response)
          reset(response)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenUserInfo])

  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerName: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerPhone: event.target.value
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      managerEmail: event.target.value
    })
  }

  /**
   * 사업장 업태
   * @param event
   */
  const handleBusiness = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      userCompanyProfile: {
        ...accountInfoState.userCompanyProfile,
        typeOfBusiness: event.target.value
      }
    })
  }

  /**
   * 사업장 종목
   * @param event
   */
  const handleBusinessType = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      userCompanyProfile: {
        ...accountInfoState.userCompanyProfile,
        itemsOfBusiness: event.target.value
      }
    })
  }

  /**
   * 사업장 주소
   * @param event
   */
  const handleAddressLocation = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      userCompanyProfile: {
        ...accountInfoState.userCompanyProfile,
        address: {
          ...accountInfoState.userCompanyProfile.address,
          location: event.target.value
        }
      }
    })
  }

  /**
   * 사업장 주소 상세
   * @param event
   */
  const handleAddressLocationDetail = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      userCompanyProfile: {
        ...accountInfoState.userCompanyProfile,
        address: {
          ...accountInfoState.userCompanyProfile.address,
          locationDetail: event.target.value
        }
      }
    })
  }

  /**
   * 대표명
   * @param event
   */
  const handleCeoName = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      userCompanyProfile: {
        ...accountInfoState.userCompanyProfile,
        ceoName: event.target.value
      }
    })
  }
  /**
   * 세금 계산서 발행 이메일
   * @param event
   */
  const handleTaxInvoiceEmail = (event) => {
    setAccountInfoState({
      ...accountInfoState,
      userCompanyProfile: {
        ...accountInfoState.userCompanyProfile,
        taxInvoiceEmail: event.target.value
      }
    })
  }


  const imageDownload = (fileUrl) => {
    const url = IMAGE_SERVER + fileUrl;
    let type;
    fetch(url, { method: 'GET' })
    .then((res) => {
      type = res.url.substring(res.url.lastIndexOf('.') + 1)
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = accountInfoState?.userCompanyProfile.companyName + "_사업자등록증."+type;
      document.body.appendChild(a);
      a.click();
      setTimeout((_) => {
        window.URL.revokeObjectURL(url);
      }, 60000);
      a.remove();
    })
    .catch((err) => {
      console.error('err: ', err);
    });
  };

  const handleBusinessLicense = (pictureFiles) => {
    if(pictureFiles.length !== 0){
      const data = new FormData()
      const imagesLastIndex = pictureFiles.length-1;
      data.append('file', pictureFiles[imagesLastIndex].file, pictureFiles[imagesLastIndex].file.name)
      accountFileUpload( data,'LICENCE').then(response => {
        if(response) {
          setAccountInfoState({
            ...accountInfoState,
            userCompanyProfile: {
              ...accountInfoState.userCompanyProfile,
              businessLicenseWebPath: response
            }
          })
          setValue('businessLicenseWebPath', pictureFiles[imagesLastIndex].file.name)
          setError('businessLicenseWebPath', '')
        }
      })
    }
  }

  /**
   * 사용 여부
   * @param status
   */
  const handleStatus = (status) => {
    setAccountInfoState({
      ...accountInfoState,
      status: status
    })
  }

  const handleSelectHosting = (selectHostType) => {
    setAccountInfoState({
      ...accountInfoState,
      hostType: selectHostType.value
    })
  }

  const onSubmit = () => {
    // 최종데이터
    if(tokenUserInfo.role==='NORMAL'){
      updateMyPageUser(accountInfoState).then(response => {
        if (response) {
          toast.success("수정 되었습니다.",{autoClose:100, delay:0})
          toast.onChange(payload => {
            if (payload.status === "removed" && payload.type !== toast.TYPE.ERROR) {
              navigate('/board/dashboard')
            }
          })
        } else {
          toast.warning("수정이 실패 하였습니다. 관리자한테 문의해주세요")
        }
      })
    }else{
      updateUser(accountInfoState).then(response => {
        if(response){
          toast.success("수정 되었습니다.",{autoClose:100, delay:0})
          toast.onChange(payload => {
            if (payload.status === "removed" && payload.type !== toast.TYPE.ERROR) {
              navigate('/board/platform')
            }
          })
        }else{
          toast.warning("수정이 실패 하였습니다. 관리자한테 문의해주세요")
        }
      })
    }
  }
  const handleSavePassword = (data) =>{
    if(tokenUserInfo.role==='NORMAL'){
      updateMyPageUser(data).then(response => {
        if (response) {
          toast.success("비밀번호가 변경되었습니다.",{autoClose:100, delay:0})
          toast.onChange(payload => {
            if (payload.status === "removed" && payload.type !== toast.TYPE.ERROR) {
              setModal({
                isShow: false,
                modalComponent: null
              })
            }
          })
        } else {
          toast.warning("수정이 실패 하였습니다. 관리자한테 문의해주세요")
        }
      })
    }else{
      updateUser(data).then(response => {
        if (response) {
          toast.success("비밀번호가 변경되었습니다.",{autoClose:100, delay:0})
          toast.onChange(payload => {
            if (payload.status === "removed" && payload.type !== toast.TYPE.ERROR) {
              setModal({
                isShow: false,
                modalComponent: null
              })
            }
          })
        } else {
          toast.warning("수정이 실패 하였습니다. 관리자한테 문의해주세요")
        }
      })
    }
  }

  const onModalPw = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        { accountInfoState !== null &&
          <>
            <Board>
              <BoardHeader>기본 정보</BoardHeader>
              <BoardSearchDetail column={true}>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>광고주 구분</Span4></ColTitle>
                    <div>{(accountInfoState.adverType !=='ADVER') ? '대행사' : '광고주'}</div>
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
                        value={accountInfoState.adverName}
                        readOnly={true}
                      />
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>담당자명</Span4></ColTitle>
                    <RelativeDiv>
                      <InputValidationCon>
                        <Input
                          type={'text'}
                          placeholder={'담당자 명을 입력해주세요'}
                          {...register("managerName", {
                            required: "담당자 명을 입력해주세요",
                            onChange:(e) => handleManagerName(e)
                          })}
                          value={accountInfoState.managerName}
                        />
                        {errors.managerName && <ValidationScript>{errors.managerName?.message}</ValidationScript>}
                      </InputValidationCon>
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>담당자 연락처</Span4></ColTitle>
                    <RelativeDiv>
                      <InputValidationCon>
                        <Input
                          type={'text'}
                          placeholder={'담당자 연락처를 입력해주세요'}
                          {...register("managerPhone", {
                            required: "담당자 연락처를 입력해주세요.",
                            pattern: {
                              value: /0([1-9][0-9]?){1,2}?([0-9]{3,4})?([0-9]{4})/g,
                              message: "연락처 정보를 확인해주세요"
                            },
                            onChange : (e) => handleManagerPhone(e)
                          })}
                          value={phoneNumFormat(accountInfoState.managerPhone)}
                        />
                        {errors.managerPhone && <ValidationScript>{errors.managerPhone?.message}</ValidationScript>}
                      </InputValidationCon>
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>담당자 이메일</Span4></ColTitle>
                    <RelativeDiv>
                      <InputValidationCon>
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
                      </InputValidationCon>
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>호스팅</Span4></ColTitle>
                    <RelativeDiv>
                      <Select styles={selectStyle}
                              width={200}
                              isSearchable={false}
                              options={hostList}
                              value={accountInfoState.hostType !== '' ? hostList.find(value => value.value === accountInfoState.hostType) : ''}
                              onChange={handleSelectHosting}
                      />
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
              </BoardSearchDetail>
            </Board>
            <Board>
              <BoardHeader>사업자 정보</BoardHeader>
              <BoardSearchDetail column={true}>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>상호명</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        type={'text'}
                        placeholder={'상호명'}
                        value={accountInfoState?.userCompanyProfile.companyName}
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
                        value={accountInfoState?.userCompanyProfile.businessNumber}
                        readOnly={true}
                      />
                      {errors.businessNumber && <ValidationScript>{errors.businessNumber?.message}</ValidationScript>}
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>대표자 성명</Span4></ColTitle>
                    <RelativeDiv>
                      <InputValidationCon>
                        <Input
                          type={'text'}
                          placeholder={'대표자 성명'}
                          {...register("ceoName", {
                            required: "대표자 성명을 입력해주세요",
                            onChange:(e) => handleCeoName(e)
                          })}
                          value={accountInfoState?.userCompanyProfile.ceoName}
                        />
                        {errors.ceoName && <ValidationScript>{errors.ceoName?.message}</ValidationScript>}
                      </InputValidationCon>
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>업태</Span4></ColTitle>
                    <RelativeDiv>
                      <InputValidationCon>
                        <Input
                          type={'text'}
                          placeholder={'업태'}
                          {...register("typeOfBusiness", {
                            required: "업태를 입력해주세요",
                            onChange:(e) => handleBusiness(e)
                          })}
                          value={accountInfoState?.userCompanyProfile.typeOfBusiness}
                        />
                        {errors.typeOfBusiness && <ValidationScript>{errors.typeOfBusiness?.message}</ValidationScript>}
                      </InputValidationCon>
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>종목</Span4></ColTitle>
                    <RelativeDiv>
                      <InputValidationCon>
                        <Input
                          type={'text'}
                          placeholder={'종목'}
                          {...register("itemsOfBusiness", {
                            required: "종목을 입력해주세요",
                            onChange:(e) => handleBusinessType(e)
                          })}
                          value={accountInfoState?.userCompanyProfile.itemsOfBusiness}
                        />
                        {errors.itemsOfBusiness && <ValidationScript>{errors.itemsOfBusiness?.message}</ValidationScript>}
                      </InputValidationCon>
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan style={{justifyContent: 'flex-start'}}>
                  <ColSpan2>
                    <ColTitle><Span4>사업장 주소</Span4></ColTitle>
                    <RelativeDiv>
                      <InputValidationCon>
                        <Input
                          type={'text'}
                          placeholder={'사업장 주소'}
                          {...register("location", {
                            required: "주소를 입력해주세요",
                            onChange:(e) => handleAddressLocation(e)
                          })}
                          value={accountInfoState?.userCompanyProfile.address.location}
                        />
                        {errors.location && <ValidationScript>{errors.location?.message}</ValidationScript>}
                      </InputValidationCon>
                    </RelativeDiv>
                  </ColSpan2>
                  <ColSpan1>
                    <InputValidationCon style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                      <Input
                        type={'text'}
                        placeholder={'상세 주소를 입력해주세요.'}
                        value={accountInfoState?.userCompanyProfile.address.locationDetail}
                        {...register("locationDetail", {
                          required: "상세 주소를 입력해주세요",
                          onChange:(e) => handleAddressLocationDetail(e)
                        })}
                      />
                      {errors.locationDetail && <ValidationScript>{errors.locationDetail?.message}</ValidationScript>}
                    </InputValidationCon>
                  </ColSpan1>
                </RowSpan>
                <RowSpan style={{justifyContent: 'flex-start'}}>
                  <ColSpan2>
                    <ColTitle><Span4>사업자 등록증</Span4></ColTitle>
                    <RelativeDiv>
                      <InputValidationCon>
                        <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                          <Input
                            style={{paddingRight: 50}}
                            type={'text'}
                            placeholder={'사업자 등록증'}
                            {...register("businessLicenseWebPath", {
                              required: "사업자 등록증을 등록해주세요",
                            })}
                            value={accountInfoState?.userCompanyProfile.businessLicenseWebPath}
                            readOnly={true}
                          />
                          <DownLoadButton type={'button'} onClick={()=> imageDownload(accountInfoState?.userCompanyProfile.businessLicenseWebPath)} />
                        </div>
                        {errors.businessLicenseWebPath && <ValidationScript>{errors.businessLicenseWebPath?.message}</ValidationScript>}
                      </InputValidationCon>
                    </RelativeDiv>
                  </ColSpan2>
                  <ColSpan1 style={errors.businessLicenseWebPath ? {paddingBottom: 17} : {paddingBottom: 0}}>
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
                  </ColSpan1>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>세금계산서 발행 이메일</Span4></ColTitle>
                    <RelativeDiv>
                      <InputValidationCon>
                        <Input
                          type={'text'}
                          placeholder={'세금계산서 발행 이메일을 입력해주세요.'}
                          {...register("taxInvoiceEmail", {
                            required: "세금계산서 발행 이메일을 입력해주세요.",
                            pattern: {
                              value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                              message: "이메일 형식을 확인해주세요"
                            },
                            onChange: (e) => handleTaxInvoiceEmail(e)
                          })}
                          value={accountInfoState?.userCompanyProfile.taxInvoiceEmail}
                        />
                        {errors.taxInvoiceEmail && <ValidationScript>{errors.taxInvoiceEmail?.message}</ValidationScript>}
                      </InputValidationCon>
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                {tokenUserInfo.role !=='NORMAL' &&
                  <RowSpan>
                    <ColSpan1>
                      <ColTitle><Span4>사용 여부</Span4></ColTitle>
                      <RelativeDiv>
                        <input type={'radio'}
                               id={'normal'}
                               name={'status'}
                               checked={accountInfoState.status === 'NORMAL'}
                               onChange={() => handleStatus('NORMAL')}/>
                        <label htmlFor={'normal'}>사용</label>
                        <input type={'radio'}
                               id={'suspend'}
                               name={'status'}
                               checked={accountInfoState.status === 'SUSPEND'}
                               onChange={() => handleStatus('SUSPEND')}/>
                        <label htmlFor={'suspend'}>미사용</label>
                      </RelativeDiv>
                    </ColSpan1>
                  </RowSpan>
                }
              </BoardSearchDetail>
            </Board>
          </>
        }
        <SubmitContainer>
          {tokenUserInfo.role !== 'NORMAL' &&
              <CancelButton type={'button'} onClick={() => navigate(
                  '/board/platform')}>목록</CancelButton>
          }
          <SubmitButton type={"submit"}>저장</SubmitButton>
        </SubmitContainer>
      </form>

    </>
  )
}

export default PlatformUserDetail

