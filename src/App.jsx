import Home from "./components/Home"


function App() {

  return (
    <div className="App">
       <div className="flex flex-col items-center font-bold m-8">
          <h1 className="text-3xl">INVOICLY</h1>
          <p className="text-xl">Generate your invoices with ease and accuracy</p>
       </div>
       <Home/>
    </div>
  )
}

export default App
