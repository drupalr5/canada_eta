import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeading from "../PageHeading";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetailsByOrderId } from "../../../Redux/orderSlice";
import useAuthParameter from "../../../Hooks/useAuthParameter";
import { createOrderRemarksByOrderId } from "../../../Redux/remarkSlice";
import moment from 'moment-timezone';
import {
  updateOrdersData,
  getOrderSideBarCount,
  getOrderTiles,
  uploadOrderDocument,
  moveUploadedFile,
  createEmailHistoryByOrderId,
} from "../../../Redux/orderSlice";
import EmailContentModal from "./EmailModal";
import config from "../../../config.json";
import { EmailMessage } from "./EmailModal";
const DOC_DOWNLOAD_PATH = config?.DOC_DOWNLOAD_PATH;
// import query from 'react-query';

function OrderDetails(props) {
  const docRef = useRef(null);
  const [resendEmail, setResendEmail] = useState(null)
  const { orderId } = useParams();
  const { param, type, usDate, usTime, currentTime } = useAuthParameter();
  const [isShow, invokeModal] = useState(false);
  const [popupId, setPopupId] = useState(false);
  const initModal = (id) => {
    setPopupId(id);
    return invokeModal(!false);
  };
  const closeModal = () => {
    return invokeModal(!true);
  };
  let currentOrderStatus = '';
  const initialRemark = {
    whatsapp: "",
    telephone: "",
    status_refund: "",
    voided: "",
    chargeback: "",
    remark: "",
    remark_name: type,
    order_id: orderId,
    us_date: usDate,
    us_time: usTime,
    create_ts: currentTime
  }
  const orderDetails = useSelector(state => state.order.OrderDetails);
  const queryParams = new URLSearchParams(window.location.search)
  const oid = queryParams.get("oid");
  const ot = queryParams.get("ot");
  const pre_no = queryParams.get("pre_no");
  const dispatch = useDispatch();

  const docUploadIntitial = {
    order_id: orderId,
    file1: '',
    files: '',
    email: orderDetails?.[0]?.email,
    mail_sent: 1,
    create_ts: currentTime
  }

  const [docUploadValue, setDocUploadValue] = useState(docUploadIntitial);
  const emailHistoryIntitial = {
    order_id: orderId,
    create_ts: currentTime,
    us_date_time: `${usDate}" "${usTime}`,
  }
  const [remarkInput, setremarkInput] = useState(initialRemark);
  const RemarkShowHandler = (id) => {
    document.getElementById(id).style.display = "block";
    document.querySelector(".show_hide_data_again-" + id).style.display = "none";
    document.querySelector(".hide_data-" + id).style.display = "block";
  }
  const RemarkHideHandler = (id) => {
    document.getElementById(id).style.display = "none";
    document.querySelector(".show_hide_data_again-" + id).style.display = "block";
    document.querySelector(".hide_data-" + id).style.display = "none";
  }

  const whatsappToggle = (e) => {
    setremarkInput({
      ...remarkInput, whatsapp: (remarkInput.whatsapp == "Y") ? "" : "Y"
    })
  }
  const telephoneToggle = (e) => {
    setremarkInput({
      ...remarkInput, telephone: (remarkInput.telephone == "Y") ? "" : "Y"
    });
  }
  const refundToggle = (e) => {
    setremarkInput({
      ...remarkInput, status_refund: (remarkInput.status_refund == "Y") ? "" : "Y"
    });
  }
  const voidedToggle = (e) => {
    setremarkInput({
      ...remarkInput, voided: (remarkInput.voided == "Y") ? "" : "Y"
    });
  }
  const chargebackToggle = (e) => {
    setremarkInput({
      ...remarkInput, chargeback: (remarkInput.chargeback == "Y") ? "" : "Y"
    });
  }
  const commentHandler = (e) => {
    setremarkInput({
      ...remarkInput, remark: e.target.value
    });
  }

  const SaveRemarkHandler = (e) => {
    e.preventDefault();
    dispatch(createOrderRemarksByOrderId(remarkInput)).then(result => {
      if (result.payload.errors) {
        toast.error(`${result.payload.errors[0].message}`, {
          className: "toast-message",
        });
      }
      else {
        toast.success(`Remark has been added successfully`, {
          className: "toast-message",
        });
        dispatch(getOrderDetailsByOrderId(orderId))
      }
    })
      .catch(err => {
        console.log(err);
      })
    let updateData = {
      remark: remarkInput.remark
    }
    dispatch(updateOrdersData({ order_id: orderId, data: updateData }))
      .then(result => {
        console.log(result)
      })
  }
  const ViewEmailModal = (id) => {
    initModal(id)
  }
  const updateOrderState = (status) => {
    let updateData = {
      process_status: status
    }
    dispatch(updateOrdersData({ order_id: orderId, data: updateData }))
      .then(result => {
        document.querySelectorAll('button').forEach(function (button) {
          button.removeAttribute("disabled")
        })
        let currentbutton = document.querySelector('button[value="' + status + '"]');
        currentbutton.setAttribute('disabled', "disabled")
        if (result.payload) {
          if (result.payload.errors) {
            toast.error(`${result.payload.errors[0].message}`, {
              className: "toast-message",
            });
          }
          else {
            toast.success(`Order has been updated successfully`, {
              className: "toast-message",
            });
            dispatch(getOrderTiles(param))
            dispatch(getOrderSideBarCount(param))
          }
        }
      })
  }
  let awaitingButton,
    awaitingGovtButton, refundButton, rejectButton, completedButton, chargebackButton = false;

  useEffect(() => {
    dispatch(getOrderDetailsByOrderId(orderId))
  }, [orderId, dispatch])

  const handleFileUploadChange = (e) => {
    e.preventDefault();
    setDocUploadValue({
      ...docUploadValue,
      files: e.target.files[0],
      email: docUploadValue?.email ? docUploadValue?.email : orderDetails?.[0]?.email,
      file1: e.target.files[0]?.name
    })
  }

  const handleFileEmailChange = (e) => {
    e.preventDefault();
    setDocUploadValue({
      ...docUploadValue, email: e.target.value
    })
  }
  const SaveUploadDoc = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "files",
      docUploadValue.files
    );
    dispatch(moveUploadedFile(formData)).then(result => {
      if (result.payload) {
        setDocUploadValue({
          ...docUploadValue,
          file1: result?.payload?.fileName
        })
        dispatch(uploadOrderDocument(docUploadValue))
          .then(docuploaded => {
            if (docuploaded.payload.errors) {
              toast.error(`${result.payload.errors[0].message}`, {
                className: "toast-message",
              });
            }
            else {
              toast.success(`Your Doc has been updated successfully`, {
                className: "toast-message",
              });
              dispatch(getOrderDetailsByOrderId(orderId));
              docRef.current.value = null
            }
          })
      }
    }
    ).catch(err => {
      console.log(err)
      toast.error(`${err.payload.error[0].message}`, {
        className: "toast-message",
      });
    })
  }

  const resendEmailHandler = (e) => {
    e.preventDefault();
    dispatch(createEmailHistoryByOrderId(emailHistoryIntitial))
      .then(result => {
        if (result.payload.errors) {
          toast.error(`${result.payload.errors[0].message}`, {
            className: "toast-message",
          });
        }
        else {
          toast.success(`Email has beend sent susscesfully`, {
            className: "toast-message",
          });
          dispatch(getOrderDetailsByOrderId(orderId))
        }
      })
  }

  const resendEmailahandlerChange = (e) => {
    e.preventDefault();
    setResendEmail(e.target.value)
  }
  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="card card-details">
          <div className="header">
            <PageHeading pagename={"Order details"} />
          </div>
          <div className="body">
            <div className="card mb-3">
              <div className="card-header">
                <i className="fas fa-table"></i>Order Summary

                <div className="showing_entry-parent ">
                  <div className="">
                    <p style={{ float: 'right' }}>Showing 1 of 9 entries</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="card-header">
                  <h5> Email History</h5>
                  <div className="card-header-right">
                    <ul className="list-unstyled card-option">
                      <li><i className="feather icon-maximize full-card"></i></li>
                      <li><i className="feather icon-minus minimize-card"></i></li>
                    </ul>
                  </div>
                </div>
                <div className="card-block">
                  <div className="table-responsive" style={{ padding: '10px' }}>
                    <table className="table table-striped table-bordered myTable showhistory">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Order ID</th>
                          <th>Download</th>
                          <th>Date &amp; Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          (orderDetails[0]?.mailHistory) ? orderDetails[0]?.mailHistory.map((emails, index) => {
                            return (
                              <tr>
                                <td>{emails.id}</td>
                                <td>{emails.order_id}</td>
                                {
                                  orderDetails[0].uploadDoc[index]?.file1 ?

                                    <td>
                                      <Link to={`${DOC_DOWNLOAD_PATH}${orderDetails[0].uploadDoc[index]?.file1}`} download="" className="btn btn-success">Download File</Link>
                                    </td>


                                    : <td></td>
                                }

                                <td>{moment(emails?.create_ts).tz("est").format("MM-DD-YYYY z")}</td>
                              </tr>
                            )
                          }) : <tr><td colSpan={4} style={{ textAlign: "center" }}>No Records found</td></tr>
                        }
                      </tbody>
                    </table>
                    {orderDetails ? orderDetails.map((item) => {
                      currentOrderStatus = item?.process_status;
                      if (currentOrderStatus === "Awiating") {
                        awaitingButton = "disabled";
                      }
                      if (currentOrderStatus === "AwaitingGovt") {
                        awaitingGovtButton = "disabled";
                      }
                      if (currentOrderStatus === "Chargebacks") {
                        chargebackButton = "disabled";
                      }
                      if (currentOrderStatus === "Refund") {
                        refundButton = "disabled";
                      }
                      if (currentOrderStatus === "Rejected") {
                        rejectButton = "disabled";
                      }
                      if (currentOrderStatus === "Completed") {
                        completedButton = "disabled";
                      }

                      return (
                        <form className="form-inline" method="POST" id="form1">
                          <input type="hidden" name="order_id" value={item?.order_id} />
                          <div className="form-group">
                            <input type="text" name="email" className="form-control" style={{ width: '800px !important' }} value={(resendEmail == null) ? item?.email : resendEmail} onChange={resendEmailahandlerChange}/>
                          </div>
                          <div className="form-group">
                            <br /><br /><br />
                            <button onClick={resendEmailHandler} type="submit" name="doc1" className="btn btn-success" style={{ marginLeft: '20px' }} id="download_btn">Resend Email</button>
                          </div>
                        </form>
                      )
                    }) : ""}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="card-header">
                  <h5>Upload Document</h5>
                  <div className="card-header-right">
                    <ul className="list-unstyled card-option">
                      <li><i className="feather icon-maximize full-card"></i></li>
                      <li><i className="feather icon-minus minimize-card"></i></li>
                    </ul>
                  </div>
                </div>
                <div className="card-block">
                  <div className="table-responsive">
                    {orderDetails ? orderDetails.map((item) => {
                      return (
                        <form enctype="multipart/form-data" >
                          <table className="table">
                            <tbody><tr>
                              <td>
                                <div className="form-group">
                                  <label>Order ID</label>
                                  <input type="text" name="order_id" className="form-control" placeholder="Order ID" value={item?.order_id} readonly="" required="" />
                                </div>
                              </td>
                              <td>
                                <div className="form-group">
                                  <label>Email ID</label>
                                  <input type="email" name="email" className="form-control" value={docUploadValue?.email == undefined ? item?.email : docUploadValue?.email} placeholder="Email" required="" onChange={handleFileEmailChange} />
                                </div>
                              </td>
                            </tr>
                              <tr>
                                <td>
                                  <div className="form-group">
                                    <label>PDF</label>
                                    <input ref={docRef} onChange={handleFileUploadChange} type="file" className="form-control required" id="validationDefault02" required="" name="file1" accept=".pdf"/>
                                  </div>
                                </td>
                              </tr>
                              {orderDetails[0]?.uploadDoc && orderDetails[0].uploadDoc.map((docs) => {
                                return (
                                  <tr>
                                    <td>
                                      <div className="form-group">

                                        <Link to={`${DOC_DOWNLOAD_PATH}${docs.file1}`} target="_blank" download="" className="blue-btn">Download File</Link>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })}
                              <tr>
                                <td colSpan="2">
                                  <button type="submit" className="blue-btn" onClick={SaveUploadDoc}>Submit</button>
                                </td>
                              </tr>
                            </tbody></table>
                        </form>
                      )
                    }) : ""}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="order-detail table table-bordered" style={{ width: '100%' }}>

                    {orderDetails ? orderDetails.map((item) => {
                      return (
                        <tbody>
                          <tr>
                            <th width="250px;">Order ID</th>
                            <td>{item?.order_id}</td>
                          </tr>
                          <tr>
                            <th width="250px;">Are you applying on behalf of someone?</th>
                            <td>{item?.applying_for_someone}</td>
                          </tr>
                          {
                            item.applying_for_minor &&
                            <tr>
                              <th width="250px;">Are you applying on behalf of a minor child? </th>
                              <td>{item?.applying_for_minor}</td>
                            </tr>
                          }

                          {
                            item.representative_is &&
                            <>
                              <tr style={{ backgroundColor: '#A9A9A9', color: '#fff' }}>
                                <th width="250px;">Parent/guardian or representative details</th>
                                <td></td>
                              </tr>
                              <tr>
                                <th width="250px;">I am </th>
                                <td>{item?.representative_is}</td>
                              </tr>
                            </>
                          }
                          {
                            item.being_paid &&
                            <tr>
                              <th width="250px;">Are you being paid to represent the applicant and complete the form on their behalf?</th>
                              <td>{item.being_paid}</td>
                            </tr>

                          }
                          {
                            item.membership_id &&
                            <tr>
                              <th width="250px;">Membership ID number</th>
                              <td>{item.membership_id}</td>
                            </tr>

                          }
                          {
                            item.province_or_territory &&
                            <tr>
                              <th width="250px;">Which province or territory?</th>
                              <td>{item.province_or_territory}</td>
                            </tr>
                          }
                          {
                            item.surname &&
                            <tr>
                              <th width="250px;">Surname(s) / last name(s)</th>
                              <td>{item.surname}</td>
                            </tr>
                          }
                          {
                            item.first_name &&
                            <tr>
                              <th width="250px;">Given name(s) / first name(s)</th>
                              <td>{item.first_name}</td>
                            </tr>
                          }
                          {
                            item.firm_or_organization &&
                            <tr>
                              <th width="250px;">Name of firm, organization</th>
                              <td>{item.firm_or_organization}</td>
                            </tr>
                          }
                          {
                            item.mailing_address &&
                            <tr>
                              <th width="250px;">Mailing address</th>
                              <td>{item.mailing_address}</td>
                            </tr>
                          }
                          {
                            item.telephone_number &&
                            <tr>
                              <th width="250px;">Telephone Number</th>
                              <td>{item.telephone_number}</td>
                            </tr>
                          }
                          {
                            item.postal_code &&
                            <tr>
                              <th width="250px;">Postal code</th>
                              <td>{item.postal_code}</td>
                            </tr>
                          }
                          {
                            item.fax_number &&
                            <tr>
                              <th width="250px;">Fax number</th>
                              <td>{item.fax_number}</td>
                            </tr>
                          }
                          {
                            item.email_address &&
                            <tr>
                              <th width="250px;">Email address</th>
                              <td>{item.email_address}</td>
                            </tr>
                          }
                          <tr style={{ backgroundColor: '#A9A9A9', color: '#fff' }}>
                            <th width="250px;">Travel Details</th>
                            <td></td>
                          </tr>
                          <tr>
                            <th width="250px;">What travel document do you plan to use to travel to Canada?</th>
                            <td>{item.travel_document}</td>
                          </tr>
                          {
                            item.country_on_passport &&
                            <tr>
                              <th width="250px;">Select the code that matches the one on your passport.</th>
                              <td>{item.country_on_passport}</td>
                            </tr>
                          }
                          {
                            item.lawful_permanent_resident_of_us &&
                            <tr>
                              <th width="250px;">Are you a lawful permanent resident of the United States with a valid U.S. Citizenship and Immigration Services (USCIS) number?</th>
                              <td>{item.lawful_permanent_resident_of_us}</td>
                            </tr>
                          }{
                            item.uscis_number &&
                            <tr>
                              <th width="250px;">United States lawful permanent resident USCIS number</th>
                              <td>{item.uscis_number}</td>
                            </tr>
                          }{
                            item.confirm_uscis_number &&
                            <tr>
                              <th width="250px;">United States lawful permanent resident alien registration card (Green Card) number (re-enter)</th>
                              <td>{item.confirm_uscis_number}</td>
                            </tr>
                          }
                          {
                            item.confirm_uscis_number &&
                            <tr>
                              <th width="250px;">Date of expiry</th>
                              <td>{item.uscis_exp_year} - {item.uscis_exp_month}- {item.uscis_exp_day}</td>
                            </tr>
                          }
                          {
                            item.citizen_country &&
                            <tr>
                              <th width="250px;">What is the nationality noted on this passport?</th>
                              <td>{item.citizen_country}</td>
                            </tr>
                          }
                          {
                            item.passport_number &&
                            <tr style={{ backgroundColor: '#A9A9A9', color: '#fff' }}>
                              <th width="250px;">Passport details of applicant</th>
                              <td></td>
                            </tr>
                          }
                          <tr>
                            <th width="250px;">Passport number</th>
                            <td>{item.passport_number}</td>
                          </tr>


                          {
                            item.confirm_passport_numbe &&
                            <tr>
                              <th width="250px;">Passport number (re-enter)</th>
                              <td>{item.confirm_passport_numbe}</td>
                            </tr>
                          }
                          {
                            item.passport_surname &&
                            <tr>
                              <th width="250px;">Surname(s) / last name(s)</th>
                              <td>{item.passport_surname}</td>
                            </tr>
                          }
                          {
                            item.passport_first_name &&
                            <tr>
                              <th width="250px;">Given name(s) / first name(s)</th>
                              <td>{item.passport_first_name}</td>
                            </tr>
                          }
                          {
                            item.birth_year &&
                            <tr>
                              <th width="250px;">Date of Birth</th>
                              <td>{item.birth_year}-{item.birth_month}-{item.birth_date}</td>
                            </tr>
                          }
                          {
                            item.gender &&
                            <tr>
                              <th width="250px;">Gender</th>
                              <td>{item.gender}</td>
                            </tr>
                          }{
                            item.country_of_birth &&
                            <tr>
                              <th width="250px;">Country/territory of birth</th>
                              <td>{item.country_of_birth}</td>
                            </tr>
                          }
                          {
                            item.city_of_birth &&
                            <tr>
                              <th width="250px;">City/town of birth</th>
                              <td>{item.city_of_birth}</td>
                            </tr>
                          }
                          {
                            item.passport_issue_date &&
                            <tr>
                              <th width="250px;">Passport Issue Date</th>
                              <td>{item.passport_issue_year}-{item.passport_issue_month}-{item.passport_issue_date}</td>
                            </tr>
                          }
                          {
                            item.passport_exp_date &&
                            <tr>
                              <th width="250px;">Passport Expiry Date</th>
                              <td>{item.passport_exp_year}-{item.passport_exp_month}-{item.passport_exp_date}</td>
                            </tr>
                          }
                          {
                            item.marital_status &&
                            <tr style={{ backgroundColor: '#A9A9A9', color: '#fff' }}>
                              <th width="250px;">Personal Details</th>
                              <td></td>
                            </tr>
                          }
                          <tr>
                            <th width="250px;">Marital status</th>
                            <td>{item.marital_status}</td>
                          </tr>

                          {
                            item.appliedd_for_visa_before &&
                            <tr>
                              <th width="250px;">Have you ever applied for or obtained a visa, an eTA or a permit to visit, live, work or study in Canada?</th>
                              <td>{item.appliedd_for_visa_before}</td>
                            </tr>
                          }
                          {
                            item.uci_number &&
                            <tr>
                              <th width="250px;">Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number</th>
                              <td>{item.uci_number}</td>
                            </tr>
                          }
                          {
                            item.confirm_uci_number &&
                            <tr>
                              <th width="250px;">Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number (re-enter)</th>
                              <td>{item.confirm_uci_number}</td>
                            </tr>
                          }
                          {
                            item.occupation &&
                            <tr style={{ backgroundColor: '#A9A9A9', color: '#fff' }}>
                              <th width="250px;">Employment information</th>
                              <td></td>
                            </tr>
                          }
                          <tr>
                            <th width="250px;">Occupation</th>
                            <td>{item.occupation}</td>
                          </tr>

                          {
                            item.job_title &&
                            <tr>
                              <th width="250px;">Job title</th>
                              <td>{item.job_title}</td>
                            </tr>
                          }
                          {
                            item.employer_or_school_name &&
                            <tr>
                              <th width="250px;">Name of employer or school, as appropriate.</th>
                              <td>{item.employer_or_school_name}</td>
                            </tr>
                          }
                          {
                            item.job_country &&
                            <tr>
                              <th width="250px;">Country/territory</th>
                              <td>{item.job_country}</td>
                            </tr>
                          }
                          {
                            item.job_state &&
                            <tr>
                              <th width="250px;">Province/state</th>
                              <td>{item.job_state}</td>
                            </tr>
                          }
                          {
                            item.job_city &&
                            <tr>
                              <th width="250px;">City/town</th>
                              <td>{item.job_city}</td>
                            </tr>
                          }
                          {
                            item.working_since &&
                            <tr>
                              <th width="250px;">Since what year?</th>
                              <td>{item.working_since}</td>
                            </tr>
                          }
                          {
                            item.preferred_language &&
                            <tr style={{ backgroundColor: '#A9A9A9', color: '#fff' }}>
                              <th width="250px;">Contact information</th>
                              <td></td>
                            </tr>
                          }
                          <tr>
                            <th width="250px;">Preferred language to contact you</th>
                            <td>{item.preferred_language}</td>
                          </tr>
                          {
                            item.email &&
                            <tr>
                              <th width="250px;">Email address</th>
                              <td>{item.email}</td>
                            </tr>
                          }
                          {
                            item.confirm_email &&
                            <tr>
                              <th width="250px;">Email address (re-enter)</th>
                              <td>{item.confirm_email}</td>
                            </tr>
                          }
                          {
                            item.country_code &&
                            <tr>
                              <th width="250px;">Country Code</th>
                              <td>{item.country_code}</td>
                            </tr>
                          }
                          {
                            item.telephone_number &&
                            <tr>
                              <th width="250px;">Telephone Number</th>
                              <td>{item.telephone_number}</td>
                            </tr>
                          }
                          {
                            item.apartment_number &&
                            <tr style={{ backgroundColor: '#A9A9A9', color: '#fff' }}>
                              <th width="250px;">Residential address</th>
                              <td></td>
                            </tr>
                          }
                          {
                            item.apartment_number &&
                            <tr>
                              <th width="250px;">Apartment/unit number</th>
                              <td>{item.apartment_number}</td>
                            </tr>
                          }
                          {
                            item.house_name &&
                            <tr>
                              <th width="250px;">Street/civic number or house name</th>
                              <td>{item.house_name}</td>
                            </tr>
                          }
                          {
                            item.street_name &&
                            <tr>
                              <th width="250px;">Street address/name</th>
                              <td>{item.street_name}</td>
                            </tr>
                          }
                          {
                            item.street_name_2 &&
                            <tr>
                              <th width="250px;">Street address/name line 2</th>
                              <td>{item.street_name_2}</td>
                            </tr>
                          }
                          {
                            item.city &&
                            <tr>
                              <th width="250px;">City/town</th>
                              <td>{item.city}</td>
                            </tr>
                          }
                          {
                            item.country &&
                            <tr>
                              <th width="250px;">Country/territory</th>
                              <td>{item.country}</td>
                            </tr>
                          }
                          {
                            item.res_state &&
                            <tr>
                              <th width="250px;">Province/state</th>
                              <td>{item.res_state}</td>
                            </tr>
                          }
                          {
                            item.res_zip_code &&
                            <tr>
                              <th width="250px;">ZIP Code / Postal</th>
                              <td>{item.res_zip_code}</td>
                            </tr>
                          }
                          {
                            item.district &&
                            <tr>
                              <th width="250px;">ZIP Code / Postal</th>
                              <td>{item.district}</td>
                            </tr>
                          }
                          {
                            item.do_you_know_when_travel_to_canada &&
                            <tr>
                              <th width="250px;">Do you know when you will travel to Canada?</th>
                              <td>{item.do_you_know_when_travel_to_canada}</td>
                            </tr>
                          }
                          {
                            item.travel_to_canada_year &&
                            <tr>
                              <th width="250px;">When do you plan to travel to Canada?</th>
                              <td>{item.travel_to_canada_year}-{item.travel_to_canada_month}-{item.travel_to_canada_day}</td>
                            </tr>
                          }
                          {
                            item.travel_to_canada_hour &&
                            <tr>
                              <th width="250px;">Please enter the time your flight to Canada will depart</th>
                              <td>{item.travel_to_canada_hour}:{item.travel_to_canada_minute}:{item.travel_to_canada_time_zone}</td>
                            </tr>
                          }
                          {
                            item.have_you_ever_been_refused_a_visa_or_permit &&
                            <tr style={{ backgroundColor: '#A9A9A9', color: '#fff' }}>
                              <th width="250px;">Background Questions</th>
                              <td></td>
                            </tr>
                          }
                          {
                            item.country_that_refused_you_a_visa_or_permit &&
                            <tr>
                              <th width="250px;">For each refusal, please indicate the country that refused you a visa or permit, or denied you entry, as well as the reasons provided to you by the country.</th>
                              <td>{item.country_that_refused_you_a_visa_or_permit}</td>
                            </tr>
                          }
                          {
                            item.have_you_ever_committed_been_arrested &&
                            <tr>
                              <th width="250px;">Have you ever committed, been arrested for, been charged with or convicted of any criminal offence in any country/territory?</th>
                              <td>{item.have_you_ever_been_refused_a_visa_or_permit}</td>
                            </tr>
                          }
                          {
                            item.please_indicate_where_committed_been_arrested &&
                            <tr>
                              <th width="250px;">For each arrest, charge, or conviction, please indicate where (city, country), when (month/year), the nature of the offence, and the sentence.</th>
                              <td>{item.please_indicate_where_committed_been_arrested}</td>
                            </tr>
                          }
                          {
                            item.is_your_contact_with_tuberculosis &&
                            <tr>
                              <th width="250px;">Is your contact with tuberculosis the result of being a health care worker?</th>
                              <td>{item.is_your_contact_with_tuberculosis}</td>
                            </tr>
                          }
                          {
                            item.have_you_ever_been_diagnosed_with_tuberculosis &&
                            <tr>
                              <th width="250px;">Have you ever been diagnosed with tuberculosis?</th>
                              <td>{item.have_you_ever_been_diagnosed_with_tuberculosis}</td>
                            </tr>
                          }
                          {
                            item.past_two_years_diagnosed_with_tuberculosis &&
                            <tr>
                              <th width="250px;">In the past two years, were you diagnosed with tuberculosis or have you been in close contact with a person with tuberculosis?</th>
                              <td>{item.past_two_years_diagnosed_with_tuberculosis}</td>
                            </tr>
                          }
                          {
                            item.have_one_of_these_conditions &&
                            <tr>
                              <th width="250px;">Do you have one of these conditions?</th>
                              <td>{item.have_one_of_these_conditions}</td>
                            </tr>
                          }
                          {
                            item.additional_details &&
                            <tr>
                              <th width="250px;">Please briefly indicate if there are additional details pertinent to your application</th>
                              <td>{item.additional_details}</td>
                            </tr>
                          }
                          {
                            item.payment_status &&
                            <tr>
                              <th width="250px;">Payment status</th>
                              <td>{item.payment_status}</td>
                            </tr>
                          }
                          {
                            item.payment_status &&
                            <tr>
                              <th width="250px;">Process status</th>
                              <td>{item.payment_status}</td>
                            </tr>
                          }
                          {
                            item.assign_date &&
                            <tr>
                              <th width="250px;">Assign date</th>
                              <td>{item.assign_date}</td>
                            </tr>
                          }
                          {
                            item.process_status &&
                            <tr>
                              <th width="250px;">Processing type</th>
                              <td>{item.process_status}</td>
                            </tr>
                          }
                          {
                            item.customer_sign &&
                            <tr>
                              <th width="250px;">View Digital Signature</th>
                              <td><Link to={`/${item.customer_sign}`}>Click Here</Link></td>
                            </tr>
                          }
                          {
                            item.customer_date && (
                              <tr>
                                <th width="250px;">US Date</th>
                                <td>{moment(item.customer_date).utc().format("MM-DD-YYYY")}</td>
                              </tr>
                            )
                          }
                          {
                            item.customer_date &&
                            <tr>
                              <th width="250px;">US EST</th>
                              <td>{moment(item.customer_date).utc().format("HH:mm:ss")}</td>
                            </tr>
                          }
                          {
                            item.ip_address &&
                            <tr>
                              <th width="250px;">IP address</th>
                              <td>{item.ip_address}</td>
                            </tr>
                          }
                        </tbody>
                      )
                    }) : ""}
                  </table>
                </div>
              </div>
              <div className="card-body">
                <div className="card-header">
                  <h5> Download History</h5>
                  <div className="card-header-right">
                    <ul className="list-unstyled card-option">
                      <li><i className="feather icon-maximize full-card"></i></li>
                      <li><i className="feather icon-minus minimize-card"></i></li>
                    </ul>
                  </div>
                </div>
                <div className="card-block">
                  <div className="table-responsive" style={{ padding: '10px' }}>
                    <table className="table table-striped table-bordered myTable showhistory">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Order ID</th>
                          <th>Date &amp; Time</th>
                          <th>Downloaded File</th>

                          <th>IP Address</th>
                          <th>Timezone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orderDetails[0]?.downloadHistory ? orderDetails[0].downloadHistory.map((downloads, index) => {
                            return (
                              <tr>
                                <td>{downloads.id}</td>
                                <td>{downloads.order_id}</td>
                                <td>{downloads.create_ts}</td>
                                {
                                  orderDetails[0].uploadDoc[index]?.file1 ?

                                    <td>
                                      <Link to={`${DOC_DOWNLOAD_PATH}${orderDetails[0].uploadDoc[index]?.file1}`} download="" className="btn btn-success">Download File</Link>
                                    </td>


                                    : <td></td>
                                }
                                <td>{downloads.ip}</td>
                                <td>{downloads.timezone}</td>

                              </tr>
                            )
                          })
                            : <tr><td colSpan="6" align="center">No record found</td></tr>
                        }

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="card-header">
                  <h5>Add Comment Below</h5>
                </div>
                <div className="card-block">
                  <div className="table-responsive" style={{ padding: '10px' }}>
                    <form>
                      <input type="hidden" name="pre_no" value={pre_no} />
                      <input type="hidden" name="ot" value={ot} />
                      <input type="hidden" name="oid" value={oid} />
                      <textarea name="remark" style={{
                        display: 'inline-block',
                        padding: "15px"
                      }} className="form-control" onChange={commentHandler} />
                      <br />
                      <input type="checkbox" name="whatsapp" value={remarkInput.whatsapp} onChange={whatsappToggle} /><b> Whatsapp</b>
                      <input type="checkbox" name="telephone" value={remarkInput.telephone} onChange={telephoneToggle} /><b> Telephone</b>
                      <input type="checkbox" name="status_refund" value={remarkInput.status_refund} onChange={refundToggle} /><b> Refund</b>
                      <input type="checkbox" name="voided" value={remarkInput.voided} onChange={voidedToggle} /><b> Voided</b>
                      <input type="checkbox" name="chargeback" value={remarkInput.chargeback} onChange={chargebackToggle} /><b> Chargeback</b>
                      <br /><br />
                      <button className="blue-btn" value="Remark" name="submit" onClick={SaveRemarkHandler}>Save Comment</button>
                      {awaitingButton ?
                        <button disabled className="blue-btn" value="Awiating" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("Awiating") }}>Move to Awating Response</button>
                        : <button className="blue-btn" value="Awiating" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("Awiating") }}>Move to Awating Response</button>
                      }
                      {awaitingGovtButton ?
                        <button className="blue-btn" value="AwaitingGovt" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("AwaitingGovt") }}>Move to Awaiting GOVT</button>
                        : <button className="blue-btn" value="AwaitingGovt" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("AwaitingGovt") }}>Move to Awaiting GOVT</button>
                      }
                      {refundButton ?
                        <button disabled className="blue-btn" value="Refund" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("Refund") }}>Move to Completed Refunds</button>
                        : <button className="blue-btn" value="Refund" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("Refund") }}>Move to Completed Refunds</button>
                      }{chargebackButton ?
                        <button disabled className="blue-btn" value="Chargebacks" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("Chargebacks") }}>Move to Chargebacks</button>
                        : <button className="blue-btn" value="Chargebacks" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("Chargebacks") }}>Move to Chargebacks</button>
                      }{
                        rejectButton ?
                          <button disabled className="blue-btn" value="Rejected" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("Rejected") }}>Move to Rejected</button>
                          : <button className="blue-btn" value="Rejected" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("Rejected") }}>Move to Rejected</button>
                      }
                      {type == "Admin" &&
                        <button className="blue-btn" value="Completed" name="submit" onClick={(e) => { e.preventDefault(); updateOrderState("Completed") }}>Move to Completeded Orders</button>
                      }
                    </form>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="card-header">
                  <h5>Comment History</h5>
                  <div className="card-header-right">
                    <ul className="list-unstyled card-option">
                      <li><i className="feather icon-maximize full-card"></i></li>
                      <li><i className="feather icon-minus minimize-card"></i></li>
                    </ul>
                  </div>
                </div>
                <div className="card-block">
                  <div className="table-responsive" style={{ padding: '10px' }}>
                    <table className="table table-striped table-bordered myTable showhistory">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Order ID</th>
                          <th>Date &amp; Time</th>
                          <th>Team</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails[0]?.remark ? orderDetails[0].remark.map(remarks => {
                          return (
                            <tr>
                              <td>{remarks.id}</td>
                              <td>{remarks.order_id}</td>
                              <td>{remarks.us_date} {remarks.us_time}</td>
                              <td>{remarks.remark_name}</td>
                              <td><button className={`btn btn-success show_and_hide_data show_hide_data_again-${remarks.id}`} rel={remarks.id} onClick={() => RemarkShowHandler(remarks.id)}> Show</button>
                                <button className={`btn btn-success hide_data-${remarks.id} hide_show_data`} rel={remarks.id} style={{ display: 'none' }} onClick={() => RemarkHideHandler(remarks.id)}> Hide</button>
                                <br />
                                <div style={{ display: 'none' }} className={`show_hide_data-${remarks.id} show_hide_data_again`} id={remarks.id}>
                                  <textarea className="form-control" value={remarks.remark} style={{
                                    padding: "10px 15px"
                                  }}></textarea>
                                  <b>Whatsapp: {remarks?.whatsapp ? "Y " : "N "}</b>
                                  <b>Telephone: {remarks?.telephone ? "Y " : "N "}</b>
                                  <b>Refund: {remarks?.status_refund ? "Y " : "N "}</b>
                                  <b>Voided: {remarks?.voided ? "Y " : "N "}</b>
                                  <b>Chargeback: {remarks?.chargeback ? "Y " : "N "}</b>
                                </div>
                              </td>
                            </tr>

                          )
                        }) : "No comments found"
                        }

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {
                ot && ot == "Complete Refunds" ?
                  <button className="blue-btn" data-toggle="modal" data-target="#refundModal" onClick={(e) => { e.preventDefault(); ViewEmailModal("refundModal") }}>View Email Content</button>
                  : <button className="blue-btn" data-toggle="modal" data-target="#exampleModal" onClick={(e) => { e.preventDefault(); ViewEmailModal("exampleModal") }}>View Email Content</button>
              }

              <button type="button" className="blue-btn" data-toggle="modal" data-target="#defencePackModal1" onClick={(e) => { e.preventDefault(); ViewEmailModal("defencePackModal1") }}>Defence Pack 1</button>
              <button type="button" className="blue-btn" data-toggle="modal" data-target="#defencePackModal2" onClick={(e) => { e.preventDefault(); ViewEmailModal("defencePackModal2") }}>Defence Pack 2</button>
              <button type="button" className="blue-btn" data-toggle="modal" data-target="#transactionModal" onClick={(e) => { e.preventDefault(); ViewEmailModal("transactionModal") }}>Enter Transaction ID</button>
            </div>
          </div>
        </div>
      </div>
      {
        orderDetails ?
          <>
            <EmailContentModal isShow={isShow} initModal={initModal} closeModal={closeModal} modalId={popupId} modelData={orderDetails} />
          </>
          : ""
      }
    </div >
  );
}

export default OrderDetails;
