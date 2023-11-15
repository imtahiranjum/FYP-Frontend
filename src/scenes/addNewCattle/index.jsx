import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useAddNewCattleMutation } from "state/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppForm from "components/AppForm";
import Typography from "components/Typography";
import { Button, Container, FormControl, Input } from "@mui/material";
import InputField from "components/styled-components/TextField";
import FormButton from "form/FormButton";
import { email, required } from "form/validation";
import RFTextField from "form/RFTextField";
import { Form } from "components/UseForm";
import { useTheme } from "@emotion/react";
import CloudUpload from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { CloudUploadRounded } from "@mui/icons-material";

const AddNewCattle = () => {
  const [sent, setSent] = React.useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [base64Files, setBase64Files] = useState([]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [filesLength, setFilesLength] = useState();
  const [fileCounter, setFileCounter] = useState();
  const [addNewCattle] = useAddNewCattleMutation();
  const navigate = useNavigate();
  const theme = useTheme();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const validate = (values) => {
    const errors = required(
      ["name", "gender", "age", "breed", "color", "weight", "category"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleImages = async () => {
    console.log(image);
    const fileBase64 = await convertToBase64(image);
    setBase64Files((current) => [...current, fileBase64]);
    console.log(base64Files);
  };

  React.useEffect(()=>{
    if (image){
      handleImages()  
    }
  }, [image])
  // const handleImageUpload= () => {
    
  // }
  // React.useEffect(() => {
  //   if (!image) {
  //     console.log("No Image yet")
  //   }
  //   else {
  //     handleImages();
  //   }
  // }, [image]);

  const handleSubmit = async () => {
    setSent(true);
    console.log(name, image, gender, age, breed, color, weight, category);
    try {
      const payload = await addNewCattle({
        name: name,
        images: base64Files,
        gender: gender,
        age: age,
        breed: breed,
        color: color,
        weight: weight,
        category: category,
      });
      console.log("Cattle Added");
      navigate("/cattlelist");
    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ mt: 6, mb: 10, py: { xs: 3, md: 6 }, px: { xs: 2, md: 4 } }}>
          <React.Fragment>
            <Typography variant="h4" gutterBottom marked="left" align="left">
              Add Cattle Details
            </Typography>
          </React.Fragment>
          <Box
            // component="form"
            // onSubmit={handleSubmit2}
            // noValidate
            sx={{ mt: 5 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  autoFocus
                  //
                  sx={{
                    color: theme.palette.primary,
                  }}
                  subscription={{ value: true, active: true }}
                  // disabled={submitting || sent}
                  // component={RFTextField}
                  autoComplete="given-name"
                  fullWidth
                  label="Name"
                  name="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  // component={RFTextField}
                  // disabled={submitting || sent}
                  //
                  sx={{
                    color: theme.palette.primary,
                  }}
                  autoComplete="family-name"
                  fullWidth
                  label="Age"
                  name="age"
                  required
                  onChange={(e) => setAge(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  autoComplete="email"
                  // component={RFTextField}
                  // disabled={submitting || sent}
                  //
                  sx={{
                    color: theme.palette.primary,
                  }}
                  fullWidth
                  label="Gender"
                  margin="normal"
                  name="gender"
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  // component={RFTextField}
                  // disabled={submitting || sent}
                  //
                  sx={{
                    color: theme.palette.primary,
                  }}
                  required
                  name="weight"
                  autoComplete="weight"
                  label="Weight"
                  type="number"
                  margin="normal"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  // component={RFTextField}
                  // disabled={submitting || sent}
                  //
                  sx={{
                    color: theme.palette.primary,
                  }}
                  fullWidth
                  label="Category"
                  margin="normal"
                  name="category"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  // component={RFTextField}
                  // disabled={submitting || sent}
                  //
                  sx={{
                    color: theme.palette.primary,
                  }}
                  required
                  name="breed"
                  autoComplete="breed"
                  label="Breed"
                  type="text"
                  margin="normal"
                  onChange={(e) => setBreed(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  // component={RFTextField}
                  // disabled={submitting || sent}
                  //
                  sx={{
                    color: theme.palette.primary,
                  }}
                  fullWidth
                  label="Color"
                  margin="normal"
                  name="color"
                  required
                  onChange={(e) => setColor(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy> */}

            <div>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUpload />}
                onChange={(e) => setImage(e.target.files[0])}
                sx={{
                  margin: "1rem",
                }}
              >
                Upload Images
                <VisuallyHiddenInput type="file" accept="image/*" />
              </Button>
            </div>

            <div>
              <Box
                sx={{
                  margin: "1rem",
                }}
              >
                Selected Images:
              </Box>
              <Box
                sx={{
                  margin: "1rem",
                }}
              >
                {base64Files ? (base64Files.map(image =>
                  <img width={160} height={120} src={image} />
                )) : (
                  <p>No Image Uploaded</p>
                )}
              </Box>
            </div>

            <Button
              component="label"
              variant="contained"
              size="large"
              color="success"
              onClick={handleSubmit}
              sx={{
                my: "1rem",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Add Cattle
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AddNewCattle;
