function Validation(values) {
    let error = {};
    
    const Email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const Password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
    
    // Validación de email
    if (values.Email === "") {
      error.Email = "El correo no puede estar vacío";
  } else if (!Email_pattern.test(values.Email)) {
      error.Email = "El formato del correo es inválido";
  }
  
    // Validación de contraseña
    if (values.Password === "") {
      error.Password = "La contraseña no puede estar vacia";
    } else if (!Password_pattern.test(values.Password)) {
      error.Password = "La contraseña no coincide";
    }
    return error; 
  }
  
  export default Validation;  