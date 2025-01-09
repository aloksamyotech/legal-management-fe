
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router";
import { getApi, postApi } from "core/APIs/ApiDocuments";
import { urls } from "core/Constant/Urls";
import { toast } from "react-toastify";
import { Messages } from "core/comman/comman";

const InvoiceForm = () => {
  const { caseId } = useParams();
  
  const [hearings, setHearings] = useState([{ title: "", amount: "", notes: "" }]);
  const [formData, setFormData] = useState({
    Client: "",
    ClientName: "",
    Advocate: "",
    AdvocateName: "",
    date: "2024-12-12",
  });

  const [dropHearings, setdropHearings] = useState([]);

  ////////////////// Fetch case details by caseId///////////////////
  const fetchCaseData = async () => {
    try {
      const response = await getApi(urls?.Case?.getcase.replace(":id", caseId));
      const caseData = response.data;
      const formattedData = {
        clientId: caseData?.Client?._id,
        clientName: caseData?.Client?.Name,
        advocateId: caseData?.Advocate?._id,
        advocateName: caseData?.Advocate?.name,
        title: caseData?.Title,
        matter: caseData?.Matter,
      };

      setFormData((prevData) => ({
        ...prevData,
        Client: formattedData.clientId,
        ClientName: formattedData.clientName,
        Advocate: formattedData.advocateId,
        AdvocateName: formattedData.advocateName,
      }));

     
    } catch (error) {
      console.error("Error fetching case data:", error);
    }
  };

  const fetchHearingData = async () => {
    try {
      const response = await getApi(urls?.Hearing?.getcaseHearing.replace(":caseId", caseId));
      if (response.data.status === 404) {
        setdropHearings([]);
        return;
      }
      const formattedData = response?.data?.map((hearing) => ({
        _id: hearing?._id,
        Title: hearing?.Title,
        Fee: hearing?.Fee,
      }));
      setdropHearings(formattedData);
    } catch (error) {
      console.error("Error fetching hearing data:", error);
    }
  };

  useEffect(() => {
    fetchCaseData();
    fetchHearingData();
  }, []);

  const handleHearingChange = (index, field, value) => {
    const updatedHearings = [...hearings];

    if (field === "title") {
      const selectedHearing = dropHearings.find((hearing) => hearing._id === value);
      updatedHearings[index] = {
        ...updatedHearings[index],
        title: selectedHearing?._id || "",
        amount: selectedHearing?.Fee || "",
      };
    } else {
      updatedHearings[index][field] = value;
    }

    setHearings(updatedHearings);
  };

  const addHearing = () => {
    if (hearings.some((hearing) => !hearing.title)) {
      alert("Please fill in the existing hearing before adding a new one.");
      return;
    }
    setHearings([...hearings, { title: "", amount: "", notes: "" }]);
  };
   
  const removeHearing = (index) => {
    const updatedHearings = hearings.filter((_, i) => i !== index);
    setHearings(updatedHearings);
  };

  const handleSubmit = async () => {
    if (hearings.some((hearing) => !hearing.title)) {
      alert("Please ensure all hearings have valid titles.");
      return;
    }
  
    const invoiceData = {
      Case: caseId,
      Client: formData.Client,
      Advocate: formData.Advocate,
      hearings: hearings.map((hearing) => ({
        title: hearing.title,
        amount: parseFloat(hearing.amount),
        notes: hearing.notes,
      })),
      date: formData.date,
    };

    console.log("Invoice Data:", invoiceData);

    
     await postApi(urls.Invoice.create, invoiceData);
    setHearings([{ title: "", amount: "", notes: "" }]);
     toast.success(Messages?.Invoice?.Create_success);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <TextField
        fullWidth
        label="Client"
        value={formData.ClientName}
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Advocate"
        value={formData.AdvocateName}
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Date"
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />

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
            <Select
              value={hearing.title}
              onChange={(e) =>
                handleHearingChange(index, "title", e.target.value)
              }
              error={!hearing.title}
              helperText={!hearing.title ? "Title is required" : ""}
              sx={{ flex: 1 }}
              displayEmpty
              
            >
              <MenuItem value="" disabled>
                Select Hearing
              </MenuItem>
              {dropHearings.map((hearing) => (
                <MenuItem key={hearing._id} value={hearing._id}>
                  {hearing.Title}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Amount"
              type="number"
              value={hearing.amount}
              disabled
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

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create
      </Button>
    </Box>
  );
};

export default InvoiceForm;
