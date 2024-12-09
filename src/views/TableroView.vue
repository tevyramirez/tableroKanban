<script setup>
import {reactive, ref} from 'vue'
import InputNew from '../components/InputNew.vue'

let boards = reactive([{
    id: crypto.randomUUID(),
    name: 'Tablero 1 ',
    items: [
        {id: crypto.randomUUID(), name: 'Feature de archivos'},
        {id: crypto.randomUUID(), name: 'Item 2'},
        {id: crypto.randomUUID(), name: 'Item 3'},
    ],
},
])

function handleNewItem(text, board){
    console.log(text, board.id, board.name)
    board.items.push({
        id: crypto.randomUUID(),
        name: text
    })
}

function startDrag(evt, board, item){
    evt.dataTransfer.setData('text/plain', JSON.stringify({boardId:board.id, itemId:item.id}))

}

function onDrop(evt, dest){
    const {boardId, itemId} = JSON.parse(evt.dataTransfer.getData('text/plain'))

    console.log(boardId, itemId)
    const originBoard = boards.find(board => board.id === boardId);
    const originItem = originBoard.items.find(item => item.id === itemId);

    dest.items.push(originItem);
    originBoard.items = originBoard.items.filter(item => item.id !== itemId);
    console.log(originBoard.name)
}

function handleNewBoard(){
    const name = prompt('Nombre del tablero')
    boards.push({
        id: crypto.randomUUID(),
        name: name,
        items: []
    })
}

</script>

<template>
    <nav>
            <div>
                <a @click.prevent="handleNewBoard" href="#">Crear tablero</a>   
            </div>
    </nav>
    <div class="boards-container">
        <div class="boards">
            <div class="board" @drop="onDrop($event,board)" @dragover.prevent @dragenter.prevent v-for="board in boards" :key="board.id">
                <div>{{board.name}}</div>
                <InputNew @on-new-item="(text)  => handleNewItem(text,board)" />
                <div class="items">
                    <div class="item" draggable="true" @dragstart="startDrag($event, board, item)" v-for="item in board.items" :key="item.id">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>

 
</template>

<!-- Con scoped se aplican solo a los componentes -->
<style scoped>
.boards{
    display:flex;
    gap: 10px;
}

.board {
    background: #efefef;
    padding: 10px;

}
.items{
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
}
.item{
    background-color: white;
    padding: 10px;
}

</style>