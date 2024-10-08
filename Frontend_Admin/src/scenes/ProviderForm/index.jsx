import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const getStyles = (name, personName, theme) => {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
};

const ProviderForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();


    const [openSnackbar, setOpenSnackbar] = React.useState(false);  // For Snackbar
    const [snackbarMessage, setSnackbarMessage] = React.useState('');  // For Snackbar message
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');  // 'success' or 'error'
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };







    const [selectedInsurances, setSelectedInsurances] = React.useState([]);
    const [selectedLanguages, setSelectedLanguages] = React.useState([]);
    const [selectdSpeciality, setSelectedSpeciality] = React.useState([]);
    const [selectdPractice, setSelectedPractice] = React.useState([]);



    const [insuranceOptions, setInsuranceOptions] = React.useState([]);
    const [languageOptions, setLanguageOptions] = React.useState([]);
    const [SpecialityOptions, setSpecialityOptions] = React.useState([]);
    const [PracticeOptions, setPracticeOptions] = React.useState([]);

    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [selectedState, setSelectedState] = React.useState(null);
    const [selectedCity, setSelectedCity] = React.useState(null);




    useEffect(() => {
        const fetchInsuranceData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/insurance/getinsurances');
                const data = await response.json();
                setInsuranceOptions(data);
            } catch (error) {
                console.error("Error fetching insurance data:", error);
            }
        };

        const fetchLanguageData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/language/getlanguage');
                const data = await response.json();
                setLanguageOptions(data);
            } catch (error) {
                console.error("Error fetching language data:", error);
            }
        };

        const fetchSpecialityData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/speciality/getspeciality');
                const data = await response.json();
                setSpecialityOptions(data);
            } catch (error) {
                console.error("Error fetching speciality data:", error);
            }
        };

        const fetchPracticeData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/practice/getpracticename');
                const data = await response.json();
                setPracticeOptions(data);
            } catch (error) {
                console.error("Error fetching practice data:", error);
            }
        };

        fetchInsuranceData();
        fetchLanguageData();
        fetchSpecialityData();
        fetchPracticeData();
    }, []);

    const handleInsuranceChange = (event) => {
        console.log("event",event)
        const {
            target: { value },
        } = event;
        console.log("values",value);
        setSelectedInsurances(typeof value === 'string' ? value.split(',') : value);
    };
    // Handle Language Change
    const handleLanguageChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedLanguages(value);
    };

    // Handle Speciality Change
    const handleSpecialityChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedSpeciality(value);
    };

    // Handle Practice Change
    const handlePracticeChange = (event) => {
        setSelectedPractice(event.target.value);
    };


    const handleSubmit = async (values) => {
        console.log("values",values);
        console.log("selectedInsurances-->>",selectedInsurances);
        const providerData = {
            npi: values.npi,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,  // This should be handled securely
            phoneNumber: values.phoneNumber,
            address: {
                street: values.address.street,
                city: values.address.city,
                state: values.address.state,
                country: values.address.country,
                zipcode: values.address.zipcode,
            },
            telehealthServices: values.telehealthServices,
            insuranceTypeIds: selectedInsurances,  // Should contain selected insurance IDs
            specialityIds: selectdSpeciality,  // Should contain selected specialty IDs
            languageIds: selectedLanguages,  // Should contain selected language IDs
            practiceId: selectdPractice  // Should contain selected practice ID
        };
        console.log("providerData-->> from handle submit function",providerData)
    
        try {
            const response = await axios.post('http://localhost:5000/api/provider/create', providerData);
            console.log('Provider created:', response.data);
            setSnackbarMessage('Provider successfully added!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true); // Show success notification
        } catch (error) {
            console.error('Error creating provider:', error.response?.data);
            setSnackbarMessage('Failed to add provider!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true); 
        }
    };
    



    return (
        <Box m="20px">
            <Header title="Add Provider Data" subtitle="Create a New Provider data" />
            <Formik
                onSubmit={handleSubmit}
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
                            gridTemplateColumns="repeat(4, 1fr)" // Ensure the grid spans 4 columns
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Provider NPI Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.npi} // Make sure this binds to values.npi
                                name="npi" // Use a correct name here
                                error={!!touched.npi && !!errors.npi}
                                helperText={touched.npi && errors.npi}
                                sx={{ gridColumn: "span 3" }} // Takes a full row
                            />


                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, 1fr)"
                                gap="30px"
                                gridColumn="span 3" // Ensures this section spans full width
                            >




                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Provider First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName} // Correct binding
                                    name="firstName" // Use correct name
                                    error={!!touched.firstName && !!errors.firstName}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 1" }} // Takes a full row
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Provider Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="lastName"
                                    value={values.lastName}
                                    error={!!touched.lastName && !!errors.lastName}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 1" }} // Takes a full row
                                />


                                {/* Practice Email */}
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="email"
                                    value={values.email}
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 2" }} // Takes a full row
                                />
                            </Box>



                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="PhoneNumber"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="phoneNumber"
                                value={values.phoneNumber}
                                error={!!touched.phoneNumber && !!errors.phoneNumber}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                                sx={{ gridColumn: "span 3" }} // Takes a full row
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="password"
                                onBlur={handleBlur}
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 3" }} // Takes a full row
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
                                gridColumn="span 3" // Ensures this section spans full width
                            >
                                {/* Practice City */}
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

                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, 1fr)"
                                gap="30px"
                                gridColumn="span 3" // Ensures this section spans full width
                            >
                                {/* insurance type */}
                                <FormControl sx={{ m: 1, gridColumn: "span 1" }}>
                                    <InputLabel>Select Your Insurance</InputLabel>
                                    <Select
                                        multiple
                                        value={selectedInsurances}  // This should reflect the state variable
                                        onChange={handleInsuranceChange}  // This should update the state on change
                                        input={<OutlinedInput label="Select Your Insurance" />}
                                    >
                                        {insuranceOptions.map((insurance) => (
                                            <MenuItem
                                                key={insurance._id}
                                                value={insurance._id}
                                            >
                                                {insurance.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Language type */}
                                <FormControl sx={{ m: 1, gridColumn: "span 1" }}>
                                    <InputLabel id="demo-multiple-name-label">Select Your Language</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={selectedLanguages}
                                        onChange={handleLanguageChange}
                                        input={<OutlinedInput label="Add Your Language" />}
                                        MenuProps={MenuProps}
                                    >
                                        {languageOptions.map((language) => (
                                            <MenuItem
                                                key={language._id}
                                                value={language._id}
                                                style={getStyles(language.name, selectedLanguages, theme)}
                                            >
                                                {language.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>



                                {/*  speciality check*/}

                                <FormControl sx={{ m: 1, gridColumn: "span 1" }}>
                                    <InputLabel id="demo-multiple-name-label">Select Your Speciality</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={selectdSpeciality}
                                        onChange={handleSpecialityChange}
                                        input={<OutlinedInput label="Select Your Speciality" />}
                                        MenuProps={MenuProps}
                                    >
                                        {SpecialityOptions.map((speciality) => (
                                            <MenuItem
                                                key={speciality._id}
                                                value={speciality._id}
                                                style={getStyles(speciality.name, selectdSpeciality, theme)}
                                            >
                                                {speciality.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControlLabel control={<Checkbox defaultChecked />} label="telehealthServices" />



                            </Box>

                            <FormControl sx={{ m: 1, gridColumn: "span 3" }}>
                                <InputLabel id="demo-multiple-name-label">Select Your Practice Name</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={selectdPractice}
                                    onChange={handlePracticeChange}
                                    input={<OutlinedInput label="Select Your Practice Name" />}
                                    MenuProps={MenuProps}
                                >
                                    {PracticeOptions.map((practice) => (
                                        <MenuItem
                                            key={practice._id}
                                            value={practice._id}
                                            style={getStyles(practice.name, selectdPractice, theme)}
                                        >
                                            {practice.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


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
    npi: yup.number().required("NPI is required").positive().integer(), // Assuming you want to include NPI
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"), // Add lastName field
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"), // Change to phoneNumber
    address: yup.object().shape({
        street: yup.string(),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        country: yup.string().required("Country is required"), // Add country field
        zipcode: yup.string().required("Zipcode is required")
    }),
    telehealthServices: yup.boolean(), // Optional field for telehealth services
    insuranceTypeIds: yup.array().of(yup.string().required()), // Assuming insuranceTypeIds will be selected
    specialityIds: yup.array().of(yup.string().required()), // Assuming specialityIds will be selected
    languageIds: yup.array().of(yup.string().required()), // Assuming languageIds will be selected
    providerIds: yup.array().of(yup.string().required()), // Assuming providers will be selected

});

const initialValues = {
    npi: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
    },
    telehealthServices: false, // Optional field for telehealth services
    insuranceTypeIds: [], // Initialize as empty array for insurance type IDs
    specialityIds: [], // Initialize as empty array for specialty IDs
    languageIds: [], // Initialize as empty array for language IDs
    providerIds: []
};


export default ProviderForm;
