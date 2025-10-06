import type {
  SodukuNumbers,
  SodukuPromiseData,
  SodukuPromiseReturn,
  SodukuPuzzle,
  SodukuState,
} from '@/types/soduku'
import {initSoduku, getGivenKey, validateSodukuLines} from '@/utils/soduku'
import {cloneDeep} from '@/other/exports'
import type {UseMutateFunction} from '@tanstack/react-query'

const emptyPuzzle: SodukuPuzzle = Array(9).fill(Array(9).fill(null))
export const initialSodukuReducerState: SodukuState = {
  history: {redo: [], undo: []},
  given: {},
  rawData: {
    total: 0,
    data: [],
  },
  count: 0,
  rowState: cloneDeep(emptyPuzzle),
  colState: cloneDeep(emptyPuzzle),
  gridState: cloneDeep(emptyPuzzle),
  autoHints: false,
  isPlaying: false,
  submitSoduku: () => {},
}

// ToDo: Handle game complete
export type TypeAndPayload =
  | {type: 'key'; payload: number | 'undo' | 'redo' | 'delete' | null}
  | {type: 'select'; payload?: SodukuState['selected']}
  | {
      type: 'start'
      payload: {
        data: SodukuPromiseReturn
        mutate: UseMutateFunction<Response, Error, SodukuPromiseData, unknown>
      }
    }
  | {type: 'reset'; payload?: undefined}
  | {type: 'toggle-auto-hints'; payload?: undefined}

export default function sodukuReducer(
  state = initialSodukuReducerState,
  {type, payload}: TypeAndPayload,
): SodukuState {
  switch (type) {
    case 'start':
      return {
        ...state,
        ...initSoduku(payload.data),
        rawData: payload.data,
        submitSoduku: payload.mutate,
        isPlaying: true,
      }
    case 'select':
      return {...state, selected: payload}
    case 'key':
      switch (payload) {
        case 'redo': {
          if (state.history.redo.length < 1) return state

          const {history, colState, gridState, count, rowState, ...rest} = state

          const currentState = {colState, gridState, count, rowState}
          const redo = cloneDeep(history.redo)
          const prevState = redo.splice(-1)[0] as typeof currentState
          const undo = history.undo.concat(cloneDeep(currentState))

          return {
            ...rest,
            ...prevState,
            history: {
              undo,
              redo,
            },
          }
        }
        case 'undo': {
          if (state.history.undo.length < 1) return state
          const {history, colState, gridState, count, rowState, ...rest} = state
          const currentState = cloneDeep({colState, gridState, rowState, count})
          const undo = cloneDeep(history.undo)
          const prevState = undo.splice(-1)[0] as typeof currentState

          const redo = history.redo.concat(cloneDeep(currentState))
          return {
            ...rest,
            ...prevState,
            history: {
              undo,
              redo,
            },
          }
        }
        default:
          if (!state.selected) {
            return state
          }
          if (
            state.given[
              getGivenKey({
                gridIndex: state.selected?.gridIndex,
                cellIndex: state.selected?.cellIndex,
              })
            ]
          ) {
            return state
          }
          const value =
            payload === 'delete'
              ? null
              : (Number(payload) as Nullish<SodukuNumbers>)

          const newState = cloneDeep({
            rowState: state.rowState,
            colState: state.colState,
            gridState: state.gridState,
            count: state.count,
          })
          const {gridIndex, cellIndex} = state.selected
          const colIndex = state.selected.colIndex
          const rowIndex = state.selected.rowIndex
          newState.rowState[rowIndex][colIndex] = value
          newState.colState[colIndex][rowIndex] = value
          newState.gridState[gridIndex][cellIndex] = value
          const newCount =
            newState.rowState.flat().join('').match(/[1-9]/g)?.length ?? -1
          // ? Its never going to be Null but ...
          newState.count =
            newState.rowState.flat().join('').match(/[1-9]/g)?.length ?? -1
          if (
            newCount === 81 &&
            validateSodukuLines(newState.colState) &&
            validateSodukuLines(newState.gridState) &&
            validateSodukuLines(newState.rowState)
          ) {
            state.submitSoduku({
              ...state.rawData.data[0],
              soduku: newState.rowState.flat().join(''),
            })
          }

          return {
            ...state,
            ...newState,
            history: {
              undo: [
                ...state.history.undo,
                cloneDeep({
                  rowState: state.rowState,
                  colState: state.colState,
                  gridState: state.gridState,
                  count: state.count,
                }),
              ],
              redo: [],
            },
          }
      }

    case 'toggle-auto-hints':
      return {
        ...state,
        autoHints: !state.autoHints,
      }
    case 'reset':
      return {
        ...initialSodukuReducerState,
        ...initSoduku(state.rawData),
        rawData: state.rawData,
      }

    default:
      return state
  }
}
