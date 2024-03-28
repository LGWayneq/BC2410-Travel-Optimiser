export default function InputContainer(props) {
    return (
        <>
            {props.flexDirection == "row"
                ? <div style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', ...props.style }}>
                    <label style={{ fontFamily: "Arial", fontWeight: 700, }}>{props.label}</label>
                    {props.children}
                </div>
                : <div style={{ display: "flex", flexDirection: "column", marginBottom: 20, ...props.style }}>
                    <label style={{ fontFamily: "Arial", fontWeight: 700, marginBottom: 10 }}>{props.label}</label>
                    {props.children}
                </div>
            }
        </>
    )
}