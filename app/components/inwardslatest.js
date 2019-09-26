import React, { Component } from 'react';


const piccss= {
    width:'80px',
    height:'80px',
    borderRadius:'60%',
    border:'2px solid #ddd'
}


class InwardsLatest extends Component {
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
        fetch(`http://172.16.1.203:8000/api/inwardslatest`)
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
                            inwards.map(inward => {
                            const { id, date, time, vechileno,firstweight,secondweight,netweight } = inward;
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
 
export default InwardsLatest;