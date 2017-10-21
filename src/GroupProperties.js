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
                    <div className="well well-sm header-well"><h3>{this.props.group}</h3></div>
                    <div className="group-properties-groups">
                    {
                        this.props.properties.map(property => {
                            return <Panel header={property.displayName} key={this.props.group + property.name}>
                                <div className="group-properties-inner-panel">
                                    <div className="row group-properties-inner-panel-row">
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 group-properties-inner-panel-left">Type</div>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">{property.dataType}</div>
                                    </div>
                                    <div className="row group-properties-inner-panel-content-row">
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 group-properties-inner-panel-left"></div>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8"></div>
                                    </div>
                                    <div className="row group-properties-inner-panel-row">
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 group-properties-inner-panel-left">Usage</div>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">{property.appKeys.join(', ')}</div>
                                    </div>
                                    <div className="row group-properties-inner-panel-row">
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 group-properties-inner-panel-left">EverTrue Name</div>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">{property.name}</div>
                                    </div>
                                </div>
                            </Panel>;
                        })
                    }
                    </div>
                </div>)
        }
    }
  }

  export default GroupProperties;