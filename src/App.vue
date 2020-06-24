<template>
    <div id="app">
        <header>
            <h1>Заметки</h1>
        </header>

        <label>
            <input type="text">
        </label>
        <NotesList :notes="notes"/>
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
            }
        },
        mounted() {
            this.setNotes();
        },
    }
</script>

<style>
</style>
