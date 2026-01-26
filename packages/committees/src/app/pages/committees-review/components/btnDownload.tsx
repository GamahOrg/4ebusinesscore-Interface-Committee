import { FC, useRef, useState } from "react";
import { useIntl } from "react-intl";

import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {CommitteesReviewShowDecisionDetails} from "./CommitteesReviewShowDecisionDetails"

const BtnDownload: FC = () => {
  const intl = useIntl();
  const [isDownloading, setIsDownloading] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

const handleDownloadPdf = () => {
  setIsDownloading(true); // hide button

  setTimeout(() => {
    const input = componentRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("committee-details.pdf");
        setIsDownloading(false); 
      });
    } else {
      setIsDownloading(false);
    }
  }, 100); 
};

  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "",
      defaultName: "CommitteesReview",
      name: cardName || serviceName,
    },
  ];
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle="CommitteesReview"
          extraTitle={cardName || serviceName}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardOption={cardName || serviceName}
        />

         <div className="col-lg-6 d-flex  justify-content-end pe-5  m-5">
                    <button
                      className="btn custom-outline-primary-btn d-flex align-items-center px-4 py-3 shadow-sm"
                      onClick={handleDownloadPdf}
                    >
                      <i className="far fa-file fa-fw fs-5 "></i>
                      {intl.formatMessage({ id: "Download" })}
                    </button>
                  </div>
      </div>
      <CommitteesReviewShowDecisionDetails
        ref={componentRef}
      />
    </>
  );
};

export { BtnDownload };
