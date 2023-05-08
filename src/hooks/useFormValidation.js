import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";

export function useFormValidation(values) {
  const {user} = useSelector(state => state.user)
  const {
    getValues,
    register,
    formState: {errors, isValid},
    handleSubmit,
  } = useForm({values, mode: "onChange",});

  const validateAbout = {
    required: ' ',
    validate: {
      minLength: (value) =>
        value.length <= 90 || `Текст должен быть не длиннее 90 симв. Длина текста сейчас: ${value.length}`,
    }
  }

  const validateName = {
    required: 'Обязательное поле',
    validate: {
      minLength: (value) =>
        value.length >= 2 || `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length}`,
      duplicate: (value) => {
        const {email, reminder} = getValues()
        if (user !== null && user.email === email && user.reminder === reminder) {
          return value !== user.name;
        }
      },
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
    validateAbout,
    confirmPassword,
    register,
    handleSubmit,
    errors,
    isValid,
    validateName,
    validateEmail,
    validatePassword,
  };
}
