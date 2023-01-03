import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'

import { firebaseAuth } from './config'

interface ResponseSignInWithGoogleFulfilled {
  ok: true
  displayName: string | null
  email: string | null
  photoURL: string | null
  uid: string
}

interface ResponseSignInWithGoogleRejected {
  ok: false
  errorMessage: string
}

export type ResponseSignInWithGoogle = ResponseSignInWithGoogleFulfilled | ResponseSignInWithGoogleRejected

const googleProvider = new GoogleAuthProvider

export const signInWithGoogle = async (): Promise<ResponseSignInWithGoogle> => {

  try {

    const result = await signInWithPopup(firebaseAuth, googleProvider)

    // const credential = GoogleAuthProvider.credentialFromResult(result)

    const {
      displayName,
      email,
      photoURL,
      uid
    } = result.user

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }

  } catch (err) {

    if (err instanceof FirebaseError) {
      return {
        ok: false,
        errorMessage: err.message
      }
    }

    throw new Error('Error authenticating with Google', {
      cause: err
    })

  }

}

