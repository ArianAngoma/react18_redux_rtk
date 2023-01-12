import { fileUpload } from '../../helpers'

describe('Pruebas en fileUpload', () => {

  test('Debe de cargar un archivo y retornar el URL', async () => {

    const imageUrl = 'https://miro.medium.com/max/800/1*bc9pmTiyKR0WNPka2w3e0Q.png'

    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'node.png')

    const url = await fileUpload(file)

    expect(typeof url).toBe('string')
    
  })
  
})