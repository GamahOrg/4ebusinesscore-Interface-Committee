import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";

const AttachmentRow = ({ attach }: any) => {
  return (
    <div className="d-flex justify-content-star flex-wrap gap-2">
      {attach?.map((file: any) => (
        <div className="d-flex" key={Math.random()}>
          <img
            src={
              file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".jpeg") ||
              file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".jpg") ||
              file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".png") ||
              file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".jfif") ||
              file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".webp")
                ? `${CommitteeRootUrl}${file}`
                : file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".pdf")
                ? "/media/pmo/pdfIcon.png"
                : file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".doc") ||
                  file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".docx")
                ? "/media/pmo/docIcon.png"
                : file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".xlsx") ||
                  file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".xls")
                ? "/media/pmo/excelIcon.png"
                : file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".mp4") ||
                  file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".ts") ||
                  file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".mkv") ||
                  file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".avi") ||
                  file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".webm")
                ? "/media/pmo/video.png"
                : file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".pptx") ||
                  file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".pptm") ||
                  file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".ppt") ||
                  file
                    ?.substring(file?.lastIndexOf("/") + 1)
                    ?.endsWith(".pps") ||
                  file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".ppsm")
                ? "/media/pmo/powerPointIcon.png"
                : file?.substring(file?.lastIndexOf("/") + 1)?.endsWith(".txt")
                ? "/media/pmo/textIcon.png"
                : "/media/pmo/pdfIcon.png"
            }
            alt=""
            className="d-inline-block ms-2"
            style={{
              height: "40px",
              width: "40px",
            }}
          />
          <div>
            <a
              href={`${CommitteeRootUrl}${file}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-primary mx-2 fw-bolder p-0 m-0 cursor-pointer">
                {file?.substring(file?.lastIndexOf("/") + 1)}
              </p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttachmentRow;
