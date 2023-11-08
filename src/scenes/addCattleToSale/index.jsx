import React, { useEffect, useState } from "react";
import {
  useAddOneCattleToSaleMutation,
  useGetOneCattleQuery,
  useSetProductQuery,
  useUpdateCattleOnSaleStatusMutation,
} from "state/api";
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
  Card,
  CardContent,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { styled } from "@mui/material/styles";
import Typography from "components/Typography";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const AddCattleToSale = () => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sent, setSent] = useState(false);
  const [images, setImages] = useState();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const location = useLocation();
  const recievedProps = location.state.propsToPass;
  const navigate = useNavigate();
  const [addOneCattleToSale] = useAddOneCattleToSaleMutation();
  const [updateCattleOnSaleStatus] = useUpdateCattleOnSaleStatusMutation();

  // const { cattle, isLoading } = useGetOneCattleQuery(recievedProps._id);

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

  const { values, errors, setErrors } = UseForm(initialFValues, true, validate);

  const handleSubmit = async () => {
    setSent(true);
    console.log(title, description, price, recievedProps._id);
    try {
      const payloadupdate = await updateCattleOnSaleStatus({
        cattle_id: recievedProps._id,
        to_add: true,
      });
      const payload = await addOneCattleToSale({
        title: title,
        description: description,
        price: price,
        cattle_id: recievedProps._id,
        images: images,
      });
      console.log("Cattle Added to sale");
      navigate("/cattlelist");
    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  const handleReset = () => {
    setPrice("");
    setTitle("");
    setDescription("");
  };
  useEffect(() => {
    if (images) {
      return <img width={100} height={70} src={images[0]} />;
    }
  }, images);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Cattle" subtitle="Add Cattle to the Marketplace" />
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
        <Card
          sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color={theme.palette.secondary[200]}
              gutterBottom
            >
              {recievedProps.category}
            </Typography>
            <Typography variant="h5" component="div">
              Name: {recievedProps.name} | Age: {recievedProps.age} | Color:{" "}
              {recievedProps.color} | Weight: {recievedProps.weight}
            </Typography>
            <Typography variant="h6" component="div">
              {recievedProps.gender}
            </Typography>
            <Typography variant="h6" component="div">
              {recievedProps.is_boarded ? (
                <Typography> Boarded </Typography>
              ) : (
                <Typography> Farm Owned </Typography>
              )}
            </Typography>

            {/* <Typography
              sx={{ mb: "1.5rem" }}
              color={theme.palette.secondary[400]}
            >
              Rs: {Number(price).toFixed(2)}
            </Typography> */}
          </CardContent>
        </Card>
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
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  required
                  sx={{
                    margin: "1rem",
                  }}
                  id="standard-basic"
                  label="Price"
                  variant="standard"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  sx={{
                    margin: "1rem",
                  }}
                  id="standard-basic"
                  label="Description"
                  variant="standard"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <div>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onChange={(e) => setImages(e.target.files)}
                  sx={{
                    margin: "1rem",
                  }}
                >
                  Upload Images
                  <VisuallyHiddenInput type="file" accept="image/*" multiple />
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
                  {images ? (
                    <img width={100} height={70} src={images[0]} />
                  ) : (
                    <p>No Image Uploaded</p>
                  )}
                </Box>
              </div>

              <div></div>

              <ButtonGroup
                sx={{
                  margin: "1rem",
                }}
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={handleReset}>Reset</Button>
              </ButtonGroup>
            </Box>
          </FlexBetween>
        </Form>
      </Box>
    </Box>
  );
};

export default AddCattleToSale;
