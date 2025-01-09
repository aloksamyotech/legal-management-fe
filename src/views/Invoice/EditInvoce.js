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
import { useLocation, useParams } from "react-router";
import { getApi, updateApi } from "core/APIs/ApiDocuments";
import { urls } from "core/Constant/Urls";
import { toast } from "react-toastify";
import { Messages } from "core/comman/comman";

const EditInvoiceForm = () => {
    const location = useLocation();
    const invoice = location?.state
    const invoiceId= invoice?._id
  const [hearings, setHearings] = useState([]);
  const [formData, setFormData] = useState({
    Client: "",
    ClientName: "",
    Advocate: "",
    AdvocateName: "",
    date: "",
  });

  const [dropHearings, setDropHearings] = useState([]);

  const fetchInvoiceData = async () => {
    try {
      const response = await getApi(urls?.Invoice?.getinvoiceByid.replace(":id", invoiceId));
      const invoiceData = response?.data;
      console.log(invoiceData)

      setFormData({
        
        Case: invoiceData?.Case?._id,
        CaseTitle: invoiceData?.Case?.Title,
        Client: invoiceData?.Client?._id,
        ClientName: invoiceData?.Client?.Name,
        Advocate: invoiceData?.Advocate?._id,
        AdvocateName: invoiceData?.Advocate?.name,
        date:new Date(invoiceData?.date).toISOString().split("T")[0],
      });

      setHearings(
        invoiceData?.hearings?.map((hearing) => ({
          title:hearing?.title?._id || "", 
          amount: hearing.amount,
          notes: hearing.notes,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  const fetchHearingData = async () => {
    try {
      const response = await getApi(urls?.Hearing?.getcaseHearing.replace(":caseId", formData.Case));
      const formattedData = response?.data?.map((hearing) => ({
        _id: hearing?._id,
        Title: hearing?.Title,
        Fee: hearing?.Fee,
      }));
      setDropHearings(formattedData);
    } catch (error) {
      console.error("Error fetching hearing data:", error);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, [invoiceId]);

  useEffect(() => {
    if (formData.Client) fetchHearingData();
  }, [formData.Client]);

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

    const updatedInvoiceData = {
       
            Case: formData?.Case,
            Client: formData?.Client,
            Advocate: formData?.Advocate,
            hearings: hearings.map((hearing) => ({
              title: hearing?.title,
              amount: parseFloat(hearing?.amount),
              notes: hearing?.notes,
            })),
            date: formData.date,
          
    };
    console.log("=======================", updatedInvoiceData)
    try {
      await updateApi(urls?.Invoice?.updateinvoice?.replace(":id", invoiceId), updatedInvoiceData);
      toast.success(Messages?.Invoice?.update_success);
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
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
        Update Invoice
      </Button>
    </Box>
  );
};

export default EditInvoiceForm;
