const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validate = (formName, name, value, formData) => {

  if (formName === "signupForm") {
    switch (name) {
      case "name": {
        if (!value) return "This field is required";
        return null;
      }
      case "email": {
        if (!value) return "This field is required";
        if (!isValidEmail(value)) return "Please enter valid email address";
        return null;
      }
      case "password": {
        if (!value) return "This field is required";
        if (value.length < 4) return "Password should be atleast 4 chars long";
        return null;
      }
      default: return null;
    }
  }

  else if (formName === "loginForm") {
    switch (name) {
      case "email": {
        if (!value) return "This field is required";
        if (!isValidEmail(value)) return "Please enter valid email address";
        return null;
      }
      case "password": {
        if (!value) return "This field is required";
        return null;
      }
      default: return null;
    }
  }

  else if (formName === "postQuestionForm" || formName === "editQuestionForm") {
    switch (name) {
      case "title": {
        if (!value || value.length < 10) return "Min. 10 chars are required";
        return null;
      }
      case "body": {
        if (!value || value.length < 40) return "Min. 40 chars are required (including html)";
        return null;
      }
      default: return null;
    }
  }

  else if (formName === "resetPasswordForm") {
    switch (name) {
      case "password": {
        if (!value) return "This field is required";
        if (value !== formData.confirmPassword) return "Passwords are not matching";
        return null;
      }
      case "confirmPassword": {
        if (!value) return "This field is required";
        if (value !== formData.password) return "Passwords are not matching";
        return null;
      }
      default: return null;
    }
  }

  else if (formName === "editProfileForm") {
    switch (name) {
      case "name": {
        if (!value) return "This field is required";
        return null;
      }
      default: return null;
    }
  }

  else if (formName === "changePasswordForm") {
    switch (name) {
      case "existingPassword": {
        if (!value) return "This field is required";
        return null;
      }
      case "newPassword": {
        if (!value) return "This field is required";
        if (value !== formData.confirmPassword) return "Passwords are not matching";
        return null;
      }
      case "confirmPassword": {
        if (!value) return "This field is required";
        if (value !== formData.newPassword) return "Passwords are not matching";
        return null;
      }

      default: return null;
    }
  }

  else {
    return null;
  }

}


const validateManyFields = (formName, formData) => {
  const errors = [];
  for (const field in formData) {
    const err = validate(formName, field, formData[field], formData);
    if (err) errors.push({ field, err });
  }
  return errors;
}
export default validateManyFields;