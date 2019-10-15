import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from "react-redux";

function SignIn(props) {
  const dispatch = useDispatch();



  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={fields => {

        let dataToSubmit = {
          email: fields.email,
          password: fields.password
        };
    
        dispatch(loginUser(dataToSubmit)).then(response => {
          if (response.payload.loginSuccess) {
            props.history.push("/");
          } 
        });

        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 2))
      }}
      render={({ errors, status, touched }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">Register</button>
            <button type="reset" className="btn btn-secondary">Reset</button>
          </div>
        </Form>
      )}
    />
  );
};

export default withRouter(SignIn);


