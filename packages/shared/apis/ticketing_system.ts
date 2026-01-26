import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const TicketingSystemEndpoints: { [key: string]: Endpoint } = {
  addMainClassification: { url: "MainClassification", method: "post" },
  getMainClassification: { url: "MainClassification", method: "get" },
  getMainClassificationById: { url: "MainClassification", method: "getById" },
  putMainClassification: { url: "MainClassification", method: "putById" },
  deleteMainClassification: { url: "MainClassification", method: "delete" },
  getTreeOfMainClassification: {
    url: "/MainClassification/GetTree",
    method: "getById",
  },
  getMainClassificationtTitleDetailesByMainClassificationId: {
    url: "/MainClassificationtTitleDetailes/GetMainClassificationtTitleDetailesByMainClassificationId",
    method: "get",
  },
  getMainClassificationRequesters: {
    url: "MainClassificationRequester",
    method: "getById",
  },
  addMainClassificationRequester: {
    url: "MainClassificationRequester",
    method: "post",
  },
  putMainClassificationRequester: {
    url: "MainClassificationRequester",
    method: "put",
  },
  deleteMainClassificationRequester: {
    url: "MainClassificationRequester",
    method: "deleteByBody",
  },
  getMainClassificationTechnicians: {
    url: "MainClassificationTechnician",
    method: "getById",
  },
  addMainClassificationTechnician: {
    url: "MainClassificationTechnician",
    method: "post",
  },
  putMainClassificationTechnician: {
    url: "MainClassificationTechnician",
    method: "put",
  },
  deleteMainClassificationTechnician: {
    url: "MainClassificationTechnician",
    method: "deleteByBody",
  },
  getfMainClassification: {
    url: "MainClassification",
    method: "get",
  },
  getfMainClassificationLoginUser: {
    url: "MainClassification/GetAllMainClassificationUserloginQuery",
    method: "get",
  },
  getAllMainClassificationUserloginTechnacian: {
    url: "MainClassification/GetAllMainClassificationUserlogintechnacian",
    method: "get",
  },
  getElectronicServicesByMainId: {
    url: "MainClassification/GetElectronicsServicesByMainId",
    method: "getById",
  },
  // category
  postCategory: { url: "Category", method: "post" },
  getCategory: { url: "Category", method: "get" },
  getCategoryById: { url: "Category", method: "getById" },
  putCategory: { url: "Category", method: "putById" },
  deleteCategory: { url: "Category", method: "delete" },

  getCategoryRequesters: {
    url: "Category/categoryRequesters",
    method: "getById",
  },
  addCategoryRequester: { url: "CategoryRequester", method: "post" },
  putCategoryRequester: { url: "CategoryRequester", method: "put" },
  deleteCategoryRequester: { url: "CategoryRequester", method: "deleteByBody" },

  getCategoryTechnicians: {
    url: "Category/categoryTechnicians",
    method: "getById",
  },
  addCategoryTechnician: { url: "CategoryTechnician", method: "post" },
  putCategoryTechnician: { url: "CategoryTechnician", method: "put" },
  deleteCategoryTechnician: {
    url: "CategoryTechnician",
    method: "deleteByBody",
  },

  // service category
  getServiceCatalog: { url: "ServiceCatalog", method: "get" },
  getServiceCatalogById: { url: "ServiceCatalog", method: "getById" },
  postServiceCatalog: { url: "ServiceCatalog", method: "post" },
  putServiceCatalog: { url: "ServiceCatalog", method: "putById" },
  deleteServiceCatalog: { url: "ServiceCatalog", method: "delete" },
  getServiceCatalogRequesters: {
    url: "ServiceCatalogRequester",
    method: "getById",
  },
  addServiceCatalogRequester: {
    url: "ServiceCatalogRequester",
    method: "post",
  },
  putServiceCatalogRequester: { url: "ServiceCatalogRequester", method: "put" },
  deleteServiceCatalogRequester: {
    url: "ServiceCatalogRequester",
    method: "deleteByBody",
  },
  getServiceCatalogTechnicians: {
    url: "ServiceCatalogTechnician",
    method: "getById",
  },
  addServiceCatalogTechnician: {
    url: "ServiceCatalogTechnician",
    method: "post",
  },
  putServiceCatalogTechnician: {
    url: "ServiceCatalogTechnician",
    method: "put",
  },
  deleteServiceCatalogTechnician: {
    url: "ServiceCatalogTechnician",
    method: "deleteByBody",
  },

  addItem: { url: "Item", method: "post" },
  getItem: { url: "Item", method: "get" },
  getItemById: { url: "Item", method: "getById" },
  putItemById: { url: "Item", method: "putById" },
  deleteItemById: { url: "Item", method: "delete" },
  getItemByRequestTemplateId: {
    url: "Item/getItemByRequestTemplateId/id",
    method: "get",
  },
  getItemRequesters: { url: "itemRequesters", method: "getById" },
  addItemRequester: { url: "ItemRequester", method: "post" },
  putItemRequester: { url: "ItemRequester", method: "put" },
  deleteItemRequester: { url: "ItemRequester", method: "deleteByBody" },
  getItemTechnicians: { url: "itemTechnicians", method: "getById" },
  addItemTechnician: { url: "ItemTechnician", method: "post" },
  putItemTechnician: { url: "ItemTechnician", method: "put" },
  deleteItemTechnician: { url: "ItemTechnician", method: "deleteByBody" },

  // electronicServices
  getElectronicServices: {
    url: "MainClassification/GetAllElectronicsServices",
    method: "get",
  },
  addMainClassificationDetailsTitle: {
    url: "MainClassificationtTitleDetailes",
    method: "post",
  },
  putMainClassificationDetailsTitle: {
    url: "MainClassificationtTitleDetailes",
    method: "put",
  },
};

export const TicketingSystemRootUrl = (window as any)._env_
  ?.REACT_APP_API_Service_Management_Url;
export const TicketingSystemBaseUrl = `${TicketingSystemRootUrl}/api/`;

export const TicketingSystemConsume = initializeConsume(
  TicketingSystemBaseUrl,
  TicketingSystemEndpoints
);
