type Note = {
  id: number
  content: string
}

type Props = {
  note: Note
  editingId: number | null
  editingContent: string
  setEditingContent: (v: string) => void
  startEdit: (note: Note) => void
  saveEdit: (id: number) => void
  cancelEdit: () => void
  deleteNote: (id: number) => void
}

export default function NoteItem({
  note,
  editingId,
  editingContent,
  setEditingContent,
  startEdit,
  saveEdit,
  cancelEdit,
  deleteNote,
}: Props) {
  const isEditing = editingId === note.id

  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm">

      {isEditing ? (
        <>
          <input
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            className="border p-2 w-full rounded mb-2"
          />

          <button onClick={() => saveEdit(note.id)} className="text-blue-500 mr-4">
            Save
          </button>

          <button onClick={cancelEdit} className="text-gray-500">
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className="mb-2">{note.content}</p>

          <button onClick={() => startEdit(note)} className="text-blue-500 mr-4">
            Edit
          </button>

          <button onClick={() => deleteNote(note.id)} className="text-red-500">
            Delete
          </button>
        </>
      )}

    </div>
  )
}