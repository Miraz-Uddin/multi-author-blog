import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import PreLoader from "../../components/ui/PreLoader";
import { useGetProfileByIdQuery } from "../../features/profile/profileAPI";
import ProfileForm from "./ProfileForm";

export default function ProfileEdit() {
  const { enqueueSnackbar } = useSnackbar();
  const { user: auth } = useSelector((state) => state.auth) || {};
  const { profileId } = useParams();
  let content;
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetProfileByIdQuery(profileId);
  if (isLoading) content = <PreLoader />;
  if (!isLoading && isError) {
    enqueueSnackbar("Error while Fetching Profile's Info", {
      variant: "error",
    });
    content = (
      <>
        <Navigate to="/dashboard" />
      </>
    );
  }
  if (!isLoading && !isError) {
    const { user } = profile?.data?.attributes;
    if (auth?.id === user?.data?.id) {
      content = (
        <ProfileForm
          profileId={profile?.data?.id}
          profile={profile?.data?.attributes}
          formType={"update"}
        />
      );
    } else {
      enqueueSnackbar("This is Not your Profile", {
        variant: "error",
      });
      content = (
        <>
          <Navigate to="/dashboard" />
        </>
      );
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Breadcrumbs
        previousUrl="/dashboard"
        previousPageName="Dashboard"
        currentPageName="Profile Edit"
      />
      <section className="p_20 bg_secondery full_row">
        <div className="container">
          <div className="my_skill" id="authentication">
            <div className="row">
              <div className="col-12">
                <div className="replay mt_60 wow animated slideInUp">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
