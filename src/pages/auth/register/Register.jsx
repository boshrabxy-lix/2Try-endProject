import Box from "@mui/material/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../../validation/RegisterSchema";
import CircularProgress from "@mui/material/CircularProgress";


export default function Register() {
  const [ServerErrors, setServerErrors] = useState([]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(registerSchema)
  });
 


  const registerForm = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/auth/Account/Register`,
        data,
      );
      console.log("responce", response);
    } catch (err) {
      console.log(err.response.data.errors);
      setServerErrors(err.response.data.errors);
    }
  };
 

  return (

    <Box component={"section"} className="register-form" py={5}>
      <Typography component={"h1"} variant="h3">
        Register
      </Typography>
      {ServerErrors?.length > 0 ? ServerErrors.map((error) =>
        <Typography color="error" alignItems={'center'}>{error}</Typography>
      ) : ''}

      <Box
        component={"form"}
        onSubmit={handleSubmit(registerForm)}
        sx={{
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
          mb: 3,
          py: 3,
        }}
        py={2}
        display={'flex'}
      >
        <TextField
          {...register("userName")}
          fullWidth
          label="User Name"
          variant="outlined"
          error={errors.userName}
          helperText={errors.userName?.message}
        />
        <TextField
          {...register("fullName")}
          fullWidth
          label="Full Name"
          variant="outlined"
          error={errors.fullName}
          helperText={errors.fullName?.message}
        />
        <TextField
          {...register("email")}
          fullWidth
          label="User Email"
          variant="outlined"
          error={errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password")}
          fullWidth
          label="Password"
          variant="outlined"
          error={errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          {...register("phoneNumber")}
          fullWidth
          label="Phone Number"
          variant="outlined"
          error={errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <Button variant="contained " type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={20} /> : "Register"}
        </Button>
      </Box>
    </Box>
  );
}
