<template>
    <div id="app">

        <header class="box">
            <h1 class="title is-2 has-text-centered">Заметки</h1>
        </header>

        <main class="section">
            <div class="columns is-centered">

                <div class="column is-one-quarter">
                    <div class="field is-grouped">
                        <div class="control is-expanded has-icons-right">
                            <input type="text" placeholder="Найти" class="input is-rounded"
                                   ref="searchInput"
                                   @input="filterNotesByContainsInputValue">

                            <span class="icon is-small is-right">
                                <font-awesome-icon :icon="['fa', 'search']"/>
                            </span>
                        </div>

                        <div class="control">
                            <button type="button" class="button is-info is-rounded"
                                    @click="setCurrentNoteToEmptyNote">Создать
                            </button>
                        </div>
                    </div>
                    <aside class="field menu">
                        <div class="control">
                            <p class="menu-label">Ваши заметки</p>

                        </div>
                        <div class="control">
                            <NotesList class="menu-list" :notes="notes"
                                       @setCurrentNoteToNoteWithId="setCurrentNoteToNoteWithId"/>
                        </div>

                    </aside>
                </div>

                <Note class="column is-one-third"
                      v-if="this.isCurrentNoteInitialized"
                      :id="this.currentNote.id"
                      :content="this.currentNote.content"
                      :title="this.currentNote.title"
                      :date-of-last-change="this.currentNote.dateOfLastChange"
                      @deleteNoteWithId="deleteNoteWithId"
                      @editNoteWithId="editNoteWithId"
                      @createNote="createNote"/>
            </div>
        </main>

        <footer class="footer has-text-centered">
            <p>Тестовое задание на практику от компании VR Supersonic. 2020</p>
            <p>Код тут -> <a href="https://github.com/Dimedrolity/Notes" target="_blank">github</a></p>
        </footer>
    </div>
</template>

<script>
    import NotesList from './components/NotesList.vue'
    import Note from './components/Note.vue'

    export default {
        name: 'App',
        components: {
            NotesList,
            Note
        },
        data() {
            return {
                notes: [],
                currentNote: {},
                isCurrentNoteInitialized: false,
            };
        },
        mounted() {
            this.initializeNotes();
        },
        methods: {
            async initializeNotes() {
                const response = await fetch("https://localhost:5001/api/notes", {
                    method: 'GET'
                });

                if (response.ok) {
                    this.notes = await response.json();

                    this.initializeCurrentNote();
                }
            },

            async deleteNoteWithId(noteId) {
                const response = await fetch(`https://localhost:5001/api/notes/delete/${noteId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    this.initializeNotes();
                }
            },

            async filterNotesByContainsInputValue() {
                const inputValue = this.$refs.searchInput.value;

                const response = await fetch(`https://localhost:5001/api/notes/contains/${inputValue}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    this.notes = await response.json();

                    this.initializeCurrentNote();
                }
            },

            async editNoteWithId(noteId, noteTitle, noteContent) {
                const formData = new FormData();
                formData.append('Id', noteId);
                formData.append('Title', noteTitle);
                formData.append('Content', noteContent);

                const response = await fetch(`https://localhost:5001/api/notes/edit`, {
                    method: 'PUT',
                    body: formData
                });

                if (response.ok) {
                    this.initializeNotes();
                }
            },

            async createNote(noteTitle, noteContent) {
                const formData = new FormData();
                formData.append('Title', noteTitle);
                formData.append('Content', noteContent);

                const response = await fetch(`https://localhost:5001/api/notes/create`, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.initializeNotes();
                }
            },

            setCurrentNoteToEmptyNote() {
                this.currentNote = {id: null, title: '', content: '', dateOfLastChange: null};
            },

            setCurrentNoteToNoteWithId(noteId) {
                this.currentNote = this.notes.find(note => note.id === noteId);
            },

            initializeCurrentNote() {
                if (this.notes.length > 0)
                    this.currentNote = this.notes[0];
                else
                    this.setCurrentNoteToEmptyNote();

                this.isCurrentNoteInitialized = true;
            }
        }
    }
</script>

<style scoped>

</style>
