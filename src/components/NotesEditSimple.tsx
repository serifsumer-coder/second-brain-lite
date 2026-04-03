import { useState } from "react";

export default function NotesEditSimple() {
  const [note, setNote] = useState("Hello world");
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Edit Test</h2>

      {editing ? (
        <>
          <input
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
          />
          <button
            onClick={() => {
              setNote(temp);
              setEditing(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <p
          onClick={() => {
            setEditing(true);
            setTemp(note);
          }}
          style={{ cursor: "pointer" }}
        >
          {note}
        </p>
      )}
    </div>
  );
}