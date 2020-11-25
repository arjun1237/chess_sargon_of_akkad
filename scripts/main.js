window.addEventListener('load', createGame)

function createGame(){
    createBoard()
    placePieces()
}

function createBoard(){
    let board = document.querySelector('.board')
    let cells = []
    for(let i=0, k=8; i<8; i++, k--){
        for(let j=0; j<8; j++){
            let cell = document.createElement('div')
            if((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)){
                cell.classList.add('green-cell')
            }
            else{
                cell.classList.add('white-cell')
            }
            cell.setAttribute('data-pos', k + "" + (j+1))
            cell.setAttribute('data-occupied', k === 8 || k === 7 || k === 1 || k === 2)
            cells.push(cell)
        }
    }
    board.append(...cells)
}

function placePieces(){
    
}