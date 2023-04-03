import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  ColSpan1,
  ColSpan4,
  DefaultButton,
  Input,
  RelativeDiv,
  RowSpan,
  Span1,
  Span2,
  SubmitButton,
  TableButton,
  ValidationScript,
} from "../../assets/GlobalStyles";
import React, {useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai";
import {pixelColumns, pixelDataAtom, pixelDetailColumns} from "./entity";
import {ToastContainer} from "react-toastify";
import {selAdverPriceEventList} from "../../services/SettingsAxios";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {useForm} from "react-hook-form";
import {selAdverPixelDetailList, selAdverPixelList} from "../../services/header/ManagePixelAxios";
import TableDetail from "../../components/table/TableDetail";

export function PixelAdd(props) {
  const {data, title} = props
  const [, setModal] = useAtom(modalController)
  const [dataState, setDataState] = useState()
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: dataState
  })
  /**
   * 픽셀명
   * @param event
   */
  const handlePixelName = (event) => {
    console.log(event.target.value)
    // setDataState({
    //   ...dataState,
    // })
  }
  /**
   * 지면 URL 입력
   * @param event
   */
  const handleUrl = (event) => {
    console.log(event.target.value)
    // setDataState({
    //   ...dataState,
    // })
  }
  const onError = (error) => console.log(error)

  const handleSave = (dataState) => {
    console.log(dataState)
  }
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 800,
      modalComponent: () => {
        return (
          <form onSubmit={handleSubmit(handleSave, onError)}>
            <ModalHeader title={'픽셀 추가'}/>
            <ModalBody>
              <RowSpan>
                <ColSpan1 style={{width: '33%'}}>
                  <Span2>광고주명</Span2>
                  <RelativeDiv>
                    <Input
                      style={{marginRight: 0}}
                      type={'text'}
                      value={'네이트'}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan1>
                <ColSpan1 style={{width: '33%'}}>
                  <Span1>아이디</Span1>
                  <RelativeDiv>
                    <Input
                      style={{marginRight: 0}}
                      type={'text'}
                      value={'kspring'}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan1>
                <ColSpan1 style={{width: '33%'}}>
                  <Span1>담당자</Span1>
                  <RelativeDiv>
                    <Input
                      style={{marginRight: 0}}
                      type={'text'}
                      value={'홀길동'}
                      readOnly={true}
                    />
                  </RelativeDiv>
                </ColSpan1>
              </RowSpan>
              <RowSpan>
                <ColSpan4>
                  <Span2>픽셀명</Span2>
                  <RelativeDiv>
                    <Input
                      style={{marginRight: 0}}
                      type={'text'}
                      placeholder={'픽셀명을 입력해주세요'}
                      {...register("userOptimization", {
                        required: "픽셀명을 입력해주세요",
                        onChange:(e) => handlePixelName(e)
                      })}
                      value={''}
                    />
                    {errors.userOptimization && <ValidationScript>{errors.userOptimization?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan4>
              </RowSpan>
              <RowSpan>
                <ColSpan4>
                  <Span2>연동 URL</Span2>
                  <RelativeDiv>
                    <Input
                      style={{marginRight: 0}}
                      type={'text'}
                      placeholder={'https://'}
                      defaultValue={""}
                      onChange={e => handleUrl(e)}
                      {...register("mediaUrl", {
                        required: "연동 URL을 입력해주세요.",
                        pattern:{
                          value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                          message: "http(s)://가 포함된 url 주소를 확인해주세요."
                        }
                      })}
                    />
                    {errors.mediaUrl && <ValidationScript>{errors.mediaUrl?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan4>
              </RowSpan>
            </ModalBody>
            <ModalFooter>
              <SubmitButton type={"submit"} >픽셀 추가</SubmitButton>
            </ModalFooter>
          </form>
        )
      }
    })
  }
  return (
    <TableButton type={'button'} onClick={handleModalComponent}>{title}</TableButton>
  )
}

function PixelList() {
  const [pixelDataState, setPixelDataState] = useAtom(pixelDataAtom)
  const [searchParams, setSearchParams] = useState({ keyword:''})
  useEffect(() => {
    selAdverPixelList(searchParams).then(response =>{
      setPixelDataState(response)
    })
  }, [])
  const handleFetchDetailData = useCallback(async ({userId}) => {
    return await selAdverPixelDetailList(userId)
  },[])

  const groupStyle = {
    textAlign: 'center',
    backgroundColor: '#fafafa',
    color: '#b2b2b2'
  }
  const groups = [
    {name: 'defaultData', header: '연동 데이터', headerStyle: groupStyle},
    {name: 'platformData', header: '플랫폼 데이터', headerStyle: groupStyle},
  ]
  const handleSearch = (event) => {
    setSearchParams({
      ...searchParams,
      keyword:event.target.value
    })
  }
  /**
   * 광고주 명 및 아이디 검색
   */
  const onSearchAdverEventPrice =() =>{
    selAdverPriceEventList(searchParams).then(response =>{
      setPixelDataState(response)
    })
  }
  return (
    <main>
      <>
      <Board>
        <BoardHeader>픽셀 현황</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan1>
              <Input style={{width: 300}}
                     placeholder={'광고주 명 및 아이디 검색'}
                     value={searchParams.keyword}
                     onChange={handleSearch}
              />
              <DefaultButton onClick={onSearchAdverEventPrice}>검색</DefaultButton>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <BoardTableContainer>
          { pixelDataState !== null &&
            <TableDetail columns={pixelColumns}
                         data={pixelDataState}
                         detailData={handleFetchDetailData}
                         detailColumn={pixelDetailColumns}
                         detailGroups={groups}
                         idProperty={'userId'}
                         groups={groups}
                         style={{minHeight: 500}}/>
          }
        </BoardTableContainer>
      </Board>
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
      </>
    </main>
  )
}
export default PixelList
