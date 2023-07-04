import {useAtom} from "jotai";
import React, {useState} from "react";
import {ModalBody, ModalHeader} from "../modal/Modal";
import styled from "styled-components";
import {selKeywordUser} from "../../services/Platform/ManageUserAxios";
import {modalController} from "../../store";
import {
  borderColor,
  ColSpan1,
  ColSpan3,
  ColSpan4,
  GraySearchButton,
  InputLabel, lightGray,
  RelativeDiv,
  RowSpan,
  SaveExcelButton,
  SubmitButton,
  ValidationScript
} from "../../assets/GlobalStyles";
import {addHistory, adverPointeRquest} from "../../services/payment/admin/PointAllListRequestAxios"
import {decimalFormat, removeStr} from "../../common/StringUtils";
import {useForm} from "react-hook-form";
import {light} from "../../assets/theme";

export function SearchAdvertiser(props) {
  const {title, onSubmit, btnStyle, historyAdd} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: historyAdd !== undefined ? 700 : 600,
      modalComponent: () => {
        return (
          <SearchModal title={title} onSubmit={onSubmit} historyAdd={historyAdd} />
        )
      }
    })
  }
  switch (btnStyle){
    case 'historyAddButton' : return <SaveExcelButton className={'listUp'} onClick={handleModalComponent}>{title}</SaveExcelButton>;
    default : return <GraySearchButton style={{height: 40}} type={'button'} onClick={handleModalComponent}>{title}</GraySearchButton>;
  }
}

function SearchModal (props) {
  const [, setModal] = useAtom(modalController)
  const [adverSearchInfo, setAdverSearchInfo] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [searchKeyword, setSearchKeyword] = useState('')
  const [historyState, setHistoryState] = useState(false); // 히스토리 여부 선택
  const [gtSettingMethod, setGtSettingMethod] = useState('GIVEN_BY_ADMIN'); // 지급/차감 설정
  const [enterAmount, setEnterAmount] = useState(0) // 이력추가 금액 입력
  const [adverPoint, setAdverPoint] = useState(0);
  const [note, setNote] = useState("") // 비고 내용
  const [validation, setValidation] = useState('')
  const {register, handleSubmit, setError, formState:{errors} } = useForm()
  const handleSelect = (item) => {
    setSelectedItem(item)
    setValidation('')
  }

  const handleChange = (event) => {
    let num = removeStr(event)
    let numberNum = Number(num)
    setEnterAmount(numberNum)
  }

  const searchSubmit = () => {
    if (selectedItem.id === undefined) {
      setValidation('광고주를 선택해주세요.')
    } else if(props.title === "이력 추가") {
      setHistoryState(true);
      // [d] 해당 광고주 전체 포인트 조회??
      try {
        adverPointeRquest(selectedItem.id).then(response => {
          setAdverPoint(response.availablePoint);
        })
      } catch (error) {
       console.error("실패 응답 처리", error);
      }
    } else {
      setModal({
        isShow: false,
        modalComponent: null
      })
      props.onSubmit(selectedItem)
    }
  }

  const handleOnSearchKeyword = (e) => {
    // eslint-disable-next-line
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if(!regExp.test(e.target.value)){
      setSearchKeyword(e.target.value)
    }
  }

  const handleSearch = () => {
    if(searchKeyword!==''){
      selKeywordUser(searchKeyword).then(response => {
        setAdverSearchInfo(response)
        response?.length !== 0 ? setValidation('') : setValidation('검색된 광고주가 존재하지 않습니다.')
      })
    } else {
      setValidation('검색어를 입력해주세요.')
    }
    setSelectedItem({})
  }

  const onSubmit = async () => {
    if(enterAmount === 0) {
      setError('enterAmount', {type: 'required', message: '요청 금액을 입력해 주세요'});
      // 구문 하나 더 나눠서 광고비 잔애보다 지급 혹은 차감 금액이 더 크면 얼럿!!
    }else if(enterAmount > adverPoint && gtSettingMethod === "TAKEN_BY_ADMIN") {
        setError('enterAmount', {type: 'required', message: '요청 금액이 광고비 잔액을 초과 합니다.'});
    }else{
      if(gtSettingMethod === "GIVEN_BY_ADMIN" || gtSettingMethod === "TAKEN_BY_ADMIN") {
        const requestData = {
          userId: selectedItem.id,
          pointHistoryType: gtSettingMethod,
          point: gtSettingMethod === "GIVEN_BY_ADMIN"?enterAmount:-enterAmount,
          description: note
        }
        try {
          await addHistory(requestData);
          // props.onPaymentDetailsReceived(); // 성공적인 응답 처리 후 부모 새로고침 용
          props.onSubmit()
          setEnterAmount(0)
          setModal({
            isShow: false,
            modalComponent: null
          })
        } catch (error) {
          console.error("실패 응답 처리", error); // 실패한 응답 처리
        }
      }
    }



  }

  const onError = () => console.log(errors)

  return (
    <div>
      <ModalHeader title={props.title === null? "광고주 검색" : props.title}/>
      <ModalBody>
        <MediaSearchColumn>
          <div>광고주명</div>
          <div>
            <InputGroup>
              <input type={'text'}
                     placeholder={"광고주명을 입력해주세요."}
                     autoFocus={true}
                     value={historyState === true?selectedItem.adverName:searchKeyword}
                     onChange={e => handleOnSearchKeyword(e)}
                     disabled={historyState ? true : false}
                     onKeyDown={event => (event.code === 'Enter') && handleSearch() }
              />
              <button
                type={'button'}
                onClick={handleSearch}
                disabled={historyState ? true : false}>검색</button>
            </InputGroup>
          </div>
        </MediaSearchColumn>
        {validation !== '' && <Validation>{validation}</Validation>}
        <MediaSearchResult>
          {adverSearchInfo.length !== 0 && historyState === false ?
            <>
              <table>
                <thead>
                <tr>
                  <th>광고주명</th>
                  <th>아이디</th>
                  <th>담당자명</th>
                </tr>
                </thead>
                <tbody>
                {adverSearchInfo.map((item, key) => {
                  return (
                    <tr key={key}
                        onClick={() => handleSelect(item)}
                        style={selectedItem.adverName === item.adverName ? {
                          backgroundColor: light.color.mainColor,
                          color: '#fff'
                        } : null}>
                      <td>{item.adverName}</td>
                      <td>{item.username}</td>
                      <td>{item.staffName}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </>
            : null
          }
          {historyState === true ?
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <RowSpan>
              <ColSpan1>지급/차감 설정</ColSpan1>
                <RelativeDiv>
                  <ColSpan4>
                    <label>
                      <input
                        type={'radio'}
                        name={'gtSettingMethod'}
                        value="GIVEN_BY_ADMIN"
                        checked={gtSettingMethod === 'GIVEN_BY_ADMIN'}
                        onChange={(e) => setGtSettingMethod(e.target.value)}
                      />
                      <span>광고비 지급</span>
                    </label>
                    <label>
                      <input
                        type={'radio'}
                        name={'gtSettingMethod'}
                        value="TAKEN_BY_ADMIN"
                        checked={gtSettingMethod === 'TAKEN_BY_ADMIN'}
                        onChange={(e) => setGtSettingMethod(e.target.value)}
                      />
                      <span>광고비 차감</span>
                    </label>
                  </ColSpan4>
                </RelativeDiv>
            </RowSpan>
            <RowSpan>
              <ColSpan1>금액 입력</ColSpan1>
              <RelativeDiv>
                <ColSpan3>
                  <InputLabel label={'원'}>
                    <Input
                      type={'text'}
                      textAlign={'right'}
                      value={decimalFormat(enterAmount)}
                      maxLength={19}
                      {...register("enterAmount", {
                        required: "금액을 입력해 주세요.",
                        pattern: {
                          message: "숫자만 입력 가능합니다.",
                          value: /^[0-9,]+$/,
                        },
                        onChange:(e)=>handleChange(e.target.value)
                      })}
                    />

                  </InputLabel>
                </ColSpan3>
              </RelativeDiv>
            </RowSpan>
            <RowSpan>
              <ColSpan1>광고비 잔액</ColSpan1>
              <RelativeDiv>
                <ColSpan3>
                  <Input
                    type={'text'}
                    textAlign={'right'}
                    value={decimalFormat( adverPoint + '원')}
                    disabled={true}
                  />
                </ColSpan3>
                {errors.enterAmount && <ValidationScript style={{left:10}}>{errors.enterAmount.message}</ValidationScript>}
              </RelativeDiv>
            </RowSpan>
            <RowSpan style={{marginTop:'35px'}}>
              <ColSpan1>비고</ColSpan1>
              <RelativeDiv>
                <ColSpan4>
                  <Input
                    className={'note'}
                    type={'text'}
                    value={note}
                    placeholder='비고 입력'
                    onChange={(e)=> setNote(e.target.value)}
                  />
                </ColSpan4>
              </RelativeDiv>
            </RowSpan>
            <RowSpan>
              <SubmitButton type={"submit"} style={{
                display: "block",
                width: "200px",
                margin: "15px auto 0px",
                padding: "13px 0px"
              }}>이력 추가</SubmitButton>
            </RowSpan>
          </form>
            :
          <MediaSelectedButton onClick={searchSubmit}>선택 완료</MediaSelectedButton>}

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
      border-top: 1px solid ${borderColor};
      border-bottom: 1px solid ${borderColor};
    }

    & td {
      text-align: center;
      padding: 12px;
      border-bottom: 1px solid ${borderColor};
      cursor: pointer;
    }
  }
`

const InputGroup = styled.div`
  display: flex;

  & input[type='text'] {
    padding: 0 20px;
    width: 80%;
    border: 1px solid ${borderColor};
    height: 36px;
    border-radius: 10px 0 0 10px;
  }

  & button {
    width: 20%;
    border-radius: 0 10px 10px 0;
    background-color: #777;
    color: #fff;
  }
`

const Input = styled.input `
  width: 300px;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  text-align: ${props => props.textAlign};
  padding: 4px 10px;
  height: 40px;
  &:after {
    font-size: 13px;
    font-weight: 400;
  }
  &.note {
    width: 100%;
    font-size: 14px;
    font-weight:400;
  }
`
const Validation = styled.div`
  margin-top: 10px;
  text-align: center;
  color: #f55a5a;
  font-size: 13px !important;
`