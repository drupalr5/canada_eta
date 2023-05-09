import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import Logo from "../../../Layout/CommonLayout/Logo";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import config from "../../../config.json";
const DOC_DOWNLOAD_PATH = config?.DOC_DOWNLOAD_PATH;
export function EmailMessage({ modelData }) {
  return (
    <div style={{ padding: '10px', margin: '5px', border: 'solid 2px #ccc' }}>
      <div style={{ paddingBottom: '10px', backgroundColor: '#6c8793', borderBottom: 'solid 1px #ccc', paddingTop: '10px', paddingLeft: '10px' }}>
        <Logo width={120} />
      </div>
      <p style={{ fontSize: '16px;' }}>Dear Customer: {modelData?.[0]?.passport_first_name} {modelData?.[0]?.passport_surname}</p>
      <p style={{ fontSize: '16px;' }}>We would like to inform you that your application has been successfully approved.</p>
      <p style={{ fontSize: '16px;' }}>An eTA is automatically linked to your passport</p>
      <p style={{ fontSize: '16px;' }}>To download your eTA confirmation</p>
      <p style={{ fontSize: '16px;' }}>Please click on the link below</p>
      <p style={{ fontSize: '16px;' }}>Username : <Link to={`mailto:${modelData?.[0]?.email}`} style={{ color: '#f96332' }}>{modelData?.[0]?.email} </Link></p>
      <p style={{ fontSize: '16px;' }}>Order ID  : {modelData?.[0]?.order_id} </p> <br />
      <p><Link to={`/track/${btoa(modelData?.[0]?.order_id)}`} target='_blank' style={{ background: '#007bff', border: 'solid 2px #007bff', color: '#fff', padding: '10px 25px' }}>Click Here</Link></p><br />
      <p style={{ fontSize: '16px;' }}>Your eTA has been registered and it is available electronically for review by your airline at check-in and by the Canada Immigration Authorities on your arrival in Canada. You do not need a label in your passport. Your eTA has been recorded with the data and conditions detailed in the PDF document which is available to download.</p>
      <p style={{ fontSize: '16px;' }}><b>eTA Validity:</b></p>
      <ul>
        <li style={{ fontSize: '16px;' }}>The eTA is valid until the Expiration date noted in the document. This is the last day that you have the authority to enter Canada.</li>
        <li style={{ fontSize: '16px;' }}>This expiry date will either be 5 years from the issue date or until the expiry of your passport.</li>
        <li style={{ fontSize: '16px;' }}>The eTA is a multiple entry authorization allowing a maximum of 6 months per visit.</li>
        <li style={{ fontSize: '16px;' }}>You are permitted to stay beyond your eTA's validity date, but not beyond the 6-month maximum per trip.</li>
        <li style={{ fontSize: '16px;' }}>If you obtain a new passport for any reason, you will need to re-apply for a new Canadian Travel Authorization (eTA).</li>
      </ul>
      <br />
      <p style={{ fontSize: '16px;' }}>It is recommended, but not required, that you take a printed or digital copy of your eTA with you to Canada.</p>
      <p style={{ fontSize: '16px;' }}>Please make sure you check the official requirements and health regulations before traveling to your destination as travel restrictions may be applied in some cases.</p>
      <p style={{ fontSize: '16px;' }}>Please contact us with any questions you may have regarding your Travel Authorization (eTA).</p>
      <p style={{ fontSize: '16px;' }}>Should you have any inquiries, please contact us through our <Link style={{ color: '#f96332' }} to='https://canada-eta.online/contact.php'>contact form</Link> or via email at <a style={{ color: '#f96332' }} href='mailto:inquiries@canada-eta.online'>inquiries@canada-eta.online</a> indicating your order ID.</p>
      <p style={{ fontSize: '16px;' }}><strong>Customer Service Number</strong> : +1 (407) 305 - 3310</p>
      <p style={{ fontSize: '16px;' }}><strong>Important notice:</strong></p>
      <p style={{ fontSize: '16px;' }}>If you are not satisfied with the service you have received or wish to file a complaint, please contact us at <a style={{ color: '#f96332' }} href='mailto:inquiries@canada-eta.online'>inquiries@canada-eta.online</a>, where we will be happy to assist you or alternatively click on one of the links below for more information.</p>
      <p style={{ fontSize: '16px;' }}>You can access the terms and conditions you agreed to by clicking here <Link style={{ color: '#f96332' }} to='https://canada-eta.online/terms.php'>click here</Link></p>
      <p style={{ fontSize: '16px;' }}>Thank you for using our services</p>
      <p style={{ fontSize: '16px;' }}>Regards,</p>
      <p style={{ fontSize: '16px;' }}>Processing Department</p>
      <p style={{ fontSize: '16px;' }}><Link style={{ color: '#f96332' }} to='https://canada-eta.online/terms.php'>Terms</Link> | <Link style={{ color: '#f96332' }} to='https://canada-eta.online/privacy.php'>Privacy</Link> | <Link style={{ color: '#f96332' }} to='https://canada-eta.online/contact.php'>Contact</Link> | <Link style={{ color: '#f96332' }} to='https://canada-eta.online/refund.php'>Refund</Link></p>
    </div>
  )
}

export function ExampleModal({ isShow, initModal, closeModal, modalId, modelData }) {
  let countryCode = modelData?.[0]?.country_code;
  let phone = modelData?.[0].telephone_number.replace("-", "");
  const phoneWhats = countryCode + phone;
  return (
    <>
      <Modal id={modalId} size="lg" show={isShow}>
        <Modal.Header>
          <Modal.Title>Email Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmailMessage modelData={modelData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Link type="button" className="btn btn-secondary" to={`http://wa.me/${phoneWhats}`} target="_blank">Send Whatsapp Message</Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const RefundMail = ({ isShow, initModal, closeModal, modalId, modelData }) => {
  let countryCode = modelData?.[0]?.country_code;
  let phone = modelData?.[0].telephone_number.replace("-", "");
  const phoneWhats = countryCode + phone;
  return (
    <>
      <Modal id={modalId} size="lg" show={isShow}>
        <Modal.Header>
          <Modal.Title>Email Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ paddingBottom: '10px', backgroundColor: '#6c8793', borderBottom: 'solid 1px #ccc', paddingTop: '10px', paddingLeft: '10px' }}>
            <Logo width={120} />
          </div>
          <p style={{ fontSize: '16px;' }}>Dear Customer: {modelData?.[0]?.passport_first_name} {modelData?.[0]?.passport_surname}</p>
          <p style={{ fontSize: '16px;' }}>Thank you for letting us know that canada-eta.online was not for</p>
          <p style={{ fontSize: '16px;' }}>you, but we understand that not everyone prefers to use our</p>
          <p style={{ fontSize: '16px;' }}>services.We have processed your refund, and it will be credited to</p>
          <p style={{ fontSize: '16px;' }}>the card you used for this transaction within 3 - 5 business days.</p>
          <p style={{ fontSize: '16px;' }}>In the meantime, please contact us at <a href="mailto:inquiries@canada-eta.online">inquiries@canada-eta.online</a>,  if </p>
          <p style={{ fontSize: '16px;' }}>you have any questions, comments, or feedback, and as per our </p> <br />
          <p style={{ fontSize: '16px;' }}>privacy policy, all of your information has been deleted off our system. </p><br />
          <p style={{ fontSize: '16px;' }}>Best Regards</p>
          <p style={{ fontSize: '16px;' }}><b>Finance Department</b></p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Link type="button" className="btn btn-secondary" to={`http://wa.me/${phoneWhats}`} target="_blank">Send Whatsapp Message</Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const DefencePackModal1 = ({ isShow, initModal, closeModal, modalId, modelData }) => {
  let phone = modelData?.[0]?.country_code.replace("-", "", modelData?.[0].telephone_number);
  return (
    <>
      <Modal id={modalId} size="lg" show={isShow}>
        <Modal.Header>
          <Modal.Title style={{ width: '100%' }}><h5 style={{ display: 'inline-flex' }}>Defence Pack Content</h5>
            <button style={{ background: "none", border: "0", color: "#FF3636", cursor: "pointer", float: "right" }} onClick={closeModal}>
              <span aria-hidden="true">×</span>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Logo width={200} />
          <p style={{ textAlign: 'right' }}>Electric Doc Services LLC </p>
          <p style={{ textAlign: 'right' }}>1800 Pembrook Dr.</p>
          <p style={{ textAlign: 'right' }}>Suite 300</p>
          <p style={{ textAlign: 'right' }}>Orlando</p>
          <p style={{ textAlign: 'right' }}>FL, 32810</p>
          <p style={{ textAlign: 'right' }}>Tel: +1 (407) 305-3310</p>
          <p style={{ textAlign: 'right', textDecoration: 'underline' }}>Inquiries@canada-eta.online</p>
          <p style={{ textAlign: 'right' }}>EIN: 85-1546748</p>
          <p style={{ fontSize: '16px;' }}>{moment().format("MMMM DD, YYYY")}</p>
          <p style={{ fontSize: '16px;' }}></p>
          <p style={{ fontSize: '16px;' }}>Dear </p> <br />
          <p style={{ fontSize: '16px;' }}>The customer was provided with the service that we advertise, and the customer received
            the ETA confirmation which we paid on their behalf. Please find enclosed all the details
            regarding our service. This is the process through in which a customer must proceed to
            place an order with us:</p>
          <p>The customer was provided with the service that we advertise, and the customer received the ETA confirmation which we paid on their behalf. Please find enclosed all the details
            regarding our service. This is the process through in which a customer must proceed to place an order with us:</p><br />
          <p style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%' }}><b>(1.)</b> Prior to submitting the online application for the eTA, a customer who visits our
            website and wants to learn more about our services before proceeding can view the
            costs of our services as well as the additional benefits we provide for our customers.
            <b>(Page 2)</b><br /><br />
            In fact, we even have a disclaimer on our site which states that <b>(Our service is not
              connected to or affiliated with the Canadian Government),</b> so the customer is
            aware of the fact that we are a third-party service provider.<b>(Page 2)</b>
          </p>
          <br />
          <p style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
            <b>(2.)</b> When the customer has completed and paid for the online application, we are then
            able to see the <b>Order ID, Date and Time, IP address, Time Zone location,</b> as well
            as the <b>signature</b>. With all of this information, we are then able to confirm how many
            times the application was downloaded.<b>( Page 3,4,5 and 6 )</b>
          </p>
          <br />
          <p>
            Any information like <b>IP addresses, emails, phone numbers,</b> and <b>addresses</b> provided by
            customers are passed on to Payees, if there is suspicion of fraud, the payment would be
            declined.
          </p><br />
          <p style={{ border: 'black', borderWidth: '3px', borderStyle: 'solid', fontWeight: 'bold', padding: '10px' }}>
            NEITHER A REFUND NOR A COMPLAINT HAS BEEN SUBMITTED BY THIS
            CUSTOMER, SO THIS FIRST CHARGEBACK SHOULD BE DENIED ON THE
            BASIS THAT NO REFUND HAS BEEN REQUESTED.
          </p><br />
          <b><span style={{ textDecoration: 'underline' }}>Fees</span></b> (Before apply page)<br />
          Fee page with links to our additional benefits and Government site.
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/fee_page.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Disclaimer</span></b> (Before apply page)<br />
          Homepage with various contact options links and disclaimer.
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/disclaimer1.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Payment Confirmation</span></b> (After completion)<br />
          Payment confirmation page.
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/thankyou_page.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Order Confirmation</span></b><br />
          In the confirmation email that is sent to the customer after the order has been paid for, there
          is a link to our terms and conditions. At this stage the customer is still able to contact us if
          they have any questions, concerns or require a refund.<br />
          It is disappointing that the customer has not contacted us despite receiving many
          opportunities to do so. A copy of our terms can be <a href="https://canada-eta.online/terms.php">found here: https://canada-eta.online/
            terms.php </a>
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/order_confirmation_mail.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Completed Order Confirmation</span></b><br />
          Once the eTA application has been approved, we email the customer a link to our <b>portal</b>
          where they can download their approved eTA and be authorized to travel to Canada by air.
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/complete_order_confirmation_mail.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Completed Order</span></b><br />
          In addition to emailing the customer an <b>eTA</b> approval in a <b>PDF</b> format, we track how many
          times it has been downloaded.<br />
          As the customer accepts our terms and conditions, we can view the digital signature the
          customer has entered. Sometimes the signature is not perfect due to the device being used,
          but we can verify that we have the <b>date, time, IP address,</b> and <b>location</b> of the customer.
          <p></p><br />
          <div style={{ border: 'black', padding: '15px', borderWidth: '3px', borderStyle: 'solid' }}>
            <div className="order-dtl-block">
              <h2>Download History</h2>
              <div className="table-block table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <th style={{ fontSize: '14px' }} width="3%">#</th>
                      <th style={{ fontSize: '14px' }} width="15%">Order ID</th>
                      <th style={{ fontSize: '14px' }} width="15%">Date &amp; Time</th>
                      <th style={{ fontSize: '14px' }} width="15%">Downloaded File</th>
                      <th style={{ fontSize: '14px' }} width="15%">IP Address</th>
                      <th style={{ fontSize: '14px' }} width="15%">Timezone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      modelData[0]?.downloadHistory ? modelData[0].downloadHistory.map((downloads, index) => {
                        return (
                          <tr>
                            <td>{downloads.id}</td>
                            <td>{downloads.order_id}</td>
                            <td>{downloads.create_ts}</td>
                            {
                              modelData[0].uploadDoc[index]?.file1 ?
                                <td>
                                  <Link to={`${DOC_DOWNLOAD_PATH}${modelData[0].uploadDoc[index]?.file1}`} download="" className="btn btn-success">Download File</Link>
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
          </div><br />
          <img style={{ border: 'black', borderWidth: '3px', borderStyle: 'solid' }} src="https://canada-eta.online/signature/uploads/ETA-200020076signature.png" width="85%" height="70%" /><br /><br />
          <b><span style={{ textDecoration: 'underline' }}>Pictured below<span></span></span></b> This is the approved <b>eTA</b> in <b>PDF</b> format, which the customer downloaded from our portal.
          <p></p><br />
          <div style={{ border: 'black', padding: '15px', borderWidth: '3px', borderStyle: 'solid' }}>
            <embed style={{ border: 'black', borderWidth: '3px', borderStyle: 'solid' }} src="https://canada-eta.online/uploads/" width="500" height="400" />
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Link type="button" className="btn btn-secondary" to={`http://wa.me/${phone}`} target="_blank">Send Whatsapp Message</Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const DefencePackModal2 = ({ isShow, initModal, closeModal, modalId, modelData }) => {
  let countryCode = modelData?.[0]?.country_code;
  let phone = modelData?.[0].telephone_number.replace("-", "");
  const phoneWhats = countryCode + phone;
  return (
    <>
      <Modal id={modalId} size="lg" show={isShow}>
        <Modal.Header>
          <Modal.Title style={{ width: '100%' }}><h5 style={{ display: 'inline-flex' }}>Defence Pack Content</h5>
            <button style={{ background: "none", border: "0", color: "#FF3636", cursor: "pointer", float: "right" }} onClick={closeModal}>
              <span aria-hidden="true">×</span>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Logo width={200} />
          <p style={{ textAlign: 'right' }}>Electric Doc Services LLC </p>
          <p style={{ textAlign: 'right' }}>1800 Pembrook Dr.</p>
          <p style={{ textAlign: 'right' }}>Suite 300</p>
          <p style={{ textAlign: 'right' }}>Orlando</p>
          <p style={{ textAlign: 'right' }}>FL, 32810</p>
          <p style={{ textAlign: 'right' }}>Tel: +1 (407) 305-3310</p>
          <p style={{ textAlign: 'right', textDecoration: 'underline' }}>Inquiries@canada-eta.online</p>
          <p style={{ textAlign: 'right' }}>EIN: 85-1546748</p>
          <p style={{ fontSize: '16px;' }}>{moment().format("MMMM DD, YYYY")} </p>
          <p style={{ fontSize: '16px;' }}></p>
          <p style={{ fontSize: '16px;' }}>Dear </p> <br />
          <p style={{ fontSize: '16px;' }}>The customer was provided with the service that we advertise, and the customer received
            the ETA confirmation which we paid on their behalf. Please find enclosed all the details
            regarding our service. This is the process through in which a customer must proceed to
            place an order with us:</p>
          <p>The customer was provided with the service that we advertise, and the customer received the ETA confirmation which we paid on their behalf. Please find enclosed all the details
            regarding our service. This is the process through in which a customer must proceed to place an order with us:</p><br />
          <p style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%' }}><b>(1.)</b> Prior to submitting the online application for the eTA, a customer who visits our
            website and wants to learn more about our services before proceeding can view the
            costs of our services as well as the additional benefits we provide for our customers.
            <b>(Page 2)</b><br /><br />
            In fact, we even have a disclaimer on our site which states that <b>(Our service is not
              connected to or affiliated with the Canadian Government),</b> so the customer is
            aware of the fact that we are a third-party service provider.<b>(Page 2)</b>
          </p>
          <br />
          <p style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
            <b>(2.)</b> When the customer has completed and paid for the online application, we are then
            able to see the <b>Order ID, Date and Time, IP address, Time Zone location,</b> as well
            as the <b>signature</b>. With all of this information, we are then able to confirm how many
            times the application was downloaded.<b>( Page 3,4,5 and 6 )</b>
          </p>
          <br />
          <p>
            Any information like <b>IP addresses, emails, phone numbers,</b> and <b>addresses</b> provided by
            customers are passed on to Payees, if there is suspicion of fraud, the payment would be
            declined.
          </p><br />
          <p style={{ border: 'black', borderWidth: '3px', borderStyle: 'solid', fontWeight: 'bold', padding: "10px" }}>
            NEITHER A REFUND NOR A COMPLAINT HAS BEEN SUBMITTED BY THIS
            CUSTOMER, SO THIS FIRST CHARGEBACK SHOULD BE DENIED ON THE
            BASIS THAT NO REFUND HAS BEEN REQUESTED.
          </p><br />
          <b><span style={{ textDecoration: 'underline' }}>Fees</span></b> (Before apply page)<br />
          Fee page with links to our additional benefits and Government site.
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/fee_page.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Disclaimer</span></b> (Before apply page)<br />
          Homepage with various contact options links and disclaimer.
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/disclaimer1.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Payment Confirmation</span></b> (After completion)<br />
          Payment confirmation page.
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/thankyou_page.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Order Confirmation</span></b><br />
          In the confirmation email that is sent to the customer after the order has been paid for, there
          is a link to our terms and conditions. At this stage the customer is still able to contact us if
          they have any questions, concerns or require a refund.<br />
          It is disappointing that the customer has not contacted us despite receiving many
          opportunities to do so. A copy of our terms can be <a href="https://canada-eta.online/terms.php">found here: https://canada-eta.online/
            terms.php </a>
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/order_confirmation_mail.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Completed Order Confirmation</span></b><br />
          Once the eTA application has been approved, we email the customer a link to our <b>portal</b>
          where they can download their approved eTA and be authorized to travel to Canada by air.
          <p></p><br />
          <img src="https://canada-eta.online/admin/assets/images/complete_order_confirmation_mail.png" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', borderRadius: '1px' }} /><br /> <br />
          <b><span style={{ textDecoration: 'underline' }}>Completed Order</span></b><br />
          In addition to emailing the customer an <b>eTA</b> approval in a <b>PDF</b> format, we track how many
          times it has been downloaded.<br />
          As the customer accepts our terms and conditions, we can view the digital signature the
          customer has entered. Sometimes the signature is not perfect due to the device being used,
          but we can verify that we have the <b>date, time, IP address,</b> and <b>location</b> of the customer.
          <p></p><br />
          <div style={{ border: 'black', padding: '15px', borderWidth: '3px', borderStyle: 'solid' }}>
            <div className="order-dtl-block">
              <h2>Download History</h2>
              <div className="table-block table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <th style={{ fontSize: '14px' }} width="3%">#</th>
                      <th style={{ fontSize: '14px' }} width="15%">Order ID</th>
                      <th style={{ fontSize: '14px' }} width="15%">Date &amp; Time</th>
                      <th style={{ fontSize: '14px' }} width="15%">Downloaded File</th>
                      <th style={{ fontSize: '14px' }} width="15%">IP Address</th>
                      <th style={{ fontSize: '14px' }} width="15%">Timezone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      modelData[0]?.downloadHistory ? modelData[0].downloadHistory.map((downloads, index) => {
                        return (
                          <tr>
                            <td>{downloads.id}</td>
                            <td>{downloads.order_id}</td>
                            <td>{downloads.create_ts}</td>
                            {
                              modelData[0].uploadDoc[index]?.file1 ?
                                <td>
                                  <Link to={`${DOC_DOWNLOAD_PATH}${modelData[0].uploadDoc[index]?.file1}`} download="" className="btn btn-success">Download File</Link>
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
          </div><br />
          <img style={{ border: 'black', borderWidth: '3px', borderStyle: 'solid' }} src="https://canada-eta.online/signature/uploads/ETA-200020076signature.png" width="85%" height="70%" /><br /><br />
          <b><span style={{ textDecoration: 'underline' }}>Pictured below<span></span></span></b> This is the approved <b>eTA</b> in <b>PDF</b> format, which the customer downloaded from our portal.
          <p></p><br />
          <div style={{ border: 'black', padding: '15px', borderWidth: '3px', borderStyle: 'solid' }}>
            <embed style={{ border: 'black', borderWidth: '3px', borderStyle: 'solid' }} src="https://canada-eta.online/uploads/" width="500" height="400" />
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Link type="button" className="btn btn-secondary" to={`http://wa.me/${phoneWhats}`} target="_blank">Send Whatsapp Message</Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const TransactionModal = ({ isShow, initModal, closeModal, modalId, modelData }) => {
  return (
    <>
      <Modal id={modalId} size="lg" show={isShow}>
        <Modal.Header>
          <Modal.Title style={{ width: '100%' }}><h5 style={{ display: 'inline-flex' }}>Defence Pack Content</h5>
            <button style={{ background: "none", border: "0", color: "#FF3636", cursor: "pointer", float: "right" }} onClick={closeModal}>
              <span aria-hidden="true">×</span>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" id="insert_form">
            <div class="modal-body">
              <div class="form-group">
                <strong>Enter Transaction ID:</strong><br />
                <input type="text" name="transaction" id="transaction" maxlength="35" placeholder="Transaction ID" class="form-control" />
                <small class="error_transaction" id="error_transaction" style="color: red;"></small>
              </div>
              <div class="form-group">
                <strong>Enter Merchant Name:</strong><br />
                <input type="text" name="merchant" id="merchant" maxlength="35" placeholder="Merchant Name" class="form-control" />
                <small class="error_merchant" id="error_merchant" style="color: red;"></small>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <input type="submit" name="insert" id="insert" value="Submit" class="btn btn-primary" />
        </Modal.Footer>
      </Modal>
    </>
  )
}

function EmailContentModal({ isShow, initModal, closeModal, modalId, modelData }) {
  return (
    <>
      {
        modalId == "defencePackModal1" &&
        <DefencePackModal1 isShow={isShow} initModal={initModal} closeModal={closeModal} modalId={modalId} modelData={modelData} />
      }
      {
        modalId == "defencePackModal2" &&
        <DefencePackModal2 isShow={isShow} initModal={initModal} closeModal={closeModal} modalId={modalId} modelData={modelData} />
      }
      {
        modalId == "transactionModal" &&
        <TransactionModal isShow={isShow} initModal={initModal} closeModal={closeModal} modalId={modalId} modelData={modelData} />
      }
      {
        modalId == "refundMail" &&
        <RefundMail isShow={isShow} initModal={initModal} closeModal={closeModal} modalId={modalId} modelData={modelData} />
      }
      {
        modalId == "exampleModal" &&
        <ExampleModal isShow={isShow} initModal={initModal} closeModal={closeModal} modalId={modalId} modelData={modelData} />
      }
    </>
  )
}

export default EmailContentModal;