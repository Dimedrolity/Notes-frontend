<template>
    <ul>
        <li v-for="note in this.notes" :key="note.id" @click="emitSetCurrentNoteToNoteWithId(note.id)">
            <a>
                <span v-if="note.title != null">{{note.title}}</span>
                <span v-else>{{note.content}}</span>
            </a>
        </li>
    </ul>
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
            emitSetCurrentNoteToNoteWithId(noteId) {
                this.$emit('setCurrentNoteToNoteWithId', noteId);
            }
        }
    }
</script>

<style scoped>

</style>
