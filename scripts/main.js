import {Pawn, Rook, Queen, King, Knight, Bishop, currentPiece} from './pieces.js'


window.addEventListener('load', createGame)

let board = document.querySelector('.board')

function createGame(){
    createBoard()
    board.addEventListener('click', movePiece)
    startGame()
}

function movePiece(e){
    if(e.target.classList.contains('highlight')){
        e.stopPropagation()
        currentPiece.movePiece(...e.target.getAttribute('data-pos').split(''))
    }
}

function createBoard(){    
    let cells = []
    for(let i=0, k=8; i<8; i++, k--){
        for(let j=0; j<8; j++){
            let cell = document.createElement('div')
            if((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)){
                cell.classList.add('green-cell', 'cell')
            }
            else{
                cell.classList.add('white-cell', 'cell')
            }
            cell.setAttribute('data-pos', k + "" + (j+1))
            cell.setAttribute('data-occupied', k === 8 || k === 7 || k === 1 || k === 2)
            cells.push(cell)
        }
    }
    board.append(...cells)
}

function startGame(){
    let pieces = []
    addPieces("red")
    addPieces("black")
    placePieces()

    function addPieces(color){
        let row1 = color === "red" ? 1 : 8
        let row2 = color === "red" ? 2 : 7
        for(let i = 1; i <= 8; i++){
            pieces.push(new Pawn(row2, i, color))
        }
        pieces.push(new Knight(row1, 2, color))
        pieces.push(new Knight(row1, 7, color))

        pieces.push(new Rook(row1, 1, color))
        pieces.push(new Rook(row1, 8, color))

        pieces.push(new Bishop(row1, 3, color))
        pieces.push(new Bishop(row1, 6, color))

        pieces.push(new King(row1, color === "red" ? 5 : 4, color))
        pieces.push(new Queen(row1, color === "red" ? 4 : 5, color))
    }

    function placePieces(){
        pieces.forEach(piece => piece.placeItem())
    }
}