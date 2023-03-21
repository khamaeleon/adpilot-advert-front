import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader, BoardSearchDetail, CalendarBox, CalendarIcon, CancelButton, ColSpan1, ColSpan2,
  ColSpan3, ColSpan4,
  ColTitle, CustomDatePicker, DateContainer, Input, inputStyle, RelativeDiv,
  RowSpan, Span2, Span4, SubmitButton, SubmitContainer,
  TitleContainer, ValidationScript
} from "../../assets/GlobalStyles";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";
import {useEffect,  useState} from "react";
import Checkbox from "../../components/common/Checkbox";
import {
  calculationAllType,
  confirmAllType,
  exposedLimitType,
  mediaResistInfo
} from "./entity";
import {atom, useAtom} from "jotai/index";
import ko from "date-fns/locale/ko";
import {useLocation, useNavigate} from "react-router-dom";
import {
  eventTypeList,
  selInventory,
  updateInventory
} from "../../services/InventoryAxios";

const MediaInfoAtom = atom(mediaResistInfo)

function MediaListDetail(factory, deps) {
  const [mediaInfoState, setMediaInfoState] = useAtom(MediaInfoAtom);
  const [calculationAllTypeState] = useState(calculationAllType);
  const [examinationStatusState, setExaminationStatusState] = useState();
  const {handleSubmit, formState: {errors}} = useForm()
  const [eventTypeState, setEventTypeState] = useState([])
  const [confirmAllTypeState] = useState(confirmAllType);
  const [exposedMinuteLimit] = useState(exposedLimitType)
  const [showNoExposedConfigValue, setShowNoExposedConfigValue] = useState(true)
  const [validation, setValidation] = useState({
    eventTypeMessage: '',
    calculationValueMessage:'정산 금액을 입력해주세요'
  })
  const onError = (error) => console.log(error)
  const {state} = useLocation();
  const navigate = useNavigate();
  const onSubmit = () => {
    if (validation.eventTypeMessage === '' && validation.eventTypeMessage !==0) {
      updateInventory(mediaInfoState.id,
          {...mediaInfoState,
            inventoryType:mediaInfoState.inventoryType.value,
            allowEvents: mediaInfoState.allowEvents.map(allowEvent => {return {eventType:allowEvent.eventType.value, exposureWeight: allowEvent.exposureWeight}}),
            exposedMinuteLimit: mediaInfoState.exposedMinuteLimit != null ? mediaInfoState.exposedMinuteLimit.value : null
          }
      ).then((response)=> {
        if(response != null){
          alert('지면 정보가 수정되었습니다.');
          navigate('/board/media2',{ state: {update:true}})
        }
      })
    } else {
      if(validation.eventTypeMessage ===0){
        setValidation({
          ...validation,
          calculationValueMessage: '정산 금액을 입력해주세요'
        })
      }
    }
    return null
  }
  useEffect(() => {
    selInventory(state).then(response => {
        setMediaInfoState(response);
        setShowNoExposedConfigValue(response.noExposedConfigType !== "DEFAULT_BANNER_IMAGE");
        setExaminationStatusState(response.examinationStatus)
    })
    eventTypeList().then(response =>
        setEventTypeState(response)
    )
  }, [setMediaInfoState,state])

  /**
   * 지면 상세 설명
   * @param event
   */
  const handleDescription = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      description: event.target.value
    })
  }
  const handleExposeMinuteLimit = (exposedMinuteLimit) => {
    setMediaInfoState({
      ...mediaInfoState,
      exposedMinuteLimit: exposedMinuteLimit
    })
  }

  /**
   * 이벤트 유형 전체선택
   * @param event
   */
  const handleChangeSelectAll = (event) => {
    console.log(event.target)
    if(event.target.checked) {
      setMediaInfoState({
        ...mediaInfoState,
        allowEvents: eventTypeState.map(data => {return {eventType:data, exposureWeight:100}})
      });
      setValidation({eventTypeMessage: ''})
    }else {
      setMediaInfoState({
        ...mediaInfoState,
        allowEvents: []
      });
      setValidation({eventTypeMessage: '하나 이상의 이벤트를 체크해주세요'})
    }
  }
  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크가 true일때
    if(event.target.checked){
      setMediaInfoState({
        ...mediaInfoState,
        allowEvents: mediaInfoState.allowEvents.concat({eventType: eventTypeState.find(eventType => eventType.value === event.target.id), exposureWeight:100})
      });
      setValidation({eventTypeMessage: ''})
    }
    else{
      setMediaInfoState({
        ...mediaInfoState,
        allowEvents: mediaInfoState.allowEvents.filter(data => data.eventType.value !== event.target.id)
      });
      if(mediaInfoState.allowEvents.length < 2) setValidation({eventTypeMessage: '하나 이상의 이벤트를 체크해주세요'})
    }
  }
  /**
   * 심사여부 설정
   */
  const handleSelectConfirmType = (examinationStatus) => {
    setMediaInfoState({
      ...mediaInfoState,
      examinationStatus: examinationStatus.value
    })
  }
  /**
   * 정산방식 선택날짜
   * @param date
   */
  const handleContractDate = (date) => {
    setMediaInfoState({
      ...mediaInfoState,
      contractStartDate: date
    })
  }

  /**
   * 정산방식 선택
   * @param calculationType
   */
  const handleCalculationType = (calculationType) => {
    setMediaInfoState({
      ...mediaInfoState,
      calculationType: calculationType.value
    })
  }
  /**
   * 정산방식 값 입력
   * @param calculationValue
   */
  const handleCalculationValue = (event) => {
    setValidation({
      ...validation,
      calculationValueMessage: ''
    })
    setMediaInfoState({
      ...mediaInfoState,
      calculationValue: parseInt(event.target.value )
    })
  }
  /**
   * 비고 입력
   * @param event
   */
  const handleCalculationEtc = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      calculationEtc: event.target.value
    })
  }

  const handleAllowEvents = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      allowEvents: [
        ...mediaInfoState.allowEvents.map(allowEvent => (allowEvent.eventType.value === event.target.id) ? {eventType : allowEvent.eventType, exposureWeight: parseInt(event.target.value)} : allowEvent)
      ]
    })
  }

  /**
   * 미송출시 타입 선택
   * @param noExposedConfigType
   */
  const handleNoExposedConfigType = (noExposedConfigType) => {
    if (noExposedConfigType === "DEFAULT_BANNER_IMAGE") {
      setShowNoExposedConfigValue(false)
    } else {
      setShowNoExposedConfigValue(true)
    }
    setMediaInfoState({
      ...mediaInfoState,
      noExposedConfigType: noExposedConfigType
    })
  }

  /**
   * 미송출시 데이터 입력
   * @param event
   */
  const handleNoExposedConfigValue = (event) => {
    setMediaInfoState({
      ...mediaInfoState,
      noExposedConfigValue: event.target.value
    })
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <BoardContainer>
          <TitleContainer>
            <h1>지면 관리</h1>
            <Navigator/>
          </TitleContainer>
          {/*지면 정보*/}
          <Board>
            <BoardHeader>지면 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>심사 상태</Span2></ColTitle>
                  <RelativeDiv>
                    <Select options={confirmAllTypeState}
                            styles={inputStyle}
                            isDisabled={examinationStatusState !== 'CONFIRMING'}
                            components={{IndicatorSeparator: () => null}}
                            value={confirmAllType.find(data => data.value === mediaInfoState.examinationStatus)}
                            onChange={handleSelectConfirmType}
                    />
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>매체명</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.siteName}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면명</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.inventoryName}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면 상세 설명</Span2></ColTitle>
                  <RelativeDiv>
                    <Textarea rows={5}
                              placeholder={'지면 상세 정보를 입력해주세요.'}
                              value={mediaInfoState.description || ''}
                              onChange={(e) => handleDescription(e)}

                    />
                    {errors.description && <ValidationScript>{errors.description?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면 카테고리</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.category1.label}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>디바이스 유형</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.deviceType}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>에이전트 유형</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.agentTypes.map(data => data.value).join(', ')}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>URL</Span2><br/><small>(APP-URL)</small></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.mediaUrl}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          {/*광고 상품 정보*/}
          <Board>
            <BoardHeader>광고 상품 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>광고 상품</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.productType === 'BANNER' ? '배너' : '팝언더'}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면 유형</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           value={mediaInfoState.inventoryType.label}
                           readOnly={true}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>

              {mediaInfoState.productType.value !== 'POP_UNDER' ?
                <RowSpan>
                  <ColSpan2>
                    <ColTitle><Span2>지면 사이즈</Span2></ColTitle>
                    <div>
                      <Input type={'text'}
                             value={mediaInfoState.bannerSize.value}
                             readOnly={true}
                      />
                    </div>
                  </ColSpan2>
                </RowSpan> :
                  <RowSpan>
                    <ColSpan2>
                      <ColTitle><Span2>노출 간격</Span2></ColTitle>
                      <Select options={exposedMinuteLimit}
                              placeholder={'선택하세요'}
                              value={exposedMinuteLimit.find(type => type.value === mediaInfoState.exposedMinuteLimit)}
                              onChange={handleExposeMinuteLimit}
                              styles={{
                                input: (baseStyles, state) => (
                                    {
                                      ...baseStyles,
                                      minWidth: "300px",
                                    })
                              }}
                      />
                    </ColSpan2>
                  </RowSpan>
              }
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span2>이벤트 설정</Span2></ColTitle>
                  <RelativeDiv>
                    <EventSet>
                       <Checkbox label={'전체'}
                                 type={'c'}
                                 id={'ALL'}
                                 isChecked={mediaInfoState.allowEvents.length === eventTypeState.length}
                                 onChange={handleChangeSelectAll}/>
                      {
                        eventTypeState.map((data, index)=>{
                          return <Checkbox label={data.label}
                                           key={index}
                                           type={'c'}
                                           id={data.value}
                                           isChecked={mediaInfoState.allowEvents.find(event => event.eventType.value === data.value) !== undefined}
                                           onChange={handleChangeChecked}/>
                        })
                      }
                    </EventSet>
                    {validation.eventTypeMessage !== '' &&
                      <ValidationScript>{validation.eventTypeMessage}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
                <ColSpan1/>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span2>이벤트 단가</Span2></ColTitle>
                  <CostManageContainer>
                    {eventTypeState.map((eventState, index) => {
                      return (<div key={index}>
                        <ColTitle>{eventState.label}</ColTitle>
                          <div>
                            <Input type={'number'}
                                   maxLength={3}
                                   placeholder={'가중치 입력해주세요'}
                                   id={eventState.value}
                                   disabled={mediaInfoState.allowEvents.find(allowEvent => allowEvent.eventType.value === eventState.value) === undefined}
                                   value={mediaInfoState.allowEvents.find(allowEvent => allowEvent.eventType.value === eventState.value) ? mediaInfoState.allowEvents.find(allowEvent => allowEvent.eventType.value === eventState.value).exposureWeight:0}
                                   onChange={(e) => handleAllowEvents(e)}
                                   onInput={(e) => {
                                     if (e.target.value.length > e.target.maxLength)
                                       e.target.value = e.target.value.slice(0, e.target.maxLength);
                                   }}
                            />
                          </div>
                        </div>)
                    })}
                  </CostManageContainer>
                </ColSpan3>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          {/*매체 정산 정보*/}
          <Board>
            <BoardHeader>매체 정산 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan style={{marginTop: 0, width: '100%', alignItems: 'center'}}>
                <ColSpan2>
                  <ColTitle style={{textAlign: 'right'}}><span>시작 날짜</span></ColTitle>
                  <div style={{position: "relative"}}>
                    <DateContainer>
                      <CalendarBox>
                        <CalendarIcon/>
                      </CalendarBox>
                      <CustomDatePicker
                        showIcon
                        selected={new Date(mediaInfoState.contractStartDate)}
                        onChange={(date) => handleContractDate(date)}
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        isClearable={false}
                      />
                    </DateContainer>
                  </div>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan1>
                  <ColTitle><span>정산 유형</span></ColTitle>
                  <div style={{position: "relative"}}>
                    <Select options={calculationAllTypeState.filter(data => data.id !== 0)}
                            styles={inputStyle}
                            components={{IndicatorSeparator: () => null}}
                            value={calculationAllType.find(data => data.value === mediaInfoState.calculationType)}
                            onChange={handleCalculationType}
                    />
                  </div>
                </ColSpan1>
                <ColSpan1>
                  <ColTitle><span>정산 금액</span></ColTitle>
                  <div style={{position: "relative"}}>
                    <Input type={'number'}
                           min={0}
                           placeholder={'단위별 금액 입력'}
                           value={mediaInfoState.calculationValue}
                           onChange={(e) => handleCalculationValue(e)}

                    />
                    {errors.calculationValue &&
                      <ValidationScript>{errors.calculationValue?.message}</ValidationScript>}
                  </div>
                </ColSpan1>
                <ColSpan2 style={{textAlign: 'right'}}>
                  <ColTitle><span>비고</span></ColTitle>
                  <div>
                    <Input type={'text'}
                           placeholder={'비고'}
                           value={mediaInfoState.calculationEtc != null ? mediaInfoState.calculationEtc : ''}
                           onChange={(e) => handleCalculationEtc(e)}
                    />
                  </div>
                </ColSpan2>
              </RowSpan>
            </BoardSearchDetail>
          </Board>

          {/*추가 정보 입력*/}
          <Board>
            <BoardHeader>추가 정보 입력</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>광고 미송출 대체 설정</Span4></ColTitle>
                  <RelativeDiv>
                    <input type={'radio'}
                           checked={mediaInfoState.noExposedConfigType === 'DEFAULT_BANNER_IMAGE'}
                           id={'defaultImage'}
                           name={'substitute'}
                           onChange={() => handleNoExposedConfigType('DEFAULT_BANNER_IMAGE')}
                    />
                    <label>대체 이미지</label>
                    <input type={'radio'}
                           checked={mediaInfoState.noExposedConfigType === 'JSON'}
                           id={'jsonData'}
                           name={'substitute'}
                           onChange={() => handleNoExposedConfigType('JSON')}
                    />
                    <label >JSON DATA</label>
                    <input type={'radio'}
                           checked={mediaInfoState.noExposedConfigType === 'URL'}
                           id={'URL'}
                           name={'substitute'}
                           onChange={() => handleNoExposedConfigType('URL')}
                    />
                    <label >URL</label>
                    <input type={'radio'}
                           checked={mediaInfoState.noExposedConfigType === 'SCRIPT'}
                           id={'script'}
                           name={'substitute'}
                           onChange={() => handleNoExposedConfigType('SCRIPT')}
                    />
                    <label >script</label>
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan4>
                  <ColTitle><Span4></Span4></ColTitle>
                  <RelativeDiv>
                    {showNoExposedConfigValue &&
                      <Textarea rows={5}
                                placeholder={'미송출시 대체 광고 정보를 입력하세요'}
                                value={mediaInfoState.noExposedConfigValue}
                                onChange={(e) => handleNoExposedConfigValue(e)}
                      />
                    }
                  </RelativeDiv>
                </ColSpan4>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          <SubmitContainer>
            <CancelButton onClick={() => navigate('/board/media2')}>취소</CancelButton>
            <SubmitButton type={'submit'}>정보 수정</SubmitButton>
          </SubmitContainer>
        </BoardContainer>
      </form>
    </main>
  )
}

export default MediaListDetail

const EventSet = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 5px;
`

const CostManageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-radius: 5px;
  background-color: #f9fafb;

  & div {
    display: flex;
    align-items: center;
    
  }
  & div:last-child {
    width: auto;
  }

  & input {
    min-width: 150px;
    color: #f5811f;
  }
`
const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  line-height: 18px;
  color: #a2aab2;
  font-weight: 300;
`
