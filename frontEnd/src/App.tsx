import './App.css'

const bandName = [
  {name: 'Dire Straits', members: 'Mark', formed: 1977},
  {name: 'REM', members: 'Michael', formed: 1980},
  {name: 'Collective Soul', members: 'Ed Roland', formed: 1992}]

function Welcome() {
  return <h1>Criminally underatted bands</h1>
}


function BandList() {
  return (
    <>  
    {
      bandName.map((band) => {
        return (
          <Band {...band} />
        )
      })
    }
    
    </>
  )
}


function Band ({name, members, formed}: {name: string, members: string, formed: number}) {
  return (
    <>
      <img />
      <h2>{name}</h2>
      <h3>Original Members: {members} </h3>
      <h3>Formed: {formed} </h3>
    </>
  )
}


function App() {

  return (
    <>
    <Welcome />
    <BandList />
    </>
  )
}

export default App
