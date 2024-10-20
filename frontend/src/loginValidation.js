function Validation(values) {
    let error = {};
    
    const Email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const Password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    
    // Validación de email
    if (values.Email === "") {
      error.Email = "Email should not be empty";
    } else if (!Email_pattern.test(values.Email)) {
      error.Email = "Email format is invalid";
    }
  
    // Validación de contraseña
    if (values.Password === "") {
      error.Password = "Password should not be empty";
    } else if (!Password_pattern.test(values.Password)) {
      error.Password = "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number";
    }
  
    return error;
  }
  
  export default Validation;  