import { useEffect, useState } from "react";
import { get } from "api/api";
import Loading from "components/Loading";
import DropdownSelect from "components/DropdownSelect";
import TextInput from "components/TextInput";
import InputAdornment from "@mui/material/InputAdornment";
import DateSelect from "components/DateSelect";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import ModelNavbar from "./components/ModelNavbar";
import FlightComponent from "./components/FlightComponent";
import AttractionComponent from "./components/AttractionComponent";
import HotelComponent from "./components/HotelComponent";
import RouteComponent from "./components/RouteComponent";
import SliderInput from "components/SliderInput";

const destinations = [
  "Tokyo",
  "New York",
  "Seoul"
]

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [budget, setBudget] = useState();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [crowdPreference, setCrowdPreference] = useState(5);
  const [selectedTab, setSelectedTab] = useState();

  function handleDestinationChange(event) {
    setDestination(event.target.value);
  }

  function handleBudgetChange(event) {
    setBudget(event.target.value);
  }

  function handleStartDateChange(date) {
    setStartDate(date);
  }

  function handleEndDateChange(date) {
    setEndDate(date);
  }

  function handleCrowdPreferenceChange(event, value) {
    setCrowdPreference(value);
  }

  function handleOnClickOptimise() {
    setLoading(true);
    get("/optimise", {
      destination,
      budget,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD")
    }).then(() => {
      setLoading(false);
    });
  }

  return (
    <>
      {loading && <Loading />}
      <div style={{ display: "flex", margin: -8 }}>
        <div style={{ flex: 1, padding: 20 }}>
          <DropdownSelect
            label="Destination"
            value={destination}
            onChange={handleDestinationChange}
            options={destinations}
          />
          <TextInput
            label="Budget"
            value={budget}
            onChange={handleBudgetChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
          />
          <div style={{ display: "flex" }}>
            <DateSelect
              style={{ marginRight: 20 }}
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange} />
            <DateSelect
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange} />
          </div>
          <SliderInput
            label="Crowd"
            value={crowdPreference}
            onChange={handleCrowdPreferenceChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnClickOptimise}>
            Optimise
          </Button>
        </div>

        <div style={{ flex: 2 }}>
          <ModelNavbar
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab} />
          {selectedTab === 0 && <FlightComponent />}
          {selectedTab === 1 && <AttractionComponent />}
          {selectedTab === 2 && <HotelComponent />}
          {selectedTab === 3 && <RouteComponent />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
