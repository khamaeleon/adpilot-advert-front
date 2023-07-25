import {Component} from "react";
import {Link} from "react-router-dom";
import {DefaultButton} from "../assets/GlobalStyles";
import styled from "styled-components";

export class ServerError extends Component {
  render() {
    return (
      <div id='container'>
        <NotFoundPage>
          <div>
            <Not>500</Not>
            <p>서버 점검중</p>
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