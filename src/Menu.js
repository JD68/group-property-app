import React, { Component } from 'react';
import GroupPropertyService from './GroupPropertyService'
import { Accordion, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handlePropertyClick = this.handlePropertyClick.bind(this);
    }

    componentDidMount() {
        GroupPropertyService.getGroups()
            .then(groups => {
                this.setState({groups: groups, selectedGroup: '', selectedProperty: ''});
            });
    }

    handleGroupClick(groupName,e) {
        //if event target is collapsed then it means we are opening group
        if(e.target.className === 'collapsed') {
            this.setState({selectedGroup: groupName, selectedProperty: (GroupPropertyService.getGroupProperties(groupName)[0]).name});
        } else {
            this.setState({selectedGroup: '', selectedProperty: ''});
        }
    }

    handlePropertyClick(propertyName) {
        this.setState({selectedProperty: propertyName});
    }

    render() {
        let panels;
        if(this.state && this.state.groups) {
            panels = this.state.groups.map((group, index) => {
                return  <Panel header={group} key={group} eventKey={index + 1} onClick={(e) => this.handleGroupClick(group, e)}>
                            <ListGroup>
                                {GroupPropertyService.getGroupProperties(group).map((property, index) => {
                                    return <ListGroupItem active={property.name === this.state.selectedProperty ? true : undefined} key={group + property.name} onClick={(e) => {e.stopPropagation(); this.handlePropertyClick(property.name)}}>{property.displayName}</ListGroupItem>
                                })}
                            </ListGroup>
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