import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Sigma } from 'sigma';
import Graph from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { Coordinates, EdgeDisplayData, NodeDisplayData } from "sigma/types";






/**
 * Component to use SigmaJS renderer in a React/Dash application
 */
export default class SigmaJSComponent extends Component {
    constructor(props) {
        super(props);

        // Read graph data (JSON format available on Graphology documentation)
        this.graph = new Graph()
        this.graph.import(this.props.graph_data);

        // Container Reference for SigmaJS rendering
        this.containerRef = React.createRef();
        this.searchInputRef = React.createRef();
        this.suggestionsRef = React.createRef();
        this.key = parseInt(Math.floor(Math.random() * 200000));


        this.renderer = undefined;

        // Give access to object attributes
        this.componentDidMount = this.componentDidMount.bind(this) // For componentDidMount access object methods and attributes
        this.layout = this.layout.bind(this);
        this.updateLayout = this.updateLayout.bind(this);

        this.setHoveredNode = this.setHoveredNode.bind(this);
        this.setSearchQuery = this.setSearchQuery.bind(this);

        this.nodeReducer = this.nodeReducer.bind(this);
        this.edgeReducer = this.edgeReducer.bind(this);
        this.leaveNode = this.leaveNode.bind(this);
        this.enterNode = this.enterNode.bind(this);

        // Run the layout function
        this.layout();

        this.state = {
            hoverNode: undefined,
            searchQuery: "",

            selectedNode: "",
            suggestions: undefined,
            hoveredNeighbor: undefined
        }
    }



    layout() {
        const { layoutSettings, layoutNumberOfIteration, layout } = this.props;

        if (layout == "forceAtlas2") {
            const positions = forceAtlas2(this.graph, {
                iterations: layoutNumberOfIteration, settings: layoutSettings
            });
            this.updateLayout(positions);
        }

    }

    /**
     * Update nodes positions given an object that associated each node with a position {x:<number>,y:<number>}
     * @param {object} positions 
     */
    updateLayout(positions) {

        for (const { node } of this.graph.nodeEntries()) {
            // Check if position for current node exists
            if (!Object.hasOwnProperty.call(positions[node], "x") || !Object.hasOwnProperty.call(positions[node], "y")) {
                throw new Error(`In postion dict given, ${node} is not associated with a x or y value`)
            }
            // Update node attributes in the graph instantiated
            this.graph.updateNodeAttribute(node, "x", n => positions[node].x);
            this.graph.updateNodeAttribute(node, "y", n => positions[node].y);
        }
    }

    setSearchQuery(query) {
        this.state.searchQuery = query;
        const searchInput = this.searchInputRef.current;


        if (searchInput.value !== query) searchInput.value = query;

        if (query) {
            const lcQuery = query.toLowerCase();
            const suggestions = this.graph
                .nodes()
                .map((n) => ({ id: n, label: this.graph.getNodeAttribute(n, "label") }))
                .filter(({ label }) => label.toLowerCase().includes(lcQuery));

            // If we have a single perfect match, them we remove the suggestions, and
            // we consider the user has selected a node through the datalist
            // autocomplete:
            if (suggestions.length === 1 && suggestions[0].label === query) {
                this.state.selectedNode = suggestions[0].id;
                this.state.suggestions = undefined;

                // Move the camera to center it on the selected node:
                const nodePosition = this.renderer.getNodeDisplayData(this.state.selectedNode);
                this.renderer.getCamera().animate(nodePosition, {
                    duration: 500,
                });
            }
            // Else, we display the suggestions list:
            else {
                this.state.selectedNode = undefined;
                this.state.suggestions = new Set(suggestions.map(({ id }) => id));
            }
        }
        // If the query is empty, then we reset the selectedNode / suggestions state:
        else {
            this.state.selectedNode = undefined;
            this.state.suggestions = undefined;
        }

        // Refresh rendering:
        this.renderer.refresh();
    }

    setHoveredNode(data) {
        const {node} = data;
        if (node) {
            this.setState({
                hoveredNode: node,
                hoveredNeighbors: new Set(this.graph.neighbors(node))
            })
        } else {
            this.setState({
                hoveredNode: undefined,
                hoveredNeighbors: undefined
            })
        }

        // Refresh rendering:
        this.renderer.refresh();
    }

    enterNode(node) {
        this.setHoveredNode(node);
    }
    leaveNode() {
        this.setHoveredNode({ node: undefined });
    }

    nodeReducer(node, data) {
        const res = { ...data };

        if (this.state.hoveredNeighbors && !this.state.hoveredNeighbors.has(node) && this.state.hoveredNode !== node) {
            res.label = "";
            res.color = "#f6f6f6";
        }

        if (this.state.selectedNode === node) {
            res.highlighted = true;
        } else if (this.state.suggestions && !this.state.suggestions.has(node)) {
            res.label = "";
            res.color = "#f6f6f6";
        }

        return res;

    }
    edgeReducer(edge, data) {
        const res = { ...data };

        if (this.state.hoveredNode && !this.graph.hasExtremity(edge, this.state.hoveredNode)) {
            res.hidden = true;
        }

        if (this.state.suggestions && (!this.state.suggestions.has(this.graph.source(edge)) || !this.state.suggestions.has(this.graph.target(edge)))) {
            res.hidden = true;
        }

        return res;
    }



    /**
     * Start the graph rendering
     */
    componentDidMount() {
        const { settings } = this.props;
        this.renderer = new Sigma(this.graph,
            this.containerRef.current,
            { ...settings, allowInvalidContainer: true }
        )
        this.renderer.on("clickNode", this.enterNode);
        this.renderer.on("clickStage", this.leaveNode);

        this.renderer.setSetting("nodeReducer", this.nodeReducer);

        // Render edges accordingly to the internal state:
        // 1. If a node is hovered, the edge is hidden if it is not connected to the
        //    node
        // 2. If there is a query, the edge is only visible if it connects two
        //    suggestions
        this.renderer.setSetting("edgeReducer", this.edgeReducer);

        this.suggestionsRef.current.innerHTML = this.graph
            .nodes()
            .map((node) => `<option value="${this.graph.getNodeAttribute(node, "label")}"></option>`)
            .join("\n");
        this.searchInputRef.current.addEventListener("input", () => {
            this.setSearchQuery(this.searchInputRef.current.value || "");
        });
        this.searchInputRef.current.addEventListener("blur", () => {
            this.setSearchQuery("");
        });
    }

    render() {
        const { id, style, className } = this.props;
        return (
            <>
                <div id={id} ref={this.containerRef} style={style} className={className} >
                    <div id={`search${this.key}`}>
                        <input ref={this.searchInputRef} 
                        type="search" id={`search-input${this.key}`}
                        list={`suggestions${this.key}`} placeholder="Try searching for a node..." />
                        <datalist id={`suggestions${this.key}`} ref={this.suggestionsRef}></datalist>
                    </div>
                </div>
            </>

        )
    }
}

SigmaJSComponent.defaultProps = {
    style: {},
    settings: { allowInvalidContainer: true },
    layout: "forceAtlas2",
    layoutSettings: {},
    layoutNumberOfIteration: 100
};

SigmaJSComponent.propTypes = {
    /**
     * Dict/JSON that contains graph definition. See https://graphology.github.io/serialization.html#format
     */
    graph_data: PropTypes.object,
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
    style: PropTypes.object,
    /**
     * Label
     */
    label: PropTypes.string.isRequired,
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,
    /**
     * Settings 
     */
    settings: PropTypes.object,

    /**
     * Layout used (if empty )
     */
    layout: PropTypes.string,

    /**
     * Settings dict that indicate layout settings
     */
    layoutSettings: PropTypes.object,

    /**
     * Number of iterations for the layout algorithm
     */
    layoutNumberOfIteration: PropTypes.number
};
