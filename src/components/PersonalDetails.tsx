import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setObject } from "../formDataSlice.ts";

interface FormData {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  idType: string;
  govtId: string;
}
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at 3 character")
    .required("Name is required"),
  age: yup
    .number()
    .positive("Dob must be potitive integer")
    .integer()
    .required("DOB is required"),
  sex: yup.string().required("Sex is required"),
  mobile: yup.string().min(10,"Mobile munber must be at 10 digit"),
  idType: yup.string().required("Please select a id type"),
  govtId: yup.string().when("idType", {
    is: (idType: string) => idType === "aadhar",
    then:()=>
      yup.string()
        .matches(
          /^[2-9]\d{11}$/,
          "Aadhar should have 12 numeric digits and should not start with 0 or 1"
        )
        .required("Aadhar is required"),
    otherwise:()=> yup
      .string()
      .matches(
        /^[A-Za-z0-9]{10}$/,
        "PAN should be a ten-character long alpha-numeric string"
      )
      .required("PAN is required"),
  }),
});
export default function PersonalDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission here
    dispatch(setObject(data))
    navigate("/address")
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Personal Details
        </Typography>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name*"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Age*"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          )}
        />
        <Controller
          name="sex"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              labelId="Sex*"
              id="sex"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              error={!!errors.sex}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Gender
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          )}
        />
        <Controller
          name="mobile"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Mobile"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          )}
        />
        <Controller
          name="idType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              labelId="idType-label*"
              id="idType"
              variant="outlined"
              margin="normal"
              size="small"
              error={!!errors.idType}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select IDType
              </MenuItem>
              <MenuItem value="aadhar">Aadhar</MenuItem>
              <MenuItem value="pan">Pan</MenuItem>
            </Select>
          )}
        />

        <Controller
          name="govtId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="govtId"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              error={!!errors.govtId}
              helperText={errors.govtId?.message}
            />
          )}
        />
        <br />
        <Button
          sx={{ float: "right", marginTop: "10px" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          NEXT
        </Button>
      </form>
    </Container>
  );
}
