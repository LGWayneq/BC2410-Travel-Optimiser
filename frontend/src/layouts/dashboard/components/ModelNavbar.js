const NAVBAR_TABS = [
    "Flight",
    "Attractions",
    "Hotel",
    "Routes"
]

export default function ModelNavbar(props) {
    function handleNavbarClick(index) {
        props.setSelectedTab(index);
    }

    return (
        <div style={{ display: "flex" }}>
            {NAVBAR_TABS.map((tab, index) => (
                <div
                    key={index}
                    style={{ flex: 1, padding: 20, cursor: "pointer", backgroundColor: props.selectedTab === index && "#bac5d6" }}
                    onClick={() => handleNavbarClick(index)}>
                    <b style={{ fontFamily: "Arial", textAlign: "center" }}>
                        {tab}
                    </b>
                </div>
            ))}
        </div>
    )
}