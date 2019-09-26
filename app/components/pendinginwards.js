import React, { Component } from 'react';
import { TiDeleteOutline } from "react-icons/ti";


const piccss= {
    width:'80px',
    height:'80px',
    borderRadius:'60%',
    border:'2px solid #ddd'
}


class PendingOutwards extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            inwards: null,
            error: null
        }
    }
    

    fetchUsers() {
        // Where we're fetching data from
        fetch(`http://172.16.1.203:8000/api/getpendinginwards`)
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>
            this.setState({
                inwards: data.inwards,
              isLoading: false,
            })
          )
          // Catch any errors we hit and update the app
          .catch(error => this.setState({ error, isLoading: false }));
      }  
    

    componentDidMount() {
        this.fetchUsers()
      }

    render() { 
        const { isLoading, inwards, error } = this.state;

        return ( 
           
            <React.Fragment>
                <table className="table ">
                 <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Vechile No.</th>
                        <th scope="col">First Weight</th>
                        <th scope="col">User</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                {error ? <p>{error.message}</p> : null}

                {!isLoading ? (
                            inwards.map(inward => {
                            const { id, date, time, vechileno,firstweight } = inward;
                            return (
                                <tr key={id}>
                                    <td>{date}</td>
                                    <td>{time}</td>
                                    <td>{vechileno}</td>
                                    <td>{firstweight}</td>
                                    <td>Saeed</td>
                                    <td><button className="btn btn-light"><TiDeleteOutline size={20}/></button></td>
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
            </React.Fragment>
         );
    }
}
 
export default PendingOutwards;