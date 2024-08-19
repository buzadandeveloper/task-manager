import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={theme => ({
          margin: "1em",
          padding: "1em",
          backgroundColor: "white",
          borderRadius: "25px",
          boxShadow: "0px 1px 6px grey",
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
            },
          [theme.breakpoints.down("1650")]: {
            transform: "scale(0.9)",
            margin: "0.5em"
          },
          [theme.breakpoints.down("1550")]: {
            transform: "scale(0.95)",
            margin: "1.2em"
          },
          [theme.breakpoints.down("1360")]: {
            transform: "scale(0.9)",
            margin: "0em",
            "& .MuiPickersDay-root": {
              fontSize: "0.875rem"
            }
          },
          [theme.breakpoints.down("1251")]: {
            transform: "scale(0.80)",
            margin: "0.1em",
            "& .css-dplwbx-MuiPickersCalendarHeader-label": {
              fontSize: "1.2rem"
            }
          }
        })}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
