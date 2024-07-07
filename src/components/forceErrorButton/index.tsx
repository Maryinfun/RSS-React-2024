import { Component } from 'react';
 type State = {
    failed: false;
 }
class ForceError extends Component {
     public state: Readonly<State> = { failed: false };
    render () {
        if (this.state.failed) {
            throw new Error("It's just a prank. Don't worry! Everything is fine!");
          }
        return (
            <button
            onClick={() => {
              this.setState({ failed: true})
              
            }}
            className="error-button"
          >
            Let's make ERROR
          </button>
        )
        
    }
}
export default ForceError