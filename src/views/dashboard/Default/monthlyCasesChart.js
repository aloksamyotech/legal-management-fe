import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { getApi } from "core/APIs/ApiDocuments";
import { urls } from "core/Constant/Urls";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import dayjs from "dayjs";

const CasesPerMonthChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getApi(urls.Case.getallcase)
      .then((response) => {
        const cases = response.data;
        const monthData = Array(12).fill(0);
        const currentYear = dayjs().year();

        cases.forEach((caseItem) => {
          const caseMonth = dayjs(caseItem.Date).month();
          const caseYear = dayjs(caseItem.Date).year();
          if (caseYear === currentYear) {
            monthData[caseMonth] += 1;
          }
        });

        const formattedData = monthData.map((value, index) => ({
          month: dayjs().month(index).format("MMM"),
          value,
        }));

        const total = cases.length;
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching cases data:", error));
  }, []);

  return (
    <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Cases Per Month
          </Typography>
          <ArrowUpwardIcon fontSize="small" color="primary" />
        </Box>
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#888" tick={{ fill: "#888" }} />
            <Bar dataKey="value" fill="#2ecc71" barSize={10} radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CasesPerMonthChart;
