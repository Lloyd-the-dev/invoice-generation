import Navbar from "./components/Navbar"

function App() {

  return (
    <div className="App">
        <Navbar/>
        <div className="mt-32">
          <form className="flex flex-col items-center">
              <label htmlFor="">Amount</label>
              <input type="text" className="border-2 border-slate-900 p-2 rounded-lg mb-4"/>
              <label htmlFor="">Tax</label>
              <input type="text" />
              <label htmlFor="">VAT</label>
              <input type="text" />
          </form>
        </div>
    </div>
  )
}

export default App
