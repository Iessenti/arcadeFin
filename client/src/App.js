import React, {useState} from 'react'
import {DataTable} from './DataTable'
import {ProductForm} from './ProductForm'

function App() {
  const [statement, setStatement] = useState('')

  function checkWord () {  
    if ((document.getElementById('form-control').value === 'Vision') || (document.getElementById('form-control').value === 'vision'))
      { setStatement('Vision') } 
    if ((document.getElementById('form-control').value === 'Product') || (document.getElementById('form-control').value === 'product'))
      { setStatement('Product') }
  }

  if (statement === 'Vision') {
    return (
      <div id="main-wrapper">
        <header>Arcade.Clothes</header>
        
        <div id="content">
          <ul>
            <DataTable />
          </ul>
        </div>
      </div>
    )
  } else if (statement === 'Product') {
    return (
      <div id="main-wrapper">
        <header>Arcade.Clothes</header>
        
        <div id="content">
          <ul>
            <ProductForm />
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div id="main-wrapper">
        <header>Arcade.Clothes</header>
        
        <div>
          <input type="text" id="form-control" placeholder='Введите кодовое слово' onInput={()=>{ checkWord() }}/>
        </div>
      </div>
    )
  }
}

export default App
