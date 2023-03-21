import {Component} from "react";
import {Link} from "react-router-dom";
import {DefaultButton} from "../assets/GlobalStyles";
import styled from "styled-components";

export class NotFound extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div id='container'>
        <NotFoundPage>
         <div>
           <Not>404</Not>
           <p>찾을수 없는 페이지 입니다.</p>
           <p>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다 :)</p>
           <Link to={'/'}><DefaultButton>홈으로 이동</DefaultButton></Link>
         </div>
        </NotFoundPage>
      </div>
    );
  }
}
const Not = styled.div`
  padding-left: 40px;
  font-size: 150px;
  font-weight: 100;
  line-height: 200px;
  letter-spacing: 40px;  
`

const NotFoundPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 30px;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 50px 150px;
  }
  & a > button {
    display: inline-block;
    margin-top: 20px;
  }
`