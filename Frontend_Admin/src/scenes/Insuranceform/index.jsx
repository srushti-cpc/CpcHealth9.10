import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [openSnackbar, setOpenSnackbar] = useState(false);  // For Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState('');  // For Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');  // 'success' or 'error'

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/insurance/create', {
        name: values.InsuranceName,
      });
      console.log('Insurance added:', response.data);
      setSnackbarMessage('Insurance successfully added!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true); // Show success message
    } catch (error) {
      console.error('Error adding insurance:', error);
      setSnackbarMessage('Failed to add Insurance!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true); // Show error message
    }
  };
   // Close Snackbar function
   const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box m="20px">
      <Header title="Insurance Add" subtitle="Create a New Insurance" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Insurance Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.InsuranceName}
                name="InsuranceName"
                error={!!touched.InsuranceName && !!errors.InsuranceName}
                helperText={touched.InsuranceName && errors.InsuranceName}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Insurance
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  InsuranceName: yup.string().required("required"),
});

const initialValues = {
  InsuranceName: "",
};

export default Form;
