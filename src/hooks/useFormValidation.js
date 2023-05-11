import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";

export function useFormValidation(values) {

  const {user} = useSelector(state => state.user)
  const {
    control,
    setValue,
    reset,
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

  const validateCreate = {
    required: 'Обязательное поле',
    validate: {
      minLength: (value) =>
        value.length >= 2 || `Текст должен быть не короче 2 симв. Длина текста сейчас: ${value.length}`,
    }
  }


  const validateLink = {
    required: 'Обязательное поле',
    pattern: {
      value: /^https?:\/\/.+(\.jpg|\.jpeg|\.png|\.gif)$/i,
      message: 'Поле должно содержать ссылку на изображение и начинаться с http:// или https://',
    },
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

  const validateRequired = {
    required: 'Обязательное поле',
  };

  const validateDate = {
    required: "Дата обязательна для заполнения",
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Дата должна быть в формате дд/мм/гггг"
    }
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
    validateDate,
    validateCreate,
    setValue,
    validateRequired,
    reset,
    validateLink,
    validateAbout,
    confirmPassword,
    register,
    handleSubmit,
    errors,
    isValid,
    control,
    validateName,
    validateEmail,
    validatePassword: validateRequired,
  };
}
