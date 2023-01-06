import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'

import { firebaseAuth } from './config'

export interface ResponseSignInFulfilled {
  ok: true
  displayName: string | null
  email: string | null
  photoURL: string | null
  uid: string
}

interface ResponseSignInRejected {
  ok: false
  errorMessage: string
}

export type ResponseSignIn = ResponseSignInFulfilled | ResponseSignInRejected

const googleProvider = new GoogleAuthProvider

export const signInWithGoogle = async (): Promise<ResponseSignIn> => {

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

export interface RegisterWithEmailPasswordParams {
  email: string
  password: string
  displayName: string
}

export const registerWithEmailPassword = async ({
  displayName,
  email,
  password
}: RegisterWithEmailPasswordParams): Promise<ResponseSignIn> => {

  try {

    const response = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    const { uid, photoURL } = response.user

    if (!firebaseAuth.currentUser) return {
      ok: false,
      errorMessage: 'No user found'
    }

    await updateProfile(firebaseAuth.currentUser, { displayName })

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

    throw new Error('Error registering with email and password', {
      cause: err
    })

  }

}

export interface LoginWithEmailPasswordParams {
  email: string
  password: string
}

export const loginWithEmailPassword = async ({
  email,
  password
}: LoginWithEmailPasswordParams): Promise<ResponseSignIn> => {

  try {

    const response = await signInWithEmailAndPassword(firebaseAuth, email, password)
    const { displayName, photoURL, uid } = response.user

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

    throw new Error('Error logging in with email and password', {
      cause: err
    })

  }

}

