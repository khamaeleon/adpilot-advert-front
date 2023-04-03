import React, {useEffect, useState} from "react";
import {getThisMonth, getToDay} from "../../../common/DateUtils";
import {retrieveTopLevelCategory} from "../../../services/Platform/CategoryAxios";
import {
  AgentType,
  Board,
  BoardHeader,
  BoardSearchResult, CalendarBox, CalendarIcon,
  ColSpan4, CustomDatePicker, DateContainer, DefaultButton,
  RelativeDiv,
  RowSpan, smallStyle,
  Span4
} from "../../../assets/GlobalStyles";
import Checkbox from "../../../components/common/Checkbox";
import {CategoryItem, Day, RowInBox, SelectCategory, SmallButton, SmallInput} from "../styles";
import ko from "date-fns/locale/ko";
import DragToSelect from "../../../components/common/DragToSelect";
import Select from "react-select";
import {AdGroupButton} from "../../../components/modal/AdGroup";
import {InventoryButton} from "../../../components/modal/InventorySettings";

export function CampaignThree() {
  const [topLevelCategory, setTopLevelCategoryList] = useState([])
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  useEffect(() => {
    const fetchData = retrieveTopLevelCategory().then(response => {
      setTopLevelCategoryList(response)
    })
  }, []);

  return(
    <Board>
      <BoardHeader>광고 그룹 설정</BoardHeader>
      <BoardSearchResult>
        <RowSpan>
          <ColSpan4>
            <Span4>광고주 설정</Span4>
            <RelativeDiv>
              <AdGroupButton title={'광고 그룹 선택'}/>
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <ColSpan4>
            <Span4>노출 영역</Span4>
            <RelativeDiv>
              <AgentType>
                <Checkbox label={'전체'}
                          type={'c'}
                          id={'all'}
                />
                <Checkbox label={'PC 웹'}
                          type={'c'}
                          id={'WEB'}
                          value={'WEB'}/>
                <Checkbox label={'PC 어플리케이션'}
                          type={'c'}
                          id={'WEB_APP'}
                          value={'WEB_APP'}
                />
                <Checkbox label={'모바일 웹'}
                          type={'c'}
                          id={'MOBILE_WEB'}
                          value={'MOBILE_WEB'}/>
                <Checkbox label={'모바일 어플리케이션'}
                          type={'c'}
                          id={'MOBILE_NATIVE_APP'}
                          value={'MOBILE_NATIVE_APP'}/>
              </AgentType>
              <p style={{color: '#ccc'}}>팝언더 상품은 PC웹과 MOBILE웹에서만 송출 가능.</p>
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <ColSpan4>
            <Span4>광고 게재 설정</Span4>
            <ColSpan4>
              <label>
                <input type={'radio'} id={'direct'}/>
                <span>직접 선택</span>
              </label>
              <InventoryButton title={'지면선택'}/>
            </ColSpan4>
          </ColSpan4>
        </RowSpan>
        <RowSpan box={true} column={true} style={{backgroundColor:'#ffffff'}}>
          <ColSpan4>
            <Span4>게제 지면</Span4>
            <RelativeDiv>
              <label>
                <input type={'radio'} name={'inventory'}/>
                <span>자동 최적화</span>
              </label>
              <label>
                <input type={'radio'} name={'inventory'}/>
                <span>카테고리 설정</span>
              </label>
              <label>
                <input type={'radio'} name={'inventory'}/>
                <span>직접 선택</span>
              </label>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4></Span4>
            <RelativeDiv>
              <SelectCategory>
                {topLevelCategory.map((item, key) => {
                  return (
                    <CategoryItem key={key}>{item.name}</CategoryItem>
                  )
                })}
              </SelectCategory>
            </RelativeDiv>

          </ColSpan4>
          <ColSpan4>
            <Span4>송출 제한 지면 설정</Span4>
            <RelativeDiv>
              <DefaultButton>지면 선택</DefaultButton>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>게재 기간</Span4>
            <RelativeDiv>
              <DateContainer>
                <CalendarBox>
                  <CalendarIcon/>
                </CalendarBox>
                <CustomDatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(date) => setDateRange(date)}
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                  isClearable={false}
                />
              </DateContainer>
              <label>
                <input type={'checkbox'} className={'checkbox-type-a'}/>
                <i/>
                <span>종료일 미설정</span>
              </label>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>게제 요일 및 시간</Span4>
            <RelativeDiv>
              <label>
                <input type={'radio'} name={'inventoryByCustomer'}/>
                <span>자동 최적화</span>
              </label>
              <label>
                <input type={'radio'} name={'inventoryByCustomer'}/>
                <span>개별 설정</span>
              </label>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4></Span4>
            <RelativeDiv box={true} column={true}>
              <p style={{color: '#ccc',marginBottom: 10}}>Drag & Drop으로 원하는 요일 및 시간을 설정하세요.</p>
              <DragToSelect/>
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <ColSpan4>
            <Span4>타게팅 설정</Span4>
          </ColSpan4>
        </RowSpan>
        <RowSpan box={true} column={true} style={{backgroundColor:'#ffffff'}}>
          <ColSpan4>
            <Span4>고객 정보 기반 설정</Span4>
            <RelativeDiv>
              <label>
                <input type={'radio'} name={'inventoryByCustomer'}/>
                <span>자동 최적화</span>
              </label>
              <label>
                <input type={'radio'} name={'inventoryByCustomer'}/>
                <span>개별 설정</span>
              </label>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4></Span4>
            <RelativeDiv box={true} column={true}>
              <RowInBox>
                <div>
                  <span>전환 유저</span>
                  <span style={{color:'#ccc'}}>광고주 상품을 구매한 고객을 대상으로 정책 설정</span>
                </div>
                <div>
                  <div>
                    <label>
                      <input type={'radio'} name={'radio-a'}/>
                      <span>노출</span>
                    </label>
                    <label>
                      <input type={'radio'} name={'radio-a'}/>
                      <span>미노출</span>
                    </label>
                  </div>
                  <div>
                    <Select styles={smallStyle} options={[{key:0,value:'',label:'노출 기간 선택'}]}/>
                  </div>
                  <div>
                    <SmallInput>
                      <input type={'text'}/>
                      <Day/>
                    </SmallInput>
                  </div>
                  <span style={{color:'#ccc'}}>90일 이하 설정</span>
                </div>
              </RowInBox>
              <RowInBox>
                <div>
                  <span>쇼핑 고객</span>
                  <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                </div>
                <div>
                  <div>
                    <label>
                      <input type={'radio'} name={'radio-b'}/>
                      <span>노출</span>
                    </label>
                    <label>
                      <input type={'radio'} name={'radio-b'}/>
                      <span>미노출</span>
                    </label>
                  </div>
                </div>
              </RowInBox>
              <RowInBox>
                <div>
                  <span>관심 고객</span>
                  <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                </div>
                <div>
                  <div>
                    <label>
                      <input type={'radio'} name={'radio-c'}/>
                      <span>노출</span>
                    </label>
                    <label>
                      <input type={'radio'} name={'radio-c'}/>
                      <span>미노출</span>
                    </label>
                  </div>
                </div>
              </RowInBox>
              <RowInBox>
                <div>
                  <span>방문 고객</span>
                  <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                </div>
                <div>
                  <div>
                    <label>
                      <input type={'radio'} name={'radio-d'}/>
                      <span>노출</span>
                    </label>
                    <label>
                      <input type={'radio'} name={'radio-d'}/>
                      <span>미노출</span>
                    </label>
                  </div>
                </div>
              </RowInBox>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>유저 데이터 분석 설정</Span4>
            <RelativeDiv>
              <label>
                <input type={'radio'} name={'inventoryByCustomer'}/>
                <span>자동 최적화</span>
              </label>
              <label>
                <input type={'radio'} name={'inventoryByCustomer'}/>
                <span>개별 설정</span>
              </label>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4></Span4>
            <RelativeDiv box={true} column={true}>
              <RowInBox>
                <div>
                  <span>전환 유저</span>
                  <span style={{color:'#ccc'}}>광고주 상품을 구매한 고객을 대상으로 정책 설정</span>
                </div>
                <div>
                  <div>
                    <label>
                      <input type={'radio'} name={'radio-e'}/>
                      <span>노출</span>
                    </label>
                    <label>
                      <input type={'radio'} name={'radio-e'}/>
                      <span>미노출</span>
                    </label>
                  </div>
                </div>
              </RowInBox>
              <RowInBox>
                <div>
                  <span>쇼핑 고객</span>
                  <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                </div>
                <div>
                  <div>
                    <label>
                      <input type={'radio'} name={'radio-f'}/>
                      <span>노출</span>
                    </label>
                    <label>
                      <input type={'radio'} name={'radio-f'}/>
                      <span>미노출</span>
                    </label>
                  </div>
                </div>
              </RowInBox>
              <RowInBox>
                <div>
                  <span>관심 고객</span>
                  <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                </div>
                <div>
                  <div>
                    <label>
                      <input type={'radio'} name={'radio-g'}/>
                      <span>노출</span>
                    </label>
                    <label>
                      <input type={'radio'} name={'radio-g'}/>
                      <span>미노출</span>
                    </label>
                  </div>
                </div>
              </RowInBox>
              <RowInBox>
                <div>
                  <span>방문 고객</span>
                  <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                </div>
                <div>
                  <div>
                    <label>
                      <input type={'radio'} name={'radio-h'}/>
                      <span>노출</span>
                    </label>
                    <label>
                      <input type={'radio'} name={'radio-h'}/>
                      <span>미노출</span>
                    </label>
                  </div>
                </div>
              </RowInBox>
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
      </BoardSearchResult>
    </Board>
  )
}