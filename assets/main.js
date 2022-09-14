const form = document.getElementById("form");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");

const isEmpty = (valor) => {
  valor === "" ? true : false;

  //Es lo mismo que esto, pero en una sola linea
  //   if (valor === "") {
  //     return true;
  //   } else {
  //     return false;
  //   }
};

const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.remove("succes");
  formField.classList.add("error");

  const errorField = formField.querySelector("small");

  errorField.textContent = message;
};

const showSucces = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("succes");

  const errorField = formField.querySelector("small");

  errorField.textContent = " ";
};

const isPassSecure = (password) => {
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //Expresion regular: Minimum eight characters, at least one uppercase letter, one lowercase letter and one number

  return passwordRegEx.test(password);
};

const isPhoneValid = (phoneNumber) => {
  //Vamos a validar que tenga 10 numeros

  const phoneRegEx = /^[0-9]{10}$/; //Expresion regular que acepta 10 numeros

  return phoneRegEx.test(phoneNumber);
};

const isEmailValid = (email) => {
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return emailRegEx.test(email);
};

const isBetween = (longitud, min, max) => {
  //Devuelve:
  // Si longitud es menor a min o longitud es mayor al max, retorna false y sino retorna true
  return longitud < min || longitud > max ? false : true;
};

const checkUsername = () => {
  let valid = false;

  const min = 3;
  const max = 25;

  const usernameValue = usernameInput.value.trim();

  if (isEmpty(username)) {
    showError(usernameInput, "Este campo es requerido");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameInput,
      `El nombre debe tener entre ${min} y ${max} caracteres`
    );
  } else {
    showSucces(usernameInput);

    valid = true;
  }

  return valid;
};

const checkEmail = () => {
  let valid = false;

  const emailValue = emailInput.value.trim();

  if (!isEmpty(emailValue)) {
    showError(emailInput, "Este campo es requerido.");
  } else if (!isEmailValid()) {
    showError(emailInput, "El email no es válido");
  } else {
    showSucces(emailInput);

    valid = true;
  }

  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordInput.value.trim();

  //chequear si el input esta vacio
  //si esta vacio, mostrar error
  if (isEmpty(password)) {
    showError(passwordInput, "Este campo es requerido");

    //Vamos a chequear que cumpla con determinados requisitos
    //Mayuscula, minuscula, numeros, simbolos
  } else if (!isPassSecure(password)) {
    showError(
      passwordInput,
      "La contraseña debe contener al menos 8 carácteres, una mayuscula y un número."
    );

    //Aca abajo chequeamos cuando esta todo bien
  } else {
    showSucces(passwordInput);

    valid = true;
  }

  return valid;
};

//Una funcion en JS
//SIN expresiones regulares
//Que reciba un string
//Y devuelva true si e; string tiene una mayuscula
//Y devuelva false si el string no tiene una mayuscula

//Chequear mayusculas sin regex

//const checkMayus = (string) => {
// const stringOriginal = string;  const stringLower = string.toLowerCase();

//   return stringOriginal === stringLower;
// };
//   //string.toLowerCase() === string
//   const upperCaseArray = [
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//   ];
//   //Recorremos letraMayus de upperCaseArray
//   for (letraMayus of upperCaseArray) {
//     //Recorremos el string
//     for (letraString of string) {
//       //Si la letraString es igual a letraMayus devolve true, sino que continue con la que sigue
//       if (letraString === letraMayus) {
//         return true;
//       } else {
//         continue;
//       }
//     }
//   }

//   return false;
// };

const checkPhone = () => {
  let valid = false;

  const phoneValue = phoneInput.value.trim();

  if (!isPhoneValid(phoneValue)) {
    showError(phoneInput, "El teléfono debe tener 10 digitos");
  } else {
    showSucces(phoneInput);

    valid = true;
  }

  return valid;
};

//Cuando

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isUsernameValid = checkUsername();
  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  let isPhoneValid = checkPhone();

  console.log({ isUsernameValid });
  console.log({ isEmailValid });
  console.log({ isPasswordValid });
  console.log({ isPhoneValid });
});

const debounce = (fn, delay = 500) => {
  let timmeOutId;

  return (...args) => {
    if (timmeOutId) {
      clearTimeout(timmeOutId);
    }
    timmeOutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce((e) => {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();

      case "password":
        checkPassword();
        break;

      case "phone":
        checkPhone();
    }
  })
);
