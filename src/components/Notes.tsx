import { useState, useEffect } from "react"

type Note = {
  id: number
  content: string
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

export default function Notes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", [])
  const [newNote, setNewNote] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState("")
  const [loaded, setLoaded] = useState(false)

  // 🔹 FAKE LOADING (hissettiriyoruz)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 300)
  }, [])

  const addNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    setNotes([...notes, { id: Date.now(), content: newNote }])
    setNewNote("")
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id))
  }

  const startEdit = (note: Note) => {
    setEditingId(note.id)
    setEditingContent(note.content)
  }

  const saveEdit = (id: number) => {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, content: editingContent } : n
      )
    )
    setEditingId(null)
    setEditingContent("")
  }

  // 🔥 LOADING EKRANI
  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
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
          />
          <button className="bg-blue-500 text-white px-4 rounded-lg">
            Add
          </button>
        </form>

        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-white border rounded-xl shadow-sm"
            >

              {editingId === note.id ? (
                <>
                  <input
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="border p-2 w-full rounded mb-2"
                  />

                  <button
                    onClick={() => saveEdit(note.id)}
                    className="text-blue-500 mr-4"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-2">{note.content}</p>

                  <button
                    onClick={() => startEdit(note)}
                    className="text-blue-500 mr-4"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}