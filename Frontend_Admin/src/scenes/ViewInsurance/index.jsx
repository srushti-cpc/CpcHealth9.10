import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react"; // Import useEffect and useState
import Header from "../../components/Header";

const ViewInsurance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [insuranceData, setInsuranceData] = useState([]);
  
  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/insurance/getinsurances');
        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item._id, // Assign _id to id
          name: item.name,
          // Include other properties you need
        }));
        setInsuranceData(formattedData);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
      }
    };

    fetchInsuranceData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 }, // Add ID column
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];


  return (
    <Box m="20px">
      <Header title="Insurance" subtitle="View Insurance Data here" />
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
        <DataGrid checkboxSelection rows={insuranceData} columns={columns} />
      </Box>
    </Box>
  );
};

export default ViewInsurance;
