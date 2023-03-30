import {ADMIN_SERVER, ADVER_SERVER} from "../constants/GlobalConst.js";
import {adminAxios} from "./AdminAxios";
import {nonUserAxios} from "./NonUserAxios";
import {adverAxios} from "./AdverAxios";
import store from "../store";
import {tokenResultAtom} from "../pages/login/entity";

export async function AdminAxios(type, uri, param) {
  switch(type){
    case 'GET' : return adminAxios.get(uri);
    case 'POST' : return adminAxios.post(uri, param);
    case 'PUT' : return adminAxios.put(uri, param);
    case 'DELETE' : return adminAxios.delete(uri, {data:param});
    default : return null;
  }
}

export async function AxiosImage(type, uri, formData) {
  // const accessToken = store.getState().auth.accessToken
  const tokenAtom =store.get(tokenResultAtom)
  return fetch(ADVER_SERVER + uri, {
    method: type,
    headers: {
      Authorization: `Bearer  ${tokenAtom.accessToken}`,
    },
    validateStatus: function (status) {
      return status <= 500;
    },
    body: formData
  })
}

export async function AxiosFile(type, uri, formData) {
  // const accessToken = store.getState().auth.accessToken
  const accessToken =""
  return fetch(ADMIN_SERVER + uri, {
    method: type,
    headers: {
      Authorization: `Bearer  ${accessToken}`,
    },
    validateStatus: function (status) {
      return status <= 500;
    },
    body: formData
  })
}

export async function NonUserAxios(type, uri, param) {
  switch(type){
    case 'GET' : return nonUserAxios.get(uri);
    case 'POST' : return nonUserAxios.post(uri, param);
    case 'PUT' : return nonUserAxios.put(uri, param);
    case 'DELETE' : return nonUserAxios.delete(uri, {data:param});
    default : return null;
  }
}

export async function AdverAxios(type, uri, param) {
  switch(type){
    case 'GET' : return adverAxios.get(uri);
    case 'POST' : return adverAxios.post(uri, param);
    case 'PUT' : return adverAxios.put(uri, param);
    case 'DELETE' : return adverAxios.delete(uri, {data:param});
    default : return null;
  }
}

