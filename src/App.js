import './App.css';
import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { createResource as fetchData } from './helper'
import Spinner from './components/Spinner'
import { DataContext } from './context/DataContext'

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState(null)
  let [message, setMessage] = useState('Search for Music!')

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      console.log(fetchData(searchTerm))
      setData(fetchData(searchTerm))
  }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }
  const renderGallery = () => {
    if(data) {
        return (
            <Suspense fallback={<Spinner />}>
                <Gallery data={data} />
            </Suspense>
        )
    }
}


  return (
    <div className="App">
        <SearchBar handleSearch={handleSearch} />
        {message}
        <DataContext.Provider value ={data}>
          <Gallery />
        </DataContext.Provider>
        {renderGallery()}
    </div>
)


}

export default App;