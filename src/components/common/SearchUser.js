import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalHeader} from "../modal/Modal";
import styled from "styled-components";
import {selKeywordUser} from "../../services/ManageUserAxios";
import {modalController} from "../../store";
import Switch from "./Switch";
import {ColSpan4, RelativeDiv, RowSpan, SaveExcelButton} from "../../assets/GlobalStyles";
import {accountCreateInvoice} from "../../pages/account_manage/entity";
import {accountRevenueStatus} from "../../services/AccountAxios";
import {decimalFormat, removeStr} from "../../common/StringUtils";
import {useForm} from "react-hook-form";

function ModalHistoryAdd(props) {
  const id = localStorage.getItem("id")
  const [, setModal] = useAtom(modalController)
  const {selectedItem} = props;
  const [createInvoice, setCreateInvoice] = useState(accountCreateInvoice)
  const [revenueBalance, setRevenueBalance] = useState(0)
  const {register, setValue, setError, formState:{errors} } = useForm()
  useEffect(() => {
    selectedItem.username !== undefined && accountRevenueStatus(selectedItem.username).then(response => { // 정산 수익 현황
      response !== null && setRevenueBalance(response.revenueBalance)
      setError('requestAmountValue', '')
      setCreateInvoice({
        ...createInvoice,
        username : selectedItem.username,
        requesterId : id
      })
    })
  }, [selectedItem])

  const invoiceParams = () => {
    if(createInvoice.requestAmount > 0) {
      props.onSubmit(createInvoice)
      setModal({
        isShow: false,
        modalComponent: null
      })
    } else {
      setError('requestAmountValue', {type: 'required', message:'정산 신청금을 입력해주세요.'})
    }
  }

  const revenueType = (value) => {
    setCreateInvoice({
      ...createInvoice,
      invoiceStatus : value,
    })
  }

  const etcText = (value)=> {
    setCreateInvoice({
      ...createInvoice,
      etc : value
    })
  }

  const handleChange = (value) => {
    let num = removeStr(value)
    let numberNum = Number(num)
    if(selectedItem.username !== undefined){
      if(revenueBalance < numberNum){
        setError('requestAmountValue', {type: 'required', message:'정산 신청금이 잔여 정산금을 초과하였습니다.'})
      } else {
        setCreateInvoice({
          ...createInvoice,
          requestAmount : numberNum,
        })
        setValue('requestAmountValue', numberNum)
        setError('requestAmountValue', '')
      }
    } else {
      setError('requestAmountValue', {type: 'required', message:'매체를 먼저 선택해주세요.'})
    }
  }
  return (
      <HistoryAdd>
        <p>이력 추가</p>
        <div className={'border-box'}>
          <RowSpan style={{marginTop: 0}}>
            <ColSpan4 style={{paddingLeft: 0}}>
              <span>신청 금액 설정</span>
              <RelativeDiv>
                <input type={'radio'} id={'increment'} name={'proposeState'} defaultChecked={true} onChange={() => revenueType('REVENUE_INCREASE')}/>
                <label htmlFor={'increment'}>증가</label>
                <input type={'radio'} id={'decrement'} name={'proposeState'} onChange={() => revenueType('REVENUE_DECREASE')}/>
                <label htmlFor={'decrement'}>감소</label>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan style={{marginTop: 0}}>
            <div className={'inputCon'}>
              <span>금액 입력</span>
              <div className={'won gary-bg'}>
                <input type={'text'} value={decimalFormat(createInvoice.requestAmount)}
                       {...register("requestAmountValue", {
                         required: "정산 금액을 입력해주세요,",
                         pattern:{
                           value: /^[0-9,]+$/,
                           message: "숫자만 입력 가능합니다."
                         },
                         onChange:(e) => handleChange(e.target.value)
                       })}
                />
              </div>
            </div>
            <div className={'inputCon'}>
              <span>수익 잔액</span>
              <div className={'won'}>
                <input
                  type={'text'}
                  value={revenueBalance}
                  placeholder={'수익 잔액'}
                  readOnly={true}
                />
              </div>
            </div>
          </RowSpan>
          {errors.requestAmountValue && <p style={{color: '#f55a5a', fontSize: 12, paddingLeft: 88}}>{errors.requestAmountValue.message}</p>}
          <RowSpan style={{marginTop: 15}}>
            <ColSpan4 style={{paddingLeft: 0}}>
              <span>비고</span>
              <div className={'gary-bg'}>
                <textarea placeholder={'내용을 입력해주세요.'}
                          value={createInvoice.etc}
                          onChange={ e => etcText(e.target.value)}
                />
              </div>
            </ColSpan4>
          </RowSpan>
        </div>
        <MediaSelectedButton onClick={invoiceParams}>이력 추가</MediaSelectedButton>
      </HistoryAdd>
  )
}

export function SearchUser(props) {
  const {title, onSubmit, btnStyle, historyAdd} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: historyAdd !== undefined ? 700 : 600,
      modalComponent: () => {
        return (
          <SearchModal onSubmit={onSubmit} historyAdd={historyAdd}/>
        )
      }
    })
  }

switch (btnStyle){
  case 'AccountButton' : return <AccountButton style={{marginBottom: 15, backgroundColor: '#fff'}} onClick={handleModalComponent}>{title}<span>></span></AccountButton>;
  case 'SwitchUserButton' : return <SwitchUserButton onClick={handleModalComponent}>{title}</SwitchUserButton>;
  case 'historyAddButton' : return <SaveExcelButton className={'listUp'} onClick={handleModalComponent}>이력 추가</SaveExcelButton>;
  default : return <Button type={'button'} onClick={handleModalComponent}>{title}</Button>;
  }
}


function SearchModal (props) {
  const [, setModal] = useAtom(modalController)
  const [mediaSearchInfo, setMediaSearchInfo] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSelect = (item) => {
    setSelectedItem(item)
  }

  const handleSubmit = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    props.onSubmit(selectedItem)
  }

  const handleOnSearchKeyword = (e) => {
    setSearchKeyword(e.target.value)
  }

  const handleSearch = (e) => {
    selKeywordUser(searchKeyword).then(response => {
      setMediaSearchInfo(response)
    })
  }

  return (
      <div>
        <ModalHeader title={"매체 검색"}/>
        <ModalBody>
          <MediaSearchColumn>
            <div>매체명</div>
            <div>
              <InputGroup>
                <input type={'text'}
                       placeholder={"매체명을 입력해주세요."}
                       autoFocus={true}
                       value={searchKeyword}
                       onChange={e => handleOnSearchKeyword(e)}
                       onKeyDown={event => (event.code === 'Enter') && handleSearch() }
                />
                <button type={'button'} onClick={handleSearch}>검색</button>
              </InputGroup>
            </div>
          </MediaSearchColumn>
          <MediaSearchResult>
            {mediaSearchInfo.length !== 0 &&
                <>
                  <table>
                    <thead>
                    <tr>
                      <th>매체명</th>
                      <th>아이디</th>
                      <th>담당자명</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mediaSearchInfo.map((item, key) => {
                      return (
                          <tr key={key}
                              onClick={() => handleSelect(item)}
                              style={selectedItem.siteName === item.siteName ? {
                                backgroundColor: "#f5811f",
                                color: '#fff'
                              } : null}>
                            <td>{item.siteName}</td>
                            <td>{item.username}</td>
                            <td>{item.staffName}</td>
                          </tr>
                      )
                    })}
                    </tbody>
                  </table>
                </>
            }
            {props.historyAdd !== undefined && <ModalHistoryAdd selectedItem={selectedItem} onSubmit={props.onSubmit}/>}
            {props.historyAdd === undefined && <MediaSelectedButton onClick={handleSubmit}>선택 완료</MediaSelectedButton>}
          </MediaSearchResult>
        </ModalBody>
      </div>
  )
}

const MediaSearchColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #f9f9f9;

  & > div:first-child {
    min-width: 70px;
  }

  & > div:last-child {
    width: 100%;
  }
`

const MediaSelectedButton = styled.button`
  display: block;
  margin: 15px auto 0;
  padding: 13px 0;
  width: 200px;
  background-color: #535353;
  color: #fff;
`


const MediaSearchResult = styled.div`
  font-size: 13px;

  & table {
    margin-top: 18px;
    width: 100%;

    & th {
      padding: 12px;
      background-color: #fafafa;
      color: #b2b2b2;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }

    & td {
      text-align: center;
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
    }
  }
`

const InputGroup = styled.div`
  display: flex;

  & input[type='text'] {
    padding: 0 20px;
    width: 80%;
    border: 1px solid #e5e5e5;
    height: 45px;
    border-radius: 10px 0 0 10px;
  }

  & button {
    width: 20%;
    border-radius: 0 10px 10px 0;
    background-color: #777;
    color: #fff;
  }
`

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

const AccountButton = styled.button`
  width: 175px; 
  height: 40px;
  border-radius: 5px;
  border: solid 1px #ddd;
  background-color: #f3f3f3;
  font-size: 15px;
  > span {
    padding-left: 10px;
  }
`

const SwitchUserButton = styled.button`
  background-color: #fff;
  padding: 13px 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const HistoryAdd = styled.div`
  > p {
    margin: 20px 0 10px;
  }
  .border-box {
    padding: 15px 20px;
    border: solid 1px #e5e5e5;
    span {
      width: 92px; 
      color: #777;
    }
    .inputCon {
      width: 48%;
      display: flex;
      align-items: center;
    }
    .gary-bg {
      background-color: #f9f9f9;
      border-radius: 10px;
      border: 0 !important;
      textarea {
        width: 100%;
        background-color: transparent;
        margin: 0;
        padding: 10px;
        border: 0;
      }
    }
    .won {
      width: calc(100% - 78px);
      height: 45px;
      display: flex;
      align-items: center;
      padding: 8px 15px;
      border-radius: 10px;
      border: solid 1px #e5e5e5;
      &.gary-bg input {
        font-size: 18px;
        &::placeholder {
          font-size: 13px;
        }
      }
      input {
        width: 90%;
        border: 0;
        background-color: transparent;
        text-align: right;
      }
    }
  }
`
