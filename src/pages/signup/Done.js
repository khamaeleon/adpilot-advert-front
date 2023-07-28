import React from "react";
import {AfterSignUpGuild, Round} from "./styles";

export default function Done() {
  return (
    <article>
      <AfterSignUpGuild>
        <Round />
        <div className={'tit'}>I AM의 회원이 되신 것을 환영합니다!</div>
        {/*<div className={'txt'}>최적화된 광고 지면 관리를 통해 최대 광고 수익률을 제공하겠습니다.</div>*/}
      </AfterSignUpGuild>
    </article>
  )
}