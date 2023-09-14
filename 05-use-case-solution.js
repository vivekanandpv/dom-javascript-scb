//  Regular expressions
//  More info: https://www.rexegg.com/regex-anchors.html
const nameRegEx = /^[a-zA-z ]+$/;
const emailRegEx = /[^@]+@[^\.]+\..+/;
const contactRegEx = /^[7-9]{1}[0-9]{9}$/;

//  Validation flags
let nameValid = false;
let emailValid = false;
let contactValid = false;
let accountTypeValid = false;

//  Reusalbe validate
const validate = (regex, value) => {
  return regex.test(value);
};

//  Field validators (event-handlers as well)
const validateName = (e) => {
  //  Set the flag
  nameValid = validate(nameRegEx, e.target.value);

  //  Write the error, if any
  nameValidationError.textContent = nameValid ? '' : 'Enter only alphabets';
};

const validateEmail = (e) => {
  emailValid = validate(emailRegEx, e.target.value);
  emailValidationError.textContent = emailValid ? '' : 'Enter valid email';
};

const validateContact = (e) => {
  contactValid = validate(contactRegEx, e.target.value);
  contactValidationError.textContent = contactValid
    ? ''
    : 'Enter valid contact number';
};

const validateAccountType = (e) => {
  accountTypeValid = e.target.value ? true : false;
  accountTypeValidationError.textContent = accountTypeValid
    ? ''
    : 'Account type should be selected';
};

//  Convenience function for overall form validation
const getValidationStatus = () => {
  return nameValid && emailValid && contactValid && accountTypeValid;
};

//  DOM references
const tbody = document
  .getElementById('customers')
  .getElementsByTagName('tbody')[0];

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputContact = document.getElementById('contact');
const selectAccountType = document.getElementById('account-type');

const nameValidationError = document.getElementById('name-error');
const emailValidationError = document.getElementById('email-error');
const contactValidationError = document.getElementById('contact-error');
const accountTypeValidationError =
  document.getElementById('account-type-error');

//  Event handler registration
inputName.addEventListener('input', validateName);
inputEmail.addEventListener('input', validateEmail);
inputContact.addEventListener('input', validateContact);
selectAccountType.addEventListener('change', validateAccountType);

//  Functionality
const addCustomer = () => {
  //  Ensure overall form validation
  if (!getValidationStatus()) {
    alert('Invalid form. Cannot be submitted');
    return; //  get out of the handler; early exit
  }

  //    If we reached so far, form is valid

  //    Create the customer object
  const customer = {
    name: inputName.value,
    email: inputEmail.value,
    contact: inputContact.value,
    accountType: selectAccountType.value,
  };

  //    Row population
  populateRow(customer);

  //    Clear the form fields after successful submit
  clearForm();

  //    Show confirmation
  alert('Customer added successfully');
};

const populateRow = (customer) => {
  //  Inserting the new row
  const tr = tbody.insertRow();

  //  name
  populateCell(tr, 0, customer.name);

  //  email
  populateCell(tr, 1, customer.email);

  //  contact
  populateCell(tr, 2, customer.contact);

  //  accountType
  populateCell(tr, 3, customer.accountType);
};

const populateCell = (row, index, content) => {
  //  Creating the cell on row
  const cell = row.insertCell(index);
  //    Creating the content
  const cellText = document.createTextNode(content);
  //    Add content to cell
  cell.appendChild(cellText);
};

const clearForm = () => {
  //  Clear all fields
  inputName.value = '';
  inputEmail.value = '';
  inputContact.value = '';
  selectAccountType.value = '';

  nameValid = false;
  emailValid = false;
  contactValid = false;
  accountTypeValid = false;
};
