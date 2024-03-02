//  form validation*******
export const validateForm = (formData) => {
    const errors = {};
    console.log(errors)  
    // Validate Fname
    if (formData.Fname.trim() === '') {
      errors.Fname = 'Fname is required *';
    } 
    // Validate Lname
    if (formData.Lname.trim() === '') {
      errors.Lname = 'Lname is required *';
    } 
    // Validate email
    if(formData.email.trim() === ''){
      errors.email = "Email is required *"
    }else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email address *';
    } 
      // Validate password
      if (!formData.password || !validatePassword(formData.password)) {
        errors.password = 'Minimum 8 characters & at least 1 letter & 1 number *';
      }    
    // Validate phone
    if (formData.MobileNo.trim() === '') {
      errors.MobileNo = 'MobileNo  is required *';
    }
    else if (!validatePhoneNumber(formData.MobileNo)) {
      errors.MobileNo = 'Invalid MobileNo Please enter digits only*';
    }else if (!validatePhoneNumbers(formData.MobileNo)){
      errors.MobileNo = "10-digit numeric MobileNo is required*"
    }   
    // Validate massage
    if(formData.adress.trim() === ''){
      errors.adress = "Please enter your adress 🥰"
    }
    // Validate massage
    // if(formData.file.trim() === ''){
    //   errors.file = "Please select your file 🥰"
    // }
   
    return errors;
  };
  

  
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  export const validatePassword = (password) => {
    const hasCharacter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 8 && hasCharacter && hasNumber;
  };

  export const validatePhoneNumbers = (MobileNo) => {
    const phonePattern = /^\d{10}$/; // Simple example: 10-digit numeric phone number
    return phonePattern.test(MobileNo);
  };
  
  export const validatePhoneNumber = (MobileNo) => {
    const phonePattern = /^[0-9]+$/; // Regular expression to allow only numbers  
    return phonePattern.test(MobileNo);
  };