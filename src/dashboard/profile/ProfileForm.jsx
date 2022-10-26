import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../features/profile/profileAPI";

export default function ProfileForm({ profileId, profile, formType }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [profileAddress, setProfileAddress] = useState("");
  const [profileBloodgroup, setProfileBloodgroup] = useState("");
  const [profileDateofbirth, setProfileDateofbirth] = useState("");
  const [profileFacebook, setProfileFacebook] = useState("");
  const [profileFullname, setProfileFullname] = useState("");
  const [profileInstagram, setProfileInstagram] = useState("");
  const [profileLinkedin, setProfileLinkedin] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileTwitter, setProfileTwitter] = useState("");
  const {
    address,
    bloodgroup,
    dateofbirth,
    facebook,
    fullname,
    instagram,
    linkedin,
    phone,
    twitter,
    user,
  } = profile || {};
  const [
    updateProfile,
    {
      data: updatedProfileData,
      isLoading: profileUpdating,
      isError: profileUpdateError,
    },
  ] = useUpdateProfileMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileFullname === "") {
      enqueueSnackbar("Please fill all required forms", { variant: "warning" });
    } else {
      if (formType === "store") {
        // do nothing
      }
      if (formType === "update") {
        updateProfile({
          id: profileId,
          data: {
            data: {
              address: profileAddress,
              bloodgroup: profileBloodgroup,
              dateofbirth: profileDateofbirth,
              facebook: profileFacebook,
              fullname: profileFullname,
              instagram: profileInstagram,
              linkedin: profileLinkedin,
              phone: profilePhone,
              twitter: profileTwitter,
              user: user?.data?.id,
            },
          },
        });
      }
    }
  };

  useEffect(() => {
    if (profileUpdateError?.data) {
      const errorMessage = profileUpdateError?.data?.error?.message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    if (updatedProfileData) {
      enqueueSnackbar("Profile Updated", { variant: "success" });
      navigate("/dashboard");
    }
  }, [updatedProfileData, profileUpdateError, navigate, enqueueSnackbar]);

  useEffect(() => {
    setProfileFullname(fullname ?? "");
    setProfileDateofbirth(dateofbirth ?? "1980-10-01");
    setProfilePhone(phone ?? "");
    setProfileBloodgroup(bloodgroup ?? "");
    setProfileFacebook(facebook ?? "");
    setProfileInstagram(instagram ?? "");
    setProfileLinkedin(linkedin ?? "");
    setProfileTwitter(twitter ?? "");
    setProfileAddress(address ?? "");
  }, [
    address,
    bloodgroup,
    dateofbirth,
    facebook,
    fullname,
    instagram,
    linkedin,
    phone,
    twitter,
  ]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor="profileFullname">
                Full Name <sup className="text-danger">*</sup>{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="profileFullname"
                name="profileFullname"
                value={profileFullname}
                placeholder="Edit Your Fullname"
                onChange={(e) => setProfileFullname(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor="profileDateofbirth">Birth Date</label>
              <input
                type="date"
                className="form-control"
                id="profileDateofbirth"
                name="profileDateofbirth"
                value={profileDateofbirth}
                placeholder="Edit Your Birthdate"
                onChange={(e) => setProfileDateofbirth(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="profilePhone">Contact Number</label>
              <input
                type="text"
                className="form-control"
                id="profilePhone"
                name="profilePhone"
                value={profilePhone}
                placeholder="Edit Your Contact"
                onChange={(e) => setProfilePhone(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="profileBloodgroup">Blood Group</label>
              <input
                type="text"
                className="form-control"
                id="profileBloodgroup"
                name="profileBloodgroup"
                value={profileBloodgroup}
                placeholder="Edit Your Blood Group"
                onChange={(e) => setProfileBloodgroup(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="profileFacebook">Facebook URL</label>
              <input
                type="text"
                className="form-control"
                id="profileFacebook"
                name="profileFacebook"
                value={profileFacebook}
                placeholder="Edit Your Facebook URL"
                onChange={(e) => setProfileFacebook(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="profileInstagram">Instagram URL</label>
              <input
                type="text"
                className="form-control"
                id="profileInstagram"
                name="profileInstagram"
                value={profileInstagram}
                placeholder="Edit Your Instagram URL"
                onChange={(e) => setProfileInstagram(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="profilePhone">Linkedin URL</label>
              <input
                type="text"
                className="form-control"
                id="profileLinkedin"
                name="profileLinkedin"
                value={profileLinkedin}
                placeholder="Edit Linkedin URL"
                onChange={(e) => setProfileLinkedin(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="profileTwitter">Twitter URL</label>
              <input
                type="text"
                className="form-control"
                id="profileTwitter"
                name="profileTwitter"
                value={profileTwitter}
                placeholder="Edit Twitter URL"
                onChange={(e) => setProfileTwitter(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="profileAddress">Address</label>
            <textarea
              className="form-control"
              id="profileAddress"
              rows="3"
              type="text"
              name="profileAddress"
              value={profileAddress}
              placeholder="Enter Your Address"
              onChange={(e) => setProfileAddress(e.target.value)}
            ></textarea>
          </div>
        </div>
        {formType === "update" && (
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={profileUpdating}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
