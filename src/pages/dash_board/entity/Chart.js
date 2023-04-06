import {atom} from "jotai";
import {SwitchComponent} from "../../../components/table";
import {updatePixelInterlock} from "../../../services/header/ManagePixelAxios";
import {Link} from "react-router-dom";
import React from "react";
import {statusTypeAll} from "../../pixel/entity/Pixel";

/* 플랫폼 현황 차트 셀렉트 */
export const platformStatusType = [
  {id: 1, value: "DEFAULT", label: "광고주수"},
  {id: 2, value: "PRODUCT_CODE", label: "총노출수"},
  {id: 3, value: "PRODUCT_NAME", label: "총클릭수"},
  {id: 4, value: "PRODUCT_NAME", label: "클릭률"},
  {id: 5, value: "PRODUCT_NAME", label: "비용"},
  {id: 6, value: "PRODUCT_NAME", label: "CPC"},
  {id: 7, value: "PRODUCT_NAME", label: "전환율"},
  {id: 8, value: "PRODUCT_NAME", label: "전환단가"},
  {id: 9, value: "PRODUCT_NAME", label: "평균"},
  {id: 10, value: "PRODUCT_NAME", label: "구매액"},
  {id: 11, value: "PRODUCT_NAME", label: "ROAS"},
  {id: 12, value: "PRODUCT_NAME", label: "Ecpm"},
]
/*플랫폼 현황 차트 데이터*/
//export const platformStatusAtom = atom([])
export const platformStatusAtom = atom([
  {
    "id": "클릭수",
    "data": [
      {
        "x": "2023.03.01",
        "y": 158
      },
      {
        "x": "2023.03.02",
        "y": 39
      },
      {
        "x": "2023.03.03",
        "y": 185
      },
      {
        "x": "2023.03.04",
        "y": 221
      },
      {
        "x": "2023.03.05",
        "y": 69
      },
      {
        "x": "2023.03.06",
        "y": 215
      },
      {
        "x": "2023.03.07",
        "y": 222
      }
    ]
  },
  {
    "id": "노출수",
    "data": [
      {
        "x": "2023.03.01",
        "y": 257
      },
      {
        "x": "2023.03.02",
        "y": 193
      },
      {
        "x": "2023.03.03",
        "y": 223
      },
      {
        "x": "2023.03.04",
        "y": 217
      },
      {
        "x": "2023.03.05",
        "y": 34
      },
      {
        "x": "2023.03.06",
        "y": 296
      },
      {
        "x": "2023.03.07",
        "y": 179
      }
    ]
  },
  {
    "id": "전환수",
    "data": [
      {
        "x": "2023.03.01",
        "y": 43
      },
      {
        "x": "2023.03.02",
        "y": 122
      },
      {
        "x": "2023.03.03",
        "y": 216
      },
      {
        "x": "2023.03.04",
        "y": 197
      },
      {
        "x": "2023.03.05",
        "y": 191
      },
      {
        "x": "2023.03.06",
        "y": 11
      },
      {
        "x": "2023.03.07",
        "y": 46
      }
    ]
  },
])