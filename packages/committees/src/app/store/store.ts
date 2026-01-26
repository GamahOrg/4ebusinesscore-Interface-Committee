import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import permissionsSlice from "../features/committee/permissionsSlice";
import usersSlice from "../features/committee/usersSlice";
import expertsSlice from "../features/committee/expertsSlice";
import committeesSlice from "../features/committee/committeesSlice";
import committeeOperationsSlice from "../features/committee/committeeOperationsSlice";
import usersAggSlice from "../features/committee/usersAggregatorSlice";
import meetingSlice from "../features/meeting/meetingSlice";
import proceedingsSlice from "../features/procceding/proceedingSlice";
import committeeApprovalSlice from "../features/Approvals/committeeApprovalSlice";
import outputSlice from "../features/outputs/outputSlice";
import outputTypesSlice from "../features/outputs/outputTypesSlice";
import committeeApprovalRequestTimelineSlice from "../features/Approvals/committeeApprovalRequestTimelineSlice";
import requestTemplateSlice from "../features/requestTemplate/requestTemplateSlice";
import requestTemplate2Slice from "../features/requestTemplateSlice";
import rolesSlice from "../features/committee/rolesSlice";
import itemByIdSlice from "../features/itemByIdSlice";
import workspaceSlice from "../features/workspaces-slice";
import notifiactionsSlice from "../features/notifiactionsSlice";
import SubsystemSettingsMainClassification from "../features/subsytemSettingsMainClassification";
import SubsystemSettingsClassification from "../features/subsytemSettingsMainClassification";
import subsytemSettingsMainClassificationAggSlice from "../features/subsytemSettingsMainClassificationSlice";
import committeesIndicatorsSlice from "../features/CommitteeIndicators/CommitteeIndicators";
import { storeRegistry } from "@4eplatform/shared/store/storeRegistry";
import { configureStore } from "@reduxjs/toolkit";

import orgHierarchySlice from "../features/orgHierarchySlice";
import getAllMyComponentsSlice from "../features/getAllMyComponentsSlice";
import getAllHiddenWorkspacesSlice from "../features/getAllHiddenWorkspacesSlice";
import favouritesListSlice from "../features/favouritesListSlice";
import postHiddenWorkspacesSlice from "../features/postHiddenWorkspacesSlice";
import deleteHiddenWorkspacesSlice from "../features/deleteHiddenWorkspacesSlice";
import GetSubsytemSettingsMainClassificationAgg from "../features/subsytemSettingsMainClassificationSlice";



const store = storeRegistry.createStore({
    committeeApproval: committeeApprovalSlice,
    permissions: permissionsSlice,
    users: usersSlice,
    committees: committeesSlice,
    experts: expertsSlice,
    committeeOutputs: outputSlice,
    committeeOperations: committeeOperationsSlice,
    outputTypes: outputTypesSlice,
    usersAgg: usersAggSlice,
    meetings: meetingSlice,
    proceedings: proceedingsSlice,
    committeeApprovalRequestTime: committeeApprovalRequestTimelineSlice,
    requestTemplate: requestTemplateSlice,
    roles: rolesSlice,
    itemById: itemByIdSlice,
    workspace:workspaceSlice,
    subSystemSettingsMainClassification: SubsystemSettingsMainClassification,
    notifications:notifiactionsSlice,
    SubSystemClassificationByRowCount: SubsystemSettingsClassification,
    subsytemSettingsMainClassificationAggSlice:subsytemSettingsMainClassificationAggSlice,
    committeesIndicatorsSlice:committeesIndicatorsSlice,
    requestTemplate2:requestTemplate2Slice,
    // subsystem: SubsystemReducer,
    // addWorkspace: addWorkSpaceSlice,
    // SubsytemSettingsAggregator: subsytemSettingsSlice,
    // workspaceComponent: WorkSpaceComponentReducer,
    // removesubsystem: removesubsystemReducer,
    orgHierarchy: orgHierarchySlice,
    // subsystemDropdownList: SubsystemDropdownListSlice,
    // NoteTypeId: NoteTypeIdSlice,
    // putWorkspaceActivation: putWorkspaceActivationReducer,
    // addWorkspaceCard: addWorkSpaceCardSlice,
    myComponents: getAllMyComponentsSlice,
    hiddenWorkspaces: getAllHiddenWorkspacesSlice,
    getFavouriteList: favouritesListSlice,
    postHiddenWorkspaces: postHiddenWorkspacesSlice,
    deleteHiddenWorkspaces: deleteHiddenWorkspacesSlice,
    // userView: userProfileViewSlice,
    // AllTypesWithParents: AllTypesWithParentSlice,
    GetSubsytemSettingsMainClassificationAgg,
    // allSubSystemMainLookUp: getAllSubsystemMainLookUpSlice,
    // ssoSecuritySetting: ssoSecuritySettingSlice,
    // systemSettingsParts: systemSettingsPartsSlice,
    // editClassification: EditClassificationSlice,
    // allSubsytemByClassificationId: getAllSubsytemSettingsbyMainClassificationid,

});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
