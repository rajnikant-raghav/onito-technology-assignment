import React, { useState, useEffect } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "../formDataSlice.ts";
import { useNavigate } from "react-router-dom";

interface FormData {
  address: string;
  state: string;
  city: string;
  country: string;
  pin: number;
}
interface Country {
  name: {
    common: string;
  };
  cca2: string;
}

const schema = yup.object().shape({
  pin: yup.number().integer("Input must be integer"),
});
const AddressDetails: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dataForm = useSelector((state:RootState)=>state.formData.obj);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState();
   
  const handleAutoComplete=(event, newValue)=>{
    setSelectedValue(newValue.name.common)
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData, any>({
    resolver: yupResolver(schema),
  });

  function mergeObjects(obj1, obj2) {
    const merged = { ...obj1 };
  
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        merged[key] = obj2[key];
      }
    }
  
    return merged;
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission here
    data["country"] = selectedValue;

    const mergedObject = mergeObjects(dataForm, data);
    
    dispatch(setFormData(mergedObject))
    // console.log(mergedObject)
    navigate('./table')
  };
  useEffect(() => {
    // Fetch countries from the REST Countries API
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter countries based on the search term
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filtered);
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Personal Details
        </Typography>
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="State"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="City"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          )}
        />

        <Autocomplete
          id="country"
          options={filteredCountries}
          getOptionLabel={(option) => option.name.common}
          style={{ width: 550 }}
          value={selectedValue}
          onChange={handleAutoComplete}
          renderInput={(params) => (
            <TextField
              {...params}
              name="country"
              label="Type to search for a country"
              variant="outlined"
              onChange={handleInputChange}
              size="small"
            />
          )}
        />

        <Controller
          name="pin"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Pin-Code*"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              error={!!errors.pin}
              helperText={errors.pin?.message}
            />
          )}
        />
        <Button
          sx={{ float: "right", marginTop: "10px" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddressDetails;
