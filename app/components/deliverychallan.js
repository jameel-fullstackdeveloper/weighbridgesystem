import React, {useState, useEffect } from 'react';
import {useToasts } from 'react-toast-notifications'
import axios from 'axios'
import { FaSave,FaPlus } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { MdModeEdit,MdAddCircle, MdDeleteForever } from "react-icons/md";
import $ from 'jquery';


const DeliveryChallan = () => {
    const [isLoading, setLoading] = useState(true);
    const [isLoadingItems, setLoadingItems] = useState(true);
    const [isLoadingChallan, setLoadingChallan] = useState(true);
    const [debtors, setDebtors] = useState([]);
    const [items, setItems] = useState([]);
    const [challans, setChallans] = useState([]);
    const [dc_number, setDcNumber] = useState(''); 
    const [party_id, setPartyID] = useState(''); 
    const [item_id, setItemID] = useState(''); 
    const [farmer_name, setFarmerName] = useState(''); 
    const [city, setCity] = useState(''); 
    const [fare, setFare] = useState(''); 
    const [total_bags, setTotalBags] = useState(''); 
    const [error, setError] = useState(null); 
    const { addToast } = useToasts()
    const [isUpdate, setUpdate] = useState(false); 
    const [updateID, setupdateID] = useState(); 

    const entered_by=localStorage.getItem('username');
    const [isEnabled, setEnable] = useState(true);

             


    const boxheading ={
        fontSize:'22px',
        fontWeight:'400'
    }

    const btnfloat ={
       float:'right'
    }

  
    const getPendingChallands = () =>  {
            // Parties Fetching from api
            fetch('http://172.16.1.203:8000/api/getdevchallanfeed')
            .then(res => res.json())
            .then(json => {
            setLoadingChallan(false)
            if (json.challans) {
                setChallans(json.challans)
            } else {
                setChallans([])
            }
            })
            .catch(err => {
            setError(err)
            setLoadingChallan(false)
        })
    }
    

    useEffect(() => {
       
        const abortController=  new AbortController()
        const signal = abortController.signal

        // Parties Fetching from api
        fetch('http://172.16.1.203:8000/api/debtorsparties', {signal:signal})
          .then(res => res.json())
          .then(json => {
            setLoading(false)
            if (json.debtors) {
                setDebtors(json.debtors)
            } else {
                setDebtors([])
            }
          })
          .catch(err => {
            setError(err)
            setLoading(false)
          })


        // Items Fetching from api
        fetch('http://172.16.1.203:8000/api/salesitems',  {signal:signal})
          .then(res => res.json())
          .then(json => {
            setLoadingItems(false)
            if (json.items) {
                setItems(json.items)
            } else {
                setItems([])
            }
          })
          .catch(err => {
            setError(err)
            setLoadingItems(false)
          })


          getPendingChallands();



          return function cleanup() {
              abortController.abort()
          }

      }, [])

      
      const resetForm = () =>{
        setDcNumber('')
        setPartyID('')
        setItemID('')
        setFarmerName('')
        setCity('')
        setFare('')
        setTotalBags('') 

            $('#exampleModal').modal('toggle');

       }

    const handleSubmit = (event) => {
        event.preventDefault();
           axios.post("http://172.16.1.203:8000/api/devchallanfeed", {
            dc_number,
            party_id,
            item_id,
            farmer_name,
            city,
            fare,
            total_bags,
            entered_by
        }).then(result => {
          if (result.status === 200) 
             setEnable(false)
             addToast('Saved Successfully', { appearance: 'success', autoDismiss: true})
             resetForm()
             getPendingChallands()
        }).catch(e => {
            console.log(e)
            setEnable(true)
        });
    

 }

    //delete challan
    const handleDelete = (e) => {
        axios.post("http://172.16.1.203:8000/api/deleteDevChallanFeed", {
            id:e
        }).then(result => {
          if (result.status === 200) 
             addToast('Delivery Challan ID #' + e +  ' Deleted.', { appearance: 'warning', autoDismiss: true})
             getPendingChallands()
        }).catch(e => {
            console.log(e)
        });
    }

    //openupdate popup
    const openUpdate = (e) => {
        setUpdate(true)

        const result = challans.find(challan => (challan.id === e));
        setDcNumber(result.dc_number)
        setPartyID(result.party_id)
        setItemID(result.item_id)
        setDcNumber(result.dc_number)
        setFarmerName(result.farmer_name)
        setCity(result.city)
        setFare(result.fare)
        setTotalBags(result.total_bags)

        setupdateID(result.id)
        
        $('#exampleModal').modal('toggle');
    }

    
    const handleUpdate = () => {
        event.preventDefault();
        
        axios.post("http://172.16.1.203:8000/api/updateDevChallanFeed", {
         updateID,
         dc_number,
         party_id,
         item_id,
         farmer_name,
         city,
         fare,
         total_bags,
         entered_by
     }).then(result => {
       if (result.status === 200) 
          setEnable(false)
          addToast('Delivery Challan Updated Successfully', { appearance: 'success', autoDismiss: true})
          resetForm()
          getPendingChallands()
     }).catch(e => {
         console.log(e)
         setEnable(true)
     }); 
    }


    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4 title-heading">
                  <h1 className="h3 mb-0 text-gray-800">Delivery Challan</h1>
                </div>
  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Feed Delivery Challan</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {error ? <p>{error.message}</p> : null}

                <form onSubmit={ isUpdate ? handleUpdate : handleSubmit}>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="form-group">
                                    <label htmlFor="dc_number">D.C Number:</label>
                                    <input type="text" pattern=".{2,30}" title="2 to 30 characters"
                                        className="form-control"
                                        id="dc_number" name ="dc_number"
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter D.C Number"
                                        value={dc_number}
                                        onChange={(e) => setDcNumber(e.target.value)}
                                        autoFocus required/>
                            </div>
                        </div>
                        <div className="col-xl-12">
                        <div className="form-group">
                                        <label htmlFor="party_id">Select Party:</label>
                                        <select className="form-control"
                                            id="party_id" 
                                            name="party_id" 
                                            value={party_id}
                                            onChange={e => {
                                                setPartyID(e.target.value);
                                            }}  required>
                                        <option value="">---Select---</option>
                            
                            { !isLoading ? (
                            debtors.map(debtor => {
                            const { id, name } = debtor;
                            return (
                                 <option key={id} value={id}>{name}</option>
                            );
                              })
                             // If there is a delay in data, let's let the user know it's loading
                            ) : (
                                null
                            )}</select>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                        <div className="form-group">
                                        <label htmlFor="item_id">Select Item:</label>
                                        <select className="form-control"
                                            id="item_id" 
                                            name="item_id"
                                            value={item_id}
                                            onChange={e => {
                                                setItemID(e.target.value);
                                            }}
                                        required>
                                        <option value="">---Select---</option>
                            { !isLoadingItems ? (
                            items.map(item => {
                            const { id, name } = item;
                            return (
                                 <option key={id} value={id}>{name}</option>
                            );
                              })
                             // If there is a delay in data, let's let the user know it's loading
                            ) : (
                                null
                            ) }</select>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="form-group">
                            <label htmlFor="farmer_name">Farmer Name:</label>
                                    <input type="text" className="form-control" id="farmer_name"
                                     name ="farmer_name" aria-describedby="emailHelp" 
                                     value={farmer_name}
                                     onChange={e => {
                                         setFarmerName(e.target.value);
                                     }}
                                     placeholder="Enter Farmer Name" required/>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-xl-12">

                        <div className="form-group">
                               <label htmlFor="city">City Name:</label>
                                <input type="text" className="form-control" id="city" 
                                name ="city" 
                                aria-describedby="emailHelp" 
                                value={city}
                                onChange={e => {
                                    setCity(e.target.value);
                                }}
                                placeholder="Enter City Name" required/>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="form-group">
                            <label htmlFor="fare">Fare:</label>
                                    <input type="number" min="1" className="form-control" min="10" max="50000" id="fare" name ="fare"
                                    value={fare}
                                    onChange={e => {
                                        setFare(e.target.value);
                                    }}
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter Fare" required/>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="form-group">
                            <label htmlFor="total_bags">Total Bags:</label>
                                    <input type="number"min="1" className="form-control" min="1" max="300" id="total_bags" name ="total_bags" 
                                      value={total_bags}
                                      onChange={e => {
                                        setTotalBags(e.target.value);
                                      }}
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter Bags" required/>
                            </div>
                     
                            <input type="hidden" value={entered_by} id="entered_by" name="entered_by" />
                    </div>
                 </div>
                 <hr/>

                { isUpdate ? (
                     <button type="submit"  className="btn btn-secondary  float-right"> 
                        <FaSave /> Update
                     </button>  
                  ) : (
                    <button type="submit"  className="btn btn-secondary  float-right"> 
                        <FaSave /> Save
                     </button>  
                  )}

                

                               


                 </form>


     </div>
    </div>
  </div>
</div>
        
        
 <div className="row">
                <div className="col-lg-12 mb-4">
                    <div className="card">
                        <div className="card-header">
                             Delivery Challan (Feed)
                            <button type="button" 
                            onClick={() => { resetForm()}}
                            id="addbutton" className="btn btn-default float-right" 
                            data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><MdAddCircle size={30} /> </button>
                        </div>
                        <div className="card-body">
                        <table className="table table-striped">
                 <thead>
                    <tr>
                        <th scope="col">DC Number</th>
                        <th scope="col">Party Name</th>
                        <th scope="col">Farmer Name</th>
                        <th scope="col">City</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Bags</th>
                        <th scope="col">Fare</th>
                        <th scope="col">Added By</th>
                        <th scope="col">Created On</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                { error ? <p>{error.message}</p> : null}

                {!isLoadingChallan ? (
                            challans.map(challan => {
                            const { id,dc_number, pname, farmer_name, iname,total_bags,city,fare,entered_by,date_posted,created_on } = challan;
                            return (
                                <tr key={id}>
                                    <td>{dc_number}</td>
                                    <td>{pname}</td>
                                    <td>{farmer_name}</td>
                                    <td>{city}</td>
                                    <td>{iname}</td>
                                    <td>{total_bags}</td>
                                    <td>{fare}</td>
                                    <td>{entered_by}</td>
                                    <td>{created_on}</td>
                                    <td>

                                    <button className="btn btn-sm btn-default"
                                        onClick={(e) => { openUpdate(id)}}
                                    ><MdModeEdit size={20} color={'black'}/></button> &nbsp;
                                       
                                     <button className="btn btn-sm btn-default"
                                        onClick={(e) => { if(window.confirm('Are you sure you wish to delete this item?')) {handleDelete(id)};}}
                                    ><MdDeleteForever size={20} color={'black'}/></button>
                                    
                                    
                                    
                                    </td>
                             </tr>
                        );
                         })
                    // If there is a delay in data, let's let the user know it's loading
                    ) : (
                        <tr>
                        <td>
                            <h5>Loading...</h5>
                        </td>
                    </tr>
                )}

           </tbody>
        </table>
                         </div>
                    </div>
                </div>
            </div>




</div>
        </React.Fragment>
    )
   
}



 
export default DeliveryChallan;