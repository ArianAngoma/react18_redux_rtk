export const fileUpload = async (file: File): Promise<string> => {

  const cloudUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`

  const formData = new FormData()
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string)
  formData.append('file', file)

  try {

    const response = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) throw new Error('Error while uploading')

    const cloudResponse = await response.json()

    return cloudResponse.secure_url

  } catch (err) {

    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw new Error('Error while uploading')

  }

}