import { useState } from "react"
import NoteForm from "./NoteForm"
import NoteItem from "./NoteItem"

type Note = {
  id: number
  content: string
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  const setAndSave = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setAndSave] as const
}

export default function Notes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", [])
  const [newNote, setNewNote] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState("")
  const [search, setSearch] = useState("")

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

  const cancelEdit = () => {
    setEditingId(null)
    setEditingContent("")
  }

  const clearAll = () => {
    if (!confirm("Delete all notes?")) return
    setNotes([])
  }

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-20">
      <div className="w-full max-w-xl">

        <h1 className="text-2xl font-bold mb-4 text-center">My Notes</h1>

        {/* SEARCH */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="border rounded-lg p-2 w-full mb-3"
        />

        {/* CLEAR ALL */}
        {notes.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-red-500 mb-4"
          >
            Clear all notes
          </button>
        )}

        <NoteForm
          newNote={newNote}
          setNewNote={setNewNote}
          addNote={addNote}
        />

        {/* EMPTY STATE */}
        {filteredNotes.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No notes found
          </p>
        )}

        <div className="space-y-3 mt-4">
          {filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              editingId={editingId}
              editingContent={editingContent}
              setEditingContent={setEditingContent}
              startEdit={startEdit}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              deleteNote={deleteNote}
              search={search}
            />
          ))}
        </div>

      </div>
    </div>
  )
}