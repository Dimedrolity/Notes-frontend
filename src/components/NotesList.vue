<template>
    <div>
        <ul>
            <li v-for="note in notes" :key="note.id">
                {{ note.title }}+{{ note.content }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'NotesList',
        props: {
            msg: String,

            notes: {
                type: Array,
                required: true
            }
        },
    }
</script>

<style scoped>
</style>
