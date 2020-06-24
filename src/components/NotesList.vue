<template>
    <div>
        <ul>
            <li v-for="note in this.notes" :key="note.id">
                <span v-if="note.title != null">{{note.title}}</span>
                <span v-else>{{note.content}}</span>
                <button @click="deleteNote(note.id)">Х</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'NotesList',
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
            deleteNote(noteId) {
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

<style scoped>
</style>
