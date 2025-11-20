import {ADMIN_SERVER, ADVER_SERVER} from "../constants/GlobalConst.js";
import {adminAxios} from "./AdminAxios";
import {nonUserAxios} from "./NonUserAxios";
import {adverAxios} from "./AdverAxios";
import store from "../store";
import {tokenResultAtom} from "../pages/login/entity/Common";
import {refreshAdmin} from "../services/auth/AuthAxios";

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
  const tokenAtom = store.get(tokenResultAtom)

  let isTokenRefreshing = false;
  let refreshSubscribers = [];

  const onTokenRefreshed = () => {
    refreshSubscribers.map((callback) => callback());
  };

  const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
  };

  return fetch(ADMIN_SERVER + uri, {
    method: type,
    headers: {
      Authorization: `Bearer  ${tokenAtom.accessToken}`,
    },
    validateStatus: function (status) {
      return status <= 500;
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const { statusCode } = data;
    if(statusCode === 200) {
      return data;
    } else if(statusCode === 401 || statusCode === 403) {
      const retryOriginalRequest = new Promise(async (resolve) => {
        addRefreshSubscriber(() => {
          refreshSubscribers = [];
          isTokenRefreshing = false;
          resolve(AxiosImage(type, uri, formData));
        })
      });

      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        refreshAdmin().then(response => {
          const {dataEntity, status} = response
          const data = dataEntity.data;
          if (status === 200) {
            store.set(tokenResultAtom, {
              id: data.email,
              role: data.role,
              name: data.name,
              accessToken: data.token.accessToken
            })
            localStorage.setItem('role', data.role);
            onTokenRefreshed();
          } else {
            refreshSubscribers = [];
            isTokenRefreshing = false;
            window.location.replace('/')
          }
        })
      }
      return retryOriginalRequest;
    }
  }).catch(err => console.log(err))
}
export async function AxiosImageAdver(type, uri, formData) {
  const tokenAtom = store.get(tokenResultAtom)

  let isTokenRefreshing = false;
  let refreshSubscribers = [];

  const onTokenRefreshed = () => {
    refreshSubscribers.map((callback) => callback());
  };

  const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
  };

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
  .then(response => response.json())
  .then(data => {
    const { statusCode } = data;
    if(statusCode === 200) {
      return data;
    } else if(statusCode === 401 || statusCode === 403) {
      const retryOriginalRequest = new Promise(async (resolve) => {
        addRefreshSubscriber(() => {
          refreshSubscribers = [];
          isTokenRefreshing = false;
          resolve(AxiosImage(type, uri, formData));
        })
      });

      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        refreshAdmin().then(response => {
          const {dataEntity, status} = response
          const data = dataEntity.data;
          if (status === 200) {
            store.set(tokenResultAtom, {
              id: data.email,
              role: data.role,
              name: data.name,
              accessToken: data.token.accessToken
            })
            localStorage.setItem('role', data.role);
            onTokenRefreshed();
          } else {
            refreshSubscribers = [];
            isTokenRefreshing = false;
            window.location.replace('/')
          }
        })
      }
      return retryOriginalRequest;
    }
  }).catch(err => console.log(err))
}

export async function AxiosFile(type, uri, formData) {
  const tokenAtom = store.get(tokenResultAtom);

  let isTokenRefreshing = false;
  let refreshSubscribers = [];

  const onTokenRefreshed = () => {
    refreshSubscribers.map((callback) => callback());
  };

  const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
  };
  return fetch(ADMIN_SERVER + uri, {
    method: type,
    headers: {
      Authorization: `Bearer ${tokenAtom.accessToken}`,
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const {statusCode} = data;
    if(statusCode === 200) {
      return data;
    } else if(statusCode === 401 || statusCode === 403) {
      const retryOriginalRequest = new Promise(async (resolve) => {
        addRefreshSubscriber(() => {
          refreshSubscribers = [];
          isTokenRefreshing = false;
          resolve(AxiosFile(type, uri, formData));
        })
      });

      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        refreshAdmin().then(response => {
          const {data, statusCode} = response;
          if (statusCode === 200) {
            store.set(tokenResultAtom, {
              id: data.email,
              role: data.role,
              name: data.name,
              accessToken: data.token.accessToken
            })
            localStorage.setItem('role', data.role);
            onTokenRefreshed();
          } else {
            refreshSubscribers = [];
            isTokenRefreshing = false;
            window.location.replace('/')
          }
        })
      }
      return retryOriginalRequest;
    }
  }).catch(err => console.log(err))
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

