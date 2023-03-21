import {atom} from "jotai/index";

/**
 *
 * @type global modal Controller
 */
export const modalController = atom({
  isShow: false,
  modalComponent: null,
  reRender: false
})

export const roleAtom = atom('')