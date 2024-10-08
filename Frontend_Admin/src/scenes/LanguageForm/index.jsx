import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";

const LanguageForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [openSnackbar, setOpenSnackbar] = useState(false);  // For Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState('');  // For Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');  // 'success' or 'error'

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/language/create', {
        name: values.LanguageName,
      });
      console.log('Language added:', response.data);
      setSnackbarMessage('Language successfully added!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true); // Show success message
    } catch (error) {
      console.error('Error adding language:', error);
      setSnackbarMessage('Failed to add language!');
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
      <Header title="Add Language" subtitle="Create a New Language" />

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
                label="Language Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.LanguageName}
                name="LanguageName"
                error={!!touched.LanguageName && !!errors.LanguageName}
                helperText={touched.LanguageName && errors.LanguageName}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Language
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* Snackbar for notifications */}
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
  LanguageName: yup.string().required("required"),
});

const initialValues = {
  LanguageName: "",
};

export default LanguageForm;
