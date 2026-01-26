import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Button, Form } from "react-bootstrap";

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  options: any;
  placeholder?: string;
  readOnly?: boolean;
}

const CheckBoxDropDown: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  options,
  placeholder = "Choose",
  readOnly = false,
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsCheck = (optionName: string) => {
    if (readOnly) return;
    const isAll = optionName === intl.formatMessage({ id: "All" });

    if (isAll) {
      if (selectedOptions.length === options.length) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions(options.map((option: any) => option.name));
      }
    } else {
      let updatedOptions;
      if (selectedOptions.includes(optionName)) {
        updatedOptions = selectedOptions
          ?.filter((name: any) => {
            return name != intl.formatMessage({ id: "All" });
          })
          ?.filter((value: any) => value !== optionName);
      } else {
        updatedOptions = [
          ...selectedOptions?.filter((name: any) => {
            return name != intl.formatMessage({ id: "All" });
          }),
          optionName,
        ];
      }
      setSelectedOptions(updatedOptions);
    }
  };

  return (
    <div className="position-relative">
      <Button
        variant="light"
        className={`w-100 d-flex justify-content-start flex-wrap btn-dropdwon ${
          readOnly ? "readonly" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={readOnly}
      >
        {selectedOptions.length === options.length
          ? intl.formatMessage({ id: "All" })
          : selectedOptions.length > 0
          ? selectedOptions.join(" - ")
          : intl.formatMessage({ id: placeholder })}
      </Button>
      {isOpen && (
        <ul
          className="list-unstyled border border-1px p-0 border-radius position-absolute w-100 bg-light"
          style={{ zIndex: 9999 }}
        >
          {options?.map((option: any) => (
            <li key={option?.id}>
              <div
                className={` d-flex justify-content-between btn btn-light ${
                  readOnly ? "readonly" : ""
                }`}
                onClick={() => handleIsCheck(option?.name)}
              >
                <Form.Check
                  className="w-100  d-flex justify-content-between flex-row-reverse  "
                  type="checkbox"
                  label={
                    <span
                      className="text-truncate d-inline-block"
                      style={{ maxWidth: "160px" }}
                    >
                      {option?.name}
                    </span>
                  }
                  id={`Checkme_${option?.id}`}
                  checked={
                    option?.name === "All"
                      ? selectedOptions.length === options.length
                      : selectedOptions?.includes(option?.name)
                  }
                  onChange={() => handleIsCheck(option?.name)}
                  disabled={readOnly}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CheckBoxDropDown;
