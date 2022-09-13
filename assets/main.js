const form = document.getElementById("form");
const passwordInput = document.getElementById("password");

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

const checkUsername = () => {};

const checkEmail = () => {};

const checkPassword = () => {
  let valid = false;

  const password = passwordInput.value.trim();

  //chequear si el input esta vacio
  //si esta vacio, mostrar error
  if (isEmpty(password)) {
    showError(passwordInput, "La contraseña es obligatoria");

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

const checkMayus = (string) => {
  //string.toLowerCase() === string
  const upperCaseArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  //Recorremos letraMayus de upperCaseArray
  for (letraMayus of upperCaseArray) {
    //Recorremos el string
    for (letraString of string) {
      //Si la letraString es igual a letraMayus devolve true, sino que continue con la que sigue
      if (letraString === letraMayus) {
        return true;
      } else {
        continue;
      }
    }
  }

  return false;
};

const checkPhone = () => {};

//Cuando
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
