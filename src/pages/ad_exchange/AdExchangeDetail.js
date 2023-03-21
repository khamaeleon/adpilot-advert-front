import styled from "styled-components";
import Navigator from "../../components/common/Navigator";
import {useCallback, useEffect, useRef, useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  ColTitle,
  RowSpan,
  TitleContainer,
  ColSpan2, Input, Span4, ColSpan4, ColSpan1, CancelButton, SubmitButton, SubmitContainer, ColSpan3,
} from "../../assets/GlobalStyles";
import {ListBody} from "../../components/layout";
import {ReactSortable} from "react-sortablejs";
import Switch from "../../components/common/Switch";
import {useLocation, useNavigate} from "react-router-dom";
import {
  createAdExchange,
  exchangePlatformTypeList,
  getAdExchangeById, updateAdExchange,
} from "../../services/AdExchangeAxios";
import {atom, useAtom} from "jotai";
import {adExchangeAtom, adExchangeSortListAtom} from "./entity";
import {toast, ToastContainer, useToast} from "react-toastify";

/* 키 입력 컴포넌트 (그리드가 상태변경시 내부에서 리렌더링을 일으키지 않아서 상태변경시키기 위해 컴포넌트로 밖으로 빼서 사용) */
function InputKey (props) {
  return (
    <Input disabled={props.disabled} placeholder={'key'} type={'text'} value={props.value} onChange={props.onChange}/>
  )
}

/* 값 입력 컴포넌트 */
function InputValue (props) {
  return (
    <Input disabled={props.disabled} placeholder={'value'} type={'text'} value={props.value} onChange={props.onChange}/>
  )
}
/* 드래그 정렬 컴포넌트 */
function SortBodyComponent(props){
  const { data, handleChangeParameter } = props
  const [paramKey, setParamKey] = useState('');
  const [paramValue, setParamValue] = useState('');

  const minusParam = (item, index) => {
    handleChangeParameter(item, index)

  }
  const addParam = () => {
    data.params.push({key:paramKey, value:paramValue})

    setParamKey('');
    setParamValue('');
    // handleAddParameter(list)
  }

  return(
    <SortBody>
      <div>
        <RowSpan>
          <ColSpan1>
            <ColTitle>
              KEY
            </ColTitle>
            <InputKey value={paramKey} onChange={(e) => setParamKey(e.target.value)}/>
          </ColSpan1>
          <ColSpan3>
            <ColTitle>
              VALUE
            </ColTitle>
            <InputValue value={paramValue} onChange={(e) => setParamValue(e.target.value)}/>
          </ColSpan3>
        </RowSpan>
        <HandleButton onClick={addParam}>+</HandleButton>
      </div>
        {data.params != undefined && data.params?.map((datum,key) => {
          return (
          <div key={key}>
            <RowSpan>
              <ColSpan1>
                <ColTitle>
                  KEY
                </ColTitle>
                <InputKey disabled value={datum.key} />
              </ColSpan1>
              <ColSpan3>
                <ColTitle>
                  VALUE
                </ColTitle>
                <InputValue disabled value={datum.value} />
              </ColSpan3>
            </RowSpan>
            <HandleButton onClick={()=>minusParam(data, key)}>-</HandleButton>
          </div>
          )
        })}
    </SortBody>
  )
}

function AdExchangeDetail(){
  const [exchangPlaforms, setExchangPlaforms] = useState([]);
  const [adExchangeData, setAdExchangeData] = useAtom(adExchangeAtom)
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * 초기값 데이터 페칭
   */
  useEffect(() => {
    async function fetchAndGetData() {
      const data = await getAdExchangeById(location.state.id);
      setAdExchangeData(data)
    }
    fetchAndGetData()

    exchangePlatformTypeList().then(response => {
      setExchangPlaforms(response.map((data, index)=> {
        return {
            exchangePlatformType: data,
            exchangeServiceType: "IN_COMING",
            params: [],
            publish: false,
            sortNumber: index
        }}))
    })
  },[])

  /**
   *  정렬 리스트 did update
   */
  useEffect(() => {

    setExchangPlaforms(sortPublishAndNumber(exchangPlaforms?.map(data => adExchangeData.inventoryExchanges.find(value => value.exchangePlatformType.value === data.exchangePlatformType.value)
    ? adExchangeData.inventoryExchanges.find(value => value.exchangePlatformType.value === data.exchangePlatformType.value): data
    )))
  },[adExchangeData])


  /**
   * 스위치 버튼 클릭
   * @param seq
   * @param value
   */
  const handleChangeSwitch = (item, publish) => {
    setExchangPlaforms(exchangPlaforms?.map(data => (data.exchangePlatformType.value == item.exchangePlatformType.value) ? {...data, publish: publish} : data))
  }

  const handleChangeParameter = (item, index) => {
    setExchangPlaforms(exchangPlaforms?.map(data => (data.exchangePlatformType.value == item.exchangePlatformType.value) ? {...data, params: data.params.filter((e,i)=> i != index)}: data))
  }

  const sortPublishAndNumber = (dataArr) => {
    return dataArr.sort((a,b) => {
      if(a.sortNumber < b.sortNumber){
        return -1;
      }else if(a.sortNumber > b.sortNumber) {
        return 1;
      }else{
        return 0;
      }
    }).sort((a,b) => {
      if(a.publish > b.publish){
        return -1;
      }else if(a.publish < b.publish) {
        return 1;
      }else{
        return 0;
      }
    })
  }


  /**
   * 저장 put
   * @returns {Promise<void>}
   */
  const handleChangeSave = async () => {

    await updateAdExchange(adExchangeData.inventoryId, exchangPlaforms.map((data, key) => { return {...data, sortNumber: key}})).then((response) => {
      if(response.statusCode === 200) {
        toast.success('정보 수정이 성공하였습니다.')
        navigate("/board/adExchange")
      }else{
        toast.info('정보 수정에 실패하였습니다.')
      }
    })
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>애드 익스체인지 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>지면 정보</BoardHeader>
          <BoardInfo>
            <BoardInfoItem style={{borderRight:'1px solid #ddd'}}>
              <ListBody>
                <div style={{width: 100}}><Square/>지면명</div>
                <div>{adExchangeData?.inventoryName}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>게재 상태</div>
                <div>{adExchangeData?.publish ? "게재 중" : "게재 중지"}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem style={{borderRight:'1px solid #ddd'}}>
              <ListBody>
                <div style={{width: 100}}><Square/>디바이스</div>
                <div>{adExchangeData?.deviceType}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>광고 상품</div>
                <div>{adExchangeData?.productType.label}</div>
              </ListBody>
            </BoardInfoItem>
            <BoardInfoItem>
              <ListBody>
                <div style={{width: 100}}><Square/>지면 번호</div>
                <div>{adExchangeData?.inventoryId}</div>
              </ListBody>
              <ListBody>
                <div style={{width: 100}}><Square/>에이전트</div>
                <div>{adExchangeData?.agentTypes?.map(data => data.label).join(', ')}</div>
              </ListBody>
            </BoardInfoItem>
          </BoardInfo>
        </Board>
        <Board>
          <BoardHeader>
            <div>
              플랫폼 연동 관리 <small>(연동 순서 관리)</small>
            </div>
          </BoardHeader>
          <SortableContainer>

            <ReactSortable list={exchangPlaforms}
                           setList={setExchangPlaforms}
                           handle={'.handled'}>
              {exchangPlaforms?.map((item, key) => {
                return(
                  <SortListContainer key={item.sortNumber}>
                    <Handled className={'handled'}></Handled>
                    <div>
                      <SortHeader>
                        <ColSpan>
                          <Span4 style={{fontWeight: "bold"}}>
                            {item.exchangePlatformType.label}
                          </Span4>
                          <Switch
                            item={item}
                            completed={true}
                            disClose={adExchangeData.inventoryExchanges.find(data => data.exchangePlatformType.value === item.exchangePlatformType.value)?.publish}
                            onClick={handleChangeSwitch}
                          />
                        </ColSpan>
                      </SortHeader>
                      <SortBodyComponent
                          data={item}
                          handleChangeParameter={handleChangeParameter}/>
                    </div>
                  </SortListContainer>
                )
              })}
            </ReactSortable>
          </SortableContainer>
        </Board>
        <SubmitContainer>
          <CancelButton onClick={()=> navigate('/board/adExchange')}>취소</CancelButton>
          <SubmitButton onClick={handleChangeSave}>정보 수정</SubmitButton>
        </SubmitContainer>
      </BoardContainer>
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

export default AdExchangeDetail

const BoardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;
`

const BoardInfoItem = styled.div`
  padding: 15px 0 15px 30px;
  width: 100%;
  & > div {
    padding: 8px 0;
  }
`

const Square = styled.div`
  display: inline-block;
  margin-right: 10px;
  width: 8px;
  height: 8px;
  background-color: #ccc;
`

const SortableContainer = styled.div`
  padding: 30px 0;
`

const SortListContainer = styled.div`
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  height: 100%;
  & > div:last-child {
    width: 100%;
  }
`

const SortHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 17px 30px;
  border-bottom: 1px solid #ddd;
`

const SortBody = styled.div`
  padding: 0 30px;
  width: 100%;
  background-color: #fafafa;
  overflow: hidden;
  transition-duration: 0.5s;
  & > div {
    width:100%;
    display: flex;
  }
  & > div > button {
    width: 10%;
    margin-top: 20px;
    margin-left:15px ;
  }
  & > div > div {
    margin-top: 0;
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
  }
  & > div > div:first-child {
    margin-top: 15px;
  }
  & > div > div:last-child {
    margin-bottom: 15px;
  }
`
const ColSpan = styled.div`
  display: flex;
  align-items: center;
`

const HandleButton = styled.button`
  width: 120px;
  height: 45px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  &:hover {
    color: #f5811f;
  }
`

const Handled = styled.div`
  width: 50px;
  border-right: 1px solid #ddd;
  background-image: url("/assets/images/common/btn_tausch_off.png");
  background-image: -webkit-image-set(url("/assets/images/common/btn_tausch_off.png") 1x, url("/assets/images/common/btn_tausch_off@2x.png") 2x, url("/assets/images/common/btn_tausch_off@3x.png") 3x);
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-image: url("/assets/images/common/btn_tausch_on.png");
    background-image: -webkit-image-set(url("/assets/images/common/btn_tausch_on.png") 1x, url("/assets/images/common/btn_tausch_on@2x.png") 2x, url("/assets/images/common/btn_tausch_on@3x.png") 3x);
  }
`