import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import { useStoreTagMutation } from "../../features/tag/tagAPI";

export default function TagCreate() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [
    storeTag,
    { data: storedTagData, isLoading: tagStoring, isError: tagStoreError },
  ] = useStoreTagMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      enqueueSnackbar("Please fill required form", { variant: "warning" });
    } else {
      storeTag({
        data: {
          title,
        },
      });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (storedTagData) {
      enqueueSnackbar("Tag Created", { variant: "success" });
      navigate("/dashboard");
    }
    if (tagStoring) {
      enqueueSnackbar("Tag is Creating ...", { variant: "info" });
    }
    if (tagStoreError) {
      enqueueSnackbar("Tag can not be Created", { variant: "error" });
    }
  }, [storedTagData, tagStoring, tagStoreError, enqueueSnackbar, navigate]);
  return (
    <>
      <Breadcrumbs
        previousUrl="/dashboard"
        previousPageName="Dashboard"
        currentPageName="Tag Create"
      />
      <section className="py_80 bg_secondery full_row">
        <div className="container">
          <div className="my_skill" id="authentication">
            <div className="row">
              <div className="col-12">
                <div className="replay mt_60 wow animated slideInUp">
                  <h4 className="text-uppercase text-center color_primary mb_30">
                    Crate New Tag
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="tagTitle">
                        <strong>Tag Title</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tagTitle"
                        name="title"
                        value={title}
                        placeholder="Enter a Title for Tag"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={tagStoring}
                      >
                        Create Tag
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
