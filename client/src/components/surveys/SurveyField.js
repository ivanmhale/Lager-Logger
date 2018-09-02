import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {

  function errorStatus(){
    if (touched && error){ return "error" }
  }

  return (
    <div className="SurveyField">
      <label className={errorStatus()}>{(touched && error) || label}</label>
      <input {...input} />
    </div>
  );
};
