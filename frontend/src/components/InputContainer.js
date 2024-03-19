export default function InputContainer(props) {
    return (
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 20, ...props.style }}>
            <label style={{ fontFamily:"Arial", fontWeight: 700, marginBottom: 10 }}>{props.label}</label>
            {props.children}
        </div>
    )
}