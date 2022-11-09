import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import BlogForm from "./BlogForm";

export default function BlogCreate() {
  const { user: auth } = useSelector((state) => state.auth) || {};
  const content = <BlogForm author={auth?.id} formType={"store"} />;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Breadcrumbs
        previousUrl="/dashboard"
        previousPageName="Dashboard"
        currentPageName="Blog Create"
      />
      <section className="py_20 bg_secondery full_row">
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
