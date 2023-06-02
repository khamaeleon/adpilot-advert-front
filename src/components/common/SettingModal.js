import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalFooter} from "../modal/Modal";
import {
  CancelButton,
  ColSpan4,
  ColTitle,
  Edit,
  Input, InputLabel,
  RelativeDiv,
  RowSpan,
  Span2,
  SubmitButton,
  ValidationScript
} from "../../assets/GlobalStyles";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";
import {eventUnitPriceDetailDataAtom} from "../../pages/settings/entity/EventPrice";
import {eventBudgetDetailDataAtom} from "../../pages/settings/entity/BudgetEvent";
import {resistPriceEvent, selPriceEventList, updatePriceEvent} from "../../services/settings/EventPriceAxios";
import {resistBudgetEvent, selBudgetEventList, updateBudgetEvent} from "../../services/settings/BudgetEventAxios";
const maxValue = 1000000000
function SettingChangeModal(props) {
  const {data, saveType, label} = props
  const setModal = useSetAtom(modalController)
  const setEventBudgetDetailDataState = useSetAtom(eventBudgetDetailDataAtom)
  const setEventUnitPriceDetailDataState = useSetAtom(eventUnitPriceDetailDataAtom)
  const [calculatePercent, setCalculatePercent] = useState(100)
  const {state} = useLocation()
  const [dataState, setDataState] = useState(saveType !== 'create' ? data : {
    audience: '',
    cartRecommendation: '',
    id: '',
    groupName: '',
    productRecommendation: '',
    shopperMatching: '',
    userMatching: '',
    userOptimization: ''
  })
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: dataState
  })

  useEffect(() => {
    if(saveType ==='edit'){
      setDataState(data)
      reset({
        dataState
      })
    }
  }, [reset])
  const onError = (error) => console.log(error)
  /**
   * 그룹명
   * @param event
   */
  const handlePriceEventName = (event) => {
    setDataState({
      ...dataState,
      groupName: event.target.value
    })
  }
  useEffect(()=>{
    if(label === 'pct'){
      sumValue()
    }
  },[dataState])
  const sumValue = () => {
    let calc = parseInt(dataState.shopperMatching !== '' ? dataState.shopperMatching : 0)+
      parseInt(dataState.cartRecommendation !== '' ? dataState.cartRecommendation : 0)+
      parseInt(dataState.productRecommendation !== '' ? dataState.productRecommendation : 0)+
      parseInt(dataState.userMatching !== '' ? dataState.userMatching : 0)+
      parseInt(dataState.userOptimization !== '' ? dataState.userOptimization : 0)+
      parseInt(dataState.audience !== '' ? dataState.audience : 0)
    if(calc < 101) {
      setCalculatePercent(100 - calc)
    } else {
      toast.warning('모든 항목의 합은 100%를 넘을수 없습니다.')
    }
    if(dataState.shopperMatching > 100) {
      setDataState({
        ...dataState,
        shopperMatching: 0
      })
      toast.warning("100%를 넘을 수 없습니다.")
    }
    if(dataState.productRecommendation > 100) {
      setDataState({
        ...dataState,
        productRecommendation: 0
      })
      toast.warning("100%를 넘을 수 없습니다.")
    }
    if(dataState.cartRecommendation > 100){
      setDataState({
        ...dataState,
        cartRecommendation: 0
      })
      toast.warning("100%를 넘을 수 없습니다.")
    }
    if(dataState.userMatching > 100) {
      setDataState({
        ...dataState,
        userMatching: 0
      })
      toast.warning("100%를 넘을 수 없습니다.")
    }
    if(dataState.userOptimization > 100) {
      setDataState({
        ...dataState,
        userOptimization: 0
      })
      toast.warning("100%를 넘을 수 없습니다.")
    }
    if(dataState.audience > 100) {
      setDataState({
        ...dataState,
        audience: 0
      })
      toast.warning("100%를 넘을 수 없습니다.")
    }
  }
  /**
   * 쇼퍼 맞춤
   * @param event
   */
  const handleShopperMatching = (event) => {
    if(event.target.value < maxValue) {
      setDataState({
        ...dataState,
        shopperMatching: event.target.value
      })
    }
  }

  /**
   * 카트 추천
   * @param event
   */
  const handleCartRecommendation = (event) => {
    if(event.target.value < maxValue){
      setDataState({
        ...dataState,
        cartRecommendation: event.target.value
      })
    }
  }

  /**
   * 상품 추천
   * @param event
   */
  const handleProductRecommendation = (event) => {
    if(event.target.value < maxValue){
      setDataState({
        ...dataState,
        productRecommendation: event.target.value
      })
    }
  }

  /**
   * 유저 매치
   * @param event
   */
  const handleUserMatching = (event) => {
    if(event.target.value < maxValue){
      setDataState({
        ...dataState,
        userMatching: event.target.value
      })
    }
  }

  /**
   * 오디언스
   * @param event
   */
  const handleAudience = (event) => {
    if(event.target.value < maxValue){
      setDataState({
        ...dataState,
        audience: event.target.value
      })
    }
  }

  /**
   * 유저 최적화
   * @param event
   */
  const handleUserOptimization = (event) => {
    if(event.target.value < maxValue){
      setDataState({
        ...dataState,
        userOptimization: event.target.value
      })
    }
  }
  /**
   * 타겟팅 단가 수정 추가
   */
  const handlePriceEventSave = () => {
    if (saveType === 'create') {
      resistPriceEvent({...dataState, userId: state.id}).then(response => {
        if (response) {
          setModal({
            isShow: false,
            modalComponent: null
          })
          selPriceEventList(state.id).then(response => {
            setEventUnitPriceDetailDataState(response)
          })
        } else {
          toast.warning("타겟팅 단가 그룹명이 중복 되었습니다.")
        }
      })
    } else {
      updatePriceEvent({...dataState, userId: state.id}).then(response => {
        if (response) {
          setModal({
            isShow: false,
            modalComponent: null
          })
          selPriceEventList(state.id).then(response => {
            setEventUnitPriceDetailDataState(response)
          })
        } else {
          toast.warning("타겟팅 단가 그룹명이 중복 되었습니다.")
        }
      })
    }
  }

  const handleBudgetEventSave = () => {
    if (saveType === 'create') {
      resistBudgetEvent({...dataState, userId: state.id}).then(response => {
        if (response) {
          setModal({
            isShow: false,
            modalComponent: null
          })
          selBudgetEventList(state.id).then(response => {
            setEventBudgetDetailDataState(response)
          })
        } else {
          toast.warning("타겟팅 단가 그룹명이 중복 되었습니다.")
        }
      })
    } else {
      updateBudgetEvent({...dataState, userId: state.id}).then(response => {
        if (response) {
          setModal({
            isShow: false,
            modalComponent: null
          })
          selBudgetEventList(state.id).then(response => {
            setEventBudgetDetailDataState(response)
          })
        } else {
          toast.warning("타겟팅 단가 그룹명이 중복 되었습니다.")
        }
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(label === 'won' ? handlePriceEventSave : handleBudgetEventSave, onError)}>
        <ModalBody>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>그룹명</Span2></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'그룹명을 입력해주세요'}
                  {...register("groupName", {
                    required: "그룹명을 입력해주세요",
                    onChange: (e) => handlePriceEventName(e)
                  })}
                  value={dataState?.groupName}
                />
                {errors.groupName && <ValidationScript>{errors.groupName?.message}</ValidationScript>}
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          {label === 'pct' &&
            <RowSpan>
              <ColSpan4>
                <ColTitle><Span2>남은비율</Span2></ColTitle>
                <RelativeDiv>
                  {calculatePercent}/100
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
          }
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>쇼퍼 맞춤</Span2></ColTitle>
              <RelativeDiv>
                <InputLabel label={label !== 'won' ? '%': '원'}>
                  <Input
                    type={'text'}
                    min={0}
                    placeholder={'금액을 입력해주세요'}
                    {...register("shopperMatching", {
                      required: "금액을 입력해주세요",
                      pattern: /[0-9]*/,
                      onChange: (e) => handleShopperMatching(e)
                    })}
                    value={dataState?.shopperMatching}
                  />
                  {errors.shopperMatching && <ValidationScript>{errors.shopperMatching?.message}</ValidationScript>}
                </InputLabel>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>카트 추천</Span2></ColTitle>
              <RelativeDiv>
                <InputLabel label={label !== 'won' ? '%': '원'}>
                  <Input
                    type={'text'}
                    min={0}
                    placeholder={'금액을 입력해주세요'}
                    {...register("cartRecommendation", {
                      required: "금액을 입력해주세요",
                      pattern: /[0-9]*/,
                      onChange: (e) => handleCartRecommendation(e)
                    })}
                    value={dataState?.cartRecommendation}
                  />
                  {errors.cartRecommendation &&
                    <ValidationScript>{errors.cartRecommendation?.message}</ValidationScript>}
                </InputLabel>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>상품 추천</Span2></ColTitle>
              <RelativeDiv>
                <InputLabel label={label !== 'won' ? '%': '원'}>
                  <Input
                    type={'text'}
                    min={0}
                    placeholder={'금액을 입력해주세요'}
                    {...register("productRecommendation", {
                      required: "금액을 입력해주세요",
                      pattern: /[0-9]*/,
                      onChange: (e) => handleProductRecommendation(e)
                    })}
                    value={dataState?.productRecommendation}
                  />
                  {errors.productRecommendation &&
                    <ValidationScript>{errors.productRecommendation?.message}</ValidationScript>}
                </InputLabel>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>유저 매치</Span2></ColTitle>
              <RelativeDiv>
                <InputLabel label={label !== 'won' ? '%': '원'}>
                  <Input
                    type={'text'}
                    min={0}
                    placeholder={'금액을 입력해주세요'}
                    {...register("userMatching", {
                      required: "금액을 입력해주세요",
                      pattern: /[0-9]*/,
                      onChange: (e) => handleUserMatching(e)
                    })}
                    value={dataState?.userMatching}
                  />
                  {errors.userMatching && <ValidationScript>{errors.userMatching?.message}</ValidationScript>}
                </InputLabel>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>오디언스</Span2></ColTitle>
              <RelativeDiv>
                <InputLabel label={label !== 'won' ? '%': '원'}>
                  <Input
                    type={'text'}
                    min={0}
                    placeholder={'금액을 입력해주세요'}
                    {...register("audience", {
                      required: "금액을 입력해주세요",
                      pattern: /[0-9]*/,
                      onChange: (e) => handleAudience(e)
                    })}
                    value={dataState?.audience}
                  />
                  {errors.audience && <ValidationScript>{errors.audience?.message}</ValidationScript>}
                </InputLabel>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>유저 최적화</Span2></ColTitle>
              <RelativeDiv>
                <InputLabel label={label !== 'won' ? '%': '원'}>
                  <Input
                    type={'text'}
                    min={0}
                    placeholder={'금액을 입력해주세요'}
                    {...register("userOptimization", {
                      required: "금액을 입력해주세요",
                      pattern: /[0-9]*/,
                      onChange: (e) => handleUserOptimization(e)
                    })}
                    value={dataState?.userOptimization}
                  />
                  {errors.userOptimization && <ValidationScript>{errors.userOptimization?.message}</ValidationScript>}
                </InputLabel>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
        </ModalBody>
        <ModalFooter>
          <CancelButton type={"button"} onClick={() => setModal({
            isShow: false,
          })}>취소</CancelButton>
          <SubmitButton type={"submit"}>{saveType !== 'create' ? '수정' : '추가'}</SubmitButton>
        </ModalFooter>
      </form>
    </div>
  )
}

export function SettingAdd(props) {
  const {onSubmit, data, title, saveType, label} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    console.log(data)
    setModal({
      isShow: true,
      width: 500,
      modalComponent: () => {
        return (
          <SettingChangeModal data={data} onSubmit={onSubmit} saveType={saveType} label={label}/>
        )
      }
    })
  }
  return (
    saveType !== 'edit' ? <Button type={'button'} onClick={handleModalComponent}>{title}</Button> :
      <Edit type={'button'} onClick={handleModalComponent}/>
  )
}

export default SettingAdd

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