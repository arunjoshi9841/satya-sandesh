import moment from "moment";
export const isAge = (dob_year) => {
  var diff = moment().diff(dob_year, "years");
  return diff >= 18;
};
export const isEmailValid = (email) => {
  const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email_regex.test(String(email).toLowerCase());
};
export const isPasswordValid = (password) => {
  return password.length >= 7;
};
