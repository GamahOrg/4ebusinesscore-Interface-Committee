import React, { FC, useState } from "react";
import { useIntl } from "react-intl";

type option = {
  id: number;
  name: string;
};

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  options: option[];
  selectTitle?: string;
}

const MultiCheckBoxDropDown: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  options,
  selectTitle = "Select",
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsCheck = (optionName: string) => {
    if (optionName === intl.formatMessage({ id: "All" })) {
      if (selectedOptions.length === options.length) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions(options.map((option) => option.name));
      }
    } else if (selectedOptions?.includes(optionName)) {
      const selectedoption = selectedOptions?.filter(
        (value: any) => value !== optionName
      );
      setSelectedOptions([...selectedoption]);
      if (selectedoption.length === options.length - 1) {
        setSelectedOptions(
          selectedoption.filter((value: any) => value !== "الكل")
        );
      }
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  };
  return (
    <>
      <div className="position-relative">
        <button
          className="btn btn-transparent border w-100 d-flex justify-content-start flex-wrap btn-dropdwon bg-gray-200"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions?.length >= 0 &&
          selectedOptions?.length < options?.length
            ? selectedOptions?.length === 0
              ? intl.formatMessage({ id: selectTitle })
              : selectedOptions?.join(" - ")
            : intl.formatMessage({ id: "All" })}
        </button>
        {isOpen && (
          <ul
            className="list-unstyled p-0 position-absolute w-100"
            // style={{ zIndex: 9999 }}
          >
            {options?.map((option) => (
              <li key={option?.id}>
                <button
                  className="w-100 btn btn-white d-flex justify-content-between form-check"
                  onClick={(e) => {
                    e.preventDefault();
                    handleIsCheck(option?.name);
                  }}
                >
                  <label className="form-check-label" htmlFor="Checkme1">
                    {option?.name}
                  </label>
                  <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      className="form-check-input widget-9-check xCheckBg"
                      checked={selectedOptions?.includes(option?.name)}
                      type="checkbox"
                      value={option?.name}
                      id="Checkme1"
                      onChange={() => handleIsCheck(option?.name)}
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MultiCheckBoxDropDown;
