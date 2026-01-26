import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store/store";
import { CommitteesReview } from "./app/pages/committees-review/committees-review";
import { CommitteesReviewCommitteeUnderStudy } from "./app/pages/committees-review/committees-review-committee-under-study";
import { CommitteesReviewEditCommittee } from "./app/pages/committees-review/committees-review-edit-committee";
import { CommitteesReviewTabsDetails } from "./app/pages/committees-review/committees-review-tabs-details";
import { CommitteesReviewAddReport } from "./app/pages/committees-review/committees-review-report-add";
import { CommitteesReviewReportDetails } from "./app/pages/committees-review/committees-review-report-details";
import { CommitteesReviewAddMeeting } from "./app/pages/committees-review/committees-review-meeting-add";
import { CommitteesReviewAddOutput } from "./app/pages/committees-review/committees-review-output-add";
import { CommitteesReviewMeetingDetails } from "./app/pages/committees-review/committees-review-meeting-details";
import { CommitteeFormation } from "./app/pages/committee-formation/committee-formation";
import { CommitteeApproval } from "./app/pages/committee-approval/committee-approval";
import { CommitteeApprovalDetails } from "./app/pages/committee-approval/committee-approval-details";
import { CommitteeDetails } from "./app/pages/committee-approval/committee-details";
import { PmotrackRequestsTool } from "./app/pages/track-requests-tool/pmo-track-requests-tool";
import { PmotrackRequestsToolDetails } from "./app/pages/track-requests-tool/pmo-track-requests-tool-details";
import PmoAddTrackRequestsTool from "./app/pages/track-requests-tool/pmo-add-track-requests-tool";
import PmoEditTrackRequestsTool from "./app/pages/track-requests-tool/pmo-edit-track-requests-tool";
import { BtnDownload } from "./app/pages/committees-review/components/btnDownload";
import { CommitteesReviewEditReport } from "./app/pages/committees-review/committees-review-edit-report";
import { NotificationsDetails } from "./app/pages/notifications/notifications-details";
import CommitteeIndicators from "./app/pages/committee-indicators/committee-indicators";
import { DynamicWorkSpace } from "@npm-react/react-redux-routing";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<DynamicWorkSpace />} />
        <Route path="/committee-indicators" element={<CommitteeIndicators />} />
        <Route path="/committees-review" element={<CommitteesReview />} />
        <Route
          path="/committees-review/committee-under-study/:committeeId"
          element={<CommitteesReviewCommitteeUnderStudy />}
        />
        <Route
          path="/committees-review/edit-committee/:committeeId"
          element={<CommitteesReviewEditCommittee />}
        />
        <Route
          path="/committees-review/committee-decision-show-details/:committeeId"
          element={<BtnDownload />}
        />
        <Route
          path="/committees-review/comittees-tab-details/:id"
          element={<CommitteesReviewTabsDetails />}
        />

        <Route
          path="/committees-review/add-report/:id"
          element={<CommitteesReviewAddReport />}
        />
        <Route
          path="/committees-review/edit-report/:id/:reportId"
          element={<CommitteesReviewEditReport />}
        />
        <Route
          path="/committees-review/report-details/:proceedingId"
          element={<CommitteesReviewReportDetails />}
        />
        <Route
          path="/committees-review/add-meeting/:id"
          element={<CommitteesReviewAddMeeting />}
        />
        <Route
          path="/committees-review/add-output/:id"
          element={<CommitteesReviewAddOutput />}
        />
        <Route
          path="/committees-review/meeting-details/:id"
          element={<CommitteesReviewMeetingDetails />}
        />
        <Route path="/committee-formation" element={<CommitteeFormation />} />
        <Route path="/committee-approval" element={<CommitteeApproval />} />
        <Route
          path="committee-approval/committee-approval-details/:id"
          element={<CommitteeApprovalDetails />}
        />
        <Route
          path="/committee-approval/committee-details/:committeeId"
          element={<CommitteeDetails />}
        />
        <Route
          path="/committee-track-requests-tools"
          element={<PmotrackRequestsTool />}
        />
        <Route
          path="/committee-track-requests-tools/:id/details"
          element={<PmotrackRequestsToolDetails />}
        />
        <Route
          path="/committee-track-requests-tools/add-track-requests-tools"
          element={<PmoAddTrackRequestsTool />}
        />
        <Route
          path="/committee-track-requests-tools/edit-track-requests-tools/:id"
          element={<PmoEditTrackRequestsTool />}
        />
      </Routes>
    </Provider>
  );
}

export default App;
