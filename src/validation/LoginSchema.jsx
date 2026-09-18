import * as yup from "yup";

 export const LoginSchema = yup.object({
    email:yup.string().email("email must be a valid email").required("email is required"),
    password:yup.string().required("password is required")
    .min(6,"password must be at least 6 characters")
    .matches(/[A-Z]/,"password must contain at least one uppercase letter")
    .matches(/[a-z]/,"password must contain at least one lowercase letter")
    .matches(/[\d]/,"password must contain at least one number")
    .matches(/[@$!%*?&]/,"password must contain at least one special character"),
});