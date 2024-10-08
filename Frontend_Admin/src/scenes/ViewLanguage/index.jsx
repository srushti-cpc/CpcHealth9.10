import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react"; // Import useEffect and useState


const ViewLanguage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [languageData, setlanguageData] = useState([]);
  
  useEffect(() => {
    const fetchlanguageData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/language/getlanguage');
        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item._id, // Assign _id to id
          name: item.name,
          // Include other properties you need
        }));
        setlanguageData(formattedData);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
      }
    };

    fetchlanguageData();
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
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
        <DataGrid checkboxSelection rows={languageData} columns={columns} />
      </Box>
    </Box>
  );
};

export default ViewLanguage;
