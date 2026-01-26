import { useIntl } from "react-intl";

const SpecifiedOption = () => {
  const intl = useIntl();
  const options = [
    {
      id: 1,
      name: intl.formatMessage({
        id: "DirectManager",
      }),
    },
    {
      id: 2,
      name: intl.formatMessage({
        id: "GeneralDirector",
      }),
    },
    {
      id: 3,
      name: intl.formatMessage({
        id: "TheSectorManager",
      }),
    },
    {
      id: 4,
      name: intl.formatMessage({
        id: "Cyber​SecurityAdministration",
      }),
    },
    {
      id: 5,
      name: intl.formatMessage({
        id: "HROperations",
      }),
    },
    {
      id: 6,
      name: intl.formatMessage({
        id: "CEO",
      }),
    },
    {
      id: 7,
      name: intl.formatMessage({
        id: "GeneralManagerofInformationTechnology",
      }),
    },
    {
      id: 8,
      name: intl.formatMessage({
        id: "InfrastructureManager",
      }),
    },
    {
      id: 9,
      name: intl.formatMessage({
        id: "DirectorofPlanningandGovernance",
      }),
    },
    {
      id: 10,
      name: intl.formatMessage({
        id: "FacilitiesManagement",
      }),
    },
  ];
  return (
    <div className="row ">
      {options.map((item) => (
        <div key={item.id} className="col-12 col-sm-4 my-5">
          <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
            <input
              className="form-check-input"
              type="radio"
              id={item.name}
              name="option"
            />
          </div>
          <label htmlFor={item.name}>{item.name}</label>
        </div>
      ))}
    </div>
  );
};

export default SpecifiedOption;
