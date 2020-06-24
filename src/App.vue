<template>
    <div id="app">
        <header>
            <h1>Заметки</h1>
        </header>

        <label>
            <input type="text">
        </label>
        <NotesList :notes="notes" @deleteNoteWithId="deleteNoteWithId"/>
        <button>Создать заметку</button>

        <footer>Тестовое задание</footer>
    </div>
</template>

<script>
    import NotesList from './components/NotesList.vue'

    export default {
        name: 'App',
        components: {
            NotesList
        },
        data() {
            return {
                notes: []
            };
        },
        methods: {
            async setNotes() {
                const response = await fetch("https://localhost:5001/api/notes");

                if (response.ok) {
                    this.notes = await response.json();
                }
            },
            deleteNoteWithId(noteId) {
                this.notes = this.notes.filter((note) => note.id !== noteId);
                this.sendDeleteRequest(noteId);
            },
            sendDeleteRequest(noteId) {
                fetch(`https://localhost:5001/api/notes/delete/${noteId}`,
                    {
                        method: 'DELETE'
                    });
            }
        },
        mounted() {
            this.setNotes();
        },
    }
</script>

<style>
</style>
