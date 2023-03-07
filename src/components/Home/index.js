import React from 'react'
import Sidebar from './Sidebar'
import Gallery from './Gallery'
import { withContext } from '../../context';

function Home({value}) {
  console.log(value)
    return (
    <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <Sidebar {...value}/>
            {/* Gallery */}
            
            <Gallery {...value}/>
         </div>
        </div>
      </section>
    );
  }
  export default  withContext(Home)
