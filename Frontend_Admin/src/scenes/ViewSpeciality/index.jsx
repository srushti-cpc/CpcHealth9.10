import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react"; // Import useEffect and useState
import Header from "../../components/Header";

const ViewSpeciality = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 }, // Add ID column
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  const [specialityData, setSpecialityData] = useState([]);

  useEffect(() => {
    const fetchSpecialityData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/speciality/getspeciality`);

        console.log("response--->>>30",response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        //         const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/speciality/getspeciality`);
      console.log("line 127");

        const data = await response.json();
        console.log("line 125");

        console.log("data view specialtyyy", data);

        // Format data to include _id as id
        console.log("line 1234");

        const formattedData = data.map(item => ({
          id: item._id, // Assign _id to id
          name: item.name,
        }));
        console.log("line 123");
        console.log("frormated data",formattedData);

        setSpecialityData(formattedData);
      } catch (error) {
        console.error("Error fetching speciality data:",error);
      }
    };

    fetchSpecialityData();
  }, []);
 


  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={specialityData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ViewSpeciality;
