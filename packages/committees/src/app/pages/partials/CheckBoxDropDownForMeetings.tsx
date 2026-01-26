import React, { FC, useState } from "react";
import { useIntl } from "react-intl";

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  selectedMeetingIds: any;
  setSelectedMeetingIds: any;
  filterOptions?: any;
  placeholder?: string;
}

const CheckBoxDropDownForMeetings: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  selectedMeetingIds,
  setSelectedMeetingIds,
  filterOptions,
  placeholder = "Choose",
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsCheck = (option: any) => {
    const optionName = option.name;
    const optionId = option.id;

    if (selectedOptions?.includes(optionName)) {
      const selectedOption = selectedOptions?.filter(
        (value: any) => value !== optionName
      );
      setSelectedOptions([...selectedOption]);
      setSelectedMeetingIds(selectedMeetingIds.filter((id: any) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
      setSelectedMeetingIds([...selectedMeetingIds, optionId]);
    }
  };

  return (
    <>
      <div className="position-relative">
        <button
          className="btn btn-light w-100 d-flex justify-content-start flex-wrap btn-dropdwon"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions?.length > 0
            ? selectedOptions?.join(" - ")
            : intl.formatMessage({ id: placeholder })}
        </button>
        {isOpen && (
          <div
            className="dropdown-list-container"
            style={{
              maxHeight: "200px", // Set the desired max height for the container
              overflowY: "auto",
            }}
          >
            <ul
              className="list-unstyled border border-1px p-0 border-radius bg-white"
            >
              {filterOptions?.map((option: any) => (
                <li key={option?.id}>
                  <div
                    className="w-100 btn btn-white d-flex justify-content-between form-check"
                    onClick={() => handleIsCheck(option)}
                  >
                    <label
                      className="form-check-label"
                      htmlFor={`Checkme-${option?.id}`}
                    >
                      {option?.name}
                    </label>
                    <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                      <input
                        className="form-check-input widget-9-check xCheckBg"
                        checked={selectedOptions?.includes(option?.name)}
                        onChange={() => handleIsCheck(option)}
                        type="checkbox"
                        value={option?.name}
                        id={`Checkme-${option?.id}`}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckBoxDropDownForMeetings;