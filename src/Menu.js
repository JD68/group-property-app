import React, { Component } from 'react';
import GroupPropertyService from './GroupPropertyService'

class Menu extends Component {
    componentDidMount() {
        GroupPropertyService.getGroups()
            .then(groups => {
                this.setState({groups: groups, groupSelected: GroupPropertyService.defaultGroup()});
            });
    }
    render() {
        let groups;
        if(this.state && this.state.groups) {
            groups = this.state.groups.map(group => <li key={group}>{group}</li>)
        }
        return (
            <ul>
                {groups}
            </ul>
        );
    }
  }
  
  export default Menu;