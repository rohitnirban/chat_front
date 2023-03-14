import React from 'react'
import Main from './Main';
import './Main.css'

const GetName = () => {
    const [name, setName] = React.useState('')
    const handleSumbit = (e) =>{
        e.preventDefault();
        setName('');
    }
  return (
    <>
        <div className='abc'>
            {/* <form onSumbit={handleSumbit}> */}
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                    <button type="submit" onClick={handleSumbit}>Send</button>
            {/* </form> */}
        </div>
        <Main name = {name}/>
    </>
  )
}

export default GetName