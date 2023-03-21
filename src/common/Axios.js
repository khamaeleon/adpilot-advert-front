import {ADMIN_SERVER, MEDIA_SERVER} from "../constants/GlobalConst.js";
import {adminAxios} from "./AdminAxios";
import {nonUserAxios} from "./NonUserAxios";
import {mediaAxios} from "./MediaAxios";

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
  const accessToken = localStorage.getItem("accessToken");

  return fetch(MEDIA_SERVER + uri, {
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

export async function MediaAxios(type, uri, param) {
  switch(type){
    case 'GET' : return mediaAxios.get(uri);
    case 'POST' : return mediaAxios.post(uri, param);
    case 'PUT' : return mediaAxios.put(uri, param);
    case 'DELETE' : return mediaAxios.delete(uri, {data:param});
    default : return null;
  }
}

