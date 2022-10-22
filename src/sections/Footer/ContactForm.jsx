import { useSnackbar } from "notistack";
import React from "react";

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    e.preventDefault();
    enqueueSnackbar("This Feature is Under Construction", { variant: "info" });
  };
  return (
    <div className="col-md-8 col-lg-8">
      <form
        className="form contact_message wow animated fadeInRight"
        id="contact-form"
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Your Name"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="subject"
                placeholder="Subject"
              />
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="form-group">
              <textarea
                className="form-control"
                name="message"
                rows="7"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="form-group">
              <input
                className="btn btn-default"
                id="send"
                value="Send Massage"
                type="submit"
              />
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="error-handel">
              <div id="success">Your email sent Successfully, Thank you.</div>
              <div id="error">
                Error occurred while sending email. Please try again later.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
