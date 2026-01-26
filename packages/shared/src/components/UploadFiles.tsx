/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, FC } from "react";
import { useIntl } from "react-intl";

type Props = {
  setSelectedFiles?: (file: any[]) => void  // State to get the selected files
}

const UploadFiles: FC<Props> = ({setSelectedFiles}) => {
  const intl = useIntl();
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleAddFileChange = (event: any) => {
    const files = event.target.files;
    setUploadedFiles([
      ...uploadedFiles,
      { id: uploadedFiles.length + 1, file: files },
    ]);
  };
  const handleDeleteFile = (id: any) => {
    setUploadedFiles([...uploadedFiles.filter((file) => file.id !== id)]);
  };

  useEffect(() => {
    setSelectedFiles && setSelectedFiles([...uploadedFiles.map((file) => file.file )])
  }, [uploadedFiles]);

  return (
    <>
      <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-80px">
        <label
          htmlFor="outputAttachment"
          className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
        >
          <div
            role="button"
            className="d-flex align-items-center justify-content-center"
          >
            <div className="py-auto ps-3">
              <img
                style={{ width: "25px" }}
                src="/media/extensions/uploadFile.webp"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="row py-auto ">
              <span className="text-primary fw-bolder">
                {intl.formatMessage({ id: "QuickFileUploader" })}
              </span>
            </div>
          </div>
        </label>
        <div className="dropzone dropzone-queue " id="kt_dropzonejs_example_3">
          <div className="dropzone-panel">
            <input
              multiple
              type="file"
              accept="image/*"
              id="outputAttachment"
              name="attachments"
              placeholder={intl.formatMessage({ id: "FileUpload" })}
              className="dropzone-select  uploadFile-style inputAreaHeight d-none"
              onChange={handleAddFileChange}
            />
          </div>
        </div>
      </div>
      <div className="d-flex gap-2 flex-wrap align-items-center mt-2">
      {uploadedFiles.map((file) => (
        <div key={file.id}>
          <div
            className="p-4 rounded-2 flex-wrap bg-primary bg-opacity-10 position-relative mb-5"
            style={{ width: "fit-content" }}
          >
            <div
              onClick={() => handleDeleteFile(file.id)}
              className={`position-absolute top-0 left-0 m-2 cursor-pointer`}
            >
              <i className="fa-solid fa-trash-can fs-7 text-hover-danger"></i>
            </div>
            <div className="d-flex align-items-center justify-content-between w-fit">
              <i className="fas fa-paperclip text-primary fs-2"></i>
              <span className="mx-3 text-primary"> {file.file[0].name}</span>
            </div>
          </div>
        </div>
      ))}

      </div>
    </>
  );
};

export default UploadFiles;
