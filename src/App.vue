<template>
    <div id="app">
        <header>
            <h1>Заметки</h1>
        </header>

        <label>
            <input type="text" ref="searchInput" @input="showNotesContainsInputValue">
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
            async showNotes() {
                const response = await fetch("https://localhost:5001/api/notes", {
                    method: 'GET'
                });

                if (response.ok) {
                    this.notes = await response.json();
                }
            },
            deleteNoteWithId(noteId) {
                this.notes = this.notes.filter((note) => note.id !== noteId);

                fetch(`https://localhost:5001/api/notes/delete/${noteId}`, {
                    method: 'DELETE'
                });
            },
            async showNotesContainsInputValue() {
                const inputValue = this.$refs.searchInput.value;

                const response = await fetch(`https://localhost:5001/api/notes/contains/${inputValue}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    this.notes = await response.json();
                }
            },
        },
        mounted() {
            this.showNotes();
        },
    }
</script>

<style>
</style>
