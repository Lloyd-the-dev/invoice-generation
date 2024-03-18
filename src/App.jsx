import Home from "./components/Home"


function App() {

  return (
    <div className="App">
       <div className="flex flex-col items-center font-bold m-8">
          <h1 className="sm:text-3xl italic font-bold text-xl">INVOICLY</h1>
          <p className="sm:text-xl">Generate your invoices with ease and accuracy</p>
       </div>
       <Home/>
    </div>
  )
}

export default App
