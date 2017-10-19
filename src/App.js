import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import GroupProperties from './GroupProperties';

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
    const rowClassName = 'row app-row'
    const leftClassName = 'col-xs-4 col-sm-4 col-md-4 col-lg-4 app-panel';
    const rightClassName = 'col-xs-4 col-sm-4 col-md-8 col-lg-8 app-panel';
    return (
        <div className={rowClassName}>
          <div className={leftClassName}>
              <Menu onGroupChange={this.handleGroupChange} onPropertyChange={this.handlePropertyChange}/>
          </div>        
          <div className={rightClassName}>
            <GroupProperties group={this.state && this.state.selectedGroup} property={this.state && this.state.selectedProperty} properties={this.state && this.state.groupProperties} />
          </div>        
        </div>
    );
  }
}

export default App;
