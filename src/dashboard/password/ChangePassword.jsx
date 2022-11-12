import React from "react";
import Dashboard from "../../pages/Dashboard";
import Form from "./Form";

export default function ChangePassword() {
  const content = <Form />;
  return (
    <>
      <Dashboard content={content} activeBtn={"changePassword"} />
    </>
  );
}
