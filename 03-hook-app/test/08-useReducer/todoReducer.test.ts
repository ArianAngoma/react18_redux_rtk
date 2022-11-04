import todoReducer, { Action, Todo } from '../../src/08-useReducer/todoReducer'

describe('Pruebas en todoReducer', () => {

  const initialState: Todo[] = [
    {
      id: 1,
      description: 'Aprender React',
      done: false
    }
  ]

  test('Debe de agregar un TODO', () => {

    const action: Action = {
      type: '[TODO] Add Todo',
      payload: {
        id: 2,
        description: 'Aprender Mongo',
        done: false
      }
    }

    const state = todoReducer(initialState, action)

    expect(state.length).toBe(2)
    expect(state).toContain(action.payload)

  })

  test('Debe de borrar un TODO', () => {

    const action: Action = {
      type: '[TODO] Remove Todo',
      payload: 1
    }

    const state = todoReducer(initialState, action)

    expect(state.length).toBe(0)

  })

  test('Debe de hacer el toggle del TODO', () => {

    const action: Action = {
      type: '[TODO] Toggle Todo',
      payload: 1
    }

    const state = todoReducer(initialState, action)

    expect(state[0].done).toBe(true)

  })

})
