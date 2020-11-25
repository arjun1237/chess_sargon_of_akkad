const columPos = "ABCDEFGH"

class Pieces{
    constructor(row, column, team, team){
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

        if(row + 2 <= 8){
            // top top left
            if(col - 1 >= 1){
                moves.push((row + 2) + "" + (col - 1))
            }
            // top top right
            if(col + 1 <= 8){
                moves.push((row + 2) + "" + (col + 1))
            }
        }
        if(row + 1 <= 8){
            // top left left
            if(col - 2 >= 1){
                moves.push((row + 1) + "" + (col - 2))
            }
            // top right right
            if(col + 2 <= 8){
                moves.push((row + 1) + "" + (col + 2))
            }
        }
        if(row - 1 >= 1){
            // bottom left left
            if(col - 2 >= 1){
                moves.push((row - 1) + "" + (col - 2))
            }
            // bottom right right
            if(col + 2 <= 8){
                moves.push((row - 1) + "" + (col + 2))
            }
        }
        if(row - 2 >= 1){
            // bottom bottom left
            if(col - 1 >= 1){
                moves.push((row - 2) + "" + (col - 1))
            }
            // bottom bottom right
            if(col + 1 <= 8){
                moves.push((row - 2) + "" + (col + 1))
            }
        }
        return moves
    }
}

class Rook extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }

    moves(){

    }
}

class Bishop extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
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
            if(!getMoves(i, this.column, moves, pieces)) break
        }
        // left moves
        for(let j = this.column + 1; j <= 8; j++){
            if(!getMoves(i, this.column, moves, pieces)) break
        }

        return moves
    }
}

class King extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
    }
}

class Pawn extends Pieces{
    constructor(row, column, team){
        super(row, column, team)
        this.firstMove = true
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
        isTeam = piece[0].getAttribute('team') === team
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