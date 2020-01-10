import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  Form,
  FormDiv,
  FormInput,
  FormButton,
  FormLabel,
  FormContainer,
  Ast,
  LinkButton,
  FormValidationWarning
} from "../stylesheets/Form";

export const RegisterForm = props => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = data => {
    setLoading(true);
    axiosWithAuth()
      .post(
        "https://cors-anywhere.herokuapp.com/https://spotify-song-suggester-be.herokuapp.com/api/auth/register",
        {
          username: data.username,
          password: data.password
        }
      )
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("");
      })
      .catch(err => console.log(err));
  };

  const handleInput = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (!loading) {
    return (
      <FormContainer>
        <FormDiv>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign Up For Symphinity</h2>
            <FormLabel htmlFor="username">
              Username<Ast>*</Ast>:
              <FormInput
                type="text"
                id="username"
                name="username"
                onChange={e => handleInput(e)}
                ref={register({
                  required: true,
                  minlength: 8,
                  pattern: {
                    value: /^(?:[A-Z\d][A-Z\d_-]{7,})$/i,
                    message:
                      "Please enter a username with at least 8 alphanumeric characters."
                  }
                })}
              />
            </FormLabel>

            {errors.username && (
              <FormValidationWarning>
                {errors.username.message}
              </FormValidationWarning>
            )}
            <FormLabel htmlFor="email">
              Email<Ast>*</Ast>:
              <FormInput
                type="email"
                id="email"
                name="email"
                onChange={e => handleInput(e)}
                ref={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please enter a valid email address."
                  }
                })}
              />
            </FormLabel>

            {errors.email && (
              <FormValidationWarning>
                {errors.email.message}
              </FormValidationWarning>
            )}
            <FormLabel htmlFor="password">
              Password<Ast>*</Ast>:
              <FormInput
                type="password"
                id="password"
                name="password"
                onChange={e => handleInput(e)}
                ref={register({
                  required: true,
                  minlength: 8,
                  pattern: {
                    value: /^(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/,
                    message: "Please enter a password of at least 8 characters."
                  }
                })}
              />
            </FormLabel>

            {errors.password && (
              <FormValidationWarning>
                {errors.password.message}
              </FormValidationWarning>
            )}
            <FormLabel htmlFor="repeatpassword">
              Password Confirm<Ast>*</Ast>:
              <FormInput
                type="password"
                id="repeatpassword"
                name="repeatpassword"
                onChange={e => handleInput(e)}
                ref={register({
                  required: true,
                  minlength: 8,
                  validate: value =>
                    value === password.current || "The passwords do not match!"
                })}
              />
            </FormLabel>

            {errors.repeatpassword && (
              <FormValidationWarning>
                {errors.repeatpassword.message}
              </FormValidationWarning>
            )}
            <FormButton>Sign Up</FormButton>
            <LinkButton href="/">Sign In</LinkButton>
          </Form>
        </FormDiv>
      </FormContainer>
    );
  } else {
    return (
      <FormContainer>
        <Loader
          type="Audio"
          color="#1DB954"
          height={200}
          width={200}
          style={{ marginLeft: "calc(50% - 100px)" }}
        ></Loader>
      </FormContainer>
    );
  }
};

export default RegisterForm;
