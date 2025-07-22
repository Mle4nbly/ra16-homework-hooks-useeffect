import './App.css'
import { List } from './components/List'
import { Details } from './components/Details'
import { useState } from 'react'

export type UserType = {
  name: string,
  id: number
}

function App() {
  const [selectedItem, setSelectedItem] = useState<UserType | null>(null)

  return (
    <>
      <List onSelect={setSelectedItem}/>
      {selectedItem && <Details id={selectedItem.id} />}
    </>
  )
}

export default App
