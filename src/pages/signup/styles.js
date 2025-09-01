import styled from "styled-components";
import {
  bgColor,
  borderColor,
  mainColor,
  whiteColor
} from "../../assets/GlobalStyles";

export const SignUpHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  //border-bottom: 1px solid #eee;
  background-image: linear-gradient(to left, ${whiteColor}, ${mainColor});
`
export const Logo = styled.div`
  width: 212px;
  height: 45px;
  background-image: url("/assets/images/logos/adpilot/logo_inline_w@2x.png");
  background-repeat: no-repeat;
  background-size: contain;
`
export const StepContainer = styled.div`
  height: 260px;
  & article {
    padding: 20px 0;
  }

  & article > div {
    & h1 {
      text-align: center;
      font-size: 40px;
    }

    & p {
      text-align: center;
      font-size: 20px;
    }
  }
`
export const Steps = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const Step = styled.div`
  display: flex;
  padding: 12px;
  width: 320px;
  border-radius: 50px;
  background-color: ${bgColor};

  & > div:first-child {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-size: 48px;
    background-position: center;
  }

  & > div:last-child {
    margin-left: 24px;

    & h3 {
      margin: 0;
      padding: 0;
      color: #ddd;
      font-size: 20px;
    }

    & p {
      margin: 0;
      padding: 0;
      font-size: 14px;
      text-align: left;
    }
  }
`
export const Arrow = styled.div`
  width: 15px;
  height: 20px;
  background-repeat: no-repeat;
  background-image: url("/assets/images/join/icon_next.png");
`
export const SignUpContents = styled.div`
  padding: 50px 0 70px 0;
  border-radius: 18px;
  background-color: ${bgColor};
  .done {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 480px);
  }
  & article {
    & h2 {
      margin-bottom: 10px;
    }

    & h3 {
      margin: 20px 0 10px 0;
    }
  }
`
export const TermsBox = styled.div`
  padding: 20px;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  border: 1px solid ${borderColor};
  background-color: #fff;
  overflow: auto;
`
export const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 28px 0;
`
export const VerticalRule = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
`
export const ButtonGroup = styled.div`
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    font-size: 16px;
    color: #535353;
    transition-duration: 0.5s;
    cursor: pointer;
  }

  & button:first-child {
    padding: 18px 60px;
    background-color: #fff;
    border: 1px solid #535353;

    &:hover {
      border: 1px solid ${mainColor};
      color: ${mainColor};
    }
  }

  & button:last-child {
    margin-left: 15px;
    padding: 18px 60px;
    background-color: #535353;
    color: #fff;

    &:hover {
      border: 0;
      background-color: #262626;
      color: #fff;
    }
  }
`
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  padding: 60px 40px;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${borderColor};

  & h2 {
    margin-top: 20px;
  }

  & > div {
    position: relative;
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 16px;
  }

  & > div > div:first-child {
    width: 120px;
  }

  & > div > div:last-child {
    display: flex;
    align-items: center;

    & > * {
      margin-right: 10px;
    }

    & > div > label {
      display: flex;
      align-items: center;
    }

    & input[type='radio'] + span {
      display: inline-block;
      margin: 0 0 0 10px;
    }

    & input[type='text'], input[type='password'] {
      min-width: 600px;
      height: 45px;
      border-radius: 5px;
      border: 1px solid ${borderColor};
      padding: 20px;
    }

    & select {
      height: 45px;
      border-radius: 5px;
      border: 1px solid ${borderColor};
      padding: 0 20px;
    }
  }
`
export const SignUpVerify = styled.button`
  width: 300px;
  height: 60px;
  background-color: #535353;
  font-size: 16px;
  color: #fff;
`
export const AfterSignUpGuild = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  & .tit {
    font-size: 25px;
    font-weight: 600;
    margin: 40px 0 15px 0;
  }
  & .txt {
    font-size: 18px;
  }
`
export const Round = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 100%;
  border: 1px solid ${borderColor};
  background-image: url("/assets/images/join/img_number_03.png");
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
`
export const ValidationScript = styled.div`
  position: absolute;
  bottom: -16px;
  left: 140px;
  color: #f55a5a;
  font-size: 12px !important;
`

export const DuplicateButton = styled.button`
  width: 150px;
  height: 45px;
  background-color: #777;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
`

export const BodyContainer = styled.div`
  padding: 0px 50px 50px 50px;
  background-image: linear-gradient(to left, ${whiteColor}, ${mainColor});
`