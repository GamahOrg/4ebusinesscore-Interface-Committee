import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  getAllDelegationFromUserByUserId,
  getAllDelegationToUserByUserId,
} from "../../../features/procceding/proceedingSlice";
function CommitteeReportActions({ proceeding }: any) {
  let location = useLocation();
  let intl = useIntl();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  let { id: committeeId } = useParams();
  let dispatch = useAppDispatch();

  let internalMembers = useAppSelector((state) => {
    return state?.committees?.committee?.allInternalMembersDtos;
  });
  let userLoggedId = localStorage.getItem("userId");
  let loggedInUserPermission = internalMembers?.find((member) => {
    return member?.userId?.toLowerCase() === userLoggedId?.toLowerCase();
  })?.permissionId;
  let validPermissions = [
    "32820481-5dfb-4aa8-b43b-ce3e486928a7",
    "975912ea-8064-498b-66d3-08dd06f363aa",
  ];
  let secretaryMemberId = internalMembers?.find((member) => {
    return member?.permissionId == "32820481-5dfb-4aa8-b43b-ce3e486928a7";
  })?.userId;
  let [delegatedUserIdsForSecretary, setDelegatedUserIdsForSecretary] =
    useState<any>([]);
  let secretaryKeeperMemberId = internalMembers?.find((member) => {
    return member?.permissionId == "975912ea-8064-498b-66d3-08dd06f363aa";
  })?.userId;
  let [
    delegatedUserIdsForSecretaryKeeper,
    setDelegatedUserIdsForSecretaryKeeper,
  ] = useState<any>([]);
  useEffect(() => {
    if (secretaryKeeperMemberId) {
      dispatch(
        getAllDelegationFromUserByUserId({
          id: secretaryKeeperMemberId as string,
          myparams: {
            pageNumber: 1,
            pageSize: 1000,
          },
        }) as any
      ).then((res) => {
        setDelegatedUserIdsForSecretaryKeeper(
          res?.payload?.result?.map((item) => {
            return item?.delegeatedToUserId;
          })
        );
      });
    }
  }, [secretaryKeeperMemberId]);
  useEffect(() => {
    if (secretaryMemberId) {
      dispatch(
        getAllDelegationFromUserByUserId({
          id: secretaryMemberId as string,
          myparams: {
            pageNumber: 1,
            pageSize: 1000,
          },
        }) as any
      ).then((res) => {
        setDelegatedUserIdsForSecretary(
          res?.payload?.result?.map((item) => {
            return item?.delegeatedToUserId;
          })
        );
      });
    }
  }, [secretaryMemberId]);

  let [
    memberIsSercretaryOrSecretaryKeeperPermissionOrDelegated,
    setMemberIsSercretaryOrSecretaryKeeperPermissionOrDelegated,
  ] = useState<boolean>(false);
  useEffect(() => {
    if (
      validPermissions?.includes(loggedInUserPermission as any) ||
      delegatedUserIdsForSecretary?.includes(userLoggedId) ||
      delegatedUserIdsForSecretaryKeeper?.includes(userLoggedId)
    ) {
      setMemberIsSercretaryOrSecretaryKeeperPermissionOrDelegated(true);
    }
  }, [delegatedUserIdsForSecretary, delegatedUserIdsForSecretaryKeeper]);
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <i className="bi bi-three-dots fs-4"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-135px py-3">
          <Dropdown.Item as="button">
            <Link
              state={{
                date: proceeding?.date,
                serviceName: cardTitle,
              }}
              to={`/committees-review/report-details/${proceeding?.id}`}
            >
              <i className="far fa-eye ms-3 fs-5"></i>
              {intl.formatMessage({ id: "Show" })}
            </Link>
          </Dropdown.Item>
          {memberIsSercretaryOrSecretaryKeeperPermissionOrDelegated ? (
            <>
              {" "}
              <Dropdown.Item as="button">
                <Link
                  state={{
                    date: proceeding?.date,
                    serviceName: cardTitle,
                  }}
                  to={`/committees-review/edit-report/${committeeId}/${proceeding?.id}`}
                >
                  <i className="bi bi-pencil-square fs-2"></i>
                  <span className="mx-3">
                    {" "}
                    {intl.formatMessage({
                      id: "Edit",
                    })}
                  </span>
                </Link>
              </Dropdown.Item>
            </>
           ) : (
            <></>
          )} 
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default CommitteeReportActions;
