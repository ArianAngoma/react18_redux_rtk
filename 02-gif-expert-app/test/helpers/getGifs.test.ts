import { getGifs } from '../../src/helpers/getGifs'

describe('Test in getGifs', () => {

  test('Should return an array of gifs', async () => {

    const gifs = await getGifs({ category: 'One Punch' })

    expect(gifs.length).toBeGreaterThan(0)

    expect(gifs[0]).toHaveProperty('id')
    expect(gifs[0]).toHaveProperty('title')
    expect(gifs[0]).toHaveProperty('url')

    expect(gifs[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String)
    })

  })

})
