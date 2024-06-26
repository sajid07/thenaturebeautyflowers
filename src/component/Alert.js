import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "Error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <>
      {props.alert && (
        <div style={{ marginBottom: "10px" }}>
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(props.alert.type)}</strong>:{" "}
            {capitalize(props.alert.msg)}
          </div>
        </div>
      )}
    </>
  );
}
export default Alert;
