import { Component } from 'react';

class ForceError extends Component {
    render () {
        return (
            <button
            onClick={() => {
              throw new Error("Don't worry make a fault");
              
            }}
            className="error-button"
          >
            Let's make ERROR
          </button>
        )
        
    }
}
export default ForceError