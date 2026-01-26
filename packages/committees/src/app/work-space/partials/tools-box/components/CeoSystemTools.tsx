import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Iprop {
  id: any;
  title: string;
  link: string;
  icon: any;
  color: string;
  transition: string;
  handleClose?: any;
}

const CeoSystemTools: FC<Iprop> = ({
  id,
  title,
  link,
  icon,
  transition,
  color,
  handleClose,
}) => {
  let navigate = useNavigate();

  return (
    <>
      <div id={id} className="d-flex flex-column me-2 me-lg-5">
        <div
          // to={link}
          onClick={() => {
            navigate(link, { state: { cardId: id, cardTitle: title } });
            if (handleClose) handleClose();
          }}
          className={
            "text-gray-600 fw-bold fs-6 fs-lg-4 mb-1 d-flex gap-5 cursor-pointer" +
            (transition === "text-hover-warning"
              ? "text-hover-warning"
              : transition === "text-hover-primary"
                ? "text-hover-primary"
                : transition === "text-hover-info"
                  ? "text-hover-info"
                  : transition === "text-hover-gblue"
                    ? "text-hover-gblue"
                    : transition === "text-hover-success"
                      ? "text-hover-success"
                      : transition === "text-hover-danger"
                        ? "text-hover-danger"
                        : "")
          }
        >
          <span
            className={
              "svg-icon svg-icon-2x " +
              // (color === "svg-icon-warning"
              //   ? "svg-icon-warning"
              //   : color === "svg-icon-primary"
              //   ? "svg-icon-primary"
              //   : color === "svg-icon-info"
              //   ? "svg-icon-info"
              //   : color === "svg-icon-gblue"
              //   ? "svg-icon-gblue"
              //   : color === "svg-icon-success"
              //   ? "svg-icon-success"
              //   : color === "svg-icon-danger"
              //   ? "svg-icon-danger"
              //   : "") +
              (color === "0"
                ? "svg-icon-danger"
                : color === "1"
                  ? "svg-icon-success"
                  : color === "2"
                    ? "svg-icon-warning"
                    : color === "3"
                      ? "svg-icon-gblue"
                      : color === "4"
                        ? "svg-icon-info"
                        : color === "5"
                          ? "svg-icon-primary"
                          : "") +
              (color === "text-warning"
                ? "text-warning"
                : color === "text-primary"
                  ? "text-primary"
                  : color === "text-info"
                    ? "text-info"
                    : color === "text-gblue"
                      ? "text-gblue"
                      : color === "text-success"
                        ? "text-success"
                        : color === "text-danger"
                          ? "text-danger"
                          : "")
            }
            dangerouslySetInnerHTML={{ __html: icon }}
          >
            {/* {icon} */}
            {/* <span dangerouslySetInnerHTML={{ __html: icon }}></span> */}
          </span>
          {title}
        </div>
      </div>
    </>
  );
};

export { CeoSystemTools };
