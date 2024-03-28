import FlightCard from "./FlightCard";

export default function FlightComponent(props) {
    return (
        <div>
            {props.optimalFlight &&
                <FlightCard flight={props.optimalFlight} />
            }
            {props.flights && props.flights.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
            ))}
        </div>
    )
}