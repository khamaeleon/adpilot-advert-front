import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  ColSpan1, ColSpan2, ColSpan3,
  ColSpan4,
  DefaultButton,
  Input, inputStyle,
  RelativeDiv,
  RowSpan, selectStyle,
  Span1,
  Span2,
  Span3,
  SubmitButton,
  TableButton,
  ValidationScript,
} from "../../assets/GlobalStyles";
import React, {useCallback, useEffect, useState} from "react";
import {useAtom, useSetAtom} from "jotai";
import {toast, ToastContainer} from "react-toastify";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {Controller, useForm} from "react-hook-form";
import {resistAdverPixelInfo, selAdverPixelDetailList, selAdverPixelList} from "../../services/header/ManagePixelAxios";
import TableDetail from "../../components/table/TableDetail";
import Select from "react-select";
import {hostList} from "../signup/entity/Common";
import {
  retrieveSubLevelCategoryKeyValue,
  retrieveTopLevelCategoryKeyValue
} from "../../services/Platform/CategoryAxios";
import {atom} from "jotai/index";
import {useNavigate} from "react-router-dom";
import {pixelColumns, pixelDataAtom, pixelDetailColumns} from "./entity/Pixel";

const pixelAtom = atom({
  pixelName: '',
  userId: ''
})
export function PixelModal(props) {
  const {data, title} = props
  const [, setModal] = useAtom(modalController)

  const handleModalComponent = () => {
    if(data) {
      setModal({
        isShow: true,
        width: 800,
        modalComponent: () => {
          console.log(data)
          return (
            <PixelAdd data={data} title={title} />
          )
        }
      })
    } else {
      toast.warning('광고주를 설정해주세요.')
    }
  }
  return (
    <TableButton type={'button'} onClick={handleModalComponent}>{title}</TableButton>
  )
}


function PixelAdd(props){
  const {data, title} = props
  const [, setModal] = useAtom(modalController)
  const [pixelInfoListState, setPixelInfoListState] = useState({
    userId: data.userId,
    pixelName:'',
    linkUrl:'',
    mainCategoryCode:'',
    subCategoryCode:'',
    hostType:''
  })
  const [topLevelCategoryList,setTopLevelCategoryList] = useState([])
  const [rowLevelCategoryList,setRowLevelCategoryList] = useState([])
  const setPixel = useSetAtom(pixelAtom)
  const navigate =useNavigate()
  const {register, handleSubmit, reset, control,formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: pixelInfoListState
  })
  useEffect(() => {
    retrieveTopLevelCategoryKeyValue().then(response => {
      setTopLevelCategoryList(response)
    })
  }, [])
  /**
   * 픽셀명
   * @param event
   */
  const handlePixelName = (event) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      pixelName:event.target.value
    })
  }
  /**
   * 지면 URL 입력
   * @param event
   */
  const handleUrl = (event) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      linkUrl:event.target.value
    })
  }
  /**
   * 상위 카테고리
   * @param selectTopCategory
   */
  const handleSelectTopCategory = (selectTopCategory) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      mainCategoryCode: selectTopCategory.value,
      subCategoryCode:''
    })
    retrieveSubLevelCategoryKeyValue(selectTopCategory.value).then(response => {
      setRowLevelCategoryList(response)
    })
  }
  /**
   * 하위 카테고리
   * @param selectRowCategory
   */
  const handleSelectRowCategory = (selectRowCategory) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      subCategoryCode: selectRowCategory.value
    })
  }
  /**
   * 호스팅 설정
   * @param selectHostType
   */
  const handleSelectHosting = (selectHostType) => {
    setPixelInfoListState({
      ...pixelInfoListState,
      hostType: selectHostType.value
    })
  }

  const onError = (error) => console.log(error)

  const handleSave = () => {
    resistAdverPixelInfo(pixelInfoListState).then(response => {
      if(response){
        setModal({
          isShow: false,
          modalComponent: null
        })
        navigate(0)
      }else{
        console.log('실패')
        toast.warning("등록이 실패 하였습니다. 관리자한테 문의하세요")
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(handleSave, onError)}>
      <ModalHeader title={'픽셀 추가'}/>
      <ModalBody>
        <RowSpan>
          <ColSpan4>
            <Span3>광고주명</Span3>
            <ColSpan1 style={{width: '33%', paddingLeft: 0}}>
              <RelativeDiv>
                <Input
                  style={{marginRight: 0}}
                  type={'text'}
                  value={data.adverName}
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
                  value={data.username}
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
                  value={data.managerName}
                  readOnly={true}
                />
              </RelativeDiv>
            </ColSpan1>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <ColSpan4>
            <Span3>픽셀명</Span3>
            <RelativeDiv>
              <Input
                style={{marginRight: 0}}
                type={'text'}
                placeholder={'픽셀명을 입력해주세요'}
                {...register("pixelName", {
                  required: "픽셀명을 입력해주세요",
                  onChange:(e) => handlePixelName(e)
                })}
                value={pixelInfoListState.pixelName}
              />
              {errors.pixelName && <ValidationScript>{errors.pixelName?.message}</ValidationScript>}
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <ColSpan4>
            <Span3>연동 URL</Span3>
            <RelativeDiv>
              <Input
                style={{marginRight: 0}}
                type={'text'}
                placeholder={'https://'}
                {...register("linkUrl", {
                  required: "연동 URL을 입력해주세요.",
                  onChange:(e) => handleUrl(e),
                  pattern:{
                    value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                    message: "http(s)://가 포함된 url 주소를 확인해주세요."
                  }
                })}
                value={pixelInfoListState.linkUrl}
              />
              {errors.linkUrl && <ValidationScript>{errors.linkUrl?.message}</ValidationScript>}
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <ColSpan4>
            <Span3>카테고리설정</Span3>
            <RelativeDiv style={{width: '50%',paddingLeft: 0}}>
              <Controller
                name="mainCategoryCode"
                control={control}
                rules={{
                  required: {
                    value: pixelInfoListState.mainCategoryCode === "",
                    message: "카테고리를 선택해주세요"
                  }
                }}
                render={({field}) => (
                  <Select options={topLevelCategoryList}
                          placeholder={'카테고리선택 선택'}
                          {...field}
                          value={pixelInfoListState.mainCategoryCode !== '' ? topLevelCategoryList?.find(value => value.value === pixelInfoListState.mainCategoryCode) : ''}
                          onChange={handleSelectTopCategory}
                          styles={selectStyle}
                  />
                )}
              />
                {errors.mainCategoryCode && <ValidationScript>{errors.mainCategoryCode?.message}</ValidationScript>}
            </RelativeDiv>
            <RelativeDiv style={{width: '50%',paddingLeft: 0}}>
              <Controller
                name="subCategoryCode"
                control={control}
                rules={{
                  required: {
                    value: pixelInfoListState.subCategoryCode === "",
                    message: "카테고리를 선택해주세요"
                  }
                }}
                render={({field}) => (
                  <Select options={rowLevelCategoryList}
                          placeholder={'서브 카테고리 선택'}
                          {...field}
                          value={pixelInfoListState.subCategoryCode !== '' ? rowLevelCategoryList?.find(value => value.value === pixelInfoListState.subCategoryCode) : ''}
                          onChange={handleSelectRowCategory}
                          styles={selectStyle}
                  />
                )}
              />
              {errors.subCategoryCode && <ValidationScript>{errors.subCategoryCode?.message}</ValidationScript>}
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <ColSpan4 style={{marginRight:0}}>
            <Span3>호스팅 설정</Span3>
            <RelativeDiv style={{marginRight:0}}>
              <Controller
                name="hostType"
                control={control}
                rules={{
                  required: {
                    value: pixelInfoListState.hostType === "",
                    message: "호스팅을 선택해주세요"
                  }
                }}
                render={({field}) => (
                  <Select options={hostList}
                          placeholder={'호스팅 선택'}
                          {...field}
                          value={pixelInfoListState.hostType !== '' ? hostList.find(value => value.value === pixelInfoListState.hostType) : ''}
                          onChange={handleSelectHosting}
                          styles={selectStyle}
                  />
                )}
              />
              {errors.hostType && <ValidationScript>{errors.hostType?.message}</ValidationScript>}
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
function PixelList() {
  const [searchParams, setSearchParams] = useState({ keyword:''})
  const [pixelDataState,setPixelDataState] = useState(pixelDataAtom)

  useEffect(()=>{
    selAdverPixelList(searchParams).then(response =>{
      setPixelDataState(response)
    })
  },[])

  const handleFetchDetailData = useCallback(async ({userId}) => {
    return selAdverPixelDetailList(userId)
  },[])


  const handleSearch = (event) => {
    setSearchParams({
      ...searchParams,
      keyword:event.target.value
    })
  }
  /**
   * 광고주 명 및 아이디 검색
   */
  const onSearchAdverEventPrice = async() => {
    if(searchParams.keyword !== ''){
      await selAdverPixelList(searchParams).then(response =>{
        setPixelDataState(response)
      })
    }
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
                     placeholder={'광고주명 및 아이디 검색'}
                     value={searchParams.keyword}
                     onChange={handleSearch}
                     onKeyDown={e => (e.code === 'Enter') && onSearchAdverEventPrice() }
              />
              <DefaultButton onClick={onSearchAdverEventPrice}>검색</DefaultButton>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <BoardTableContainer>
          <TableDetail columns={pixelColumns}
                       data={pixelDataState}
                       detailData={handleFetchDetailData}
                       detailColumn={pixelDetailColumns}
                       detailGroups={false}
                       idProperty={'userId'}
                       groups={false}
                       style={{minHeight: 500}}/>
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
