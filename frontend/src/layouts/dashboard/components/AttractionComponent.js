import MapComponent from "components/MapComponent"

export default function AttractionComponent(props) {
    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <MapComponent {...props} />
        </div>
    )
}