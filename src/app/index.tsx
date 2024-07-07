import { Component, ReactNode } from 'react'
import SearchInput from '../components/searchInput'
import ForceError from '../components/forceError'


class App extends Component {
    render(): ReactNode {
        return (
        <>
         <header></header>
        <main className='main'>
          <h1>Welcome to Pokemon World!</h1>
          <SearchInput />
          <ForceError />

        </main>
        <footer></footer>
        </>
        )
    }
}

export default App
