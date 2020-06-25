<template>
    <div id="app">
        <header>
            <h1>Заметки</h1>
        </header>

        <label>
            <input type="text" ref="searchInput"
                   @input="filterNotesByContainsInputValue">
        </label>
        <button @click="setCurrentNoteToEmptyNote">Создать заметку</button>
        <NotesList :notes="notes" @setCurrentNoteToNoteWithId="setCurrentNoteToNoteWithId"/>

        <Note v-if="this.isCurrentNoteInitialized" :id="this.currentNote.id" :content="this.currentNote.content"
              :title="this.currentNote.title" :date-of-last-change="this.currentNote.dateOfLastChange"
              @deleteNoteWithId="deleteNoteWithId"
              @editNoteWithId="editNoteWithId"
              @createNote="createNote"/>

        <footer>Тестовое задание</footer>
    </div>
</template>

<script>
    import NotesList from './components/NotesList.vue'
    import Note from './components/Note.vue'

    export default {
        name: 'App',
        components: {
            NotesList,
            Note
        },
        data() {
            return {
                notes: [],
                currentNote: {},
                isCurrentNoteInitialized: false,
            };
        },
        mounted() {
            this.initializeNotes();
        },
        methods: {
            async initializeNotes() {
                const response = await fetch("https://localhost:5001/api/notes", {
                    method: 'GET'
                });

                if (response.ok) {
                    this.notes = await response.json();

                    if (this.notes.length > 0)
                        this.currentNote = this.notes[0];
                    else
                        this.setCurrentNoteToEmptyNote();

                    this.isCurrentNoteInitialized = true;
                }
            },

            async deleteNoteWithId(noteId) {
                const response = await fetch(`https://localhost:5001/api/notes/delete/${noteId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    this.initializeNotes();
                }
            },

            async filterNotesByContainsInputValue() {
                const inputValue = this.$refs.searchInput.value;

                const response = await fetch(`https://localhost:5001/api/notes/contains/${inputValue}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    this.notes = await response.json();
                }
            },

            async editNoteWithId(noteId, noteTitle, noteContent) {
                const formData = new FormData();
                formData.append('Id', noteId);
                formData.append('Title', noteTitle);
                formData.append('Content', noteContent);

                const response = await fetch(`https://localhost:5001/api/notes/change`, {
                    method: 'PUT',
                    body: formData
                });

                if (response.ok) {
                    this.initializeNotes();
                }
            },

            async createNote(noteTitle, noteContent) {
                const formData = new FormData();
                formData.append('Title', noteTitle);
                formData.append('Content', noteContent);

                const response = await fetch(`https://localhost:5001/api/notes/create`, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.initializeNotes();
                }
            },

            setCurrentNoteToEmptyNote() {
                this.currentNote = {title: '', content: ''};
            },

            setCurrentNoteToNoteWithId(noteId) {
                this.currentNote = this.notes.find(note => note.id === noteId);
            }
        }
    }
</script>

<style>
</style>
