<template>
    <div>
        <ul>
            <li v-for="note in this.notes" :key="note.id">
                <span v-if="note.title != null">{{note.title}}</span>
                <span v-else>{{note.content}}</span>

                <button @click="emitDeleteOfNoteWithId(note.id)">Х</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'NotesList',
        props: {
            notes: {
                type: Array,
                required: true,
            }
        },
        methods: {
            emitDeleteOfNoteWithId(noteId) {
                this.$emit('deleteNoteWithId', noteId);
            },
        },
    }
</script>

<style scoped>
</style>
