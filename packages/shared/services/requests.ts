import { AxiosInstance, AxiosResponse } from "axios";
import { RequestMethod } from "../models/RequestMethod";
import createAxiosInstance from "./axios.config";

const responseBody = (response: AxiosResponse) => response.data;

export const initializeEndpoints = (
  instance: AxiosInstance,
  endpoints: { [key: string]: { url: string; method: keyof RequestMethod } }
): any => {
  const requests = createRequestsWithInstance(instance);

  const generatedEndpoints: any = {};
  Object.keys(endpoints).forEach((endpointName) => {
    const { url, method } = endpoints[endpointName];
    generatedEndpoints[endpointName] = (paramsOrBodyOrId?: any) => {
      if (method === "get") {
        return requests.get(url, paramsOrBodyOrId);
      } else if (method === "getById") {
        return requests.get(`${url}/${paramsOrBodyOrId}`);
      } else if (method === "getByMultipleIds") {
        return requests.get(`${url}/${paramsOrBodyOrId?.ids?.join("/")}`);
      }
       else if (method === "getByIdInMiddleUrl") {
        return requests.get(
          `${url?.split("/")[0]}/${paramsOrBodyOrId}/${url?.split("/")[1]}`
        );
      } 
      else if (method === "getByMultipleDynamicUrlParams") {
        let urlWithParams = url;
        const urlParts = url?.split("/");
        let paramIndex = 0;
        for (let i = 0; i < urlParts.length; i++) {
          if (urlParts[i]?.startsWith(":")) {
            const paramKey = urlParts[i]?.substring(1);
                  if (paramsOrBodyOrId[paramKey]) {
              urlParts[i] = paramsOrBodyOrId[paramKey];
              paramIndex++;
            } else {
            }
          }
        }
        urlWithParams = urlParts?.join("/");
        return requests.get(urlWithParams);
      }
      else if (method === "getByIdInFirstUrl") {
        return requests.get(`${paramsOrBodyOrId}${url}`);
      } else if (method === "getByIdParams") {
        return requests.get(
          `${url}/${paramsOrBodyOrId.id}`,
          paramsOrBodyOrId.params
        );
      } else if (method === "post") {
        return requests.post(url, paramsOrBodyOrId);
      } 
      else if (method === "postByDynamicParamsWithBody") {
        let {body}=paramsOrBodyOrId
        return requests.post(`${url}/${paramsOrBodyOrId?.ids?.join("/")}`,body);
      }
      else if (method === "postByParamsWithBody") {
        const { body, params } = paramsOrBodyOrId;
        const queryParams = new URLSearchParams(params).toString();
        return requests.post(
          `${url}?${queryParams}`,
          body
        );
      }
       else if (method === "postById") {
        return requests.post(`${url}/${paramsOrBodyOrId.id}`, paramsOrBodyOrId);
      } else if (method === "put") {
        return requests.put(url, paramsOrBodyOrId);
      } else if (method === "patch") {
        return requests.patch(url, paramsOrBodyOrId);
      } else if (method === "putById") {
        return requests.put(
          `${url}/${paramsOrBodyOrId.id}`,
          paramsOrBodyOrId?.body,
        );}
        else if (method === "putByIdWithQuery") {
          let id=paramsOrBodyOrId?.id
          let params=paramsOrBodyOrId?.params
          const queryParams = new URLSearchParams(params).toString();
          return requests.put(
            `${url}/${id}?${queryParams}`
          );
      } 
      else if (method === "putByQuery") {
        const queryParams = new URLSearchParams(paramsOrBodyOrId).toString();
        return requests.put(
          `${url}?${queryParams}`
        );
    } 
    else if (method === "putByQueryWithBody") {
      let {params,body}=paramsOrBodyOrId
      const queryParams = new URLSearchParams(params).toString();
      return requests.put(
        `${url}?${queryParams}`,body
      );
      }else if (method === "patchById") {
        return requests.patch(
          `${url}/${paramsOrBodyOrId.id}`,
          paramsOrBodyOrId?.body
        );
      } else if (method === "delete") {
        return requests.delete(`${url}/${paramsOrBodyOrId}`);
      } 
      else if (method === "deleteByDynamicParams") {
        return requests.delete(`${url}/${paramsOrBodyOrId?.ids?.join("/")}`);
      }
      else if (method === "deleteByBody") {
        return requests.deleteByBody(`${url}`, paramsOrBodyOrId);
      } else if (method === "deleteByIdQuery") {
        return requests.delete(`${url}?id=${paramsOrBodyOrId?.id}`);
      } 
      else if (method === "deleteByQuery") {
        const queryParams = new URLSearchParams(paramsOrBodyOrId).toString();
        return requests.delete(`${url}?${queryParams}`);
      }
      else if (method === "deleteByQueryWithBody") {
        let {params,body}=paramsOrBodyOrId
        const queryParams = new URLSearchParams(params).toString();
        return requests.deleteByBody(`${url}?${queryParams}`,body);
      }
      else if (method === "deleteByQueryWithId") {
        let {params,body}=paramsOrBodyOrId
        let id=body?.id
        const queryParams = new URLSearchParams(params).toString();
        return requests.delete(`${url}/${id}?${queryParams}`);
      }
      else {
        throw new Error("Invalid HTTP method provided");
      }
    };
  });

  return generatedEndpoints;
};

const createRequestsWithInstance = (instance: AxiosInstance) => {
  return {
    get: (url: string, params?: any) =>
      instance.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) =>
      instance.post(url, body).then(responseBody),
    put: (url: string, body?: {}) => instance.put(url, body).then(responseBody),
    patch: (url: string, body: {}) =>
      instance.patch(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
    deleteByBody: (url: string, body: {}) =>
      instance.delete(url, { data: body }).then(responseBody),
  };
};

const initializeConsume = (
  baseUrl: string,
  endpoints: { [key: string]: { url: string; method: keyof RequestMethod } }
) => {
  const instance = createAxiosInstance(baseUrl);
  const consume = initializeEndpoints(instance, endpoints);
  return consume;
};

export default initializeConsume;
