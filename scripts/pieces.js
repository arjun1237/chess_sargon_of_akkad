let currentPiece = null
let allPieces = []

class Pieces{
    constructor(row, column, team){
        this.row = row
        this.column = column
        this.team = team
        this.killed = false
    }

    movePiece(row, col){
        // if(isChecked()){
        //     displayCheck()
        // }
        let piece = document.querySelector(`[data-posPiece='${this.row}${this.column}']`)
        document.querySelector(`[data-pos='${this.row}${this.column}']`).setAttribute('data-occupied', false)
        this.row = Number(row)
        this.column = Number(col)

        piece.setAttribute('data-posPiece', `${row}${col}`)
        let cell = document.querySelector(`[data-pos='${row}${col}']`)
        cell.append(piece)
        cell.setAttribute('data-occupied', true)
        removeHighlights()
    }

    getPosition(){
        return this.row + "" + this.column
    }
}

class Knight extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){
        let moves = []
        let row = this.row
        let col = this.column
        let pieces = document.querySelectorAll('.piece')

        if(row + 2 <= 8){
            // top top left
            if(col - 1 >= 1){
                getMoves(row + 2, col - 1, moves, pieces, this.team)
            }
            // top top right
            if(col + 1 <= 8){
                getMoves(row + 2, col + 1, moves, pieces, this.team)
            }
        }
        if(row + 1 <= 8){
            // top left left
            if(col - 2 >= 1){
                getMoves(row + 1, col - 2, moves, pieces, this.team)
            }
            // top right right
            if(col + 2 <= 8){
                getMoves(row + 1, col + 2, moves, pieces, this.team)
            }
        }
        if(row - 1 >= 1){
            // bottom left left
            if(col - 2 >= 1){
                getMoves(row - 1, col - 2, moves, pieces, this.team)
            }
            // bottom right right
            if(col + 2 <= 8){
                getMoves(row - 1, col + 2, moves, pieces, this.team)
            }
        }
        if(row - 2 >= 1){
            // bottom bottom left
            if(col - 1 >= 1){
                getMoves(row - 2, col - 1, moves, pieces, this.team)
            }
            // bottom bottom right
            if(col + 1 <= 8){
                getMoves(row - 2, col + 1, moves, pieces, this.team)
            }
        }
        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        let that = this
        item.classList.add("fas", "fa-chess-knight", this.team + "-team", "piece")
        item.setAttribute('data-posPiece', `${this.row}${this.column}`)
        item.addEventListener("click", function(){
            if(!item.parentElement.classList.contains('highlight')){
                highlightMoves(that.moves())
                currentPiece = that
            }
            else{
                killPiece(that.row, that.column)
                item.remove()
                currentPiece.movePiece(that.row, that.column)
                that = null
            }
        })
        elem.append(item)
    }
}

class Rook extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){
        let moves = []
        let pieces = document.querySelectorAll('.piece')

        // top moves
        for(let i = this.row + 1; i <= 8; i++){
            if(!getMoves(i, this.column, moves, pieces, this.team)) break
        }
        // bottom moves
        for(let i = this.row - 1; i >= 1; i--){
            if(!getMoves(i, this.column, moves, pieces, this.team)) break
        }
        // right moves
        for(let j = this.column + 1; j <= 8; j++){
            if(!getMoves(this.row, j, moves, pieces, this.team)) break
        }
        // left moves
        for(let j = this.column - 1; j >= 1; j--){
            if(!getMoves(this.row, j, moves, pieces, this.team)) break
        }

        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        let that = this
        item.classList.add("fas", "fa-chess-rook", this.team + "-team", "piece")
        item.setAttribute('data-posPiece', `${this.row}${this.column}`)
        item.addEventListener("click", function(){
            if(!item.parentElement.classList.contains('highlight')){
                highlightMoves(that.moves())
                currentPiece = that
            }
            else{
                killPiece(that.row, that.column)
                item.remove()
                currentPiece.movePiece(that.row, that.column)
                that = null
            }
        })
        elem.append(item)
    }
}

class Bishop extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){
        let moves = []
        let pieces = document.querySelectorAll('.piece')

        // top left moves
        for(let i = this.row + 1, j = this.column - 1; i <= 8 && j >= 1; i++, j--){
            if(!getMoves(i, j, moves, pieces, this.team)) break
        }
        // top right moves
        for(let i = this.row + 1, j = this.column + 1; i <= 8 && j <= 8; i++, j++){
            if(!getMoves(i, j, moves, pieces, this.team)) break
        }
        // bottom left moves
        for(let i = this.row - 1, j = this.column - 1; i >= 1 && j >= 1; i--, j--){
            if(!getMoves(i, j, moves, pieces, this.team)) break
        }
        // bottom right moves
        for(let i = this.row - 1, j = this.column + 1; i >= 1 && j <= 8; i--, j++){
            if(!getMoves(i, j, moves, pieces, this.team)) break
        }
        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        let that = this
        item.classList.add("fas", "fa-chess-bishop", this.team + "-team", "piece")
        item.setAttribute('data-posPiece', `${this.row}${this.column}`)
        item.addEventListener("click", function(){
            if(!item.parentElement.classList.contains('highlight')){
                highlightMoves(that.moves())
                currentPiece = that
            }
            else{
                killPiece(that.row, that.column)
                item.remove()
                currentPiece.movePiece(that.row, that.column)
                that = null
            }
        })  
        elem.append(item)
    }
}

class Queen extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){
        let moves = []
        let pieces = document.querySelectorAll('.piece')

        // top left moves
        for(let i = this.row + 1, j = this.column - 1; i <= 8 && j >= 1; i++, j--){
            if(!getMoves(i, j, moves, pieces, this.team)) break
        }
        // top right moves
        for(let i = this.row + 1, j = this.column + 1; i <= 8 && j <= 8; i++, j++){
            if(!getMoves(i, j, moves, pieces, this.team)) break
        }
        // bottom left moves
        for(let i = this.row - 1, j = this.column - 1; i >= 1 && j >= 1; i--, j--){
            if(!getMoves(i, j, moves, pieces, this.team)) break
        }
        // bottom right moves
        for(let i = this.row - 1, j = this.column + 1; i >= 1 && j <= 8; i--, j++){
            if(!getMoves(i, j, moves, pieces, this.team)) break
        }
        // top moves
        for(let i = this.row + 1; i <= 8; i++){
            if(!getMoves(i, this.column, moves, pieces, this.team)) break
        }
        // bottom moves
        for(let i = this.row - 1; i >= 1; i--){
            if(!getMoves(i, this.column, moves, pieces, this.team)) break
        }
        // right moves
        for(let j = this.column + 1; j <= 8; j++){
            if(!getMoves(this.row, j, moves, pieces, this.team)) break
        }
        // left moves
        for(let j = this.column - 1; j >= 1; j--){
            if(!getMoves(this.row, j, moves, pieces, this.team)) break
        }

        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        let that = this
        item.classList.add("fas", "fa-chess-queen", this.team + "-team", "piece")
        item.setAttribute('data-posPiece', `${this.row}${this.column}`)
        item.addEventListener("click", function(){
            if(!item.parentElement.classList.contains('highlight')){
                highlightMoves(that.moves())
                currentPiece = that
            }
            else{
                killPiece(that.row, that.column)
                item.remove()
                currentPiece.movePiece(that.row, that.column)
                that = null
            }
        })  
        elem.append(item)
    }
}

class King extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){
        let moves = []
        let pieces = document.querySelectorAll('.piece')

        if(this.row + 1 <= 8){
            // 1 forward
            getMoves(this.row + 1, this.column, moves, pieces, this.team)
            // top right
            this.column + 1 <= 8 && getMoves(this.row + 1, this.column + 1, moves, pieces, this.team)
            // top left
            this.column - 1 >= 1 && getMoves(this.row + 1, this.column - 1, moves, pieces, this.team)
        }
        // right
        this.column + 1 <= 8 && getMoves(this.row, this.column + 1, moves, pieces, this.team)
        //left
        this.column - 1 >= 1 && getMoves(this.row, this.column - 1, moves, pieces, this.team)

        if(this.row - 1 >= 1){
            // 1 backward
            getMoves(this.row - 1, this.column, moves, pieces, this.team)
            // bottom right
            this.column + 1 <= 8 && getMoves(this.row - 1, this.column + 1, moves, pieces, this.team)
            //bottom left
            this.column - 1 >= 1 && getMoves(this.row - 1, this.column - 1, moves, pieces, this.team)
        }

        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        let that = this
        item.classList.add("fas", "fa-chess-king", this.team + "-team", "piece")
        item.setAttribute('data-posPiece', `${this.row}${this.column}`)
        item.addEventListener("click", function(){
            if(!item.parentElement.classList.contains('highlight')){
                highlightMoves(that.moves())
                currentPiece = that
            }
            else{
                killPiece(that.row, that.column)
                item.remove()
                currentPiece.movePiece(that.row, that.column)
                that = null
            }
        })  
        elem.append(item)
    }
}

class Pawn extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
        this.firstMove = true
    }

    moves(){
        let red = this.team === "red"
        let moves = []
        let pieces = document.querySelectorAll('.piece')

        if((this.row + 1 <= 8 && red) || (this.row - 1 >= 0 && !red)){
            // 1 move forward
            var moveForward = getMoves(red ? this.row + 1 : this.row - 1, this.column, moves, pieces, this.team, true, true)
            
            // diagonal right
            this.column + 1 <= 8 && getMoves(red ? this.row + 1 : this.row - 1, this.column + 1, moves, pieces, this.team, true, false)

            // diagonal left
            this.column - 1 >= 1 && getMoves(red ? this.row + 1 : this.row - 1, this.column - 1, moves, pieces, this.team, true, false)
        }

        // 2 moves forward if it is first move
        moveForward && this.firstMove && getMoves(red ? this.row + 2 : this.row - 2, this.column, moves, pieces, this.team, true, true)

        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        let that = this
        item.classList.add("fas", "fa-chess-pawn", this.team + "-team", "piece")
        item.setAttribute('data-posPiece', `${this.row}${this.column}`)
        item.addEventListener("click", function(){
            if(!item.parentElement.classList.contains('highlight')){
                highlightMoves(that.moves())
                currentPiece = that
            }
            else{
                killPiece(that.row, that.column)
                item.remove()
                currentPiece.movePiece(that.row, that.column)
                that = null
            }
        })  
        elem.append(item)
    }

    movePiece(row, col){
        super.movePiece(row, col)
        this.firstMove = false
    }
}



// helper functions

function getMoves(i, j, moves, pieces, team, isPawn = false, movePawnForward = false){
    let pos = i + "" + j
    let cell = document.querySelector(`[data-pos='${pos}']`)
    let piece = [...pieces].filter(p => p.getAttribute('data-posPiece') === pos)
    let isPiece = piece.length > 0
    if(isPiece){
        var isTeam = piece[0].classList.contains(team + '-team')
    }
    let occupied = cell.getAttribute('data-occupied')
    if(occupied === "false" && !isPiece){
        if(isPawn && !movePawnForward) return
        moves.push(pos)
    }
    if(occupied === "true"){
        if(isPawn && movePawnForward) return
        !isTeam && moves.push(pos)
        return false
    }
    return true
}

function highlightMoves(moves){
    removeHighlights()
    for(let move of moves){
        let cell = document.querySelector(`[data-pos='${move}']`)
        cell.classList.add('highlight')
    }
}

function removeHighlights(){
    var highlights = document.getElementsByClassName('highlight');
    for(let el of [...highlights]){
        el.classList.remove('highlight')
    }
}

function killPiece(row, col){
    for(let piece of allPieces){
        if(row === piece.row && piece.column === col){
            piece.killed = true
            console.log(piece)
            return
        }
    }
}

function getAllMoves(){
    let team = currentPiece.team
    let moves = []
    allPieces.forEach(piece => {
        if(piece.team !== team && !piece.killed){
            moves.push(...piece.moves())
        }
    })
    return moves
}

function isChecked(){
    let team = currentPiece.team
    let king = allPieces.find(piece => piece.team === team && piece instanceof King)
    let kingPosition = king.getPosition()
    return getAllMoves().indexOf(kingPosition) !== -1
}

// function 

export {Pawn, Rook, Queen, King, Knight, Bishop, currentPiece, allPieces}