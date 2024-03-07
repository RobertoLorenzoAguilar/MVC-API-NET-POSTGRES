export const RULES = {
  'phone': [
    {
      min: 10,
      max: 10,
      message: 'El número de teléfono debe tener 10 dígitos',
    },
    {
      pattern: /^[0-9\b]+$/,
      message: 'El número de teléfono debe contener solo números',
    }
  ],
  'email': [
    {
      type: 'email',
      message: 'El correo electrónico no es válido',
    },
  ],
  'number': [
    {
      type: 'number',
      message: 'El valor debe ser un número',
    },
  ],
  'password': [
    {
      min: 6,
      message: 'La contraseña debe tener al menos 6 caracteres',
    },
  ],
  'rfc': [
    {
      min: 12,
      max: 13,
      message: 'El RFC debe tener entre 12 y 13 caracteres',
    },
    {
      pattern: /^[A-Z0-9\b]+$/,
      message: 'El RFC debe contener solo números y letras mayúsculas',
    }
  ],
};