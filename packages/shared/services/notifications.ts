import { NotificationsConsume } from "@4eplatform/shared/apis/notification";
import { getWorkspaceKey } from "@4eplatform/shared/index";

// const enum SettingStaus {
//   Received,
//   Delayed,
//   Remainder,
//   Escalation,
//   Acccepted,
//   Refused,
//   Transormed,
//   DelayingSolve,
//   Solved,
//   CloseRequest,
//   ReOpenRequest,
// }
const createNotification = (
  to: string,
  url: string,
  email: string = "",
  systemNotification: boolean = true,
  settingStatus: number,
  titles: Record<string, string>,
  messages: Record<string, string>,
  workspaceKeyTo: number,
  reportid?: string,
  workspaceKey?: number,
  requestDate?: any,
  requestName?: string,
  requestType?: string,
  substsemid?: string | null,
  cardname?: string,
  mainclassificationId?: string | null,
  requestNumber?: string | null
) => {
  // NotificationsConsume.sendNotification( {
  NotificationsConsume.sendNotification({
    title: titles.ar,
    titleEn: titles.en,
    messageAr: messages.ar,
    messageEn: messages.en,
    receiverId: to,
    receiverEmail: email,
    settingStatus: settingStatus,
    actionUrl: url,
    sendSignalR: systemNotification,
    workspaceKey: workspaceKey || getWorkspaceKey(),
    workspaceKeyTo: workspaceKeyTo,
    reportid,
    date: requestDate,
    requestName: requestName,
    requestType: requestType,
    substsemid: substsemid || "",
    cardname: cardname || "",
    mainclassificationId: mainclassificationId || "",
    requestNumber: requestNumber || "",
  });
};

const notifications = {
  received: {
    settingStatus: 0,
    titles: { ar: "استلام طلب", en: "Receiving Request" },
    messages: {
      ar: "تم استلام طلبك !",
      en: "a new request has been received",
    },
  },
  delayed: {
    settingStatus: 1,
    titles: { ar: "تذكير", en: "Reminder" },
    messages: {
      ar: "نذكركم بضرورة متابعة الطلب، نأمل دعمكم الكريم",
      en: "Delay in resolving a request",
    },
  },
  remainder: {
    settingStatus: 2,
    titles: { ar: "تذكير", en: "Reminder" },
    messages: { ar: "تذكير", en: "reminder" },
  },
  escalation: {
    settingStatus: 3,
    titles: { ar: "تصعيد", en: "Escalation" },
    messages: { ar: "تصعيد", en: "escalation" },
  },

  accepted: {
    settingStatus: 4,
    titles: { ar: "موافقة طلب", en: "Accept Request" },
    messages: {
      ar: "تمت الموافقة على طلبك",
      en: "your request has been accepted",
    },
  },
  refused: {
    settingStatus: 5,
    titles: { ar: "رفض طلب", en: "Reject Request" },
    messages: {
      ar: "نعتذر، تم رفض طلبك",
      en: "your request has been rejected",
    },
  },
  transformed: {
    settingStatus: 6,
    titles: { ar: " تحويل طلب", en: "Transformed" },
    messages: { ar: "تم تحويل الطلب", en: "a request has been transformed" },
  },
  delayingSolve: {
    settingStatus: 7,
    titles: { ar: "تأخير الحل", en: "Delay the solution" },
    messages: {
      ar: "يوجد تأخير في حل الطلب",
      en: "delay in resolving the report",
    },
  },
  solved: {
    settingStatus: 8,
    titles: { ar: "إكتمال الطلب", en: "Your order is complete" },
    messages: {
      ar: "نفيدكم بأنه قد تم اكتمال طلبكم، دعمكم الكريم بتقييم الخدمة",
      en: "We inform you that your request has been completed, and we hope that you will kindly evaluate it",
    },
  },
  closeRequest: {
    settingStatus: 9,
    titles: { ar: "اغلاق الطلب", en: "Close the report" },
    messages: { ar: "تم اغلاق طلبك", en: "Your report has been closed" },
  },
  reOpenRequest: {
    settingStatus: 10,
    titles: { ar: "إعادة فتح", en: "ReOpening" },
    messages: {
      ar: "تم إعادة فتح الطلب من جديد",
      en: "Your request has been Reopened",
    },
  },
  addingRequest: {
    settingStatus: 11,
    titles: { ar: "قبول طلب", en: "Approve request" },
    messages: {
      ar: "نأمل من. سعادتكم قبول الطلب لاستكمال الإجراءات",
      en: "Your request has been Approved",
    },
  },
  addingRequestForFeasability: {
    settingStatus: 24,
    titles: { ar: "قبول طلب", en: "Approve request" },
    messages: {
      ar: "نأمل من سعادتكم الموافقة لإتمام الطلب",
      en: "Your request has been Approved",
    },
  },
  rejectedRequest: {
    settingStatus: 12,
    titles: { ar: "تم رفض طلبك", en: "Reject Request" },
    messages: {
      ar: "نعتذر، تم رفض طلبك",
      en: "Your Request has been Rejected",
    },
  },
  addingNote: {
    settingStatus: 19,
    titles: { ar: "اضافة ملاحظة", en: "Add note" },
    messages: { ar: "تمت إضافة ملاحظة لطلبكم", en: "Your note has been added" },
  },
  attributionRequest: {
    settingStatus: 13,
    titles: { ar: "اسناد طلب", en: "Assign request" },
    messages: {
      ar: "تم إسناد طلب جديد إليك، نأمل دعمكم الكريم بمراجعة الطلب",
      en: "you are assigned into new request",
    },
  },
  reOrderRequest: {
    settingStatus: 14,
    titles: { ar: "إعادة طلب", en: "reorder request" },
    messages: {
      ar: "تم إعادة الطلب إليك مرة أخرى",
      en: "Request is reordered to you again",
    },
  },
  addDelegation: {
    settingStatus: 17,
    titles: { ar: "إضافة تفويض", en: "Add delegation" },
    messages: {
      ar: "تم إضافة تفويض جديد من إحدى الموظفين بإدارتك، نأمل قبول التفويض",
      en: "You are added into new delegation",
    },
  },
  rejectDelegation: {
    settingStatus: 16,
    titles: { ar: "رفض تفويض", en: "reject delegation" },
    messages: {
      ar: "تم رفض التفويض الخاص بك",
      en: "Your delegation is rejected",
    },
  },
  acceptDelegation: {
    settingStatus: 15,
    titles: { ar: "قبول تفويض", en: "accept delegation" },
    messages: {
      ar: "تم قبول التفويض الخاص بك",
      en: "Your delegation is accepted",
    },
  },
  proceedingAttendance: {
    settingStatus: 18,
    titles: { ar: "حضور اجتماع", en: "proceeding attendance" },
    messages: {
      ar: "تم إضافة حضورك بالاجتماع",
      en: "Your presence in the meeting has been added",
    },
  },
  addingRequestForCommittees: {
    settingStatus: 21,
    titles: { ar: "طلب موافقة", en: "Approve request" },
    messages: {
      ar: "موافقتكم الكريمة لإتمام الطلب",
      en: "Your request has been Approved",
    },
  },
  addingRequestForKnowledge: {
    settingStatus: 4,
    titles: { ar: "طلب موافقة", en: "Approve request" },
    messages: {
      ar: "موافقتكم الكريمة لإتمام الطلب",
      en: "Your request has been Approved",
    },
  },
  receivedForExpert: {
    settingStatus: 0,
    titles: { ar: "استلام سؤال", en: "Receiving Question" },
    messages: {
      ar: "تم استلام سؤال جديد",
      en: "a new question has been received",
    },
  },
  acceptWithoutPosting: {
    settingStatus: 30,
    titles: { ar: "قبول مع عدم النشر", en: "Accept without posting" },
    messages: {
      ar: "تم قبول طلبك مع عدم النشر",
      en: "your request has been accepted Without Posting",
    },
  },
  addingNewCommittee: {
    settingStatus: 20,
    titles: { ar: "إضافة لجنة جديدة", en: "Adding new committee" },
    messages: { ar: "تم إضافة لجنة جديدة", en: "New committee has been added" },
  },
  acceptPostingRequest: {
    settingStatus: 12,
    titles: { ar: "قبول طلب", en: "accept request" },
    messages: { ar: "تم قبول الطلب الخاص بك", en: "Your request is accepted" },
  },
  rejectPostingRequest: {
    settingStatus: 19,
    titles: { ar: "رفض طلب", en: "reject request" },
    messages: {
      ar: "نعتذر، تم رفض الطلب الخاص بك",
      en: "Your request is rejected",
    },
  },
  replyQuestionFromExpert: {
    settingStatus: 19,
    titles: { ar: "الرد على سؤالك", en: "question replied" },
    messages: { ar: "تم إضافة رد على سؤالك", en: "Your Question is replied" },
  },
  addRating: {
    settingStatus: 22,
    titles: { ar: "تم اضافة تقييم لك", en: "Your rating has been added" },
    messages: {
      ar: "تم إضافة تقييم على طلب لديك",
      en: "A rating has been added to your request",
    },
  },
  backrestDone: {
    settingStatus: 23,
    titles: {
      ar: "تم الرد من قبل المسند إليه",
      en: "The request has been answered by the assignee",
    },
    messages: {
      ar: "تم الرد من قبل المسند إليه، نأمل مراجعة الطلب",
      en: "The request has been answered by the assignee",
    },
  },
  pmoCloseProject: {
    settingStatus: 25,
    titles: { ar: "قبول طلب", en: "Approve request" },
    messages: {
      ar: "نأمل من سعادتكم الموافقة على الطلب، لاستكمال اللازم",
      en: "Your request has been Approved",
    },
  },
  pmoPaidRequest: {
    settingStatus: 25,
    titles: { ar: "قبول طلب", en: "Approve request" },
    messages: {
      ar: "نأمل من سعادتكم الموافقة على الطلب، لاستكمال اللازم",
      en: "Your request has been Approved",
    },
  },
  // visitors notifications
  addingInternalPermitRequestForVisitor: {
    settingStatus: 26,
    titles: { ar: "طلب موافقة", en: "Approve request" },
    messages: {
      ar: "نأمل من سعادتكم الموافقة على الطلب، لاستكمال اللازم",
      en: "Your request has been Approved",
    },
  },
  addingExternalPermitRequestForVisitor: {
    settingStatus: 26,
    titles: { ar: "طلب موافقة", en: "Approve request" },
    messages: {
      ar: "نأمل من سعادتكم الموافقة على الطلب، لاستكمال اللازم",
      en: "Your request has been Approved",
    },
  },
  edittingPermitRequestForVisitor: {
    settingStatus: 27,
    titles: { ar: "طلب موافقة", en: "Approve request" },
    messages: {
      ar: "نأمل من سعادتكم الموافقة على الطلب، لاستكمال اللازم",
      en: "Your request has been Approved",
    },
  },
  cancellingPermitRequestForVisitor: {
    settingStatus: 28,
    titles: { ar: "طلب موافقة", en: "Approve request" },
    messages: {
      ar: "نأمل من سعادتكم الموافقة على الطلب، لاستكمال اللازم",
      en: "Your request has been Approved",
    },
  },
  renewingPermitRequestForVisitor: {
    settingStatus: 29,
    titles: { ar: "طلب موافقة", en: "Approve request" },
    messages: {
      ar: "نأمل من سعادتكم الموافقة على الطلب، لاستكمال اللازم",
      en: "Your request has been Approved",
    },
  },
  addingVisitorPermitRequest: {
    settingStatus: 26,
    titles: { ar: "طلب موافقة", en: "Approve request" },
    messages: {
      ar: "نأمل من سعادتكم الموافقة على الطلب، لاستكمال اللازم",
      en: "Your request has been Approved",
    },
  },
  permitReminder: {
    settingStatus: 33,
    titles: { ar: "تذكير طلب موافقة", en: "Approve request reminder" },
    messages: {
      ar: "تذكير، نأمل دعمكم الكريم بالموافقة لإتمام الطلب",
      en: "Your request has been Approved",
    },
  },
  rejectPermitRequest: {
    settingStatus: 12,
    titles: { ar: "رفض طلب", en: "reject request" },
    messages: { ar: "تم رفض الطلب الخاص بك", en: "Your request is rejected" },
  },
  acceptPermitRequest: {
    settingStatus: 4,
    titles: { ar: "قبول الطلب", en: "accept request" },
    messages: { ar: "تم قبول الطلب الخاص بك", en: "Your request is accepted" },
  },
  // training
  addingRequestForCourse: {
    settingStatus: 34,
    titles: { ar: "طلب موافقة", en: "Approve request" },
    messages: {
      ar: "موافقتكم الكريمة لإتمام الطلب",
      en: "Your request has been Approved",
    },
  },
};

const createNotificationWrapper =
  (type: keyof typeof notifications) =>
  (
    to: string,
    url: string,
    workspaceKeyTo: number,
    reportid: string,
    email: string,
    systemNotification: boolean = true,
    workspaceKey: number,
    requestDate: any,
    requestName: string,
    requestType: string,
    substsemid?: string | null,
    cardname?: string,
    mainclassificationId?: string | null,
    requestNumber?: string | null
  ) => {
    const { settingStatus, titles, messages } = notifications[type];
    return createNotification(
      to,
      url,
      email,
      systemNotification,
      settingStatus,
      titles,
      messages,
      workspaceKeyTo,
      reportid,
      workspaceKey,
      requestDate,
      requestName,
      requestType,
      substsemid,
      cardname,
      mainclassificationId,
      requestNumber
    );
  };

export const Notification = {
  received: createNotificationWrapper("received"),
  backrestDone: createNotificationWrapper("backrestDone"),
  delayed: createNotificationWrapper("delayed"),
  remainder: createNotificationWrapper("remainder"),
  escalation: createNotificationWrapper("escalation"),
  accepted: createNotificationWrapper("accepted"),
  refused: createNotificationWrapper("refused"),
  transformed: createNotificationWrapper("transformed"),
  delayingSolve: createNotificationWrapper("delayingSolve"),
  solved: createNotificationWrapper("solved"),
  closeRequest: createNotificationWrapper("closeRequest"),
  reOpenRequest: createNotificationWrapper("reOpenRequest"),
  addingRequest: createNotificationWrapper("addingRequest"),
  rejectedRequest: createNotificationWrapper("rejectedRequest"),
  addingNote: createNotificationWrapper("addingNote"),
  attributionRequest: createNotificationWrapper("attributionRequest"),
  reOrderRequest: createNotificationWrapper("reOrderRequest"),
  addDelegation: createNotificationWrapper("addDelegation"),
  rejectDelegation: createNotificationWrapper("rejectDelegation"),
  acceptDelegation: createNotificationWrapper("acceptDelegation"),
  proceedingAttendance: createNotificationWrapper("proceedingAttendance"),
  addingRequestForCommittees: createNotificationWrapper(
    "addingRequestForCommittees"
  ),
  addingNewCommittee: createNotificationWrapper("addingNewCommittee"),
  acceptPostingRequest: createNotificationWrapper("acceptPostingRequest"),
  rejectPostingRequest: createNotificationWrapper("rejectPostingRequest"),
  addingRequestForKnowledge: createNotificationWrapper(
    "addingRequestForKnowledge"
  ),
  receivedForExpert: createNotificationWrapper("receivedForExpert"),
  replyQuestionFromExpert: createNotificationWrapper("replyQuestionFromExpert"),
  addRating: createNotificationWrapper("addRating"),
  pmoCloseProject: createNotificationWrapper("pmoCloseProject"),
  pmoPaidRequest: createNotificationWrapper("pmoPaidRequest"),
  addingRequestForFeasability: createNotificationWrapper(
    "addingRequestForFeasability"
  ),
  acceptWithoutPosting: createNotificationWrapper("acceptWithoutPosting"),
  // visitors notifications
  addingInternalPermitRequestForVisitor: createNotificationWrapper(
    "addingInternalPermitRequestForVisitor"
  ),
  addingExternalPermitRequestForVisitor: createNotificationWrapper(
    "addingExternalPermitRequestForVisitor"
  ),
  edittingRequestForVisitor: createNotificationWrapper(
    "edittingPermitRequestForVisitor"
  ),
  cancellingPermitRequestForVisitor: createNotificationWrapper(
    "cancellingPermitRequestForVisitor"
  ),
  renewingPermitRequestForVisitor: createNotificationWrapper(
    "renewingPermitRequestForVisitor"
  ),
  addingVisitorPermitRequest: createNotificationWrapper(
    "addingVisitorPermitRequest"
  ),
  permitReminder: createNotificationWrapper("permitReminder"),
  acceptPermitRequest: createNotificationWrapper("acceptPermitRequest"),
  rejectPermitRequest: createNotificationWrapper("rejectPermitRequest"),
  addingRequestForCourse: createNotificationWrapper("addingRequestForCourse"),
};
