import React, { Component } from 'react';
import './Menu.css';
import GroupPropertyService from './GroupPropertyService';
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
        //if event target A and is collapsed then it means we are opening group
        if(e.target.tagName === 'A' && e.target.className === 'collapsed') {
            let groupProperties = GroupPropertyService.getGroupProperties(groupName);
            this.setState({selectedGroup: groupName, selectedProperty: groupProperties[0].name}, 
                () => this.props.onGroupChange && this.props.onGroupChange(groupName, groupProperties[0].name, groupProperties));
        } else if (e.target.tagName === 'A') {
            this.setState({selectedGroup: '', selectedProperty: ''}, 
                () => this.props.onGroupChange && this.props.onGroupChange('', '', []));
        }
    }

    handlePropertyClick(propertyName) {
        if(propertyName !== this.state.selectedProperty) {
            this.setState({selectedProperty: propertyName}, () => this.props.onPropertyChange && this.props.onPropertyChange(propertyName));
        }
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
            <div className="menu-panel">
                <div className="well header-well"><h5>FIELD GROUPS</h5></div>
                <div className="menu-groups"><Accordion>{panels}</Accordion></div>
            </div>
        );
    }
  }

  export default Menu;