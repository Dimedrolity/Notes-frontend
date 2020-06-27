<template>
    <div>
        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <button type="button" class="button is-danger is-outlined is-rounded"
                        @click="emitDeleteOfThisNote()">Удалить заметку
                </button>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <input type="text" placeholder="Введите заголовок заметки" class="input"
                       :value="this.title" ref="noteTitle">
            </div>
        </div>

        <div class="field">
            <div class="control">
                <textarea placeholder="Введите содержимое заметки" class="textarea"
                          :value="this.content" ref="noteContent"></textarea>
            </div>
        </div>

        <div class="field jcsb">
            <div class="control">
                <span v-if="this.dateOfLastChange != null">{{this.dateOfLastChange}}</span>
            </div>
            <div class="control">
                <button type="button" class="button is-success is-rounded"
                        @click="emitSaveOfThisNote">Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Note",
        props: {
            id: {
                validator: prop => typeof prop === 'number' || prop === null,
                required: true,
            },
            title: {
                validator: prop => typeof prop === 'string' || prop === null,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            dateOfLastChange: {
                validator: prop => typeof prop === 'string' || prop === null,
                required: true,
            },
        },
        methods: {
            emitDeleteOfThisNote() {
                this.$emit('deleteNoteWithId', this.id);
            },

            emitSaveOfThisNote() {
                if (this.$refs.noteContent.value === '') {
                    alert('Введите содержимое заметки');
                } else {
                    if (this.id !== null)
                        this.emitEditOfThisNote();
                    else
                        this.emitCreateOfThisNote();
                }
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
    .jcsb {
        display: flex;
        justify-content: space-between;
    }
</style>