import React, { FC, useState } from "react";
import { useIntl } from "react-intl";

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  options: any;
  placeholder?: string;
}

const DropDown: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  options,
  placeholder = "Choose",
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsCheck = (optionName: string) => {
    if (selectedOptions?.includes(optionName)) {
      const selectedoption = selectedOptions?.filter(
        (value: any) => value !== optionName
      );
      setSelectedOptions([...selectedoption]);
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  };

  return (
    <>
      <div className="position-relative mb-4">
        <button
          className="btn btn-light w-100 d-flex justify-content-start flex-wrap mybtn-dropdwon"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions?.length > 0
            ? selectedOptions?.join(" - ")
            : intl.formatMessage({ id: placeholder })}
        </button>
        {isOpen && (
          <ul
            className="list-unstyled border border-1px p-0 border-radius position-absolute w-100 bg-white"
            style={{ zIndex: 9999 }}
          >
            {options?.map((option: any) => (
              <li key={option?.id}>
                <button
                  className="w-100 btn btn-white d-flex justify-content-between form-check"
                  onClick={() => handleIsCheck(option?.name)}
                >
                  <label className="form-check-label" htmlFor="Checkme1">
                    {option?.name}
                  </label>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DropDown;
