import Navigator from "../../components/common/Navigator";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import React from "react";
import {useParams} from "react-router-dom";
import PixelList from "./PixelList";
import PixelDetail from "./PixelDetail";

export default function Pixel() {
  const params = useParams()
  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>픽셀 관리</h1>
          <Navigator/>
        </TitleContainer>
        {/* 픽셀 관리 */}
        {params.id === 'pixel' && <PixelList/>}
        {params.id === 'pixelDetail' && <PixelDetail/>}
      </BoardContainer>
    </main>
  )
}