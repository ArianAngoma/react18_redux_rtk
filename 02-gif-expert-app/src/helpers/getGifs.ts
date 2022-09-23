import { ImageData } from '../interfaces/imageData'

interface GetGifsParams {
  category: string
}

export const getGifs = async ({
  category = ''
}: GetGifsParams) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=eM4xovA1aGdRPROUlunCmRg8ez2CgSmF&q=${category}&limit=20`

  const response = await fetch(url)

  const { data } = await response.json()

  return data.map((img: ImageData) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url
  }))
}
