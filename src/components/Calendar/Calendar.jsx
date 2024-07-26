import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
const Calendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          margin: "1em",
          padding: "1em",
          backgroundColor: "white",
          borderRadius: "25px",
          boxShadow: "0px 30px 60px grey",
          "& .MuiPickersCalendarHeader-root": {
            backgroundColor: "#3754DB",
            borderRadius: "12px",
            color: "white"
          },
          "& .MuiSvgIcon-root": {
            color: "white"
          },
          "& .css-23p0if-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
            {
              backgroundColor: "#3754DB",
              border: "none",
              color: "white"
            }
        }}
      />
    </LocalizationProvider>
  );
};
export default Calendar;
