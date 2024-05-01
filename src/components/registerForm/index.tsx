import React, { useState } from "react";
import { Form, Formik, ErrorMessage } from "formik";

import { TextField, IconButton, InputAdornment } from "@mui/material";
import * as yup from "yup";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const validation = yup.object({
  userName: yup
    .string()
    .min(6, "User name must have at least 6 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "User name must contain only letters and numbers"
    )
    .required("User name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  isAgree: yup.boolean(),
});

type TButtonPosition = "start" | "middle" | "end";

interface IUserForm {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAgree: boolean;
}

function RegistrationForm() {
  const [initialValues, setInititalValues] = useState<IUserForm>({
    confirmPassword: "",
    email: "",
    isAgree: false,
    password: "",
    userName: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerButtonPosition, setRegisterButtonPosition] =
    useState<TButtonPosition>("middle");

  const buttonPlacement = (position: TButtonPosition) => {
    if (position === "start") {
      return `justify-start`;
    }
    if (position === "middle") {
      return `justify-center`;
    }
    if (position === "end") {
      return `justify-end`;
    }
  };

  return (
    <div className="p-10  flex justify-start h-screen  w-full ">
      <Formik
        validateOnChange={true}
        onSubmit={(values: IUserForm) => {}}
        validationSchema={validation}
        initialValues={initialValues}
      >
        {({ values, setValues, errors, submitForm, isValid }) => {
          const { confirmPassword, email, isAgree, password, userName } =
            values;

          console.log(values, "CURRENT_VALUES");

          console.error({ errors }, "ERRORS_LIST");
          return (
            <Form className="w-full text-center flex justify-center items-center">
              <div className="text-blue-500 text-3xl  m-auto">
                Welcome To CodeTikki from Nikki!
                <p className="text-black text-lg p-1 text-start ">
                  create your codeTikki account
                </p>
                <section className="p-20 mt-5 flex flex-col gap-7 border text-xs rounded-lg border-blue-500 w-full">
                  <div className="flex flex-col items-start justify-start ">
                    <TextField
                      value={userName}
                      className="w-full"
                      required={true}
                      onChange={(e) => {
                        setValues({ ...values, userName: e.target.value });
                      }}
                      placeholder="User name"
                      id="userName"
                      label=""
                      variant="standard"
                    />
                    <div className="text-red-500">
                      <ErrorMessage
                        className="text-red-500 text-xs"
                        name="userName"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <TextField
                      value={email}
                      className="w-full"
                      required={true}
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                      placeholder="Email"
                      id="email"
                      label=""
                      variant="standard"
                    />
                    <div className="text-red-500">
                      <ErrorMessage
                        className="text-red-500 text-xs"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <TextField
                      value={password}
                      className="w-full"
                      onChange={(e) => {
                        setValues({ ...values, password: e.target.value });
                      }}
                      variant="standard"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setShowPassword(!showPassword);
                              }}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className="text-red-500">
                      <ErrorMessage
                        className="text-red-500 text-xs"
                        name="password"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-start ">
                    <TextField
                      value={confirmPassword}
                      className="w-full"
                      onChange={(e) => {
                        setValues({
                          ...values,
                          confirmPassword: e.target.value,
                        });
                      }}
                      variant="standard"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setShowConfirmPassword(!showConfirmPassword);
                              }}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className="text-red-500">
                      <ErrorMessage
                        className="text-red-500 text-xs"
                        name="confirmPassword"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-start">
                    <Checkbox
                      className="rounded-md"
                      color="default"
                      id="isAgree"
                      onChange={() => {
                        setValues({ ...values, isAgree: !isAgree });
                      }}
                      checked={isAgree}
                    />
                    <label className="text-black text-xs" htmlFor="isAgree">
                      I agree to the terms and privacy policy
                    </label>
                  </div>

                  <div
                    className={`flex items-center ${buttonPlacement(
                      registerButtonPosition
                    )}`}
                  >
                    <Button
                      onMouseEnter={(event) => {
                        if (!isValid) {
                          const { clientX } = event;

                          const buttonRect = (
                            event.target as HTMLElement
                          ).getBoundingClientRect();

                          const isLeftSide =
                            clientX - buttonRect.left <= buttonRect.width / 2;

                          if (isLeftSide) {
                            if (registerButtonPosition === "middle") {
                              setRegisterButtonPosition("end");
                            }
                            if (registerButtonPosition === "start") {
                              setRegisterButtonPosition("middle");
                            }
                            if (registerButtonPosition === "end") {
                              setRegisterButtonPosition("middle");
                            }
                          } else {
                            if (registerButtonPosition === "middle") {
                              setRegisterButtonPosition("start");
                            }
                            if (registerButtonPosition === "start") {
                              setRegisterButtonPosition("middle");
                            }
                            if (registerButtonPosition === "end") {
                              setRegisterButtonPosition("middle");
                            }
                          }
                        }
                      }}
                      className="w-[90px]"
                      onClick={(e) => {
                        submitForm();
                      }}
                      variant="contained"
                    >
                      Register
                    </Button>
                  </div>

                  <p className="text-sm text-black">
                    Already have an account?{" "}
                    <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                      Login
                    </span>
                  </p>
                </section>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default RegistrationForm;
