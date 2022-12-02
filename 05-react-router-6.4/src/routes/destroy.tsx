import { redirect } from 'react-router-dom'
import { deleteContact } from '../contact'

export async function action ({ params }: any) {
  // throw new Error('Oh dang!') // Uncomment this line to see the errorElement in action.
  await deleteContact(params.contactId)
  return redirect('/')
}
