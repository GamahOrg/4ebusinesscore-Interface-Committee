import { useIntl } from "react-intl";

const CommitteOption = () => {
  const intl = useIntl();
  const options = [
    {
      id: 1,
      name: `${intl.formatMessage({
        id: "Committee",
      })} 1`,
    },
    {
      id: 2,
      name: `${intl.formatMessage({
        id: "Committee",
      })} 2`,
    },
    {
      id: 3,
      name: `${intl.formatMessage({
        id: "Committee",
      })} 3`,
    },
    {
      id: 4,
      name: `${intl.formatMessage({
        id: "Committee",
      })} 4`,
    },
    {
      id: 5,
      name: `${intl.formatMessage({
        id: "Committee",
      })} 5`,
    },
    {
      id: 1,
      name: `${intl.formatMessage({
        id: "Committee",
      })} 1`,
    },
  ];
  return (
    <div className="row">
      {options.map((item) => (
        <div key={item.id} className="col-12 my-5">
          <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
            <input
              className="form-check-input widget-9-check xCheckBg"
              type="checkbox"
              id={item.name}
            />
          </div>
          <label htmlFor={item.name}>{item.name}</label>
        </div>
      ))}
    </div>
  );
};

export default CommitteOption;
