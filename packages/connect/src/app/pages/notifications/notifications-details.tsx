import { FC } from "react";
import { NotificationComponent } from "./components/notification-component";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";

export const NotificationsDetails: FC = () => {
  let location = useLocation();
  let id = location?.state?.mainClassificationId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      defaultName: "Notifications",
      name: cardName || serviceName,
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="Notifications"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={id ? false : true}
        cardOption={cardName || serviceName}
      />
      <NotificationComponent />
    </>
  );
};
