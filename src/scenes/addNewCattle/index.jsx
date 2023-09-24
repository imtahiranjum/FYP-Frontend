// import * as React from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// // import { Field, Form, FormSpy } from "react-final-form";
// // import Typography from "components/Typography";
// // import AppForm from "components/AppForm";
// // import { email, required } from "form/validation";
// // import RFTextField from "form/RFTextField";
// // import FormButton from "form/FormButton";
// // import FormFeedback from "form/FormFeedback";
// import { useAddNewCattleMutation } from "state/api";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AppForm from "components/AppForm";
// import Typography from "components/Typography";


// const AddNewCattle = () => {
//   const [sent, setSent] = React.useState(false);
//   const [name, setName] = useState("");
//   const [images, setImages] = useState("");
//   const [gender, setGender] = useState("");
//   const [age, setAge] = useState("");
//   const [breed, setBreed] = useState("");
//   const [color, setColor] = useState("");
//   const [weight, setWeight] = useState("");
//   const [category, setCategory] = useState("");
//   const [addNewCattle] = useAddNewCattleMutation();
//   const navigate = useNavigate();
//   // const (name, images, gender, age, breed, color, weight, category) = newa
//   const validate = (values) => {
//     const errors = required(
//       ["name", "gender", "age", "breed", "color", "weight", "category"],
//       values
//     );

//     if (!errors.email) {
//       const emailError = email(values.email);
//       if (emailError) {
//         errors.email = emailError;
//       }
//     }

//     return errors;
//   };

//   const handleSubmit = async () => {
//     setSent(true);
//     console.log(name, images, gender, age, breed, color, weight, category);
//     try {
//       const payload = await addNewCattle({
//         name: name,
//         images: images,
//         gender: gender,
//         age: age,
//         breed: breed,
//         color: color,
//         weight: weight,
//         category: category,
//       });
//       console.log("Cattle Added");
//       navigate("/cattlelist")
//     } catch (error) {
//       console.log("Error Occurred", error);
//     }
//   };

//   return (
//     <React.Fragment>
//       <AppForm>
//         <React.Fragment>
//           <Typography variant="h4" gutterBottom marked="center" align="left">
//             Add Cattle Details
//           </Typography>
//         </React.Fragment>
//         <Form
//           onSubmit={handleSubmit}
//           subscription={{ submitting: true }}
//           validate={validate}
//         >
//           {({ handleSubmit: handleSubmit2, submitting }) => (
//             <Box
//               component="form"
//               onSubmit={handleSubmit2}
//               noValidate
//               sx={{ mt: 6 }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     autoFocus
//                     subscription={{ value: true, active: true }}
//                     disabled={submitting || sent}
//                     component={RFTextField}
//                     autoComplete="given-name"
//                     fullWidth
//                     label="Name"
//                     name="name"
//                     required
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     component={RFTextField}
//                     disabled={submitting || sent}
//                     autoComplete="family-name"
//                     fullWidth
//                     label="Age"
//                     name="age"
//                     required
//                     onChange={(e) => setAge(e.target.value)}
//                   />
//                 </Grid>
//               </Grid>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <Field
//                         autoComplete="email"
//                         component={RFTextField}
//                         disabled={submitting || sent}
//                         fullWidth
//                         label="Gender"
//                         margin="normal"
//                         name="gender"
//                         required
//                         onChange={(e) => setGender(e.target.value)}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Field
//                         component={RFTextField}
//                         disabled={submitting || sent}
//                         required
//                         name="weight"
//                         autoComplete="weight"
//                         label="Weight"
//                         type="number"
//                         margin="normal"
//                         onChange={(e) => setWeight(e.target.value)}
//                     />

//                 </Grid>
//               </Grid>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <Field
//                         component={RFTextField}
//                         disabled={submitting || sent}
//                         fullWidth
//                         label="Category"
//                         margin="normal"
//                         name="category"
//                         required
//                         onChange={(e) => setCategory(e.target.value)}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Field
//                         component={RFTextField}
//                         disabled={submitting || sent}
//                         required
//                         name="breed"
//                         autoComplete="breed"
//                         label="Breed"
//                         type="text"
//                         margin="normal"
//                         onChange={(e) => setBreed(e.target.value)}
//                     />

//                 </Grid>
//               </Grid>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <Field
//                         component={RFTextField}
//                         disabled={submitting || sent}
//                         fullWidth
//                         label="Color"
//                         margin="normal"
//                         name="color"
//                         required
//                         onChange={(e) => setColor(e.target.value)}
//                     />
//                 </Grid>
//               </Grid>
//               <FormSpy subscription={{ submitError: true }}>
//                 {({ submitError }) =>
//                   submitError ? (
//                     <FormFeedback error sx={{ mt: 2 }}>
//                       {submitError}
//                     </FormFeedback>
//                   ) : null
//                 }
//               </FormSpy>
//               <FormButton
//                 sx={{ mt: 3, mb: 2, borderRadius: 1 }}
//                 disabled={submitting || sent}
//                 color="secondary"
//                 fullWidth
//               >
//                 {submitting || sent ? "In progress…" : "Sign Up"}
//               </FormButton>
//             </Box>
//           )}
//         </Form>
//       </AppForm>
//     </React.Fragment>
//   );
// };

// export default AddNewCattle;
