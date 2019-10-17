import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        lastName: Yup.string()
          .required('Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.loginSuccess) {
              props.history.push("/");
            } else {
              alert(response.payload.err.errmsg)
            }
          })
         
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>


              <label htmlFor="name" style={{ display: 'block' }}>
                Name
              </label>
              <input
                id="name"
                placeholder="Enter your name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.name && touched.name ? 'text-input error' : 'text-input'
                }
              />
              {errors.name && touched.name && (
                <div className="input-feedback">{errors.name}</div>
              )}


              <label htmlFor="lastName" style={{ display: 'block' }}>
                Last Name
              </label>
              <input
                id="lastName"
                placeholder="Enter your last name"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                }
              />
              {errors.lastName && touched.lastName && (
                <div className="input-feedback">{errors.lastName}</div>
              )}


              <label htmlFor="email" style={{ display: 'block' }}>
                Email
             </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email ? 'text-input error' : 'text-input'
                }
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}


              <label htmlFor="password" style={{ display: 'block' }}>
                Password
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password ? 'text-input error' : 'text-input'
                }
              />
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}

              <label htmlFor="confirmPassword" style={{ display: 'block' }}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                placeholder="Enter your confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                }
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="input-feedback">{errors.confirmPassword}</div>
              )}

              <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
