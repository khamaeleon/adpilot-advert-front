export const defaultIcon = {
  dashboard: "/assets/images/aside/gmd_menu_01_off@3x.png",
  media:'/assets/images/aside/gmd_menu_02_off@3x.png',
  adExchange:'/assets/images/aside/gmd_menu_03_off@3x.png',
  reports:'/assets/images/aside/gmd_menu_04_off@3x.png',
  account:'/assets/images/aside/gmd_menu_05_off@3x.png',
  platform:'/assets/images/aside/gmd_menu_06_off@3x.png'
}

export const selectedIcon = {
  dashboard: "/assets/images/aside/gmd_menu_01_on@3x.png",
  media:'/assets/images/aside/gmd_menu_02_on@3x.png',
  adExchange:'/assets/images/aside/gmd_menu_03_on@3x.png',
  reports:'/assets/images/aside/gmd_menu_04_on@3x.png',
  account:'/assets/images/aside/gmd_menu_05_on@3x.png',
  platform:'/assets/images/aside/gmd_menu_06_on@3x.png'
}

export const menuList = [
  {
    name: "dashboard",
    header: "대쉬보드",
    child: []
  },
  {
    name: "media",
    header: "지면관리",
    child:[
      {
        name: "media",
        header: "지면 관리",
      },
      {
        name: "media2",
        header: "지면 리스트",
      },
    ]
  },
  {
    name: "adExchange",
    header: "애드익스체인지 관리",
    child:[
      {
        name: "adExchange",
        header: "서비스 수신 연동",
      }
    ]
  },
  {
    name: "reports",
    header: "보고서",
    child:[
      {
        name: "reports",
        header: "기간별 보고서",
      },
      {
        name: "reports2",
        header: "매체별 보고서",
      },
      {
        name: "reports3",
        header: "지면별 보고서",
      },
      {
        name: "reports4",
        header: "외부 연동 수신 보고서",
      },
    ]
  },
  {
    name: "account",
    header: "정산관리",
    child:[
      {
        name: "account",
        header: "정산 관리",
      },
      {
        name: "accountHistory",
        header: "정산 이력",
      },
      {
        name: "accountProfile",
        header: "정산 프로필 관리",
      },
      {
        name: "accountConfirm",
        header: "정산 심사",
      },
      {
        name: "accountData",
        header: "데이터 관리",
      },
    ]
  },
  {
    name: "platform",
    header: "플랫폼 관리",
    child:[
      {
        name: "platform",
        header: "사용자 관리",
      },
      {
        name: "platform3",
        header: "지면 이력 관리",
      },
      {
        name: "platform4",
        header: "애드 익스체인지 이력 관리",
      }
    ]
  },
]


export const narrowStyle = {
  li: {
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 15
  },
  icon: {
    backgroundImage: "-webkit-image-set(url('/assets/images/logos/logo_w.png') 1x, url('/assets/images/logos/logo_w@2x.png') 2x,url('/assets/images/logos/logo_w@3x.png') 3x)",
    width: 28,
  },
  button: {
    transform: "rotate(180deg)"
  }
}
export const widenStyle = {
  li:{
    marginLeft: 0,
    marginRight: 0,
  },
  icon: {
    backgroundImage: "url(/assets/images/logos/logo_inline_w@3x.png)",
    width: 148,
  },
}