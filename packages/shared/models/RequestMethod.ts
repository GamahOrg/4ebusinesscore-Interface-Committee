export interface RequestMethod {
  get: (url: string, params?: any) => Promise<any>;
  getById: (url: string, id: any) => Promise<any>;
  getByMultipleIds:(url: string, params?: any) => Promise<any>;
  getByIdInMiddleUrl: (url: string, id: any) => Promise<any>;
  getByMultipleDynamicUrlParams:(url: string, id: any) => Promise<any>;
  getByIdInFirstUrl:(url: string, id: any) => Promise<any>;
  getByIdParams: (url: string, paramsOrBodyOrId: any) => Promise<any>;
  post: (url: string, body: {}) => Promise<any>;
  postByDynamicParamsWithBody: (url: string, body: {}) => Promise<any>;
  postById: (url: string,id:string, body: {}) => Promise<any>;
  postByParams: (url: string,id?:string, body?: {}) => Promise<any>;
  postByParamsWithBody:(url: string,id?:string, body?: {}) => Promise<any>;
  patch: (url: string, body: {}) => Promise<any>;
  put: (url: string, body: {}) => Promise<any>;
  putByQueryWithBody:(url: string, body: {}) => Promise<any>;
  putById: (url: string, id: string, body: {}) => Promise<any>;
  putByQuery: (url: string, id: string, body: {}) => Promise<any>;
  putByIdWithQuery: (url: string, id: string, body: {}) => Promise<any>;
  putByStatus: (url: string, id: string) => Promise<any>;
  patchById: (url: string,id:string, body: {}) => Promise<any>;
  delete: (url: string) => Promise<any>;
  deleteByDynamicParams: (url: string) => Promise<any>;
  deleteByIdQuery:(url: string) => Promise<any>;
  deleteByBody: (url: string, body: {}) => Promise<any>;
  deleteByQueryWithBody:(url: string) => Promise<any>;
  deleteByQuery:(url: string) => Promise<any>;
  deleteByQueryWithId:(url: string) => Promise<any>;
  }
  