// Reusable ImageUploader component
import React, { ChangeEvent, FC } from "react";

export const ImageUploader: FC<{
  label: string;
  backgroundImage: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  file?: File | undefined | null;
}> = ({ label, backgroundImage, onChange, file }) => (
  <>
    <div className="d-flex align-items-center">
      <label className="d-inline-block mx-7">{label}</label>
      <div
        className="image-input image-input-outline"
        data-kt-image-input="true"
      >
        <div
          className="image-input-wrapper w-125px h-125px"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <label
          className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
          data-kt-image-input-action="change"
          data-bs-toggle="tooltip"
          data-bs-dismiss="click"
          title="Change avatar"
        >
          <i className="fas fa-edit"></i>
          <input
            type="file"
            name="avatar"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={onChange}
          />
          {file && <input type="hidden" name="avatar_remove" />}
        </label>
      </div>
    </div>
  </>
);

export const BackgroundImageUploader = ({
  label,
  imageSrc,
  onChange,
  showDelete,
  onDelete,
}: {
  label: string;
  imageSrc: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showDelete?: boolean;
  onDelete?: () => void;
}) => (
  <div className="w-100 position-relative mb-9 mt-20 d-flex justify-content-center align-items-center">
    <img
      className="d-inline-block w-100 h-450px object-fit-cover img-settings mx-auto"
      src={imageSrc}
      alt=""
    />

    {showDelete && (
      <div
        onClick={onDelete}
        className="border-radius-50 Position-Settings cursor-pointer left-0 top-90 d-flex align-items-center justify-content-center bg-white w-50px h-50px position-absolute"
      >
        <i className="bi bi-x fs-1 text-muted"></i>
      </div>
    )}

    <div className="top--5 w-50px h-50px cursor-pointer bg-white Position-Settings border-radius-50 d-flex align-items-center justify-content-center position-absolute">
      <label
        className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
        title="Change avatar"
      >
        <i className="fas fa-edit"></i>
        <input
          style={{ display: "none" }}
          type="file"
          accept=".png, .jpg, .jpeg, .webp"
          onChange={onChange}
        />
      </label>
    </div>
  </div>
);
