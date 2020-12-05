
class Pieces{
    constructor(row, column, team){
        this.row = row
        this.column = column
        this.team = team
        this.killed = false
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
        let pieces = document.querySelectorAll('pieces')

        if(row + 2 <= 8){
            // top top left
            if(col - 1 >= 1){
                getMoves(row + 2, col - 1, moves, pieces)
            }
            // top top right
            if(col + 1 <= 8){
                getMoves(row + 2, col + 1, moves, pieces)
            }
        }
        if(row + 1 <= 8){
            // top left left
            if(col - 2 >= 1){
                getMoves(row + 1, col - 2, moves, pieces)
            }
            // top right right
            if(col + 2 <= 8){
                getMoves(row + 1, col + 2, moves, pieces)
            }
        }
        if(row - 1 >= 1){
            // bottom left left
            if(col - 2 >= 1){
                getMoves(row - 1, col - 2, moves, pieces)
            }
            // bottom right right
            if(col + 2 <= 8){
                getMoves(row - 1, col + 2, moves, pieces)
            }
        }
        if(row - 2 >= 1){
            // bottom bottom left
            if(col - 1 >= 1){
                getMoves(row - 2, col - 1, moves, pieces)
            }
            // bottom bottom right
            if(col + 1 <= 8){
                getMoves(row - 2, col + 1, moves, pieces)
            }
        }
        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        item.classList.add("fas", "fa-chess-knight", this.team + "-team", "piece")
        elem.append(item)
    }
}

class Rook extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){
        let moves = []
        let pieces = document.querySelectorAll('pieces')

        // top moves
        for(let i = this.row + 1; i <= 8; i++){
            if(!getMoves(i, this.column, moves, pieces)) break
        }
        // bottom moves
        for(let i = this.row - 1; i >= 1; i--){
            if(!getMoves(i, this.column, moves, pieces)) break
        }
        // right moves
        for(let j = this.column + 1; j <= 8; j++){
            if(!getMoves(this.row, j, moves, pieces)) break
        }
        // left moves
        for(let j = this.column - 1; j >= 1; j--){
            if(!getMoves(this.row, j, moves, pieces)) break
        }

        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        item.classList.add("fas", "fa-chess-rook", this.team + "-team", "piece")
        elem.append(item)
    }
}

class Bishop extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){
        let moves = []
        let pieces = document.querySelectorAll('pieces')

        // top left moves
        for(let i = this.row + 1, j = this.column - 1; i <= 8 && j >= 1; i++, j--){
            if(!getMoves(i, j, moves, pieces)) break
        }
        // top right moves
        for(let i = this.row + 1, j = this.column + 1; i <= 8 && j <= 8; i++, j++){
            if(!getMoves(i, j, moves, pieces)) break
        }
        // bottom left moves
        for(let i = this.row - 1, j = this.column - 1; i >= 1 && j >= 1; i--, j--){
            if(!getMoves(i, j, moves, pieces)) break
        }
        // bottom right moves
        for(let i = this.row - 1, j = this.column + 1; i >= 1 && j <= 8; i--, j++){
            if(!getMoves(i, j, moves, pieces)) break
        }
        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        item.classList.add("fas", "fa-chess-bishop", this.team + "-team", "piece")
        elem.append(item)
    }
}

class Queen extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){
        let moves = []
        let pieces = document.querySelectorAll('pieces')

        // top left moves
        for(let i = this.row + 1, j = this.column - 1; i <= 8 && j >= 1; i++, j--){
            if(!getMoves(i, j, moves, pieces)) break
        }
        // top right moves
        for(let i = this.row + 1, j = this.column + 1; i <= 8 && j <= 8; i++, j++){
            if(!getMoves(i, j, moves, pieces)) break
        }
        // bottom left moves
        for(let i = this.row - 1, j = this.column - 1; i >= 1 && j >= 1; i--, j--){
            if(!getMoves(i, j, moves, pieces)) break
        }
        // bottom right moves
        for(let i = this.row - 1, j = this.column + 1; i >= 1 && j <= 8; i--, j++){
            if(!getMoves(i, j, moves, pieces)) break
        }
        // top moves
        for(let i = this.row + 1; i <= 8; i++){
            if(!getMoves(i, this.column, moves, pieces)) break
        }
        // bottom moves
        for(let i = this.row - 1; i >= 1; i--){
            if(!getMoves(i, this.column, moves, pieces)) break
        }
        // right moves
        for(let j = this.column + 1; j <= 8; j++){
            if(!getMoves(this.row, j, moves, pieces)) break
        }
        // left moves
        for(let j = this.column - 1; j >= 1; j--){
            if(!getMoves(this.row, j, moves, pieces)) break
        }

        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        item.classList.add("fas", "fa-chess-queen", this.team + "-team", "piece")
        elem.append(item)
    }
}

class King extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){
        let moves = []
        let pieces = document.querySelector('pieces')

        if(this.row + 1 <= 8){
            // 1 forward
            getMoves(this.row + 1, this.column, moves, pieces)
            // top right
            this.column + 1 <= 8 && getMoves(this.row + 1, this.column + 1, moves, pieces)
            // top left
            this.column - 1 >= 1 && getMoves(this.row + 1, this.column - 1, moves, pieces)
        }
        // right
        this.column + 1 <= 8 && getMoves(this.row, this.column + 1, moves, pieces)
        //left
        this.column - 1 >= 1 && getMoves(this.row, this.column - 1, moves, pieces)

        if(this.row - 1 >= 1){
            // 1 backward
            getMoves(this.row - 1, this.column, moves, pieces)
            // bottom right
            this.column + 1 <= 8 && getMoves(this.row - 1, this.column + 1, moves, pieces)
            //bottom left
            this.column - 1 >= 1 && getMoves(this.row - 1, this.column - 1, moves, pieces)
        }

        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        item.classList.add("fas", "fa-chess-king", this.team + "-team", "piece")
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
        let pieces = document.querySelectorAll('pieces')

        // 2 moves forward if it is first move
        this.firstMove && getMoves(red ? this.row + 2 : this.row - 2, this.column, moves, pieces)

        if((this.row + 1 <= 8 && red) || (this.row - 1 >= 0 && !red)){
            // 1 move forward
            getMoves(red ? this.row + 1 : this.row - 1, this.column, moves, pieces)
            
            // diagonal right
            this.column + 1 <= 8 && getMoves(red ? this.row + 1 : this.row - 1, this.column + 1, moves, pieces)

            // diagonal left
            this.column - 1 >= 1 && getMoves(red ? this.row + 1 : this.row - 1, this.column - 1, moves, pieces)
        }

        return moves
    }

    placeItem(){
        let elem = document.querySelector(`[data-pos='${this.row}${this.column}']`)
        let item = document.createElement('i')
        item.classList.add("fas", "fa-chess-pawn", this.team + "-team", "piece")
        elem.append(item)
    }
}



// helper functions

function getMoves(i, j, moves, pieces){
    let pos = i + "" + j
    let cell = document.querySelector(`[data-pos = ${pos}]`)
    let piece = pieces.filter(p => p.getAttribute('data-pos') === pos)
    let isPiece = piece.length > 0
    let isTeam = false
    if(isPiece){
        isTeam = piece[0].getAttribute('data-team') === team
    }
    let occupied = cell.getAttribute('data-occupied')
    if(occupied === "false" && !isPiece){
        moves.push(pos)
    }
    if(occupied === "true"){
        if(!isTeam) moves.push(pos)
        return false
    }
    return true
}

export {Pawn, Rook, Queen, King, Knight, Bishop}