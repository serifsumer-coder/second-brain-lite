import { useState } from "react"

type Note = {
  id: number
  content: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState("")

  const addNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    setNotes([...notes, { id: Date.now(), content: newNote }])
    setNewNote("")
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const updateNote = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content: editingContent } : note
      )
    )
    setEditingId(null)
    setEditingContent("")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-20">
      <div className="w-full max-w-xl">

        <h1 className="text-2xl font-bold mb-6 text-center">My Notes</h1>

        <form onSubmit={addNote} className="flex gap-2 mb-6">
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="border rounded-lg p-2 w-full"
            placeholder="Write a note..."
          />
          <button className="bg-blue-500 text-white px-4 rounded-lg">
            Add
          </button>
        </form>

        <div className="space-y-3">
          {notes.map((note) => {
            const isEditing = editingId === note.id

            return (
              <div
                key={note.id}
                className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex justify-between items-start"
              >

                {/* EDIT MODE */}
                {isEditing ? (
                  <div className="flex-1">
                    <input
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="border p-2 w-full rounded mb-2"
                    />
                    <button
                      onClick={() => updateNote(note.id)}
                      className="text-blue-500"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  /* VIEW MODE */
                  <div
                    onClick={() => {
                      setEditingId(note.id)
                      setEditingContent(note.content)
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    {note.content}
                  </div>
                )}

                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 ml-4"
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}