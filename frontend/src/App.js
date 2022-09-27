import "./App.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

const columns = [
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "quantity",
    headerName: "Total Quantity",
    type: "number",
    width: 150,
  },
];

function EntryBox({ onSubmitCallback }) {
  const defaultState = { name: "", quantity: "" };
  const [state, setState] = useState(defaultState);

  const submit = async () => {
    await onSubmitCallback(state);
    setState(defaultState);
  };

  return (
    <Box sx={{ marginBottom: "32px" }}>
      <Stack direction="row" spacing={1} autoComplete="off">
        <TextField
          name="name"
          required
          id="name"
          label="Name"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
        <TextField
          id="quantity"
          label="Quantity"
          type="number"
          required
          value={state.quantity}
          onChange={(e) => setState({ ...state, quantity: e.target.value })}
        />
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={submit}
          disabled={!(state.name && state.quantity)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

function DataTable({ data, onSelectionCallback }) {
  return (
    <Box sx={{ height: 650, width: "100%", marginBottom: "32px" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onSelectionModelChange={(newSelectionModel) => {
          onSelectionCallback(newSelectionModel[0]);
        }}
        sx={(theme) => ({
          "& .MuiDataGrid-columnHeader": {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightBold,
          },
        })}
      />
    </Box>
  );
}

function App() {
  const [state, setState] = useState([]);

  const getRemoteData = async () => {
    const response = await fetch(`/api/inventory/`);
    const data = await response.json();
    const dataWithIndex = data.map((value, id) => ({ ...value, id }));
    setState(dataWithIndex);
  };

  const onSubmitCallback = async (inventoryItem) => {
    const toPost = {
      ...inventoryItem,
      quantity: Number(inventoryItem.quantity),
    };
    await fetch(`/api/items/`, {
      method: "POST",
      body: JSON.stringify(toPost),
      headers: { "content-type": "application/json" },
    });

    getRemoteData();
  };

  useEffect(() => {
    getRemoteData();
  }, []);

  return (
    <Box sx={{ padding: "32px" }}>
      <Typography gutterBottom variant="h3" component="h1">
        Inventory Management
      </Typography>
      <EntryBox onSubmitCallback={onSubmitCallback} />
      <DataTable data={state} />
    </Box>
  );
}

export default App;
