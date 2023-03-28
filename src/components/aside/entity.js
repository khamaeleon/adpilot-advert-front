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
    name: "campaign",
    header: "광고관리",
    child:[
      {
        name: "campaign",
        header: "캠페인 생성",
      },
      {
        name: "createCreative",
        header: "크리에이티브 생성",
      },
      {
        name: "manageCreative",
        header: "크리에이티브 관리",
      },
    ]
  },
  {
    name: "settings",
    header: "설정",
    child:[
      {
        name: "settings",
        header: "이벤트 단가 관리",
      },
      {
        name: "budgetEvent",
        header: "이벤트 예산 관리",
      },
      {
        name: "budgetTime",
        header: "시간별 예산 관리",
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