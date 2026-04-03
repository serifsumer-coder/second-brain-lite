import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const { data } = await supabase.from("notes").select("*");
    setNotes(data || []);
  }

  async function addNote(e: any) {
    e.preventDefault();
    if (!newNote.trim()) return;

    await supabase.from("notes").insert([{ content: newNote }]);
    setNewNote("");
    fetchNotes();
  }

  async function deleteNote(id: string) {
    await supabase.from("notes").delete().eq("id", id);
    fetchNotes();
  }

  async function updateNote(id: string) {
    await supabase
      .from("notes")
      .update({ content: editingContent })
      .eq("id", id);

    setEditingId(null);
    fetchNotes();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2>Notes</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {notes.map((note: any) => {
  const isEditing = String(editingId) === String(note.id)

  return (
    <div
      key={note.id}
      className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex justify-between items-start"
    >
      {isEditing ? (
        <div className="flex-1">
          <input
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            className="border p-1 w-full"
          />
          <button onClick={() => updateNote(note.id)}>
            Save
          </button>
        </div>
      ) : (
        <p
          <div
  onClick={() => {
    setEditingId(note.id)
    setEditingContent(note.content)
  }}
  className="flex-1 cursor-pointer"
>
  <p>{note.content}</p>
</div>
      )}

      <button onClick={() => deleteNote(note.id)}>
        Delete
      </button>
    </div>
  )
})}

    </div>
  );
}