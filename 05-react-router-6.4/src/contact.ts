import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
// @ts-ignore
import sortBy from 'sort-by'

export async function getContacts (query?: string) {
  await fakeNetwork(`getContacts:${query}`)
  let contacts = await localforage.getItem('contacts')
  if (!contacts) contacts = []
  if (query) {
    // @ts-ignore
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] })
  }
  // @ts-ignore
  return contacts.sort(sortBy('last', 'createdAt'))
}

export async function createContact () {
  // @ts-ignore
  await fakeNetwork()
  let id = Math.random().toString(36).substring(2, 9)
  let contact = {
    id,
    createdAt: Date.now()
  }
  // @ts-ignore
  let contacts = await getContacts()
  // @ts-ignore
  contacts.unshift(contact)
  await set(contacts)
  return contact
}

export async function getContact (id: string) {
  await fakeNetwork(`contact:${id}`)
  let contacts = await localforage.getItem('contacts')
  // @ts-ignore
  let contact = contacts.find(contact => contact.id === id)
  return contact ?? null
}

export async function updateContact (id: string, updates: any) {
  // @ts-ignore
  await fakeNetwork()
  let contacts = await localforage.getItem('contacts')
  // @ts-ignore
  let contact = contacts.find(contact => contact.id === id)
  if (!contact) { // @ts-ignore
    throw new Error('No contact found for', id)
  }
  Object.assign(contact, updates)
  await set(contacts)
  return contact
}

export async function deleteContact (id: string) {
  let contacts = await localforage.getItem('contacts')
  // @ts-ignore
  let index = contacts.findIndex(contact => contact.id === id)
  if (index > -1) {
    // @ts-ignore
    contacts.splice(index, 1)
    await set(contacts)
    return true
  }
  return false
}

function set (contacts: any) {
  return localforage.setItem('contacts', contacts)
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {}

async function fakeNetwork (key: string) {
  if (!key) {
    fakeCache = {}
  }

  // @ts-ignore
  if (fakeCache[key]) {
    return
  }

  // @ts-ignore
  fakeCache[key] = true
  return new Promise(res => {
    setTimeout(res, Math.random() * 800)
  })
}
