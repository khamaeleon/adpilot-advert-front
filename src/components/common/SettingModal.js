import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalFooter} from "../modal/Modal";
import {
  CancelButton,
  ColSpan4,
  ColTitle,
  Edit,
  Input,
  RelativeDiv,
  RowSpan,
  Span2,
  SubmitButton,
  ValidationScript
} from "../../assets/GlobalStyles";
import {useAtom} from "jotai";
import {modalController} from "../../store";
import {useForm} from "react-hook-form";
import {eventUnitPriceDetailDataAtom, saveTypeAtom} from "../../pages/settings/entity";
import {resistPriceEvent, selPriceEventList, updatePriceEvent} from "../../services/SettingsAxios";
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";

function SettingChangeModal(props) {
  const {data, onSubmit, saveType, label} = props
  const [, setModal] = useAtom(modalController)
  const [, setSaveTypeState] = useAtom(saveTypeAtom)
  const [eventUnitPriceDetailDataState, setEventUnitPriceDetailDataState] = useAtom(eventUnitPriceDetailDataAtom)
  const {state} = useLocation()
  const [dataState, setDataState] = useState(saveType !== 'create' ? data :{
    audience: '',
    cartRecommendations: '',
    priceEventId: '',
    groupName: '',
    productRecommendations: '',
    shopperMatching: '',
    userMatching :'',
    userOptimization: ''
  } )
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: dataState
  })
  useEffect(() => {
    if (saveType === 'create') {
      setSaveTypeState(saveType)
    }else{
      setSaveTypeState(saveType)
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

  /**
   * 쇼퍼 맞춤
   * @param event
   */
  const handleShopperMatching = (event) => {
    setDataState({
      ...dataState,
      shopperMatching: event.target.value
    })
  }

  /**
   * 카트 추천
   * @param event
   */
  const handleCartRecommendations = (event) => {
    setDataState({
      ...dataState,
      cartRecommendations: event.target.value
    })
  }

  /**
   * 상품 추천
   * @param event
   */
  const handleProductRecommendations = (event) => {
    setDataState({
      ...dataState,
      productRecommendations: event.target.value
    })
  }

  /**
   * 유저 매치
   * @param event
   */
  const handleUserMatching = (event) => {
    setDataState({
      ...dataState,
      userMatching: event.target.value
    })
  }

  /**
   * 오디언스
   * @param event
   */
  const handleAudience = (event) => {
    setDataState({
      ...dataState,
      audience: event.target.value
    })
  }

  /**
   * 유저 최적화
   * @param event
   */
  const handleUserOptimization = (event) => {
    setDataState({
      ...dataState,
      userOptimization: event.target.value
    })
  }
  /**
   * 모달에서 수정 추가
   */
  const handleSave = (data) => {
    if(saveType ==='create'){
      resistPriceEvent({...data,userId:state.id}).then(response => {
        if(response){
          setModal({
            isShow: false,
            modalComponent: null
          })
          selPriceEventList(state.id).then(response => {
            setEventUnitPriceDetailDataState(response)
          })
        }else{
          toast.warning("이벤트 단가 그룹명이 중복 되었습니다.")
        }
      })
    }else{
      console.log('수정')
      updatePriceEvent({...data,userId:state.id}).then(response => {
        if (response) {
          setModal({
            isShow: false,
            modalComponent: null
          })
          selPriceEventList(state.id).then(response => {
            setEventUnitPriceDetailDataState(response)
          })
        } else {
          toast.warning("이벤트 단가 그룹명이 중복 되었습니다.")
        }
      })
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit(handleSave, onError)}>
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
                    onChange:(e) => handlePriceEventName(e)
                  })}
                  value={dataState?.groupName}
                />
                {errors.groupName && <ValidationScript>{errors.groupName?.message}</ValidationScript>}
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>쇼퍼 맞춤</Span2></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'금액을 입력해주세요'}
                  {...register("shopperMatching", {
                    required: "금액을 입력해주세요",
                    onChange:(e) => handleShopperMatching(e)
                  })}
                  value={dataState?.shopperMatching !== 0 ? dataState?.shopperMatching : ''}
                />
                {errors.shopperMatching && <ValidationScript>{errors.shopperMatching?.message}</ValidationScript>}
                <span className={label}></span>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>카트 추천</Span2></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'금액을 입력해주세요'}
                  {...register("cartRecommendations", {
                    required: "금액을 입력해주세요",
                    onChange:(e) => handleCartRecommendations(e)
                  })}
                  value={dataState?.cartRecommendations !== 0 ? dataState?.cartRecommendations : ''}
                />
                {errors.cartRecommendations && <ValidationScript>{errors.cartRecommendations?.message}</ValidationScript>}
                <span className={label}></span>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>상품 추천</Span2></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'금액을 입력해주세요'}
                  {...register("productRecommendations", {
                    required: "금액을 입력해주세요",
                    onChange:(e) => handleProductRecommendations(e)
                  })}
                  value={dataState?.productRecommendations !== 0 ? dataState?.productRecommendations : ''}
                />
                {errors.productRecommendations && <ValidationScript>{errors.productRecommendations?.message}</ValidationScript>}
                <span className={label}></span>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>유저 매치</Span2></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'금액을 입력해주세요'}
                  {...register("userMatching", {
                    required: "금액을 입력해주세요",
                    onChange:(e) => handleUserMatching(e)
                  })}
                  value={dataState?.userMatching !== 0 ? dataState?.userMatching : ''}
                />
                {errors.userMatching && <ValidationScript>{errors.userMatching?.message}</ValidationScript>}
                <span className={label}></span>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>오디언스</Span2></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'금액을 입력해주세요'}
                  {...register("audience", {
                    required: "금액을 입력해주세요",
                    onChange:(e) => handleAudience(e)
                  })}
                  value={dataState?.audience !== 0 ? dataState?.audience : ''}
                />
                {errors.audience && <ValidationScript>{errors.audience?.message}</ValidationScript>}
                <span className={label}></span>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span2>유저 최적화</Span2></ColTitle>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'금액을 입력해주세요'}
                  {...register("userOptimization", {
                    required: "금액을 입력해주세요",
                    onChange:(e) => handleUserOptimization(e)
                  })}
                  value={dataState.userOptimization !== 0 ? dataState.userOptimization : ''}
                />
                {errors.userOptimization && <ValidationScript>{errors.userOptimization?.message}</ValidationScript>}
                <span className={label}></span>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={()=>setModal({
            isShow: false,
          })}>취소</CancelButton>
          <SubmitButton type={"submit"} >{saveType !== 'create' ? '수정' : '추가'}</SubmitButton>
        </ModalFooter>
      </form>
    </div>
  )
}

export function SettingAdd(props) {
  const {onSubmit, data, title, saveType, label} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
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
    saveType !== 'edit' ? <Button type={'button'} onClick={handleModalComponent}>{title}</Button> : <Edit type={'button'} onClick={handleModalComponent} />
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