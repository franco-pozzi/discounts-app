import * as yup from "yup";

const isRequiredMessage = "Este campo es obligatorio";

export default yup.object().shape({
  porcentajeAhorro: yup.number().required(isRequiredMessage).max(100, 'Máximo posible es 100%'),
  topeReintegro: yup.number().required(isRequiredMessage).max(9999999999, '¡Superaste el máximo permitido!'),  
});