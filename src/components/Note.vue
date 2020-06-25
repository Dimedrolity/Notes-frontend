<template>
    <div>
        <button type="button" @click="emitDeleteOfThisNote()">Х</button>

        <label>
            <input type="text" placeholder="Введите заголовок заметки" :value="this.title"
                   ref="noteTitle">
        </label>

        <label>
            <textarea cols="30" rows="10"
                      placeholder="Введите содержимое заметки" ref="noteContent"
            >{{this.content}}</textarea>
        </label>


        <button v-if="this.id != null" type="button" @click="emitEditOfThisNote()">Сохранить</button>
        <button v-else type="button" @click="emitCreateOfThisNote">Создать</button>

        <span v-if="this.dateOfLastChange != null">{{this.dateOfLastChange}}</span>
    </div>
</template>

<script>
    export default {
        name: "Note",
        props: {
            id: {
                type: [Number, null],
                required: true,
            },
            title: {
                type: [String, null],
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            dateOfLastChange: {
                type: [String, null],
                required: true,
            },
        },
        methods: {
            emitDeleteOfThisNote() {
                this.$emit('deleteNoteWithId', this.id);
            },
            emitEditOfThisNote() {
                this.$emit('editNoteWithId', this.id, this.$refs.noteTitle.value, this.$refs.noteContent.value);
            },
            emitCreateOfThisNote() {
                this.$emit('createNote', this.$refs.noteTitle.value, this.$refs.noteContent.value);
            }
        }
    }
</script>

<style scoped>

</style>