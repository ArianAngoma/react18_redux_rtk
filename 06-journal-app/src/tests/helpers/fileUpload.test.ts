import { v2 as cloudinary } from 'cloudinary'

import { fileUpload } from '../../helpers'

cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  secure: true
})

describe('Pruebas en fileUpload', () => {

  test('Debe de cargar un archivo y retornar el URL', async () => {

    const imageUrl = 'https://miro.medium.com/max/800/1*bc9pmTiyKR0WNPka2w3e0Q.png'

    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'node.png')

    const url = await fileUpload(file)

    expect(typeof url).toBe('string')
    
    const urlObject = new URL(url)
    const segments = urlObject.pathname.split('/')

    const imageId = segments[segments.length - 1].replace('.png', '')

    await cloudinary.api.delete_resources(['journal/' + imageId], {
      resource_type: 'image'
    })

  })

  test('Debe de retornar un error', async () => {

    const file = new File([], 'node.png')
    
    await expect(fileUpload(file)).rejects.toThrow('Error while uploading')

  })

})