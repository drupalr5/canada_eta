import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeading from "./PageHeading";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetailsByOrderId } from "../../Redux/orderSlice";
import useAuthParameter from "../../Hooks/useAuthParameter";
// import query from 'react-query';
function OrderDetails(props) {
  const { orderId } = useParams();
  const { path } = useAuthParameter();
  const orderDetails = useSelector(state => state.order.OrderDetails);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(window.location.search)
  const oid = queryParams.get("oid");
  const ot = queryParams.get("ot");
  const pre_no = queryParams.get("pre_no");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetailsByOrderId(orderId))
  }, [orderId, dispatch])
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
                        {orderDetails ? orderDetails.map((item) => {
                          return (
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.order_id}</td>
                              <td>
                                <Link to="../uploads/1682301344-Name -Jacqueline Evita M Salankey Passport number - R505507 eTA number -  J523521288.pdf" download="" className="btn btn-success">Download File</Link>
                              </td>
                              <td>{item.create_ts}</td>
                            </tr>
                          )
                        }) : "No Records found"}
                      </tbody>
                    </table>
                    {orderDetails ? orderDetails.map((item) => {
                      return (
                        <form className="form-inline" action="details.php?action=resend_mail&amp;pre_no=1&amp;ot=Contact Customer&amp;oid=19802" method="POST" id="form1">
                          <input type="hidden" name="order_id" value={item.order_id} />
                          <div className="form-group">
                            <input type="text" name="email" className="form-control" style={{ width: '800px !important' }} value={item.email} />
                          </div>
                          <div className="form-group">
                            <br /><br /><br />
                            <button type="submit" name="doc1" className="btn btn-success" style={{ marginLeft: '20px' }} id="download_btn">Resend Email</button>
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
                        <form enctype="multipart/form-data" method="post" action="details.php?action=upload&amp;pre_no=1&amp;ot=Contact Customer&amp;oid=19802">
                          <table className="table">
                            <tbody><tr>
                              <td>
                                <div className="form-group">
                                  <label>Order ID</label>
                                  <input type="text" name="order_id" className="form-control" placeholder="Order ID" value={item.order_id} readonly="" required="" />
                                </div>
                              </td>
                              <td>
                                <div className="form-group">
                                  <label>Email ID</label>
                                  <input type="text" name="email" className="form-control" value={item.email} placeholder="Email" required="" />
                                </div>
                              </td>
                            </tr>
                              <tr>
                                <td>
                                  <div className="form-group">
                                    <label>PDF</label>
                                    <input type="file" className="form-control required" id="validationDefault02" required="" name="file1" />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="form-group">

                                    <Link href="../uploads/1682301344-Name -Jacqueline Evita M Salankey Passport number - R505507 eTA number -  J523521288.pdf" target="_blank" download="" className="blue-btn">Download File</Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  <button type="submit" className="blue-btn">Submit</button>
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
                            <td>{item.order_id}</td>
                          </tr>
                          <tr>
                            <th width="250px;">Are you applying on behalf of someone?</th>
                            <td>{item.applying_for_someone}</td>
                          </tr>
                          {
                            item.applying_for_minor &&
                            <tr>
                              <th width="250px;">Are you applying on behalf of a minor child? </th>
                              <td>{item.applying_for_minor}</td>
                            </tr>
                          }

                          {
                            item.representative_is &&
                            <tr>
                              <tr style={{ backgroundColor: '#A9A9A9', color: '#fff' }}>
                                <th width="250px;">Parent/guardian or representative details</th>
                                <td></td>
                              </tr>
                              <tr>
                                <th width="250px;">I am </th>
                                <td>{item.representative_is}</td>
                              </tr>
                            </tr>
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
                            <tr style="background-color: #A9A9A9;color: #fff;">
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
                              <th width="250px;">Apartment/unit number</th>
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
                            item.customer_date &&
                            <tr>
                              <th width="250px;">US Date</th>
                              <td>{item.customer_date}</td>
                            </tr>
                          }
                          {
                            item.customer_date &&
                            <tr>
                              <th width="250px;">US EST</th>
                              <td>{item.customer_date}</td>
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
                        <tr><td colspan="4" align="center">No record found</td></tr>
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
                    <form action={`${path}/order-details/${orderId}?action=remark&id=${orderId}`} method="post">
                      <input type="hidden" name="pre_no" value={pre_no} />
                      <input type="hidden" name="ot" value={ot} />
                      <input type="hidden" name="oid" value={oid} />
                      <textarea name="remark" style={{ display: 'inline-block' }} className="form-control"></textarea>
                      <br />
                      <input type="checkbox" name="whatsapp" value="Y" /><b> Whatsapp</b>
                      <input type="checkbox" name="telephone" value="Y" /><b> Telephone</b>
                      <input type="checkbox" name="status_refund" value="Y" /><b> Refund</b>
                      <input type="checkbox" name="voided" value="Y" /><b> Voided</b>
                      <input type="checkbox" name="chargeback" value="Y" /><b> Chargeback</b>
                      <br /><br />
                      <button type="submit" className="blue-btn" value="Remark" name="submit">Save Comment</button>
                      <button type="submit" className="blue-btn" value="Awating" name="submit">Move to Awating Response</button>
                      <button type="submit" className="blue-btn" value="AwaitingGovt" name="submit">Move to Awaiting GOVT</button>
                      <button type="submit" className="blue-btn" value="Refund" name="submit">Move to Completed Refunds</button>
                      <button type="submit" className="blue-btn" value="Chargebacks" name="submit">Move to Chargebacks</button>
                      <button type="submit" className="blue-btn" value="Rejected" name="submit">Move to Rejected</button>
                      <input type="hidden" name="check" value="" className="form-control" />
                      <button type="submit" className="blue-btn" value="Completed" name="submit">Move to Completeded Orders</button>
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
                        <tr>
                          <td>1</td>
                          <td>ETA-200019802</td>
                          <td>04-23-2023 13:54:41</td>
                          <td>Aymen </td>
                          <td><div className="btn btn-success show_and_hide_data show_hide_data_again-4444" rel="4444"> Show</div>
                            <div className="btn btn-success hide_data-4444 hide_show_data" rel="4444" style={{ display: 'none' }}> Hide</div>
                            <br />
                            <div style={{ display: 'none' }} className="show_hide_data-4444 show_hide_data_again" id="4444">
                              <textarea className="form-control">Confirmation of receipt of eTA application </textarea>
                              <b>Whatsapp: N</b>
                              <b>Telephone: N</b>
                              <b>Refund: N</b>
                              <b>Voided: N</b>
                              <b>Chargeback: N</b>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <button type="button" className="blue-btn" data-toggle="modal" data-target="#exampleModal">View Email Content</button>
              <button type="button" className="blue-btn" data-toggle="modal" data-target="#defencePackModal1">Defence Pack 1</button>
              <button type="button" className="blue-btn" data-toggle="modal" data-target="#defencePackModal2">Defence Pack 2</button>
              <button type="button" className="blue-btn" data-toggle="modal" data-target="#transactionModal">Enter Transaction ID</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default OrderDetails;
