function Validation(values) {
  let error = {};
  
  const Email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const Password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
  
  // Validación de nombre
  if (values.Nombre === "") {
    error.Nombre = "El nombre no puede estar vacío";
  }

  // Validación de email
  if (values.Email === "") {
      error.Email = "El correo no puede estar vacío";
  } else if (!Email_pattern.test(values.Email)) {
      error.Email = "El formato del correo es inválido";
  }

  // Validación de contraseña
  if (values.Password === "") {
      error.Password = "La contraseña no puede estar vacía";
  } else if (!Password_pattern.test(values.Password)) {
      error.Password = "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número";
  }

  // Validación de confirmación de contraseña
  if (values.confirmPassword === "") {
      error.confirmPassword = "La confirmación de la contraseña no puede estar vacía";
  } else if (values.Password !== values.confirmPassword) {
      error.confirmPassword = "Las contraseñas no coinciden";
  }

  return error;  // Devuelve siempre el objeto con los errores
}

export default Validation;