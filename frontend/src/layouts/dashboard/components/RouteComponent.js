import MapComponent from '../../../components/MapComponent';

export default function RouteComponent(props) {
    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <MapComponent {...props} />
        </div>
    )
}