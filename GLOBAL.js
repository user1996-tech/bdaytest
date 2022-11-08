const emptyDataStructure = {
  id: "",
  firstName: "",
  lastName: "",
  notes: "",
};

const dataTemplate = {
  attending: "",
  contactEmail: "",
  mainGuest: {
    firstName: "",
    lastName: "",
    notes: "",
  },
  additionalGuests: [],
};

const errorMessageTypes = {
  attending: "- Please let us know if you'll be joining",
  email: "- Invalid contact email",
  firstName: "- First Name needed",
  lastName: "- Last Name needed",
};

const validateEmail = (email) => {
  return String(email)
    .toLocaleLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export { emptyDataStructure, errorMessageTypes, dataTemplate, validateEmail };
