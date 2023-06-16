import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Sigma} from 'sigma';
import Graph from 'graphology';


/**
 * Component to use SigmaJS renderer in a React/Dash application
 */
export default class SigmaJSComponent extends Component {
    constructor(props){
        super(props);

        // Read graph data (JSON format available on Graphology documentation)
        this.graph = new Graph()
        this.graph.import(this.props.graph_data);

        // Container Reference for SigmaJS rendering
        this.containerRef = React.createRef();
        
        this.componentDidMount = this.componentDidMount.bind(this) // For componentDidMount access object methods and attributes

    }
    
    componentDidMount(){
        const renderer = new Sigma(this.graph,this.containerRef.current,this.props.settings)
    }

    render() {
        const {id,style,className} = this.props;

        return (
            <div id={id} ref={this.containerRef} style={style} className={className}>
                
            </div>
        )
    }
}

SigmaJSComponent.defaultProps = {
    style:{},
    settings:{allowInvalidContainer :true}
};

SigmaJSComponent.propTypes = {
    /**
     * Dict/JSON that contains graph definition. See https://graphology.github.io/serialization.html#format
     */
    graph_data : PropTypes.object,
    /**
     * 
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,
    /**
     * The class(es) used to identify this component.
     */
    className: PropTypes.string,

    /**
     * Inline Style
     */
    style : PropTypes.object,
    /**
     * Label
     */
    label : PropTypes.string.isRequired,
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,
    /**
     * Settings 
     */
    settings : PropTypes.object
};
