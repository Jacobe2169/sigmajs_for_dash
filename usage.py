import sigmajs_for_dash
from sigmajs_for_dash.utils import networkx2Sigma

from dash import Dash, html
import networkx as nx

app = Dash(__name__)
data =  {
  "nodes": [
    { "key": "n0", "label": "A node", "attributes":{"x": 3, "y": 4, "size": 3, "color": '#008cc2' }},
    { "key": "n1", "label": "Another node","attributes":{ "x": 3, "y": 1, "size": 2, "color": '#008cc2' }},
    { "key": "n2", "label": "And a last one","attributes":{ "x": 1, "y": 3, "size": 1, "color": '#E57821'} }
  ],
  "edges": [
    { "key": "e0", "source": "n0", "target": "n1", "color": '#282c34', "type":'line', "size":0.5 },
    { "key": "e1", "source": "n1", "target": "n2", "color": '#282c34', "type":'curve', "size":1},
    { "key": "e2", "source": "n2", "target": "n0", "color": '#FF0000', "type":'line', "size":2}
  ]
}

G = nx.karate_club_graph()
data = networkx2Sigma(G)

app.layout = html.Div([
        sigmajs_for_dash.SigmaJSComponent(
        id='graph_container',label="graph_container",
        graph_data=data,style={"height":"200px","width":"200px"}
    ),
    html.Div(id='output')
])

if __name__ == '__main__':
    app.run_server(debug=True)
