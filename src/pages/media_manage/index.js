import styled from "styled-components";
import Navigator from "../../components/common/Navigator";
import Checkbox from "../../components/common/Checkbox";
import {useEffect, useState} from "react";
import ko from 'date-fns/locale/ko';
import "react-datepicker/dist/react-datepicker.css";
import {BoardBody, ListHead, ListBody} from "../../components/layout";
import {atom, useAtom, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {AdSample, VerticalRule} from "../../components/common/Common";
import {
  adPreviewSize,
  calculationAllType, exposedLimitType, inventoryType,
  mediaResistInfo, productTypeInfo,
} from "./entity";
import Select from "react-select";
import {
  Board,
  BoardContainer, BoardHeader,
  CalendarBox, CalendarIcon, CancelButton,
  ColSpan1,
  ColSpan2,
  ColTitle, CustomDatePicker,
  DateContainer,
  RowSpan, SubmitButton, SubmitContainer, TitleContainer, ValidationScript
} from "../../assets/GlobalStyles";
import {inputStyle} from "../../assets/GlobalStyles";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
  bannerCategoryOneDepthList, bannerCategoryTwoDepthList,
  bannerSizeList,
  createInventory, eventTypeList, inventoryTypeList
} from "../../services/InventoryAxios";
import {SearchUser} from "../../components/common/SearchUser";

const MediaResistAtom = atom(mediaResistInfo)

function MediaInfo(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [mediaCategoryOneDepthState, setMediaCategoryOneDepthState] = useState([])
  const [mediaCategoryTwoDepthState, setMediaCategoryTwoDepthState] = useState([])
  const [, setDeviceType] = useState('PC')
  const [, setModal] = useAtom(modalController)
  const [checked, setChecked] = useState({
    WEB: false,
    WEB_APP: false,
    MOBILE_WEB: false,
    MOBILE_NATIVE_APP: false
  })
  const {register, controls, setValue, setError, errors} = props

  useEffect(()=>{
    bannerCategoryOneDepthList().then(response =>
      setMediaCategoryOneDepthState(response)
    )
  },[])

  useEffect(()=>{
    if(mediaResistState.category1.value !== ''){
      bannerCategoryTwoDepthList(mediaResistState.category1.value).then(response =>
          setMediaCategoryTwoDepthState(response)
      )
    }
  },[mediaResistState.category1])


  /**
   * 모달안에 선택완료 선택시
   */
  const handleMediaSearchSelected = (item) => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    setMediaResistState({
      ...mediaResistState,
      siteName: item.siteName
    })
    setValue('userId', item.id)
    setValue('siteName', item.siteName);
    setError('siteName','')
  }

  /**
   * 지면명 입력
   * @param event
   */
  const handleInventoryName = (event) => {
    setMediaResistState({
      ...mediaResistState,
      inventoryName: event.target.value
    })
  }

  /**
   * 카테고리 1Depth 선택
   * @param category1
   */
  const handleMediaCategoryOneDepth = (category1) => {
    setMediaResistState({
      ...mediaResistState,
      category1: category1
    })
    setValue('category1', category1.value);
    setError('category1','')
  }

  /**
   * 카테고리 2Depth 선택
   * @param category1
   */
  const handleMediaCategoryTwoDepth = (category2) => {
    setMediaResistState({
      ...mediaResistState,
      category2: category2
    })
    setValue('category2', category2.value);
  }

  /**
   * 디바이스 선택
   * @param deviceType
   */
  const handleDeviceType = (deviceType) => {
    setMediaResistState({
      ...mediaResistState,
      deviceType: deviceType
    })
    setDeviceType(deviceType)
    setValue('deviceType', deviceType)
  }

  /**
   * 에이전트 유형 선택
   * @param agentType
   */
  const handleAgentType = (event) => {

    switch (event.target.id) {
      case 'WEB' : setChecked({...checked, WEB: event.target.checked});break;
      case 'WEB_APP' : setChecked({...checked, WEB_APP: event.target.checked});break;
      case 'MOBILE_WEB' : setChecked({...checked, MOBILE_WEB: event.target.checked});break;
      case 'MOBILE_NATIVE_APP' : setChecked({...checked, MOBILE_NATIVE_APP: event.target.checked});break;
      default : return null
    }

    if(event.target.checked){
      setMediaResistState({
        ...mediaResistState,
        agentTypes: mediaResistState.agentTypes.concat(event.target.id)
      })
      setValue('agentTypes', mediaResistState.agentTypes.concat(event.target.id))
    }else{
      setMediaResistState({
        ...mediaResistState,
        agentTypes: mediaResistState.agentTypes.filter(value => value !== event.target.id)
      })
      setValue('agentTypes', mediaResistState.agentTypes.filter(value => value !== event.target.id))
    }

  }
  /**
   * 지면 URL 입력
   * @param event
   */
  const handleMediaUrl = (event) => {
    setMediaResistState({
      ...mediaResistState,
      mediaUrl: event.target.value
    })
  }

  /**
   * 지면 상세 설명
   * @param event
   */
  const handleDescription = (event) => {
    setMediaResistState({
      ...mediaResistState,
      description: event.target.value
    })
  }

  return (
    <BoardBody>
      <li>
        <ListHead>매체 검색</ListHead>
        <ListBody>
          <input type={'text'}
                 defaultValue={mediaResistState.siteName}
                 placeholder={"매체 검색 버튼을 눌러주세요"}
                 readOnly={true}
                 {...register('siteName',{
                   required: "매체명을 선택해주세요"
                 })}
          />
          <SearchUser title={'매체 검색'} onSubmit={handleMediaSearchSelected}/>
          {errors.siteName && <ValidationScript>{errors.siteName?.message}</ValidationScript>}
        </ListBody>
      </li>

      <li>
        <ListHead>지면명</ListHead>
        <ListBody>
          <InputWiden type={'text'}
                      placeholder={'지면명을 입력해주세요.'}
                      defaultValue={mediaResistState.inventoryName || ""}
                      onChange={e => handleInventoryName(e)}
                      {...register("inventoryName", {
                        required: "지면명을 입력해주세요"
                      })}
          />
          {errors.inventoryName && <ValidationScript>{errors.inventoryName?.message}</ValidationScript>}
        </ListBody>
      </li>
      <li>
        <ListHead>지면 상세 설명</ListHead>
        <ListBody>
          <Textarea rows={5}
                    placeholder={'지면 상세 정보(최소 20자)'}
                    value={mediaResistState.description || ''}
                    onChange={(e) => handleDescription(e)}
          />
          {errors.description && <ValidationScript>{errors.description?.message}</ValidationScript>}
        </ListBody>
      </li>
      <li>
        <ListHead>지면 카테고리</ListHead>
        <ListBody>
          <Controller
            name="category1"
            control={controls}
            rules={{
              required: {
                value: mediaResistState.category1.value === "",
                message: "카테고리를 선택해주세요"
              }
            }}
            render={({ field }) =>(
            <Select options={mediaCategoryOneDepthState}
                    placeholder={'선택하세요'}
                    {...field}
                    value={(mediaResistState.category1 !== undefined && mediaResistState.category1.value !== '') ? mediaResistState.category1 : ''}
                    onChange={handleMediaCategoryOneDepth}
                    styles={{
                      input: (baseStyles, state) => (
                        {
                          ...baseStyles,
                          minWidth: "300px",
                        })
                    }}
            />
            )}
          />
          <Controller
              name="category2"
              control={controls}
              render={({ field }) =>(
                  <Select options={mediaCategoryTwoDepthState}
                          placeholder={'선택하세요'}
                          {...field}
                          value={(mediaResistState.category2 !== undefined && mediaResistState.category2.value !== '') ? mediaResistState.category2 : ''}
                          onChange={handleMediaCategoryTwoDepth}
                          styles={{
                            input: (baseStyles, state) => (
                                {
                                  ...baseStyles,
                                  minWidth: "300px",
                                })
                          }}
                  />
              )}
          />
          {errors.category1 && <ValidationScript>{errors.category1?.message}</ValidationScript>}
        </ListBody>
      </li>
      <li>
        <ListHead>디바이스 유형</ListHead>
        <ListBody>
          <CustomRadio type={'radio'}
                       id={'pc'}
                       name={'device-type'}
                       onChange={() => handleDeviceType('PC')}
          />
          <label htmlFor={'pc'}>PC</label>
          <CustomRadio type={'radio'}
                       id={'mobile'}
                       name={'device-type'}
                       onChange={() => handleDeviceType('MOBILE')}
          />
          <label htmlFor={'mobile'}>MOBILE</label>
          <CustomRadio type={'radio'}
                       id={'responsive_web'}
                       name={'device-type'}
                       onChange={() => handleDeviceType('RESPONSIVE_WEB')}
          />
          <label htmlFor={'responsive_web'}>반응형 웹</label>
        </ListBody>
      </li>
      <li>
        <ListHead>에이전트 유형</ListHead>
        <ListBody>
          <EventSet>
            <Controller name={'agentChecked'}
                        control={controls}
                        render={({field}) =>
                            <Checkbox {...field} label={'PC 웹'} type={'c'} id={'WEB'} isChecked={checked.WEB}
                                      onChange={handleAgentType} inputRef={field.ref}/>}/>

            <Controller name={'agentChecked'}
                        control={controls}
                        render={({field}) =>
                            <Checkbox label={'PC 어플리케이션'} type={'c'} id={'WEB_APP'} isChecked={checked.WEB_APP}
                                      onChange={handleAgentType} inputRef={field.ref}/>}/>
            <Controller name={'agentChecked'}
                        control={controls}
                        render={({field}) =>
                            <Checkbox label={'모바일 웹'} type={'c'} id={'MOBILE_WEB'} isChecked={checked.MOBILE_WEB}
                                      onChange={handleAgentType} inputRef={field.ref}/>}/>
            <Controller name={'agentChecked'}
                        control={controls}
                        render={({field}) =>
                            <Checkbox label={'모바일 어플리케이션'} type={'c'} id={'MOBILE_NATIVE_APP'} isChecked={checked.MOBILE_NATIVE_APP}
                                      onChange={handleAgentType} inputRef={field.ref}/>}/>
          </EventSet>
        </ListBody>
      </li>
      <li>
        <ListHead>지면 url</ListHead>
        <ListBody>
          <InputWiden type={'text'}
                      placeholder={'https://'}
                      defaultValue={mediaResistState.mediaUrl || ""}
                      onChange={e => handleMediaUrl(e)}
                      {...register("mediaUrl", {
                        required: "사이트 URL 입력해주세요",
                        pattern:{
                          value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                          message: "http(s)://가 포함된 url 주소를 확인해주세요"
                        }
                      })}
          />
          {errors.mediaUrl && <ValidationScript>{errors.mediaUrl?.message}</ValidationScript>}
        </ListBody>
      </li>
    </BoardBody>
  )
}

const bannerSize = atom([])

function PreviewBanner() {
  const [size] = useAtom(bannerSize)
  return (
    <div style={size.length !== 0 ? {width: parseInt(size[0]), height: parseInt(size[1])} : null}></div>
  )
}
function AdProductInfo(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [adPreviewSizeInfo, setAdPreviewSizeInfo] = useState(adPreviewSize)
  const [selectBannerSizeName, setSelectBannerSizeName] = useState('')
  const [adType, setAdType] = useState('BANNER')
  const setPreviewBannerSize = useSetAtom(bannerSize)
  const setModal = useSetAtom(modalController)
  const [inventoryTypeState, setInventoryTypeState] = useState(inventoryType)
  const [eventTypeState, setEventTypeState] = useState([])
  const [exposedMinuteLimit] = useState(exposedLimitType)

  const {controls, errors, setValue, setError} = props
  useEffect(()=>{

    bannerSizeList().then(response =>
        setAdPreviewSizeInfo(response)
    )
    inventoryTypeList().then(response =>
        setInventoryTypeState(response)
    )
    eventTypeList().then(response =>
        setEventTypeState(response)
    )
  },[])


  /**
   * 이벤트 유형 전체선택
   * @param event
   */
  const handleChangeSelectAll = (event) => {
    if (event.target.checked) {
      setMediaResistState({
        ...mediaResistState,
        allowEvents: eventTypeState
      })
      setValue("allowEvents", eventTypeState.map(eventState => {return {eventType: eventState.value, exposureWeight:100}}))
      setError("eventChecked",false)
    }else{
      setMediaResistState({
        ...mediaResistState,
        allowEvents: []
      })
      setValue("allowEvents", [])
      setError("eventChecked",{ type: 'required', message: '하나 이상의 이벤트를 체크해주세요' })
    }

  }
  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크가 true일때
    if (event.target.checked) {
      setMediaResistState({
        ...mediaResistState,
        allowEvents: [...mediaResistState.allowEvents.concat(eventTypeState.find(eventType => eventType.value === event.target.id))]
      })
      setError("eventChecked",false)
      setValue("allowEvents", mediaResistState.allowEvents.map(allowEvent => {return {eventType: allowEvent.value, exposureWeight:100}}).concat({eventType: event.target.id, exposureWeight:100}))
    } else {
      //기존이 전체선택이 아닌경우
      setMediaResistState({
        ...mediaResistState,
        allowEvents: [...mediaResistState.allowEvents.filter(allowEvent => allowEvent.value !== event.target.id)]
      })

      if(mediaResistState.allowEvents.length < 2) setError("eventChecked",{ type: 'required', message: '하나 이상의 이벤트를 체크해주세요' })
      setValue("allowEvents", mediaResistState.allowEvents.map(allowEvent => {return {eventType: allowEvent.value, exposureWeight:100}}).filter(value => value.eventType !== event.target.id))
    }
  }

  /**
   * 광고유형가이드 선택
   */
  const handleModalAdTypeGuide = () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => componentModalAdTypeGuide()
    })
  }

  const componentModalAdTypeGuide = () => {
    return (
      <div>
        <ModalHeader title={'광고 유형 가이드'}/>
        <ModalBody>
          <GuideContainer>
            <GuideHeader>배너 광고란?</GuideHeader>
            <GuideSubject>배너 광고 안내 내용</GuideSubject>
            <GuideBody>
              <div>
                <AdSample/>
                <p>광고 예시</p>
              </div>
            </GuideBody>
          </GuideContainer>
          <VerticalRule style={{margin: '20px 0'}}/>
          <GuideContainer>
            <GuideHeader>아이커버 광고란?</GuideHeader>
            <GuideSubject>아이커버 안내 내용</GuideSubject>
            <GuideBody>
              <div>
                <AdSample/>
                <p>광고 예시</p>
              </div>
            </GuideBody>
          </GuideContainer>
        </ModalBody>
      </div>
    )
  }

  /**
   * 모달 지면 선택 핸들링
   * @param item
   */
  const handleSelectPreviewBanner = (item) => {
    setPreviewBannerSize(item.value.replace('IMG', '').split('_'))
    setSelectBannerSizeName(item.key)
  }

  /**
   * 지면 미리보기 모달
   */
  const handleModalPreview = () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => componentModalPreview()
    })
  }

  const componentModalPreview = () => {
    return (
      <div>
        <ModalHeader title={'지면 미리보기'}/>
        <ModalBody>
          <PreviewTab>
            {adPreviewSizeInfo !== null && adPreviewSizeInfo.map((item, key) => {
              return (
                <div key={key} id={item.key}
                     onClick={() => handleSelectPreviewBanner(item)}
                     style={selectBannerSizeName === item.key ? {border: "1px solid #f5811f", color: "#f5811f"} : null}
                >{item.label}</div>
              )
            })}
          </PreviewTab>
          <PreviewBody>
            <PreviewBanner/>
          </PreviewBody>
        </ModalBody>
        <ModalFooter>
          <PreviewSubmit onClick={() => setModal({isShow: false, modalComponent: null})}>확인</PreviewSubmit>
        </ModalFooter>
      </div>
    )
  }

  /**
   * 지면사이즈 선택 핸들링
   * @param event
   */
  const handleSelectBanner = (event) => {

    setMediaResistState({
      ...mediaResistState,
      bannerSize: event.target.dataset.value
    })
    if (event.target.dataset.name === undefined) {
      setSelectBannerSizeName(event.target.parentElement.dataset.name)
      setValue('bannerSize', event.target.parentElement.dataset.value)
      adPreviewSizeInfo.filter((item) => {
        if (item.key === event.target.parentElement.dataset.name) {
          setPreviewBannerSize(item.value.replace('IMG', '').split('_'))
        }
        return null
      })
    } else {
      setSelectBannerSizeName(event.target.dataset.name)
      adPreviewSizeInfo.filter((item)  => {
        if (item.key === event.target.dataset.name) {
          setPreviewBannerSize(item.value.replace('IMG', '').split('_'))
        }
      })
      setValue('bannerSize', event.target.dataset.value)
    }
  }

  const selectBannerHover = {
    border: '1px solid #f5811f'
  }

  // useEffect(() => {
  //   if (modal.isShow) {
  //     handleModalPreview()
  //   }
  // }, [selectBannerSizeName,modal.isShow,handleModalPreview]);

  /**
   * 광고 상품 선택
   * @param inventoryType
   */
  const handleProductType = (event) => {

    setMediaResistState({
      ...mediaResistState,
      productType: event.target.id
    })
     setAdType(event.target.id);
     setValue('productType',event.target.id);
  }

  /**
   * 지면 유형 선택
   * @param inventoryType
   */
  const handleInventoryType = (inventoryType) => {
    setMediaResistState({
      ...mediaResistState,
      inventoryType: inventoryType
    })
    setValue('inventoryType', inventoryType.value)
  }
  /**
   * 지면 노출 간격 선택(팝언더만 해당)
   * @param exposedMinuteLimit
   */
  const handleExposeMinuteLimit = (exposedMinuteLimit) => {
    setMediaResistState({
      ...mediaResistState,
      exposedMinuteLimit: exposedMinuteLimit
    })
    setValue('exposedMinuteLimit', exposedMinuteLimit.value)
  }


  return (
    <BoardBody>
      <li>
        <ListHead>광고 상품</ListHead>
        <ListBody>
          <ProductSet>
            {productTypeInfo.map((data,index) => {
              return index != 0 &&
                  (<div key={index}>
                    <input type={'radio'} id={data.value} name={'product'}  onChange={handleProductType}/>
                    <label htmlFor={data.label}>{data.label}</label>
                  </div>)
            })}
          </ProductSet>

          <GuideButton type={'button'} onClick={handleModalAdTypeGuide}>광고 유형 가이드</GuideButton>
        </ListBody>
      </li>
      <li>
        <ListHead>이벤트 설정</ListHead>
        <ListBody>
          <EventSet>
            <Controller name={'eventChecked'}
                        control={controls}
                        render={({field}) =>
                          <Checkbox {...field} label={'전체'} type={'c'} id={'ALL'} isChecked={eventTypeState != null && (mediaResistState.allowEvents.length === eventTypeState.length)}
                                    onChange={handleChangeSelectAll} inputRef={field.ref}/>}/>

            {
              eventTypeState != null && eventTypeState.map((data, key)=>{
                  return <Controller name={'eventChecked'}
                                     control={controls}
                                     key={key}
                                     render={({field}) =>
                                         <Checkbox label={data.label} type={'c'} id={data.value} isChecked={mediaResistState.allowEvents.some(event => event.value == data.value)}
                                                   onChange={handleChangeChecked} inputRef={field.ref}/>}/>
              })
            }
          </EventSet>
          {errors.eventChecked && <ValidationScript>{errors.eventChecked?.message}</ValidationScript>}
        </ListBody>
      </li>
      <li>
        <ListHead>지면 유형</ListHead>
        <ListBody>
          <Select options={mediaResistState.productType.value !== '' ? inventoryTypeState.filter(value => (value.productType.value === mediaResistState.productType)) : inventoryTypeState}
                  placeholder={'선택하세요'}
                  value={(mediaResistState.inventoryType !== undefined && mediaResistState.inventoryType.value !== '') ? mediaResistState.inventoryType : ''}
                  onChange={handleInventoryType}
                  styles={{
                    input: (baseStyles, state) => (
                      {
                        ...baseStyles,
                        minWidth: "300px",
                      })
                  }}
          />
          {errors.inventoryType && <ValidationScript>{errors.inventoryType?.message}</ValidationScript>}
        </ListBody>
      </li>
      {adType === 'BANNER' ?
        <li>
          <ListHead>지면 사이즈</ListHead>
          <ListBody>
            <SelectBanner>
              {adPreviewSizeInfo !== null && adPreviewSizeInfo.map((item, key) => {
                return (
                  <div key={key} data-name={item.key} onClick={handleSelectBanner}
                       style={selectBannerSizeName === item.key ? selectBannerHover : null} data-value={item.value}>
                    <Box style={{
                      width: `${item.value.replace('IMG', '').split('_')[0] / 6}px`,
                      height: `${item.value.replace('IMG', '').split('[ _ | IMG]')[1] / 6}px`
                    }}/>
                    <div>{item.label}</div>
                    {selectBannerSizeName === item.key &&
                      <Preview onClick={() => handleModalPreview()}>지면미리보기</Preview>
                    }
                  </div>
                )
              })}
            </SelectBanner>

            {errors.bannerSize && <ValidationScript>{errors.bannerSize?.message}</ValidationScript>}
          </ListBody>
        </li>
          :
        <li>
          <ListHead>노출 간격</ListHead>
          <ListBody>
            <Select options={exposedMinuteLimit}
                    placeholder={'선택하세요'}
                    value={(mediaResistState.exposedMinuteLimit !== undefined && mediaResistState.exposedMinuteLimit !== '') ? mediaResistState.exposedMinuteLimit : '0'}
                    onChange={handleExposeMinuteLimit}
                    styles={{
                      input: (baseStyles, state) => (
                        {
                          ...baseStyles,
                          minWidth: "300px",
                        })
                    }}
            />
          </ListBody>
        </li>
      }
    </BoardBody>
  )
}

function MediaAccount(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [calculationAllTypeState] = useState(calculationAllType)
  const {register, controls, setValue,setError, errors} = props

  /**
   * 정산방식 선택날짜
   * @param date
   */
  const handleContractDate = (date) => {
    setMediaResistState({
      ...mediaResistState,
      contractStartDate: date
    })
    setValue('contractStartDate', date)
    setValue('contractEndDate', date)
  }
  /**
   * 정산방식 선택
   * @param calculationType
   */
  const handleCalculationType = (calculationType) => {
    setMediaResistState({
      ...mediaResistState,
      calculationType: calculationType
    })
    setValue('calculationType',calculationType.value)
    setError('calculationType','')
  }
  /**
   * 정산방식 값 입력
   * @param calculationValue
   */
  const handlecalculationValue = (event) => {
    setMediaResistState({
      ...mediaResistState,
      calculationValue: event.target.value
    })
  }
  /**
   * 비고 입력
   * @param event
   */
  const handleCalculationEtc = (event) => {
    setMediaResistState({
      ...mediaResistState,
      calculationEtc: event.target.value
    })
  }

  return (
    <BoardBody>
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
                  selected={mediaResistState.contractStartDate}
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
              <Controller
                name="calculationType"
                control={controls}
                rules={{
                  required: {
                    value: mediaResistState.calculationType.value === "",
                    message: "정산 유형을 선택해주세요"
                  }
                }}
                render={({ field }) =>(
                  <Select options={calculationAllTypeState.filter((data,index) => index !== 0)}
                          placeholder={'선택하세요'}
                          styles={inputStyle}
                          {...field}
                          components={{IndicatorSeparator: () => null}}
                          value={(mediaResistState.calculationType !== undefined && mediaResistState.calculationType.value !== '') ? mediaResistState.calculationType : ''}
                          onChange={handleCalculationType}
                        />
                )}
              />
              {errors.calculationType && <ValidationScript>{errors.calculationType?.message}</ValidationScript>}
            </div>
          </ColSpan1>
          <ColSpan1>
            <ColTitle><span>정산 금액</span></ColTitle>
            <div style={{position: "relative"}}>
              <Input type={'text'}
                     placeholder={'단위별 금액 입력'}
                     defaultValue={mediaResistState.calculationValue}
                     onChange={(e) => handlecalculationValue(e)}
                     {...register("calculationValue", {
                       required: "정산 금액을 입력해주세요,",
                       pattern:{
                         value:  /^[0-9]+$/,
                         message: "숫자만 입력 가능합니다."
                       }
                     })}
              />
              {errors.calculationValue && <ValidationScript>{errors.calculationValue?.message}</ValidationScript>}
            </div>
          </ColSpan1>
          <ColSpan2 style={{textAlign: 'right'}}>
            <ColTitle><span>비고</span></ColTitle>
            <div>
              <Input type={'text'}
                     placeholder={'비고'}
                     value={mediaResistState.calculationEtc}
                     onChange={(e) => handleCalculationEtc(e)}
              />
            </div>
          </ColSpan2>
        </RowSpan>
    </BoardBody>
  )
}

function AddInfo(props) {
  const [mediaResistState, setMediaResistState] = useAtom(MediaResistAtom)
  const [shownoExposedConfigValue, setShownoExposedConfigValue] = useState(true)
  const {setValue} = props
  /**
   * 미송출시 타입 선택
   * @param noExposedConfigType
   */
  const handleNoExposedConfigType = (noExposedConfigType) => {
    if (noExposedConfigType === "DEFAULT_BANNER_IMAGE") {
      setShownoExposedConfigValue(false)
    } else {
      setShownoExposedConfigValue(true)
    }
    setMediaResistState({
      ...mediaResistState,
      noExposedConfigType: noExposedConfigType
    })
    setValue('noExposedConfigType', noExposedConfigType)
  }

  /**
   * 미송출시 데이터 입력
   * @param event
   */
  const handlenoExposedConfigValue = (event) => {
    setMediaResistState({
      ...mediaResistState,
      noExposedConfigValue: event.target.value
    })
    setValue('noExposedConfigValue', event.target.value)
  }
  return (
    <BoardBody>
      <li>
        <ListHead>광고 미송출 대체 설정</ListHead>
        <ListBody>
          <input type={'radio'}
                 id={'defaultImage'}
                 name={'substitute'}
                 onChange={() => handleNoExposedConfigType('DEFAULT_BANNER_IMAGE')}
          />
          <label htmlFor={'defaultImage'}>대체 이미지</label>
          <input type={'radio'}
                 id={'jsonData'}
                 name={'substitute'}
                 onChange={() => handleNoExposedConfigType('JSON')}
          />
          <label htmlFor={'jsonData'}>JSON DATA</label>
          <input type={'radio'}
                 id={'URL'}
                 name={'substitute'}
                 onChange={() => handleNoExposedConfigType('URL')}
          />
          <label htmlFor={'URL'}>URL</label>
          <input type={'radio'}
                 id={'script'}
                 name={'substitute'}
                 onChange={() => handleNoExposedConfigType('SCRIPT')}
          />
          <label htmlFor={'script'}>script</label>
        </ListBody>
      </li>
      <li>
        <ListHead></ListHead>
        <ListBody>
          {shownoExposedConfigValue &&
            <Textarea rows={5}
                      placeholder={'미송출시 대체 광고 정보를 입력하세요'}
                      value={mediaResistState.noExposedConfigValue}
                      onChange={(e) => handlenoExposedConfigValue(e)}
            />
          }
        </ListBody>
      </li>
    </BoardBody>
  )
}

function MediaManage() {
  const [,setModal] = useAtom(modalController)

  const handleModalRegistration = () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return (
          <div>
            <ModalHeader title={'지면 스크립트 발급 안내'}/>
            <ModalBody>
              <ScriptSubject>
                <div>지면 등록이 완료되었습니다.<br/>
                  하단 발급된 광고 스크립트를 스크립트 삽인 가이드를 참고하여 표출할 광고 콘텐츠 HTML 영역에 삽입해주세요.
                </div>
                <div>※ 발급된 스크립트 정보는 지면 관리에서 확인 가능합니다.</div>
              </ScriptSubject>
              <GuideContainer>
                <GuideHeader>스크립트 표출</GuideHeader>
                <GuideBody>
                  <pre>스트립트 표출 영역</pre>
                </GuideBody>
              </GuideContainer>
              <VerticalRule style={{margin: "20px 0"}}/>
              <GuideContainer>
                <GuideHeader>지면 스크립트 삽입 가이드</GuideHeader>
                <GuideBody>
                  <pre>지면 스크립트 삽입 가이드</pre>
                </GuideBody>
              </GuideContainer>
            </ModalBody>
            <ModalFooter>
              <PreviewSubmit onClick={() => {
                setModal({isShow: false})
                alert('지면이 생성되었습니다.')
                navigate('/board/media2')
              }
              }>확인</PreviewSubmit>
            </ModalFooter>
          </div>
        )
      }
    })
  }
  const { register, handleSubmit, control, setValue, setError, formState: { errors } } = useForm();
  const onError = (error) => console.log(error)
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const now = new Date();
    if(data.contractStartDate === undefined) data.contractStartDate = now;
    if(data.contractEndDate === undefined) data.contractEndDate = new Date(now.setMonth(now.getMonth()+1));
    console.log('createInventory :', data);
    createInventory(data).then((response) => {
      if(response !== null) {
        handleModalRegistration()
      }
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
          <Board>
            <BoardHeader>지면 정보</BoardHeader>
            <MediaInfo register={register} controls={control} setValue={setValue}  setError={setError} errors={errors}/>
          </Board>
          <Board>
            <BoardHeader>광고 상품 정보</BoardHeader>
            <AdProductInfo register={register} controls={control} setValue={setValue} setError={setError} errors={errors}/>
          </Board>
          <Board>
            <BoardHeader>매체 정산 정보</BoardHeader>
            <MediaAccount register={register} controls={control} setValue={setValue} setError={setError} errors={errors}/>
          </Board>
          <Board>
            <BoardHeader>추가 정보 입력(선택)</BoardHeader>
            <AddInfo register={register} setValue={setValue} errors={errors}/>
          </Board>
          <SubmitContainer>
            <CancelButton onClick={() => navigate('/board/media2')}>취소</CancelButton>
            <SubmitButton type={'submit'}>지면 등록</SubmitButton>
          </SubmitContainer>
        </BoardContainer>
      </form>
    </main>
  )
}

export default MediaManage

const InputWiden = styled('input')`
  margin-right: 15px;
  padding: 0 20px;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  vertical-align: bottom;
  outline: none;
  &:read-only {
    background-color: #f9fafb;
  }
`

const CustomRadio = styled.input`
  display: none;

  &[type='radio'] + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    color: #222;
    cursor: pointer;
  }

  &[type='radio']:checked + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background-color: #f5811f;
    color: #fff;
  }
`

const EventSet = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 5px;
`
const ProductSet = styled.div`
  display: flex;
  margin-right: 10px;
  & > div {
    margin-right: 10px;
    align-items: center;
    display: flex;
  }
  & div > input[type='radio'] {
    margin: 0 15px 0 0px;
  }
`

const SelectBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 5px;

  & > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 248px;
    height: 120px;
    border-radius: 2px;
    background-color: #f9f9f9;
    color: #777;
    font-size: 14px;
  }
`

const Box = styled.div`
  background-color: #ddd;
`

const Preview = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 33px;
  background-color: #f5811f;
  color: #fff;
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

const GuideButton = styled.button`
  margin-left: auto;
  padding: 15px 27px;
  border: 1px solid #ddd;
  background-color: #fff;
  transition-duration: 0.5s;

  &:hover {
    color: #f5811f
  }
`

const GuideContainer = styled.div`
  border: 1px solid #e5e5e5;
`
const GuideHeader = styled.div`
  padding: 18px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e5e5e5;
  color: #f5811f;
  font-size: 16px;
`
const GuideSubject = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 14px;
`
const GuideBody = styled.div`
  display: flex;
  padding: 20px;
`

const PreviewTab = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;

  & div {
    padding: 14px 29px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      border: 1px solid #f5811f;
      color: #f5811f
    }
  }
`

const PreviewBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  padding: 20px;
  min-height: 160px;
  max-height: 360px;
  background-color: #eeeeee;
  border: 1px solid #e5e5e5;
  overflow: auto;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px dashed #f5811f;

    &:before {
      content: "실제 배너 표출 사이즈"
    }
  }
`

const PreviewSubmit = styled.button`
  padding: 18px 20px;
  width: 200px;
  background-color: #525252;
  color: #fff;
`

const ScriptSubject = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;

  & div:last-child {
    margin-top: 10px;
    font-size: 14px;
    color: #777;
  }
`

const Input = styled.input`
  padding: 0 20px;
  width: 100%;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 5px;
  &:read-only {
    background-color: #f9fafb;
  }
`