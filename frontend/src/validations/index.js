const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validate = (formName, name, value) => {

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

  else if (formName === "postQuestionForm") {
    switch (name) {
      case "title": {
        if (!value) return "This field is required";
        return null;
      }
      case "body": {
        if (!value) return "This field is required";
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
    const err = validate(formName, field, formData[field]);
    if (err) errors.push({ field, err });
  }
  return errors;
}
export default validateManyFields;