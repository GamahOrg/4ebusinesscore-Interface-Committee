import React, { FC } from "react";

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  options: any;
  register?: any;
}

const OutputMeetingsDropDown: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  options,
  register,
}) => {
  const handleIsCheck = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      const updatedOptions = selectedOptions.filter(
        (id: string) => id !== optionId
      );
      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  

  return (
    <>
      <ul className="list-unstyled w-100 pe-0 h-450px overflow-auto">
        {options?.map((option: any) => (
          <li key={option?.id}>
            <div
              className="my-4 bg-fix-dark border-fix-dark w-100 btn btn-white d-flex justify-content-between form-check"
              onClick={() => {
                handleIsCheck(option?.id);
              }}
            >
              <label className="form-check-label" htmlFor={option.id}>
                {option?.name}
              </label>
              <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                <input
                  className="form-check-input widget-9-check xCheckBg"
                  checked={selectedOptions?.includes(option?.id)}
                  type="checkbox"
                  value={option?.id}
                  id={option?.id}
                  {...register("MeetingIds")}
                  onChange={(e) => {
                    handleIsCheck(option?.id);
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default OutputMeetingsDropDown;
