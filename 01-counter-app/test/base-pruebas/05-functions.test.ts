import { getActiveUser, getUser } from '../../src/base-pruebas/05-functions'

describe('Test in 05-functions', () => {

  test('getUser should return an object', () => {
    const userTest = {
      uid: 'ABC123',
      username: 'arian.angoma'
    }
    const user = getUser()
    expect(user).toEqual(userTest)
  })

  test('getActiveUser should return an object', () => {
    const username = 'arian.angoma'
    const user = getActiveUser(username)
    expect(user).toEqual({
      uid: 'ABC567',
      username: username
    })
  })

})
