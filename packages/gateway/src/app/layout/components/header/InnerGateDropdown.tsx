import { FC } from "react";
import { useIntl } from "react-intl";

const InnerGateDropdown: FC = () => {
  const intl = useIntl();
  return (
    <div
      className="menu menu-spe-title menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-title-gray-700 menu-state-bullet-primary menu-state-title-primary menu-state-icon-primary menu-state-bg-light-primary fw-bold w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3 my-1">
        <a
          href="http://10.21.10.16:9011/SignIn.aspx"
          target="_blank"
          className="menu-link px-3"
          rel="noreferrer"
        >
          <span className="menu-title">
            {intl.formatMessage({ id: "Solutions System (Financial)" })}
          </span>
        </a>
      </div>
      <div className="menu-item px-3 my-1">
        <a
          href="http://10.21.10.16:9021/SignIn.aspx"
          target="_blank"
          className="menu-link px-3"
          rel="noreferrer"
        >
          <span className="menu-title">
            {intl.formatMessage({
              id: "Resources system (purchases & warehouses)",
            })}
          </span>
        </a>
      </div>
      <div className="menu-item px-3 my-1">
        <a
          href="http://10.21.10.16:9013/SignIn.aspx"
          target="_blank"
          className="menu-link px-3"
          rel="noreferrer"
        >
          <span className="menu-title">
            {intl.formatMessage({ id: "Kawader system (for the HR team)" })}
          </span>
        </a>
      </div>
      <div className="menu-item px-3 my-1">
        <a
          href="https://pp.rega.gov.sa/"
          target="_blank"
          className="menu-link px-3"
          rel="noreferrer"
        >
          <span className="menu-title">
            {intl.formatMessage({ id: "Professional portal" })}
          </span>
        </a>
      </div>
    </div>
  );
};

export { InnerGateDropdown };
