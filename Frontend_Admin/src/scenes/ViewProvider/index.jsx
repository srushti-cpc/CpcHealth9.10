import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react"; 
import Header from "../../components/Header";

const ViewProvider = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [providerData, setProviderData] = useState([]);
  
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/provider/getprovider');
        const data = await response.json();
        console.log("data from provider", data);

        // Format the data to fit the DataGrid requirements
        const formattedData = data.map(item => ({
          id: item._id, // Assign _id to id
          firstName: item.firstName,
          lastName: item.lastName,
          npi: item.npi,
          email: item.email,
          phoneNumber: item.phoneNumber,
          telehealthServices: item.telehealthServices ? 'Yes' : 'No', 
          address: `${item.address.street}, ${item.address.city}, ${item.address.state}, ${item.address.country}, ${item.address.zipcode}`, // Combine address fields
          insuranceTypes: item.insuranceTypeIds.map(ins => ins.name).join(", "),
          specialties: item.specialityIds.map(spec => spec.name).join(", "), 
          languages: item.languageIds.map(lang => lang.name).join(", "), 
          practice: item.practiceId?.name || "N/A" 
        }));
        
        setProviderData(formattedData);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };
    fetchProviderData();
  }, []);

  // Define the columns you want to display in the DataGrid
  const columns = [
    { field: "id", headerName: "ID", flex: 1 }, // ID Column
    { field: "firstName", headerName: "First Name", flex: 1 }, // First Name Column
    { field: "lastName", headerName: "Last Name", flex: 1 }, // Last Name Column
    { field: "npi", headerName: "NPI", flex: 1 }, // NPI Column
    { field: "email", headerName: "Email", flex: 1 }, // Email Column
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 }, // Phone Number Column
    { field: "telehealthServices", headerName: "Telehealth Services", flex: 1 }, // Telehealth Services Column
    { field: "address", headerName: "Address", flex: 2 }, // Address Column
    { field: "insuranceTypes", headerName: "Insurance Types", flex: 1 }, // Insurance Types Column
    { field: "specialties", headerName: "Specialties", flex: 1 }, // Specialties Column
    { field: "languages", headerName: "Languages", flex: 1 }, // Languages Column
    { field: "practice", headerName: "Practice", flex: 1 }, // Practice Name Column
  ];

  return (
    <Box m="20px">
      <Header title="Providers" subtitle="View Provider Data here" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
          checkboxSelection 
          rows={providerData} 
          columns={columns} 
        />
      </Box>
    </Box>
  );
};

export default ViewProvider;
