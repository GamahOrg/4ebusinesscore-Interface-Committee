import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useIntl } from "react-intl";
import moment from "moment";

interface ControlledDateTimePickerProps {
  value: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  minTime?: Date | null;
  maxTime?: Date | null;
  label?: string;
  placeHolder?: string;
}

const ControlledDateTimePicker: React.FC<ControlledDateTimePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  minTime,
  maxTime,
  label = "Select Date and Time",
  placeHolder
}) => {
  const intl = useIntl();

  const defaultMinTime = new Date();
  defaultMinTime.setHours(0, 0, 0, 0);

  const defaultMaxTime = new Date();
  defaultMaxTime.setHours(23, 59, 0, 0);

  const toDate = (d: any): Date | undefined => {
    if (!d) return undefined;
    const dateObj = d instanceof Date ? d : new Date(d);
    return isNaN(dateObj.getTime()) ? undefined : dateObj;
  };

  return (
    <div className="form-group w-100">
      {/* {label && <label className="form-label fw-bold mb-2">{label}</label>} */}
      <DatePicker
        selected={toDate(value)}
        onChange={(date) => onChange?.(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        minDate={toDate(minDate)}
        maxDate={toDate(maxDate)}
        minTime={toDate(minTime) ?? defaultMinTime}
        maxTime={toDate(maxTime) ?? defaultMaxTime}
        dateFormat="yyyy-MM-dd HH:mm"
        className="form-control form-control-lg form-control-solid "
        placeholderText={intl.formatMessage({ id: placeHolder || "Select Date" })}
      />
    </div>
  );
};

export default ControlledDateTimePicker;
