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
import RequestInputComponent from "./components/RequestInputComponent";
import SectionHeading from "components/SectionHeading";
import CheckboxInput from "components/CheckboxInput";

const destinations = [
  "Tokyo",
  "Seoul",
  "Beijing",
  "Taipei",
  "Ho Chi Minh",
]

const cabinClasses = [
  "Economy",
  "Business",
  "First Class",
]

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [budget, setBudget] = useState();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [crowdPreference, setCrowdPreference] = useState(5);
  const [cabinClass, setCabinClass] = useState();
  const [minLegroom, setMinLegroom] = useState();
  const [noOvernight, setNoOvernight] = useState(false);
  const [noLayovers, setNoLayovers] = useState(false);
  const [modelReady, setModelReady] = useState(false);
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

  function handleCabinClassChange(event) {
    setCabinClass(event.target.value);
  }

  function handleMinLegroomChange(event) {
    setMinLegroom(event.target.value);
  }

  function handleNoOvernightChange(event) {
    setNoOvernight(event.target.checked);
  }

  function handleNoLayoversChange(event) {
    setNoLayovers(event.target.checked);
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
    }).then((res, status) => {
      setModelReady(true);
      setLoading(false);
    });
  }

  return (
    <>
      {loading && <Loading />}
      <div style={{ display: "flex", margin: -8, height: '100vh' }}>
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

          <SectionHeading>Flight Preferences</SectionHeading>
          <DropdownSelect
            label="Cabin Class"
            value={cabinClass}
            onChange={handleCabinClassChange}
            options={cabinClasses}
          />
          <TextInput
            label="Min. Legroom (inches)"
            value={minLegroom}
            onChange={handleMinLegroomChange}
            type="number"
          />
          <CheckboxInput
            label="No overnight flights"
            value={noOvernight}
            onChange={handleNoOvernightChange}
          />
          <CheckboxInput
            label="No layovers"
            value={noLayovers}
            onChange={handleNoLayoversChange}
          />

          <SectionHeading>Attraction Preferences</SectionHeading>

          <SectionHeading>Hotel Preferences</SectionHeading>

          <SectionHeading>Route Preferences</SectionHeading>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOnClickOptimise}>
            Optimise
          </Button>
        </div>

        <div style={{ flex: 2, height: "100%" }}>
          <ModelNavbar
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab} />
          <div style={{ height: "calc(100% - 60px)" }}>
            {modelReady
              ? <>
                {selectedTab === 0 &&
                  <FlightComponent />
                }
                {selectedTab === 1 &&
                  <AttractionComponent />
                }
                {selectedTab === 2 &&
                  <HotelComponent />
                }
                {selectedTab === 3 &&
                  <RouteComponent
                    markers={[{
                      lat: 1.3521,
                      lng: 103.8198
                    }]}
                    paths={[[
                      { lat: 1.3521, lng: 103.8198 },
                      { lat: 1.3522, lng: 103.8198 },
                      { lat: 1.3523, lng: 103.8198 },
                    ]]} />
                }
              </>
              : <RequestInputComponent />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
