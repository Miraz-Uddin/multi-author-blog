import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../features/profile/profileAPI";
import checkImageFileType from "../../utils/checkImageFileType";
import getSerializeData from "../../utils/getSerializeData";

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
  const [profileAvatar, setProfileAvatar] = useState(null);
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
    avatar,
  } = profile || {};
  const [
    updateProfile,
    {
      data: updatedProfileData,
      isLoading: profileUpdating,
      isError: profileUpdateError,
    },
  ] = useUpdateProfileMutation();

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
    setProfileDateofbirth(dateofbirth ?? "1990-01-01");
    setProfilePhone(phone ?? "");
    setProfileBloodgroup(bloodgroup ?? "");
    setProfileFacebook(facebook ?? "");
    setProfileInstagram(instagram ?? "");
    setProfileLinkedin(linkedin ?? "");
    setProfileTwitter(twitter ?? "");
    setProfileAddress(address ?? "");
    setProfileAvatar(avatar);
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
    avatar,
  ]);

  const imageUpload = (e) => {
    const isMimeTypeOk = checkImageFileType(e.target, "imagePreview");
    if (isMimeTypeOk) {
      setProfileAvatar(e.target.files[0]);
    } else {
      enqueueSnackbar("Invalid file type", {
        variant: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileFullname === "") {
      enqueueSnackbar("Please fill all required forms", { variant: "warning" });
    } else {
      if (formType === "update") {
        const othersInfo = {
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
        };
        if (profileAvatar?.data === null) {
          // Image doesnot exist at all and not updated too
          updateProfile({
            id: profileId,
            data: {
              data: othersInfo,
            },
          });
        } else if (profileAvatar?.data?.id) {
          // if not updated image, but image existed before
          updateProfile({
            id: profileId,
            data: {
              data: {
                ...othersInfo,
                avatar: profileAvatar,
              },
            },
          });
        } else {
          // if updated image, and (image existed before or doesnot exist at all)
          updateProfile({
            id: profileId,
            data: getSerializeData(
              {
                ...othersInfo,
              },
              "avatar",
              profileAvatar
            ),
          });
        }
      }
      // if (formType === "store") {}
    }
  };

  let authorImage = window.origin + "/images/author/user.jpg";
  const imageURL = profileAvatar?.data?.attributes?.url;
  authorImage =
    imageURL === undefined
      ? window.origin + "/images/author/user.jpg"
      : imageURL.split("/")[0] === "uploads"
      ? process.env.REACT_APP_API_URL + imageURL
      : imageURL;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor="profileFullname">
                <strong>
                  Full Name <sup className="text-danger">*</sup>{" "}
                </strong>
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
              <label htmlFor="profileDateofbirth">
                <strong>Birth Date</strong>
              </label>
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
              <label htmlFor="profilePhone">
                <strong>Contact Number</strong>
              </label>
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
              <label htmlFor="profileBloodgroup">
                <strong>Blood Group</strong>
              </label>
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
              <label htmlFor="profileFacebook">
                <strong>Facebook URL</strong>
              </label>
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
              <label htmlFor="profileInstagram">
                <strong>Instagram URL</strong>
              </label>
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
              <label htmlFor="profilePhone">
                <strong>Linkedin URL</strong>
              </label>
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
              <label htmlFor="profileTwitter">
                <strong>Twitter URL</strong>
              </label>
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
        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="profileAddress">
              <strong>Address</strong>{" "}
            </label>
            <textarea
              className="form-control mb-0"
              id="profileAddress"
              rows="11"
              type="text"
              name="profileAddress"
              value={profileAddress}
              placeholder="Enter Your Address"
              onChange={(e) => setProfileAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="bg-white">
              <div
                id="imagePreview"
                style={{
                  margin: "auto",
                  width: "12.8rem",
                  height: "14.3rem",
                }}
              >
                <figure className="figure">
                  <img
                    src={authorImage}
                    className="figure-img img-fluid rounded"
                    alt="preview author"
                  />
                </figure>
              </div>
              <div>
                <label
                  className="btn btn-success btn-block mb-0"
                  style={{ textTransform: "capitalize" }}
                  htmlFor="avatar"
                >
                  Click to Upload User's Avatar
                </label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  name="avatar"
                  id="avatar"
                  onChange={imageUpload}
                  disabled={profileUpdating}
                ></input>
              </div>
            </div>
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
