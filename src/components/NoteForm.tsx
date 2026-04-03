type Props = {
  newNote: string
  setNewNote: (v: string) => void
  addNote: (e: React.FormEvent) => void
}

export default function NoteForm({ newNote, setNewNote, addNote }: Props) {
  return (
    <div className="flex gap-2">
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write a note..."
        className="border rounded-lg p-2 w-full dark:bg-gray-800 dark:text-white"
      />

      <button
        onClick={(e) => addNote(e as any)}
        className="bg-blue-500 text-white px-4 rounded-lg"
      >
        Add
      </button>
    </div>
  )
}