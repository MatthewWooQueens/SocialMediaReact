import { NavBar } from "./components/NavBar.jsx";
import  './index.css';
function App() {

  return (
    <div className='sticky top-0 left-0 w-full border-slate-500'>
      <div className="max-w-8x1 mx-auto bg-slate-600">
        <div className="relative z-50 pt-20">
          <h1 className="text-red-500 text-3xl font-bold underline">
            Hello world!
          </h1>
          <NavBar />
        </div>
      </div>
    </div>
  )
}

export default App
