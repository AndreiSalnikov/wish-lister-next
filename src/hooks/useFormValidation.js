import {useForm} from "react-hook-form";

// import {useAuth} from "./useAuth";

export function useFormValidation(values) {
  // const {user} = useAuth();
  const {
    getValues,
    register,
    formState: {errors, isValid},
    handleSubmit,
  } = useForm({values, mode: "onChange",});

  const validateSearch = {
    required: 'Нужно ввести ключевое слово',
  }

  const validateName = {
    required: 'Обязательное поле',
    validate: {
      minLength: (value) =>
        value.length >= 2 || `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length}`,
      // duplicate: (value) => {
      //   const {email} = getValues()
      //   if (user !== null && user.email === email) {
      //     return value !== user.name || 'Имя или mail должны отличаться';
      //   }
      // },
    },
    pattern: {
      value: /^[a-яёa-z]+(?:[ -][a-яёa-z]+)*$/i,
      message: "Используйте только латиницу, кириллицу и пробел или дефис"
    },
  };

  const validateEmail = {
    required: 'Обязательное поле',
    pattern: {
      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: "Некорректная электронная почта"
    },
    // validate: {
    //   duplicate: (value) => {
    //     const {name} = getValues()
    //     if (user !== null && user.name === name) {
    //       return value !== user.email || 'Email или имя должны отличаться';
    //     }
    //   }
    // },
  };

  const validatePassword = {
    required: 'Обязательное поле',
    validate: {
      // isUpper: (value) => /[A-Z,А-Я]/.test(value) || 'Пароль должен содержать хотя бы одну заглавную букву',
      // specialSymbol: (value) => /[!@#$%^&*)(+=.<>{}[\]:;'"|~`_-]/g.test(value) || 'Пароль должен содержать хотя бы 1 специальный символ'
    },
  };

  const confirmPassword = {
    required: 'Обязательное поле',
    validate: {
      confirm: (value) => {
        const {password} = getValues()
        return password === value || "Пароли не совпадают!";
      }
    },
  };

  return {
    confirmPassword,
    register,
    handleSubmit,
    errors,
    isValid,
    validateName,
    validateEmail,
    validatePassword,
    validateSearch,
  };
}
