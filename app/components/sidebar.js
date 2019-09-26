import React from 'react';
import {Link} from 'react-router-dom'
import Weighbridge from './weighbridge';

const Sidebar = (props) => {
    return (  
        <React.Fragment>
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">SONA FEEDS </div>
                    <div className="list-group list-group-flush">
                        <Link to="dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                        <Link to="deliverychallan" className="list-group-item list-group-item-action bg-light">Delivery Challan</Link>
                        <Link to="outword" className="list-group-item list-group-item-action bg-light">Outword</Link>
                        <Link to="" className="list-group-item list-group-item-action bg-light">Inward</Link>
                    </div>
            </div>
        </React.Fragment>

    );
}
 
export default Sidebar;