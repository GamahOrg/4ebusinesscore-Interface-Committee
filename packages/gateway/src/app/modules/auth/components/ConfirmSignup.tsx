/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'

export function ConfirmSignup() {
  const [loading, setLoading] = useState(false)


  return (
      <div className="confirm-signup">
          <div className="ba-text">
              <div className="typing-demo">مرحبا بك  ....</div>
          </div>
          <div className="ba-form continue" >
              <div className="form-group password">
                  <label className="form-label">اسم المستخدم</label>
                  <div className="input-group ba-input-group">
                      <div className="input-icon">
                          <i className="fa-solid fa-arrow-left-long"></i>
                          <input id="loginUser" type="text" className="form-control focus" name="email"  placeholder="فضلا أدخل اسم المستخدم" />
                          <div className="ba-text" >
                              <div className="typing-demo">تمت المصادقة ...</div>
                          </div>
                      </div>
                      <button className="btn btn-ba btn-blue continue-verification" type="button" >أستمرار</button>
                  </div>
              </div>

              <div className="form-group verification-code" >
                  <label className="form-label">كلمة المرور</label>
                  <div className="input-group ba-input-group">
                      <div className="input-icon">
                          <i className="fa-solid fa-arrow-left-long"></i>
                          <input id="loginPass" type="password" name="password" className="form-control" autoComplete="autocomplete"  placeholder="فضلا أدخل كلمة المرور" />
                      </div>
                      <button className="btn btn-ba btn-blue" >تسجيل الدخول</button>
                  </div>
              </div>
          </div>
      </div>
  )
}
