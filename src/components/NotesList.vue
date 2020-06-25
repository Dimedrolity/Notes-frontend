<template>
    <div>
        <ul>
            <li v-for="note in this.notes" :key="note.id">
                <span v-if="note.title != null">{{note.title}}</span>
                <span v-else>{{note.content}}</span>
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
    }
</script>

<style scoped>
</style>
