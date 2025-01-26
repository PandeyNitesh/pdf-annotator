const RightPane = () => {
    const handleDragStart = (e, text) => {
        e.dataTransfer.setData("text/plain", text);
    };

    return (
        <div style={{ padding: "10px", border: "1px solid black" }}>
            <h3>Drag and drop anywhere on pdf</h3>
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, "Input any text")}
                style={{
                    marginBottom: "10px",
                    padding: "5px",
                    backgroundColor: "lightblue",
                    cursor: "grab",
                }}
            >
                Sample Text
            </div>
        </div>
    );
};

export default RightPane;
