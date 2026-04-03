type Props = {
  newNote: string
  setNewNote: (v: string) => void
  addNote: (e: React.FormEvent) => void
}

export default function NoteForm({ newNote, setNewNote, addNote }: Props) {
  return (
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
  )
}