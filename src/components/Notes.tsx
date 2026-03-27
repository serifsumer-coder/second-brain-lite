import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Note } from '../types';
import { Plus, Trash2, LogOut } from 'lucide-react';

export const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching notes:', error);
    else setNotes(data || []);
    setLoading(false);
  };

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('notes')
      .insert([{ content: newNote, user_id: user.id }]);

    if (error) console.error('Error adding note:', error);
    else {
      setNewNote('');
      fetchNotes();
    }
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) console.error('Error deleting note:', error);
    else fetchNotes();
  };

  const handleSignOut = () => supabase.auth.signOut();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      <form onSubmit={addNote} className="mb-8 flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note..."
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={24} />
        </button>
      </form>

      {loading ? (
        <div className="text-center text-gray-500">Loading notes...</div>
      ) : (
        <div className="space-y-4">
          {notes.length === 0 ? (
            <p className="text-center text-gray-500 italic">No notes yet. Add one above!</p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex justify-between items-start group hover:shadow-md transition"
              >
                <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
