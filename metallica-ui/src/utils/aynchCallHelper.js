import wretch from "wretch";
import { getApiBaseUrl, getUserSessionToken } from "../core/appSession";

const extApi = wretch()
  .url(getApiBaseUrl())
  .options({ mode: "cors" });

const getExternalApi = req => {
  let externalApi = extApi;
  if (!req.unAuthenticated) {
    externalApi = externalApi
      .auth(`Bearer ${getUserSessionToken()}`)
  }
  return externalApi;
};

const getAsync = req => {
  return getExternalApi(req)
    .url(req.url)
    .get()
    .json(data => {
      return Promise.resolve(data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const postAsync = req => {
  return getExternalApi(req)
    .url(req.url)
    .post(req.data)
    .json(data => {
      return Promise.resolve(data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const putAsync = req => {
  return getExternalApi(req)
    .url(req.url)
    .put(req.data)
    .json(data => {
      return Promise.resolve(data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const deleteAsync = req => {
  return getExternalApi(req)
    .url(req.url)
    .delete()
    .json(data => {
      return Promise.resolve();
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export default {
  getAsync,
  postAsync,
  putAsync,
  deleteAsync
};
