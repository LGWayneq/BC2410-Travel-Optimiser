import { Card } from "@mui/material";
import { parseMinutes } from "dateTimeParser";

export default function FlightCard(props) {
    return (
        <Card sx={{ width: 'calc(100% - 60px)', padding: 2, margin: 2, backgroundColor: "#EEEEFF" }}>
            <h2 style={{ fontFamily: "Arial", fontWeight: 700, marginBottom: 20 }}>{props.flight.airline}</h2>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "row" }}>
                <div>
                    <h3 style={{ fontFamily: "Arial", fontWeight: 700, marginBottom: 20 }}>{props.flight.departingAirport}</h3>
                    <h4 style={{ fontFamily: "Arial", fontWeight: 700, marginBottom: 20 }}>{props.flight.departureDate.toString()}</h4>
                </div>
                <h3 style={{ alignSelf: "center", marginLeft: 30, marginRight: 30 }}>→</h3>
                <div>
                    <h3 style={{ fontFamily: "Arial", fontWeight: 700, marginBottom: 20 }}>{props.flight.arrivingAirport}</h3>
                    <h4 style={{ fontFamily: "Arial", fontWeight: 700, marginBottom: 20 }}>{props.flight.arrivalDate.toString()}</h4>
                </div>
            </div>
            <h4 style={{ fontFamily: "Arial", marginBottom: 20 }}>{parseMinutes(props.flight.duration)}</h4>
            <h4 style={{ fontFamily: "Arial", marginBottom: 20 }}>${props.flight.price}</h4>
        </Card>
    )
}