import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react"; 
import Header from "../../components/Header";

const ViewPractice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [practiceData, setPracticeData] = useState([]);
  
  useEffect(() => {
    const fetchPracticeData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/practice/getpracticename');
        const data = await response.json();
        console.log("data from provider", data);

        // Format the data to fit the DataGrid requirements
        const formattedData = data.map(item => ({
          id: item._id, // Assign _id to id
          name: item.name,
          email: item.email,
          phoneNumber: item.phoneNumber,
          address: `${item.address.street}, ${item.address.city}, ${item.address.state}, ${item.address.country}, ${item.address.zipcode}`, // Combine address fields
          
        }));
        
        setPracticeData(formattedData);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };

    fetchPracticeData();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 }, // ID Column
    { field: "name", headerName: "name", flex: 1 }, // ID Column 
    { field: "email", headerName: "Email", flex: 1 }, // Email Column
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 }, // Phone Number Column
    { field: "address", headerName: "Address", flex: 2 }, // Address Column
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
          rows={practiceData} 
          columns={columns} 
        />
      </Box>
    </Box>
  );
};

export default ViewPractice;
