import { useState, useEffect } from "react"
import NoteItem from "./NoteItem"

type Note = {
  id: number
  content: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState("")
  const [search, setSearch] = useState("")

  // 🌙 DARK MODE (persist)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("darkMode")
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("darkMode", JSON.stringify(dark))
  }, [dark])

  // ➕ ADD NOTE
  const addNote = () => {
    if (!newNote.trim()) return
    setNotes([...notes, { id: Date.now(), content: newNote }])
    setNewNote("")
  }

  // ⌨️ ENTER KEY
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addNote()
    }
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
    <div className="min-h-screen flex justify-center pt-20 bg-gray-100 dark:bg-gray-900 transition">

      <div className="w-full max-w-xl">

        {/* 🌙 TOGGLE */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 border rounded dark:text-white"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
          My Notes
        </h1>

        {/* 🔍 SEARCH */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="border rounded-lg p-2 w-full mb-3 dark:bg-gray-800 dark:text-white"
        />

        {/* 🧹 CLEAR ALL */}
        {notes.length > 0 && (
          <button
            onClick={clearAll}
            className="text-red-500 text-sm mb-3"
          >
            Clear all notes
          </button>
        )}

        {/* ➕ INPUT */}
        <div className="flex gap-2">
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a note..."
            className="border rounded-lg p-2 w-full dark:bg-gray-800 dark:text-white"
          />

          <button
            onClick={addNote}
            className="bg-blue-500 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        {filteredNotes.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No notes found
          </p>
        )}

        {/* 📋 LIST */}
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