import styled, {createGlobalStyle, css} from "styled-components";
import DatePicker from "react-datepicker";

const mainColor = css`${props => props.theme.color.mainColor}`
const textColor = css`${props => props.theme.color.textColor}`
const borderColor = css`${props => props.theme.color.borderColor}`
const lightGray = css`${props => props.theme.color.lightGray}`

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: 14px;
    word-break: break-all;
  }
  body {
    margin: 0;
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html, body, button, input, textarea, pre {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    color: ${textColor};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
  a {
    text-decoration: none;
    color: #777
  }
  ul,li,dd,dl,dt {
    text-decoration: none;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  table {
    border-spacing: 0;
  }
  article {
    margin: 0 auto;
    width: 1580px;
  }

  article h1 {
    font-size: 2em;
  }

  article h2 {
    font-size: 1.7em;
  }

  article h3 {
    font-size: 1.5em;
  }

  article h4 {
    font-size: 1.2em;
  }

  article h5 {
    font-size: 1em;
  }

  article h6 {
    font-size: .07em;
  }
  

  #container {
    display: flex;
  }
  .InovuaReactDataGrid__column-header--show-border-left {
    border: none !important;
  }
  aside {
    position: -webkit-sticky; /* 사파리 브라우저 지원 */
    position: sticky;
    top: 0;
    align-self: flex-start;
  }
  button {
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  }
  input, textarea {
    outline: none;
  }
  input::placeholder{
    color: #a2aab2;
  }
  input[type='text']:read-only {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
  input[type="radio"] {
    vertical-align: middle;
    appearance: none;
    width: 20px;
    height: 20px;
    background-image: url('/assets/images/common/selectcircle_off.png');
    background-image: -webkit-image-set(url('/assets/images/common/selectcircle_off.png') 1x,url('/assets/images/common/selectcircle_off@2x.png') 2x, url('/assets/images/common/selectcircle_off@3x.png') 3x)
  }
  input[type="radio"]:checked {
    background-image: url('/assets/images/common/selectcircle_on.png');
    background-image: -webkit-image-set(url('/assets/images/common/selectcircle_on.png') 1x,url('/assets/images/common/selectcircle_on@2x.png') 2x, url('/assets/images/common/selectcircle_on@3x.png') 3x)
  }
  label {
    display: flex;
    margin-right: 10px;
  }

  .react-datepicker__input-container input[type='text']{
    border: 0;
    height: calc(45px - 2px);
  }
  .sign-up article {
    width: 1320px;
  }
  .checkbox-type-a {
    display: none;
  }
  .checkbox-type-a + label {
    vertical-align: top;
  }
  .checkbox-type-a + i{
    display: inline-block;
    margin: 0 8px;
    width: 14px;
    height: 20px;
    background-image: url('/assets/images/common/checkbox.png');
    background-image: -webkit-image-set(url('/assets/images/common/checkbox.png') 1x,url('/assets/images/common/checkbox@2x.png') 2x, url('/assets/images/common/checkbox@3x.png') 3x);
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: top;
  }

  .checkbox-type-a:checked + i{
    background-image: url('/assets/images/common/checkbox_on.png');
    background-image: -webkit-image-set(url('/assets/images/common/checkbox_on.png') 1x,url('/assets/images/common/checkbox_on@2x.png') 2x, url('/assets/images/common/checkbox_on@3x.png') 3x);
  }

  .checkbox-type-b {
    display: none;
  }
  .checkbox-type-b + label {
    vertical-align: top;
  }
  .checkbox-type-b + i{
    display: inline-block;
    margin: 0 8px;
    width: 30px;
    height: 30px;
    background-image: url('/assets/images/common/checkbox_off_B.png');
    background-image: -webkit-image-set(url('/assets/images/common/checkbox_off_B.png') 1x,url('/assets/images/common/checkbox_off_B@2x.png') 2x, url('/assets/images/common/checkbox_off_B@3x.png') 3x);
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: top;
  }

  .checkbox-type-b:checked + i{
    background-image: url('/assets/images/common/checkbox_on_B.png');
    background-image: -webkit-image-set(url('/assets/images/common/checkbox_on_B.png') 1x,url('/assets/images/common/checkbox_on_B@2x.png') 2x, url('/assets/images/common/checkbox_on_B@3x.png') 3x);
  }

  .checkbox-type-c {
    display: none;
  }

  .checkbox-type-c + label {
    vertical-align: top;
  }
  .checkbox-type-c + i{
    display: inline-block;
    margin: 0 8px;
    width: 20px;
    height: 20px;
    background-image: url('/assets/images/common/checkbox_off_C.png');
    background-image: -webkit-image-set(url('/assets/images/common/checkbox_off_C.png') 1x,url('/assets/images/common/checkbox_off_C@2x.png') 2x, url('/assets/images/common/checkbox_off_C@3x.png') 3x);
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: top;
  }

  .checkbox-type-c:checked + i{
    background-image: url('/assets/images/common/checkbox_on_C.png');
    background-image: -webkit-image-set(url('/assets/images/common/checkbox_on_C.png') 1x,url('/assets/images/common/checkbox_on_C@2x.png') 2x, url('/assets/images/common/checkbox_on_C@3x.png') 3x);
  }
  
  .border-r {
    border-right: 1px solid ${lightGray}
  }
  .border-t {
    border-top: 1px solid ${lightGray}
  }

  .fadeOut {
    animation: 0.5s fadeOutAnimation;
    animation-fill-mode: forwards;
  }

  .fadeIn {
    animation: 0.5s fadeInAnimation;
    animation-fill-mode: forwards;
  }

  .icon-mode {
    padding-left: 18px !important;
    width: 60px !important;
    height: 60px !important;
    overflow: hidden;
    border-radius: 15px;
  }
  .list-mode {
    overflow: hidden;
  }
  .icon-mode > div{
    transition-duration: 0.5s;
  }
  .icon-mode + div {
    transition-duration: 0.5s;
    height: 0 !important;
  }
  .list-mode > div {
    transition-duration: 0.5s;
    margin-left: 0px;
  }

  .active > a {
    background-color: ${mainColor};
  }

  .active span {
    color: #fff
  }

  .slide-down-1 {
    animation: 0.5s slideDownAnimation1;
    animation-fill-mode: forwards;
  }

  .slide-down-2 {
    animation: 0.5s slideDownAnimation2;
    animation-fill-mode: forwards;
  }
  .slide-down-3 {
    animation: 0.5s slideDownAnimation3;
    animation-fill-mode: forwards;
  }

  .slide-down-4 {
    animation: 0.5s slideDownAnimation4;
    animation-fill-mode: forwards;
  }

  .slide-down-5 {
    animation: 0.5s slideDownAnimation5;
    animation-fill-mode: forwards;
  }
  

  .slide-up {
    animation: 0.5s slideUpAnimation;
    animation-fill-mode: forwards;
    overflow: hidden;
  }

  .react-switch-checkbox {
    height: 0;
    width: 0;
    visibility: hidden;
    display: none;
  }

  .react-switch-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 68px;
    height: 30px;
    background: ${lightGray};
    border-radius: 68px;
    position: relative;
    transition: background-color .2s;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }

  .react-switch-label .react-switch-button {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 22px;
    height: 22px;
    border-radius: 22px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.4);
  }

  .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
    left: calc(100% - 4px);
    transform: translateX(-100%);
  }

  .react-switch-checkbox:checked + .react-switch-label {
    background: ${mainColor};
  }

  .react-switch-label:active .react-switch-button {
    width: 22px;
  }

  .handled {
    cursor: move;
    cursor: grab;
  }
  .handled:active {
    cursor: grabbing;
  }
  
  .InovuaReactDataGrid--theme-default-light .InovuaReactDataGrid__column-header__content {
    font-weight: 400
  }
  .InovuaReactDataGrid__column-header__content .checkbox-type-a + i{
    display: none;
  }
  
  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .line-clamp_2 {
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
  }
  
  .won:after {
    content: '원';
    margin-left: 5px;    
  }
  
  .pct:after {
    content: '%';
    margin-left: 5px;    
  }

  @keyframes slideUpAnimation {
    0% {
      height: 97px;
    }
    100% {
      height: 0;
    }
  }

  @keyframes slideDownAnimation1 {
    0% {
      height: 0;
    }
    100% {
      height: 68px;
    }
  }

  @keyframes slideDownAnimation2 {
    0% {
      height: 0;
    }
    100% {
      height: 100px;
    }
  }

  @keyframes slideDownAnimation3 {
    0% {
      height: 0;
    }
    100% {
      height: 150px;
    }
  }

  @keyframes slideDownAnimation4 {
    0% {
      height: 0;
    }
    100% {
      height: 180px;
    }
  }
  
  @keyframes slideDownAnimation5 {
    0% {
      height: 0;
    }
    100% {
      height: 210px;
    }
  }

  @keyframes slideDownAnimation6 {
    0% {
      height: 0;
    }
    100% {
      height: 210px;
    }
  }

  @keyframes fadeOutAnimation {
    0% {
      opacity: 1;
    }
    100% {
      height: 0;
      pointer-events: none;
      opacity: 0;
    }
  }

  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      display: block;
      opacity: 1;
    }
  }
`

export const inputStyle = {
  input: (baseStyles,state) => (
    {
      ...baseStyles,
      minWidth: 150,
      height: 36,
      borderRadius: 5,
    })
}
export const TextMainColor = styled.span`
  color: ${mainColor};
`
export const BoardContainer = styled.div`
  padding: 10px 30px 30px;
  background-color: #f8f8f8;
`

export const TitleContainer = styled.div`
  & h1 {
    font-size: 20px;
    font-weight: 700;
  }
`
export const Board = styled.div`
  margin-bottom: 30px;
  width: 100%;
  background-color: #fff;
  padding: 0 40px 40px 40px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  border: solid 1px ${borderColor};
`

export const BoardTap = styled.div`
  margin: 0 0 34px 0;
  width: 100%;
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 0 20px 20px 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`

export const BoardTapTitle = styled.div`
  margin-top: 34px;
  padding: 12px 0;
  width: 300px;
  background-color: #fff;
  text-align: center;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  font-size: 17px;
  font-weight: bold;
`

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 12px;
  width: 100%;
  border-bottom: 1px solid ${lightGray};
  font-weight: bold;
  &> div:first-child {
    font-size: 17px;
  }
`

export const BoardSearchDetail = styled.div`
  padding: 10px 0;
`

export const DashBoardCard = styled.div`
  margin-bottom: 30px;
  width: 100%;
  background-color: #fff;
  padding: 20px 35px;
  border-radius: 20px;
  border: solid 1px ${borderColor};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`

export const DashBoardColSpan2 = styled.div`
  display: flex;
  width: 50%;
`

export const DashBoardHeader = styled.div`
  margin-bottom: 15px;
  width: 100%;
  font-size: 17px;
  font-weight: bold;
`

export const BoardTableContainer = styled.div`
  & table {
    width: 100%;
    border-top: 1px solid ${lightGray};
    border-bottom: 1px solid ${lightGray};
    & tr {
      & th {
        padding: 14px 0;
        background-color: #fafafa;
        font-size: 15px;
        color: #b2b2b2;
        font-weight: normal;
        white-space: nowrap;
      }
      & td {
        padding: 14px 0;
        word-break: break-word;
        border-top: 1px solid ${lightGray};
        text-align: center;
        & a {
          border-bottom: 1px solid #777;
        }
      }
    }
  }
  
`
export const RowSpan = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`

export const ColSpan1 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 25%;
  gap: 10px;
  & > div:first-child {
    white-space: nowrap;
    flex-shrink: 0;
  }
  & > div:last-child {
    display: flex;
    width: 100%;
    min-height: 45px;
    align-items: center;
  }
  & > div:last-child > * {
    margin-right: 10px;
  }
`

export const ColSpan2 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 50%;
  gap: 10px;
  & > div:first-child {
    white-space: nowrap;
    flex-shrink: 0;
  }
  & > div:last-child {
    display: flex;
    width: 100%;
    min-height: 45px;
    padding-right: 5px;
    align-items: center;
  }
  & > div:last-child > * {
    margin-right: 10px;
  }
`

export const ColSpan3 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 75%;
  gap: 10px;
  & > div:first-child {
    white-space: nowrap;
    flex-shrink: 0;
  }
  & > div:last-child {
    display: flex;
    width: 100%;
    min-height: 45px;
    padding-right: 5px;
    align-items: center;
  }
  & > div:last-child > * {
    margin-right: 10px;
  }
`

export const ColSpan4 = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  & > div:first-child {
    white-space: nowrap;
    flex-shrink: 0;
  }
  & > div:last-child {
    display: flex;
    white-space: nowrap;
    width: 100%;
    min-height: 45px;
    padding-right: 5px;
    align-items: center;
  }
  & > div:last-child > * {
    margin-right: 10px;
  }
`
export const ColTitle = styled.div`
  padding: 0 0 0 10px;
  min-width: 65px;
  text-align: left;
`

export const AgentType = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  height: 45px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  & label {
    white-space: nowrap;
  }
`
export const DateContainer = styled.div`
  display: flex;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  overflow: hidden;
`

export const CalendarBox = styled.div`
  display: flex;
  width: 55px;
  border-right: 1px solid ${lightGray};
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`

export const CalendarIcon = styled.div`
  width: 18px;
  height: 20px;
  background-image: url("/assets/images/common/icon_calendar.png");
  background-image: -webkit-image-set(url('/assets/images/common/icon_calendar.png') 1x,url('/assets/images/common/icon_calendar@2x.png') 2x, url('/assets/images/common/icon_calendar@3x.png') 3x);
`

export const CustomDatePicker = styled(DatePicker)`
  border: none !important;
  color: #a2aab2;
  font-size: 14px;
  width: 100%;
  padding: 0 20px;
`

export const RangePicker = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  height: 45px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  color: #777;
  & div {
    cursor: pointer;
  }
`

export const SearchInput = styled.div`
  position: relative;
  width: 100%;
  & input[type='text'] {
    padding: 0 20px;
    width: 100%;
    height: 45px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }
`

export const SearchButton = styled.button`
  width: 140px;
  height: 45px;
  border: 1px solid ${lightGray};
  background-color: #fff;
  border-radius: 5px;
`

export const BoardSearchResult = styled.div`
  margin: 20px 0;
`

export const BoardSearchResultTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0 20px 0;
  & span {
    color: ${mainColor};
  }
`

export const SaveExcelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 45px;
  border: 1px solid ${lightGray};
  background-color: #fff;
  &.listUp {
    &:after {
      background-image: url("/assets/images/common/icon_listup_off.png");
    }
    &:hover:after{
      background-image: url("/assets/images/common/icon_listup_on.png");
    }
  }
  &:after {
    margin-left: 5px;
    display: inline-block;
    content:"";
    width: 20px;
    height: 20px;
    background-image: url("/assets/images/common/icon_excel_off.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px;
  }
  &:hover {
    color: ${mainColor};
    &:after{
      background-image: url("/assets/images/common/icon_excel_on.png");
      background-image: -webkit-image-set(url("/assets/images/common/icon_excel_on@2x.png") 2x,url("/assets/images/common/icon_excel_on@3x.png") 3x);
    }
  }
`
export const ChartContainer = styled.div`
  margin: 20px 0 0 0;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
`

export const Span1 = styled.span`
  display: inline-block;
  width: 60px;
`
export const Span2 = styled.span`
  display: inline-block;
  width: 80px;
`
export const Span3 = styled.span`
  display: inline-block;
  width: 100px;
`
export const Span4 = styled.span`
  display: inline-block;
  width: 120px;
`

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  & button {
    margin: 8px;
    width: 200px;
    height: 60px;
    font-size: 16px;
    cursor: pointer;
  }
`
export const CancelButton = styled.button`
  border: 1px solid #535353;
  background-color: #fff;
`

export const SubmitButton = styled.button`
  background-color: #535353;
  color: #fff;
`

export const DefaultButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 45px;
  border: 1px solid ${lightGray};
  background-color: #535353;
  color: #fff;
`
export const DeleteButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-image: url("/assets/images/common/btn_delete_off.png");
  background-image: -webkit-image-set(url("/assets/images/common/btn_delete_off.png") 1x, url("/assets/images/common/btn_delete_off@2x.png") 2x, url("/assets/images/common/btn_delete_off@3x.png") 3x);
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  right: 15px;
  &:hover {
    background-image: url("/assets/images/common/btn_delete_on.png");
    background-image: -webkit-image-set(url("/assets/images/common/btn_delete_on.png") 1x, url("/assets/images/common/btn_delete_on@2x.png") 2x, url("/assets/images/common/btn_delete_on@3x.png") 3x);
  }
`
export const ValidationScript = styled.div`
  position: absolute;
  bottom: -20px;
  left: 5px;
  color: #f55a5a;
  font-size: 12px !important;
`
export const Input = styled('input')`
  padding:0 20px;
  width: 100%;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 5px;
  .btn-delete {
    width: 35px;
    height: 35px;
    background-image: url("/assets/images/common/btn_delete_off.png");
    background-image: -webkit-image-set(url("/assets/images/common/btn_delete_off.png") 1x, url("/assets/images/common/btn_delete_off@2x.png") 2x, url("/assets/images/common/btn_delete_off@3x.png") 3x);
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
      background-image: url("/assets/images/common/btn_delete_on.png");
      background-image: -webkit-image-set(url("/assets/images/common/btn_delete_on.png") 1x, url("/assets/images/common/btn_delete_on@2x.png") 2x, url("/assets/images/common/btn_delete_on@3x.png") 3x);
    }
  }
`

export const RelativeDiv = styled.div`
  position: relative;
  width: 100%;
  & > * {
    margin-right: 10px;
  }
`
export const AbsoluteDiv = styled.div`
  position: absolute;
  top: 10px;
  left: 50px;
  padding: 7px 12px;
  z-index: 1000;
  border: 1px solid ${lightGray};
  background-color: #f3f3f3;
  & > * {
    margin-right: 10px;
  }
`

export const TableButton = styled.button`
  padding: 7px 12px;
  border: 1px solid ${lightGray};
  background-color: #f3f3f3;
  border-radius: 5px;
`

export const Script = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background-image: url("/assets/images/table/icon_pop_off@2x.png");
  background-image: -webkit-image-set(url("/assets/images/table/icon_pop_off.png") 1x, url("/assets/images/table/icon_pop_off@2x.png") 2x, url("/assets/images/table/icon_pop_off@3x.png") 3x);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  &:hover {
    background-color: #f9fafb;
  }
`

export const Site = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background-image: url("/assets/images/table/icon_url_off.png");
  background-image: -webkit-image-set(url("/assets/images/table/icon_url_off.png") 1x, url("/assets/images/table/icon_url_off@2x.png") 2x, url("/assets/images/table/icon_url_off@3x.png") 3x);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  &:hover {
    background-color: #f9fafb;
  }
`

export const CopyCode = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background-image: url("/assets/images/table/icon_copy_off.png");
  background-image: -webkit-image-set(url("/assets/images/table/icon_copy_off.png") 1x, url("/assets/images/table/icon_copy_off@2x.png") 2x, url("/assets/images/table/icon_copy_off@3x.png") 3x);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  &:hover {
    background-color: #f9fafb;
  }
`

export const ReportsDetail = styled.div`
  margin-left: 10px;
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background-image: url("/assets/images/table/icon_pop_off@2x.png");
  background-image: -webkit-image-set(url("/assets/images/table/icon_pop_off.png") 1x, url("/assets/images/table/icon_pop_off@2x.png") 2x, url("/assets/images/table/icon_pop_off@3x.png") 3x);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  &:hover {
    background-color: #f9fafb;
  }
`