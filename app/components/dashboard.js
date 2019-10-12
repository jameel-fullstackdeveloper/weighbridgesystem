import React from 'react';
import Clock from 'react-live-clock';
import Weighbridge from './weighbridge';
import PendingInwards from './pendinginwards';
import PendingOutwards from './pendingoutwards';
import InwardsLatest from './inwardslatest'
import OutwardsLatest from './outwardslatest';

const divcolorPrimary ={
    color:'#4e73df'
}

const divcolorSuccess ={
    color:'#1cc88a'
}

const divcolorInfo ={
    color:'#36b9cc'
}


const boxheading ={
    fontSize:'14px',
    fontWeight:'400'
}


const Dashboard = () => {

    let tempDate = new Date();
    let currDate = tempDate.getDate() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getFullYear();
   
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4 title-heading">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>


            <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-uppercase mb-1" style={boxheading}>Delivery Challans</div>
                            <div className="h5 mb-0" style={boxheading}>40</div>
                                </div>
                                <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-uppercase mb-1" style={boxheading}>Vehicles</div>
                            <div className="h5 mb-0" style={boxheading}>40</div>
                                </div>
                                <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-uppercase mb-1" style={boxheading}>Weighbridge Device</div>
    <div className="h5 mb-0" style={boxheading}>{ } </div>
                                </div>
                                <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-uppercase mb-1" style={boxheading}>Date | Time</div>
                            <div className="h5 mb-0" style={boxheading}><Clock format={'h:mm:ss a'} ticking={true}/> | {currDate}</div>
                                </div>
                                <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</div>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0"  style={boxheading}> PENDING INWARDS</h6>
                        </div>
                        <div className="card-body">
                                <PendingInwards />
                         </div>
                    </div>

                </div>

                <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0"  style={boxheading}> PENDING OUTWARDS</h6>
                        </div>
                        <div className="card-body">
                                <PendingOutwards />
                        </div>
                    </div>
                    
                </div>

            </div>


         {/*   <div className="row">
                <div className="col-lg-6 mb-4">
                    
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0"  style={boxheading}> TODAYS INWARDS</h6>
                        </div>
                        <div className="card-body">
                                <InwardsLatest/>

                         </div>
                    </div>

                </div>

                <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0"  style={boxheading}> TODAYS OUTWARDS</h6>
                        </div>
                        <div className="card-body">
                            <OutwardsLatest/>
                        </div>
                    </div>
                    
                </div>

            </div>*/ }



    </div> 

    
        </React.Fragment>

     );
}
 
export default Dashboard;