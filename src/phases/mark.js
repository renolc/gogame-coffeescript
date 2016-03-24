import alternateTurns from '../helpers/alternateTurns'
import changePhase from '../helpers/changePhase'

import phase from '../game/phase'

export default (state) => {
  return {
    mark: (row, col) => {
      const { cells } = state.board.clusterAt(row, col)

      cells.forEach((cell) => cell.toggleMark())
    },

    propose: () => alternateTurns(state),

    accept: () => changePhase(state, phase.END),

    reject: () => changePhase(state, phase.PLAY)
  }
}