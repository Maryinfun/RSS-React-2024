import { Component, ReactNode, useState } from 'react'
import SearchInput from '../components/searchInput'
import ForceError from '../components/forceErrorButton'
import ErrorBoundary from '../components/errorBoundary'

class App extends Component {
    render(): ReactNode {
        return (
            <>
         <header></header>
        <main className='main'>
          <h1>Welcome to Pokemon World!</h1>
          <ErrorBoundary>

          <SearchInput />
          <ForceError />

                     {/* <Search
              setSearchWord={(word: string) => {
                this.setState({ searchWord: word });
                localStorage.setItem('search', word);
              }}
            />
            <PokeData searchWord={this.state.searchWord} />
           */}
                  </ErrorBoundary>

        </main>
        <footer></footer>
        </>
        )
    }
}

export default App
