import React, { Component } from 'react';

class OutwardsLatest extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            outwards: null,
            error: null
        }
    }
    
    fetchUsers() {
        // Where we're fetching data from
        fetch(`http://172.16.1.203:8000/api/outwardslatest`)
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>
            this.setState({
                outwards: data.outwards,
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
        const { isLoading, outwards, error } = this.state;

        return ( 
           
            <React.Fragment>
                 <table className="table table-striped">
                 <thead>
                    <tr>
                       <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Vechile No.</th>
                        <th scope="col">First Weight</th>
                        <th scope="col">Second Weight</th>
                        <th scope="col">Net Weight</th>
                        <th scope="col">User</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                        outwards.map(outward => {
                        const { id, date, time, vechileno,firstweight,secondweight,netweight } = outward;
                        return (
                            <tr key={id}>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>{vechileno}</td>
                            <td>{firstweight}</td>
                            <td>{secondweight}</td>
                            <td>{netweight}</td>
                            <td>Saeed</td>
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
 
export default OutwardsLatest;