import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';

const SurveyReview = ({ onCancel, form, submitSurvey }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name} className="reviewField">
        <h5 className="reviewField_key">{label}</h5>
        <h5 className="reviewField_value">{form[name]}</h5>
      </div>
    );
  });

  return (
    <div className="SurveyFormReview">
      <h3>Please confirm your entries</h3>
      <div className="review">{reviewFields}</div>
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <Link
        to='/surveys'
        onClick={() => submitSurvey(form)}
        className="green btn-flat right btn white-text"
      >
        Send Survey
        <i className="material-icons">email</i>
      </Link>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    form: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(SurveyReview);
