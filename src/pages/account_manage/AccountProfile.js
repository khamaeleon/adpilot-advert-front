import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  ColSpan1,
  ColSpan2,
  ColSpan3,
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
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {atom, useAtomValue} from "jotai/index";
import {useAtom} from "jotai";
import {useLocation} from "react-router-dom";
import {accountProfile} from "./entity";
import {accountUserProfile, accountInsertInvoiceProfile, accountFileUpload} from "../../services/AccountAxios";
import {phoneNumFormat} from "../../common/StringUtils";
import {toast, ToastContainer} from "react-toastify";
import ImageUploading from "react-images-uploading";

const AccountProfileState = atom(accountProfile)
function AccountProfile() {
  const userName = localStorage.getItem("username")
  const [texType, setTexType] = useState(true)
  const [accountProfileState, setAccountProfileState] = useAtom(AccountProfileState)
  const [invoiceProfileState, setInvoiceProfileState] = useState(accountProfile)
  const {register, handleSubmit, setValue, setError, reset ,formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountProfileState
  })
  const {state} = useLocation();
  useEffect(() => {
    userName !== null && accountUserProfile(userName).then(response => {
      setInvoiceProfileState(response)
    })
  }, [accountProfileState])

  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      managerName: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    let num = phoneNumFormat(event.target.value)
    setInvoiceProfileState({
      ...invoiceProfileState,
      managerPhone: num
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      managerEmail: event.target.value
    })
  }

  const handleBusinessNumber = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      businessNumber: event.target.value,
      businessName: '',
      ceoName:'',
    })
  }

  const handleBusiness = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      business: event.target.value
    })
  }

  const handleBusinessType = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      businessType: event.target.value
    })
  }

  const handleAddress = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      address: event.target.value
    })
  }

  const handleBankNumber = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      bankAccountNumber: event.target.value
    })
  }

  const handleAccountHolder = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      accountHolder: event.target.value
    })
  }
  const onDrop = (pictureFiles) => {
    if(pictureFiles.length !== 0){
      const data = new FormData()
      const imagesLastIndex = pictureFiles.length-1;
      data.append('file', pictureFiles[imagesLastIndex].file, pictureFiles[imagesLastIndex].file.name)
      accountFileUpload(userName, data,'LICENCE').then(response => {
        response !== false && setInvoiceProfileState({
          ...invoiceProfileState,
          businessLicenseCopy: pictureFiles[imagesLastIndex].file.name,
        })
      })
    }
  }
  const handleBusinessLicense = (value) => {
    console.log(value)
    // accountFileUpload(userName, value).then(response => {
    //   response !== false && setInvoiceProfileState({
    //     ...invoiceProfileState,
    //     businessLicenseCopy: value !== 'del' ? response : '',
    //   })
    // })

  }

  const handlePassbook = (value) => {
    accountFileUpload(userName, value).then(response => {
      setInvoiceProfileState({
        ...invoiceProfileState,
        passbookCopy: value !== 'del' ? response: '',
      })
    })
  }

  const onSubmit = (data) => {
    accountInsertInvoiceProfile(invoiceProfileState).then(response => {
      response && toast.success('완료')
    })
  }

  const onError = (error) => toast.warning(error)
  return (
    <main>
      {
        userName !== null &&
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <BoardContainer>
            <TitleContainer>
              <h1>정산 관리</h1>
              <Navigator/>
            </TitleContainer>
            <Board>
              <BoardHeader>사업자 정보</BoardHeader>
              <BoardSearchDetail>
                <RowSpan>
                  <ColSpan3>
                    <ColTitle><Span4>매체구분</Span4></ColTitle>
                    <div>{(invoiceProfileState.mediaType !== 'AGENT') ? '매체사' :'대행사'}</div>
                  </ColSpan3>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>담당자</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        type={'text'}
                        placeholder={'담당자 명을 입력해주세요'}
                        {...register("managerName", {
                          required: "담당자 명을 입력해주세요",
                          onChange:(e) => handleManagerName(e)
                        })}
                        value={invoiceProfileState.managerName}
                      />
                      {errors.managerName && <ValidationScript>{errors.managerName?.message}</ValidationScript>}
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>이메일</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        type={'text'}
                        placeholder={'이메일을 입력해주세요.'}
                        {...register("managerEmail", {
                          required: "담당자 이메일을 입력해주세요.",
                          pattern: {
                            value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                            message: "이메일 형식을 확인해주세요"
                          },
                          onChange: (e) => handleManagerEmail(e)
                        })}
                        value={invoiceProfileState.managerEmail}

                      />
                      {errors.managerEmail && <ValidationScript>{errors.managerEmail?.message}</ValidationScript>}
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>연락처</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        type={'text'}
                        placeholder={'연락처를 입력해주세요.'}
                        {...register("managerPhone", {
                          required: "담당자 연락처를 입력해주세요.",
                          pattern: {
                            value: /0([1-9][0-9]?){1,2}[.-]?([0-9]{3,4})[.-]?([0-9]{4})/g,
                            message: "연락처 정보를 확인해주세요"
                          },
                          onChange : (e) => handleManagerPhone(e)
                        })}
                        value={invoiceProfileState.managerPhone}

                      />
                      {errors.managerPhone && <ValidationScript>{errors.managerPhone?.message}</ValidationScript>}
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>회사명</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        type={'text'}
                        placeholder={'회사명'}
                        value={invoiceProfileState.businessName}
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
                        value={invoiceProfileState.businessNumber}
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
                    <ColTitle><Span4>업태</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        type={'text'}
                        placeholder={'업태'}
                        {...register("business", {
                          required: "업태를 입력해주세요",
                          onChange:(e) => handleBusiness(e)
                        })}
                        value={invoiceProfileState.business}
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
                        value={invoiceProfileState.businessType}
                      />
                      {errors.businessType && <ValidationScript>{errors.businessType?.message}</ValidationScript>}
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>대표자 성명</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        type={'text'}
                        placeholder={'대표자 성명'}
                        value={invoiceProfileState.ceoName}
                        readOnly={true}
                      />
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
                        value={invoiceProfileState.address}
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
                        value={invoiceProfileState.businessLicenseCopy}
                        readOnly={true}
                      />
                      {errors.businessLicenseCopy && <ValidationScript>{errors.businessLicenseCopy?.message}</ValidationScript>}
                      <DeleteButton type={'button'} onClick={()=> handleBusinessLicense('del')} />
                    </RelativeDiv>
                  </ColSpan2>
                  <ColSpan1>
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
                          />
                        )}
                      </ImageUploading>
                      파일 첨부
                    </DuplicateButton>
                  </ColSpan1>
                </RowSpan>
              </BoardSearchDetail>
              <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
            </Board>
            <Board>
              <BoardHeader>정산 정보</BoardHeader>
              <BoardSearchDetail>
                <RowSpan>
                  <ColSpan1>
                    <ColTitle><Span4>은행 선택</Span4></ColTitle>
                    <RelativeDiv>
                      <Select styles={inputStyle}
                              components={{IndicatorSeparator: () => null}}
                              options={null}
                              value={0}
                        // onChange={}
                      />
                    </RelativeDiv>
                  </ColSpan1>
                </RowSpan>
                <RowSpan style={{justifyContent: 'flex-start'}}>
                  <ColSpan2>
                    <ColTitle><Span4>계좌 번호</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        type={'text'}
                        placeholder={'계좌 번호'}
                        {...register("bankAccountNumber", {
                          required: "계좌 번호를 입력해주세요",
                          onChange:(e) => handleBankNumber(e)
                        })}
                        value={invoiceProfileState.bankAccountNumber}
                      />
                      {errors.bankAccountNumber && <ValidationScript>{errors.bankAccountNumber?.message}</ValidationScript>}
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>예금주</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        type={'text'}
                        placeholder={'예금주'}
                        {...register("accountHolder", {
                          required: "예금주를 입력해주세요",
                          onChange:(e) => handleAccountHolder(e)
                        })}
                        value={invoiceProfileState.accountHolder}
                      />
                      {errors.accountHolder && <ValidationScript>{errors.accountHolder?.message}</ValidationScript>}
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan style={{justifyContent: 'flex-start'}}>
                  <ColSpan2>
                    <ColTitle><Span4>통장 사본</Span4></ColTitle>
                    <RelativeDiv>
                      <Input
                        style={{paddingRight: 35}}
                        type={'text'}
                        placeholder={'통장 사본'}
                        {...register("passbookCopy", {
                          required: "통장 사본을 등록해주세요",
                        })}
                        value={invoiceProfileState.passbookCopy}
                        readOnly={true}
                      />
                      {errors.passbookCopy && <ValidationScript>{errors.passbookCopy?.message}</ValidationScript>}
                      <DeleteButton type={'button'} onClick={()=> handlePassbook('del')}/>
                    </RelativeDiv>
                  </ColSpan2>
                  <ColSpan1>
                    <DuplicateButton type={'button'} onClick={()=> handlePassbook('PASSBOOK')}>파일 첨부</DuplicateButton>
                  </ColSpan1>
                </RowSpan>
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span4>과세 여부</Span4></ColTitle>
                    <RelativeDiv>
                      <input type={'radio'} id={'taxation'} name={'taxSelect'} defaultChecked={true} onChange={() => setTexType(true)}/>
                      <label htmlFor={'taxation'}>과세</label>
                      <input type={'radio'} id={'taxFree'} name={'taxSelect'} onChange={() => setTexType(false)}/>
                      <label htmlFor={'taxFree'}>면세</label>
                    </RelativeDiv>
                  </ColSpan2>
                </RowSpan>
                <RowSpan>
                  <ColSpan1>
                    <ColTitle><Span4>그로스 정산</Span4></ColTitle>
                    <RelativeDiv>
                      <Select styles={inputStyle}
                              components={{IndicatorSeparator: () => null}}
                              options={null}
                              value={invoiceProfileState.grossCalculate}
                        // onChange={}
                      />
                    </RelativeDiv>
                  </ColSpan1>
                </RowSpan>
              </BoardSearchDetail>
            </Board>
            <SubmitContainer>
              <SubmitButton type={"submit"}>수정</SubmitButton>
            </SubmitContainer>
          </BoardContainer>
        </form>
      }

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
    </main>
  )
}

export default AccountProfile

const DuplicateButton = styled.button`
  width: 150px;
  height: 45px;
  background-color: #777;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
`
