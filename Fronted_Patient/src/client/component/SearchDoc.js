import React from 'react';
import HeaderDoc from './HeaderDoc';
import { Grid, Box, Card, CardContent, Typography, Avatar, IconButton, Chip } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import VideoCallIcon from '@mui/icons-material/VideoCall'; // Import video call icon

const doctors = [
  { name: 'Dr. John Smith', specialty: 'Cardiologist', experience: 10, rating: 4.5, bio: 'Experienced in treating heart conditions.', profileImage: 'https://via.placeholder.com/150', location: { lat: 37.7749, lng: -122.4194 } },
  { name: 'Dr. Alice Johnson', specialty: 'Dentist', experience: 8, rating: 4.0, bio: 'Specializes in cosmetic dentistry and implants.', profileImage: 'https://via.placeholder.com/150', location: { lat: 37.781, lng: -122.405 } },
];

// Google Maps container style
const containerStyle = {
  width: '100%',
  height: '100%',
};

// Default center location for the map (adjust as needed)
const center = {
  lat: 37.7749,
  lng: -122.4194,
};

// Doctor Card Component
function DoctorCard({ doctor, onClick }) {
  return (
    <Card sx={{ marginBottom: 2 }} onClick={() => onClick(doctor)}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Avatar with round profile image and video call icon */}
          <Grid item>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                alt={doctor.name}
                src={doctor.profileImage} // Image URL from the doctor object
                sx={{ width: 100, height: 100 }}
              />
              {/* Icon for Video Call */}
              <IconButton
                color="primary"
                size="small"
                sx={{ 
                  width: 30, height: 30 ,
                  position: 'absolute', 
                  bottom: 0, 
                  right: 0,
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }
                }}
              >
                <VideoCallIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Grid>

          {/* Doctor details */}
          <Grid item>
            <Typography variant="h5">{doctor.name}</Typography>
            <Typography variant="subtitle1">{doctor.specialty}</Typography>
            <Typography variant="body2">{doctor.bio}</Typography>
            <Typography>{doctor.experience} years of experience</Typography>
            <Typography>Rating: {doctor.rating} ⭐</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

// Main Component
const SearchDoc = () => {
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);

  return (
    <>
      <HeaderDoc />

      {/* Chips placed here after the HeaderDoc */}
      <Box sx={{ display: 'flex', gap: 1, padding: 2 }}>
        {/* Example chips */}
        <Chip label="Nearby"sx={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} variant="outlined" clickable />
        <Chip label="Top Rated" sx={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} variant="outlined" clickable />
        <Chip label="Specialist" sx={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} variant="outlined" clickable />
        <Chip label="Time Of the Day" sx={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} variant="outlined" clickable />
        <Chip label="In-person/video" sx={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} variant="outlined" clickable />
        <Chip label="Illness" sx={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} variant="outlined" clickable />
        <Chip label="More Filters" sx={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} variant="outlined" clickable />



      </Box>

      {/* Main layout for doctor list and Google map */}
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Left Side: Doctor profile list */}
        <Box sx={{ width: '60%', padding: 2, overflowY: 'auto' }}>
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} onClick={setSelectedDoctor} />
          ))}
        </Box>

        {/* Right Side: Google Map */}
        <Box sx={{ width: '70%' }}>
          <LoadScript googleMapsApiKey="AIzaSyBdmrsoFJqNfiBlfXqgG3zWHgbICHFvbGM">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              {doctors.map((doctor, index) => (
                <Marker key={index} position={doctor.location} />
              ))}
            </GoogleMap>
          </LoadScript>
        </Box>
      </Box>
    </>
  );
};

export default SearchDoc;
