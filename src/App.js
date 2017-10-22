import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import GroupProperties from './GroupProperties';

class App extends Component {  
  constructor(props) {
    super(props);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.state = {selectedGroup: '', selectedProperty: '', groupProperties: []};
  }

  handleGroupChange(selectedGroup, selectedProperty, groupProperties) {
    this.setState({selectedGroup: selectedGroup, selectedProperty: selectedProperty, groupProperties: groupProperties});
  }

  handlePropertyChange(selectedProperty) {
    this.setState({selectedProperty: selectedProperty});
  }

  render() {
    return (
        <div className="row app-row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 app-panel">
            <Menu onGroupChange={this.handleGroupChange} onPropertyChange={this.handlePropertyChange}/>   
          </div>        
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 app-panel">
            <GroupProperties 
              group={this.state && this.state.selectedGroup} 
              property={this.state && this.state.selectedProperty} 
              properties={this.state && this.state.groupProperties} />
          </div>        
        </div>
    );
  }
}

export default App;
