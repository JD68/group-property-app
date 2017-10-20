import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import './GroupProperties.css';

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
            return (
                <div className="group-properties-panel">
                    <div className="well header-well"><h5>{this.props.group}</h5></div>
                    <div className="group-properties-groups">
                    {
                        this.props.properties.map(property => {
                            return <Panel header={property.displayName} key={this.props.group + property.name}>
                                <div>Type: {property.dataType}</div>
                                <div>Usage: {property.appKeys.join(',')}</div>
                                <div>EverTrue Name: {property.name}</div>
                            </Panel>;
                        })
                    }
                    </div>
                </div>)
        }
    }
  }

  export default GroupProperties;