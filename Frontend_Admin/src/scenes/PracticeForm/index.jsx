import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Header from "../../components/Header";
import { useState } from "react";
import { Country, State, City } from "country-state-city";

const PracticeForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const handleFormSubmit = async (values) => {
        console.log("valuesss", values);
        console.log("valuesss streetname", values.streetname);
        try {
            const response = await axios.post('http://localhost:5000/api/practice/create', {
                name: values.practicename,
                email: values.email,
                phoneNumber: values.phoneNumber, // Updated to phoneNumber
                address: {
                    street: values.address.street,
                    city: values.address.city,
                    state: values.address.state,
                    country: values.address.country,
                    zipcode: values.address.zipcode,
                },
            });
            console.log('Practice data added:', response.data);
            setSnackbarMessage('Practice data successfully added!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error adding practice data:', error);
            setSnackbarMessage('Failed to add practice data!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box m="20px">
            <Header title="Add Practice Data" subtitle="Create a New Practice Data" />
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
                    console.log('Errors:', errors),
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, 1fr)"
                        >
                            {/* Practice Name */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Practice Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.practicename}
                                name="practicename"
                                error={!!touched.practicename && !!errors.practicename}
                                helperText={touched.practicename && errors.practicename}
                                sx={{ gridColumn: "span 3" }}
                            />

                            {/* Practice Email */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Practice Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 3" }}
                            />

                            {/* Phone Number */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Practice Phone Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phoneNumber} // Updated to phoneNumber
                                name="phoneNumber" // Updated name to phoneNumber
                                error={!!touched.phoneNumber && !!errors.phoneNumber}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                                sx={{ gridColumn: "span 3" }}
                            />

                            {/* Address */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Street"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="address.street" // Updated to match the nested structure
                                value={values.address.street} // Added value attribute for controlled input
                                error={!!touched.address?.street && !!errors.address?.street}
                                helperText={touched.address?.street && errors.address?.street}
                                multiline
                                rows={3}
                                sx={{ gridColumn: "span 3" }}
                            />

                            {/* Separate Box for City, State, Zipcode */}
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, 1fr)"
                                gap="30px"
                                gridColumn="span 3"
                            >
                                 <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Country"
                                    onChange={(e) => {
                                        const country = Country.getCountryByCode(e.target.value);
                                        setSelectedCountry(country);
                                        setSelectedState(null);
                                        setSelectedCity(null);
                                        handleChange(e);
                                    }}
                                    value={selectedCountry ? selectedCountry.isoCode : ''}
                                    name="address.country" // Update this line
                                    helperText="Select your country"
                                >
                                    <MenuItem value="">Select a Country</MenuItem>
                                    {Country.getAllCountries().map((country) => (
                                        <MenuItem key={country.isoCode} value={country.isoCode}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="State"
                                    onChange={(e) => {
                                        const state = State.getStateByCodeAndCountry(e.target.value, selectedCountry.isoCode);
                                        setSelectedState(state);
                                        setSelectedCity(null);
                                        handleChange(e);
                                    }}
                                    value={selectedState ? selectedState.isoCode : ''}
                                    name="address.state" // Use nested structure
                                    helperText="Select your state"
                                    disabled={!selectedCountry}
                                >
                                    <MenuItem value="">Select a State</MenuItem>
                                    {State.getStatesOfCountry(selectedCountry?.isoCode).map((state) => (
                                        <MenuItem key={state.isoCode} value={state.isoCode}>
                                            {state.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="City"
                                    onChange={(e) => {
                                        setSelectedCity(e.target.value);
                                        handleChange(e);
                                    }}
                                    value={selectedCity || ''}
                                    name="address.city" // Use nested structure
                                    helperText="Select your city"
                                    disabled={!selectedState}
                                >
                                    <MenuItem value="">Select a City</MenuItem>
                                    {City.getCitiesOfState(selectedCountry?.isoCode, selectedState?.isoCode).map((city) => (
                                        <MenuItem key={city.name} value={city.name}>
                                            {city.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text" // Changed to text to accommodate leading zeros
                                    label="Zipcode"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.address.zipcode} // Updated to match the nested structure
                                    name="address.zipcode" // Update to match the nested structure
                                    error={!!touched.address?.zipcode && !!errors.address?.zipcode}
                                    helperText={touched.address?.zipcode && errors.address?.zipcode}
                                    sx={{ gridColumn: "span 1" }}
                                />
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="start" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create
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

// Validation schema and initial values
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    practicename: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"), // Updated validation field
    address: yup.object().shape({
        street: yup.string(),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        country: yup.string().required("Country is required"), // Add country field
        zipcode: yup.string().required("Zipcode is required")
    }),
});

const initialValues = {
    practicename: "",
    email: "",
    phoneNumber: "", // Updated field to phoneNumber
    address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
    },
};

export default PracticeForm;
