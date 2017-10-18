import React, { Component } from 'react';
import GroupPropertyService from './GroupPropertyService'
import { Accordion, Panel } from 'react-bootstrap';

class Menu extends Component {
    componentDidMount() {
        GroupPropertyService.getGroups()
            .then(groups => {
                this.setState({groups: groups});
            });
    }
    render() {
        let panels;
        if(this.state && this.state.groups) {
            panels = this.state.groups.map((group, index) => {
                return  <Panel header={group} key={group} eventKey={index + 1}>
                            <ul>
                                {GroupPropertyService.getGroupProperties(group).map(property => <li key={group + property.name}>{property.name}</li>)}
                            </ul>
                        </Panel>;
            });
        }
        return (
            <Accordion>
                {panels}
            </Accordion>
        );
    }
  }
  
  export default Menu;