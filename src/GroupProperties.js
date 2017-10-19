import React, { Component } from 'react';
import { Panel /*, ListGroup, ListGroupItem*/} from 'react-bootstrap';

class GroupProperties extends Component {
    /*constructor(props) {
        super(props);
    }*/

    componentDidMount() {
    }

    render() {
        if(!this.props.group) {
            return (<h1>Please Select A Group</h1>);
        } else {
            return (<Panel header={this.props.group}>
                <div>{this.props.property}</div>
                {
                    this.props.properties.map(property => {
                        return <Panel header={property.displayName} key={this.props.group + property.name}>
                            <div>Type: {property.dataType}</div>
                            <div>Usage: {property.appKeys.join(',')}</div>
                            <div>EverTrue Name: {property.name}</div>
                        </Panel>;
                    })
                }
            </Panel>);
        }
    }
  }

  export default GroupProperties;