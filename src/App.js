import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';

class App extends Component {  
  constructor(props) {
    super(props);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
  }

  componentDidMount() {
    this.setState({selectedGroup: '', selectedProperty: '', groupProperties: []});
  }

  handleGroupChange(selectedGroup, selectedProperty, groupProperties) {
    console.log(arguments);
    this.setState({selectedGroup: selectedGroup, selectedProperty: selectedProperty, groupProperties: groupProperties});
  }

  handlePropertyChange(selectedProperty) {
    console.log(arguments);
    this.setState({selectedProperty: selectedProperty});
  }

  render() {
    return (
      <div><Menu onGroupChange={this.handleGroupChange} onPropertyChange={this.handlePropertyChange}/></div>
    );
  }
}

export default App;
