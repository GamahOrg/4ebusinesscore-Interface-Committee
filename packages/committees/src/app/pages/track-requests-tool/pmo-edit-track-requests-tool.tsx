import React, { Fragment, useEffect, useState } from "react";
import EditTrackRequestsTool from "./components/EditTrackRequestsTool";
import { useLocation, useParams } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { fetchItemById } from "../../features/itemByIdSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

function PmoEditTrackRequestsTool() {
  let location = useLocation();
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { id } = useParams();
  //getItemById
  useEffect(() => {
    if (id) dispatch(fetchItemById(id) as any) as any;
  }, [id]);
  let item = useSelector((state: RootState) => {
    return state?.itemById?.data;
  });

  const [requestId, setRequestId] = useState("");

  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/committee-track-requests-tools",
      defaultName: "TrackRequests",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "EditTrack",
      name: "",
    },
  ];
  return (
    <Fragment>
      <DynamicToolbar
        defaultTitle="EditTrack"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <EditTrackRequestsTool id={id} setLastAddedId={setLastAddedId} />
    </Fragment>
  );
}

export default PmoEditTrackRequestsTool;
