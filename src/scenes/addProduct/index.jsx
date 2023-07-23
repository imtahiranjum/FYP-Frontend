import React, { useState } from "react";
import { useSetProductQuery } from "state/api";
import Header from "components/Header";
import * as employeeService from "../../services/employeeService";
import { UseForm, Form } from "../../components/UseForm";
import {
  MenuItem,
  Grid,
  TextField,
  RadioGroup,
  Select,
  Checkbox,
  Button,
  Box,
  ButtonGroup,
  useTheme,
  Stack,
  FormControl,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import ReactDatePicker from "react-datepicker";
import FlexBetween from "components/FlexBetween";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialFValues = {
  id: 0,
  title: "",
  price: "",
  description: "",
  category: "",
  cattleId: "",
};

const AddProduct = () => {
  const theme = useTheme();
  const [age, setAge] = useState("");
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("title" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("price" in fieldValues)
      temp.email = /$^|/.test(fieldValues.number) ? "" : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };



  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = UseForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    const { data, isLoading } = useSetProductQuery(e);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Cattle" subtitle="Add Cattle to the Market" />
      <Box
        mt="20px"
        height="45vh"
        sx={{
          component: "form",
          "& > :not(style)": { m: 1, width: "100ch" },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <Form onSubmit={handleSubmit}>
          <FlexBetween justifyContent={"space-between"}>
            <Box>
              <Grid xs={2}>
                <TextField
                  required
                  sx={{
                    margin: "1rem",
                  }}
                  id="standard-basic"
                  label="Title"
                  variant="standard"
                />
                <TextField
                  required
                  sx={{
                    margin: "1rem",
                  }}
                  id="standard-basic"
                  label="Price"
                  variant="standard"
                />
                <TextField
                  sx={{
                    margin: "1rem",
                  }}
                  id="standard-basic"
                  label="Description"
                  variant="standard"
                />
                <FormControl variant="standard" sx={{ m: "1rem", minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: "1rem", minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Cattle
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                
              </Grid>

              <ButtonGroup
                sx={{
                  margin: "1rem",
                }}
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button>Submit</Button>
                <Button>Reset</Button>
              </ButtonGroup>
            </Box>
          </FlexBetween>
        </Form>
      </Box>
    </Box>
  );
};

export default AddProduct;
