import React, { useState } from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const InvoiceForm = () => {
  const [hearings, setHearings] = useState([{ title: "", amount: "", notes: "" }]);
  const [formData, setFormData] = useState({
    client: "John Doe",
    advocate: "Jonathan Doe",
    date: "2024-12-12",
  });

  const handleHearingChange = (index, field, value) => {
    const updatedHearings = [...hearings];
    updatedHearings[index][field] = value;
    setHearings(updatedHearings);
  };

  const addHearing = () => {
    setHearings([...hearings, { title: "", amount: "", notes: "" }]);
  };

  const removeHearing = (index) => {
    const updatedHearings = hearings.filter((_, i) => i !== index);
    setHearings(updatedHearings);
  };

  const handleSubmit = () => {
    console.log({
      ...formData,
      hearings,
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      {/* Static Fields */}
      <TextField
        fullWidth
        label="Client"
        value={formData.client}
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Advocate"
        value={formData.advocate}
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Date"
        type="date"
        value={formData.date}
        disabled
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Dynamic Fields */}
      <Box sx={{ mb: 2 }}>
        {hearings.map((hearing, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <TextField
              label="Title"
              value={hearing.title}
              onChange={(e) => handleHearingChange(index, "title", e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Amount"
              type="number"
              value={hearing.amount}
              onChange={(e) => handleHearingChange(index, "amount", e.target.value)}
              sx={{ width: 100 }}
            />
            <TextField
              label="Notes"
              value={hearing.notes}
              onChange={(e) => handleHearingChange(index, "notes", e.target.value)}
              sx={{ flex: 2 }}
            />
            <IconButton onClick={() => removeHearing(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button variant="contained" onClick={addHearing} sx={{ mt: 1 }}>
          Add Hearing
        </Button>
      </Box>

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create
      </Button>
    </Box>
  );
};

export default InvoiceForm;
