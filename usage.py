import sigmajs_for_dash
from sigmajs_for_dash.utils import networkx2Sigma

from dash import Dash, html
import networkx as nx
import json

app = Dash(__name__)

# From networkx graph
G = nx.karate_club_graph()
data = networkx2Sigma(G)

# or directly from JSON, using graphology format
data = json.load(open("artic.json",encoding="utf-8"))

app.layout = html.Div([html.H1("Hello World ! ",style={"font-family":"Arial"}),
        sigmajs_for_dash.SigmaJSComponent(
        id='graph_container',label="graph_container",
        graph_data=data,style={"height":"600px","width":"600px"},settings={
      "minCameraRatio": 0.1,
      "maxCameraRatio": 10,
    }
    )
])

if __name__ == '__main__':
    app.run_server(debug=True)
