const validateEmail =  async (email) => {
    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
   return valid || "Please enter a valid email.";
  };


  const validateNumber =  async (number) => {
    var valid = !isNaN(parseFloat(number));
    return valid || 'Please enter a valid number.';
  };

  const validateInput =  async (input) => {
    var valid = (input !== '');
    return valid || 'Please enter a valid input.';
  };


  module.exports = { validateEmail, validateNumber, validateInput };
