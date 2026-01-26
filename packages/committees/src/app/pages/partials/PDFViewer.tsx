import { FC } from 'react'
import { toAbsoluteUrl } from '../../helpers';

interface IPDFViewer {
  path: string
}

export const PDFViewer: FC<IPDFViewer> = ({ path }) => {

  return (
    <div className="modal-dialog modal-dialog-centered" style={{ width: "80%", maxWidth: "100%", margin: "0 auto" }}>
      <div className="modal-content special-content no-border-radius">
        <div className="modal-header special-box-content ce-flex arc-head no-border-radius" style={{ height: "65px" }}>
          <div className="btn btn-sm btn-icon btn-active-color-primary close-btn" data-bs-dismiss="modal">
            <span className="svg-icon svg-icon-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="1" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
              </svg>
            </span>
          </div>
        </div>
        <div className="modal-body">
          <div className="row animate__animated animate__fadeInDown">
            <div className="col-md-12 col-sm-12 topics-units create-live explain">
              <embed src={toAbsoluteUrl(path)} style={{ width: "100%", height: "750px", borderRadius: "15px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};