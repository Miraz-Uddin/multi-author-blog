import React from "react";
import { useGetSkillQuery } from "../../features/skill/skillAPI";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import LoadingOrError from "./LoadingOrError";

export default function Skill() {
  let content;
  const { data: skill, isLoading, isError } = useGetSkillQuery();
  if (isLoading)
    content = <LoadingOrError message="Skill Information Loading ..." />;
  if (!isLoading && isError)
    content = content = (
      <LoadingOrError
        isError={true}
        message="Network Error while fetching Skills Information"
      />
    );
  if (!isLoading && !isError) {
    const {
      section,
      title,
      subtitle,
      description_head,
      description_body,
      p_expertises,
    } = skill?.data?.attributes;
    content = (
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
              <h2 className="title text-uppercase">
                <span className="line_double mx-auto color_default">
                  {section}
                </span>
                {title}
              </h2>
              <span className="sub_title">{subtitle}</span>
            </div>
          </div>
        </div>
        <div className="my_skill">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="about_myskill color_secondery wow animated slideInLeft">
                <h2 className="color_primary">{description_head}</h2>
                <p>{description_body}</p>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="skill-progress wow animated slideInRight">
                {p_expertises &&
                  p_expertises?.data?.length > 0 &&
                  p_expertises?.data.map((experience) => (
                    <LinearProgressWithLabel
                      key={experience?.id}
                      label={experience?.attributes?.title}
                      value={experience?.attributes?.percentage}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section
      id="skill"
      className="py_80 bg_secondery full_row"
      name="naviagate-to-skill"
    >
      {content}
    </section>
  );
}
