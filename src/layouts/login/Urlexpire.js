import React, { Component } from 'react';
import Server from '../../config';
class Urlexpire extends Component{
   render(){
      return(
         <div>
            <text style={{ marginTop: "164px", display: 'flex',justifyContent: 'center', color: "#E74C3C" ,fontFamily: Server.REGULAR_FONT, fontSize: "25px" }}>Sorry ulr is expire please try another ulr.</text>
         </div>
      );
   }
}
export default Urlexpire;