import React, { Component} from 'react'
import Article from './Article'
import axios from 'axios'

class Input extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
         number : '',
         error: null,
         isLoaded: false,
         items: {}
        };
      }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

    handleSubmit = e => {
        e.preventDefault();
    
        const {number} = this.state;
        const data = {number}
        if(data.number < 1){data.number = 1}
        axios.post('http://localhost:3001/articles', data)
        .then(res => {
            /* console.log(res.data + "res data log") */
            if(res.data != null){
                this.setState({
                    isLoaded: true,
                    items: res.data
                    
                  });
            }
           
              
        })
        .catch(err => {
            this.setState({
                isLoaded: true,
                err
              });;
        });
    };

    
    render() {
        {
            const { error, isLoaded, items } = this.state;
            console.log(items)
            if (error) {
              return <div>Error: {error.message}</div>;
            } else if (!isLoaded) {
              return <div>
              <form onSubmit={this.handleSubmit}>
              <div  >
                <input
                  type="text"
                  name="number"
                  placeholder="number of pages"
                  onChange={this.handleChange}
                  required
                />
                <div>
            <button  type="submit">
              Send
            </button>
                  </div>
                 </div>
                 <div>
                  
              </div>
              </form>
              </div>;
            }
             else {
              return (
               <Article items={items}/>
              );
            }
          }
       

    };
    
}
export default Input;


