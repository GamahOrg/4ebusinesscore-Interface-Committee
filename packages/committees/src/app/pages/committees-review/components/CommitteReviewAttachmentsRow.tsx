import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";
import React, { Fragment } from "react";

const CommitteReviewAttachmentsRow = ({ attachments }: any) => {
  const getIconSrc = (attachmentUrl: string) => {
    const fileName = attachmentUrl?.substring(
      attachmentUrl.lastIndexOf("/") + 1
    );

    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg") ||
      fileName?.endsWith(".jfif") || 
      fileName?.endsWith(".webp")
    ) {
      return `${CommitteeRootUrl}${attachmentUrl}`;
    } else if (fileName?.endsWith(".pdf")) {
      return "/media/pmo/pdfIcon.png";
    } else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
      return "/media/pmo/wordIcon2.jpg";
    } else if (fileName?.endsWith(".xls") || fileName?.endsWith(".xlsx")) {
      return "/media/pmo/excelIcon2.jpg";
    } else if (fileName?.endsWith(".txt")) {
      return "/media/pmo/textIcon.png";
    }
    else if (fileName?.endsWith(".mp4") || fileName?.endsWith(".webm") || fileName?.endsWith(".avi")  || fileName?.endsWith(".mkv") || fileName?.endsWith(".flv") || fileName?.endsWith(".ts") ) {
      return "/media/pmo/video.png";
    }
    else if (fileName?.endsWith(".ppt") || fileName?.endsWith(".pptx") || fileName?.endsWith(".pptm")  || fileName?.endsWith(".pps") || fileName?.endsWith(".ppsx") || fileName?.endsWith(".ppsm") ) {
      return "/media/pmo/powerPointIcon.png";
    }
  };
  return (
    <div className="d-flex  flex-wrap gap-2">
      {attachments?.map((attachment) => {
        return (
          <Fragment key={Math.random()}>
            <div className="d-flex my-2 align-items-center mx-3">
              <img
                src={getIconSrc(attachment)}
                alt=""
                className="d-inline-block ms-2"
                style={{
                  height: "40px",
                  width: "40px",
                }}
              />
              <div>
                <a
                  href={`${CommitteeRootUrl}${attachment}`}
                  download
                  target="_blank"
                  className="text-primary mx-2 fw-bolder p-0 m-0"
                >
                  {attachment?.split("/")?.slice(-1)[0]}
                </a>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default CommitteReviewAttachmentsRow;
