import { piece } from './cell'
import board from './board'

import stateProps from './helpers/state-props'

export const phase = Object.freeze({
  PLAY: 'play',
  MARK: 'mark',
  END: 'end'
})

export default ({ size = 9, load } = {}) => {
  if (load) {
    size = 0
  }

  const { state, obj } = stateProps({
    board: board({ size: size }),
    turn: piece.BLACK,
    previousBoard: null,
    state: phase.PLAY
  })

  if (load) {
    loadState(state, load)
  }

  obj.serialize = () => {
    return JSON.stringify({
      turn: state.turn,
      board: state.board.serialize()
    })
  }

  obj.load = (load) => {
    loadState(state, load)
  }

  obj.pass = () => {
    alternateTurns(state)
  }

  obj.play = (row, col) => {
    const initialState = obj.serialize()
    const initialBoard = JSON.stringify(obj.board.serialize())

    const cell = state.board.at(row, col)
    if (!cell || !cell.is(piece.EMPTY)) return

    cell.set(state.turn)

    // remove captured clusters
    state.board.neighborCells(row, col)
      .filter((c) => {
        return c.is(
            (state.turn === piece.BLACK)
              ? piece.WHITE
              : piece.BLACK
          )
      })
      .forEach((cell) => {
        const { cluster, liberties } = state.board.clusterAt(cell.row, cell.col)
        if (liberties.length === 0) {
          cluster.forEach((cell) => {
            cell.set(piece.EMPTY)
          })
        }
      })

    // if no liberties where we played or new board looks like previous board, invalid move
    const { liberties } = state.board.clusterAt(cell.row, cell.col)
    if (liberties.length === 0 || JSON.stringify(obj.board.serialize()) === obj.previousBoard) {
      return obj.load(initialState)
    }

    obj.previousBoard = initialBoard
    alternateTurns(state)
  }

  return obj
}

function alternateTurns (state) {
  state.turn = (state.turn === piece.BLACK)
    ? piece.WHITE
    : piece.BLACK
}

function loadState (state, load) {
  const newState = JSON.parse(load)
  state.board = board({ load: newState.board })
  state.turn = newState.turn
}
