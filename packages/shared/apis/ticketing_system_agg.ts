import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const TicketingSystemAggEndpoints: { [key: string]: Endpoint } = {
  GetReportsForTechnicalSupportManager: {
    url: "Report/GetReportsForTechnicalSupportManager",
    method: "get",
  },
  GetReportsForAdministrationManager: {
    url: "Report/GetReportsForAdministrationManager",
    method: "get",
  },
  GetcountReportsForAdministrationManager: {
    url: "Report/GetcountReportsForAdministrationManager",
    method: "get",
  },
  GetReportsForAdministrationEmployee: {
    url: "Report/GetMyReport",
    method: "get",
  },
  GetReportsForTechnicalSupportEmployee: {
    url: "Report/GetReportsForTechnicalSupportEmployee",
    method: "get",
  },
  StatisticsReportAdministrationForAdministrationManager: {
    url: "Report/StatisticsReportAdministrationForAdministrationManager",
    method: "get",
  },
  StatisticsReportAdministrationForTechnicalSupportManager: {
    url: "Report/StatisticsReportAdministrationForTechnicalSupportManager",
    method: "get",
  },
  StatisticsReportEmployeeForAdministrationManager: {
    url: "Report/StatisticsReportEmployeeForAdministrationManager",
    method: "get",
  },
  StatisticsReportEmployeeForTechnicalSupportManager: {
    url: "Report/StatisticsReportEmployeeForTechnicalSupportManager",
    method: "get",
  },
  GetReportNoteByReportId: {
    url: "/Report/GetReportNoteByReportId",
    method: "getById",
  },
  getMainclassficationloggedinUserAdmin: {
    url: "MainClassification/GetMainclassficationloggedinUserAdmin",
    method: "get",
  },
  GetReportDataByReportId: {
    url: "OpertationReport/GetReportDataByReportId",
    method: "getById",
  },
  GetAllTechnicalByMainId: {
    url: "OpertationReport/GetAllTechnicalByMainId",
    method: "getById",
  },
  PutOperationReportConverted: {
    url: "OpertationReport/PutOperationReportStatusConverted",
    method: "putById",
  },
  PutReportStatusRejected: {
    url: "OpertationReport/PutOperationReportStatusRejected",
    method: "putById",
  },
  PutOperationReportStatusReopen: {
    url: "OpertationReport/PutOperationReportStatusReopen",
    method: "putById",
  },
  PutOperationReportStatusClosed: {
    url: "OpertationReport/PutOperationReportStatusClosed",
    method: "putById",
  },
  PutOperationReportStatusDelay: {
    url: "OpertationReport/PutOperationReportStatusDelay",
    method: "putById",
  },
  PostOperationReport: {
    url: "OpertationReport/PostOperationReport",
    method: "post",
  },
  GetMangerToRequesterByReportId: {
    url: "OpertationReport/GetMangerToRequesterByReportId",
    method: "getById",
  },
  GetCount: {
    url: "Report/GetCount",
    method: "get",
  },
  GetCountAdmin: {
    url: "Report/GetCountAdmin",
    method: "get",
  },
  GetMyReportCount: {
    url: "Report/GetMyReportCount",
    method: "get",
  },
  GetRequsetdReportbyId: {
    url: "Report/GetRequsetdReport",
    method: "get",
  },
  PutOperationReportStatusAccepted: {
    url: "OpertationReport/PutOperationReportStatusAccepted",
    method: "putById",
  },
  PutConsentRequestStatus: {
    url: "OpertationReport/PutConsentRequestStatus",
    method: "putById",
  },
  PutOperationReportStatusSolved: {
    url: "OpertationReport/PutOperationReportStatusSolved",
    method: "putById",
  },
  PostConsentRequest: {
    url: "OpertationReport/PostConsentRequest",
    method: "post",
  },
  getAllEscalationLevels: { url: "/EscalationLevel", method: "get" },
  getEscalationLevelById: { url: "/EscalationLevel", method: "getById" },
  getAllEscalationLevelsBySlaId: {
    url: "/EscalationLevel/GetAllEscalationLevelsBySlaId",
    method: "getById",
  },

  resolveReport: { url: "/ResolveReport/GetResolve", method: "get" },
  addResolver: { url: "/ResolveReport", method: "post" },
  getResolverComponent: {
    url: "/ResolveReport/GetResolveById",
    method: "getById",
  },
  editResolver: { url: "/ResolveReport/PutResolveReport", method: "putById" },
  getMainClassification: { url: "/MainClassification", method: "get" },
  deleteMainClassification: { url: "MainClassification", method: "delete" },
  getServiceCatalog: {
    url: "/MainClassification/ServiceCatalog",
    method: "getById",
  },
  getAllReportStep: {
    url: "/OpertationReport/GetAllReportStep",
    method: "getById",
  },
  getAllReportStatus: {
    url: "/OpertationReport/GetAllReportStatus",
    method: "getById",
  },

  addReport: { url: "TicketingOperation/PostReport", method: "post" },
  addService: { url: "TicketingOperation/PostService", method: "post" },
  getMainClassificationRequesters: {
    url: "MainClassification/requesters",
    method: "getByIdParams",
  },
  getMainClassificationTechnicians: {
    url: "MainClassification/technicians",
    method: "getByIdParams",
  },
  getServiceCatalogRequesters: {
    url: "ServiceCatalog/requesters",
    method: "getById",
  },
  getServiceCatalogTechnicians: {
    url: "ServiceCatalog/technicians",
    method: "getById",
  },
  getCategoryRequesters: {
    url: "Category/categoryRequesters",
    method: "getByIdParams",
  },
  getCategoryTechnicians: {
    url: "Category/categoryTechnicians",
    method: "getById",
  },
  getItemRequesters: { url: "Item/itemRequesters", method: "getByIdParams" },
  getItemTechnicians: { url: "Item/itemTechnicians", method: "getById" },
  getTechniciansServiceCatalog: {
    url: "ServiceCatalog/TechniciansServiceCatalog",
    method: "getById",
  },
  getTechniciansCategory: {
    url: "Category/TechniciansCategory",
    method: "getById",
  },
  getTechniciansItem: { url: "Item/TechniciansItem", method: "getById" },
  getFilterReportsForTechnicalSupportManager: {
    url: "ReportFilter/GetFilterReportsForTechnicalSupportManager",
    method: "postByParams",
  },
  getFilterMyReport: {
    url: "ReportFilter/GetFilterMyReport",
    method: "postByParams",
  },
  getFilterReportsForAdministrationManager: {
    url: "ReportFilter/GetFilterReportsForAdministrationManager",
    method: "postByParams",
  },
  getFilterReportsForAdministrationEmployee: {
    url: "ReportFilter/GetFilterReportsForAdministrationEmployee",
    method: "postByParams",
  },
  getFilterReportsForTechnicalSupportEmployee: {
    url: "ReportFilter/GetFilterReportsForTechnicalSupportEmployee",
    method: "postByParams",
  },
  getItemById: { url: "Item", method: "getById" },
  getReportDataByRequestinstanceId: {
    url: "Integration/GetReportDataByRequestinstanceId",
    method: "getById",
  },
  editOperationReportStatus: {
    url: "OpertationReport/UpdateOperationReportStatus",
    method: "putById",
  },
};

export const TicketingSystemAggRootUrl =
  (window as any)._env_?.REACT_APP_API_Ticketing_Agg_Url + "/";
export const TicketingSystemAggBaseUrl = `${TicketingSystemAggRootUrl}api/`;

export const TicketingSystemAggConsume = initializeConsume(
  TicketingSystemAggBaseUrl,
  TicketingSystemAggEndpoints
);
