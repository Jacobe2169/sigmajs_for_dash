from sigmajs_for_dash import SigmaJSComponent
from sigmajs_for_dash.utils import networkx2Sigma

from dash import Dash, html
import networkx as nx
import json
import numpy as np

app = Dash(__name__)

# From networkx graph
G = nx.karate_club_graph()
for ix,node in enumerate(list(G.nodes())):
    G.nodes[node]["label"] = str(ix)
    G.nodes[node]["size"] = G.degree(node)

data2 = networkx2Sigma(G)

# or directly from JSON, using graphology format
data = json.load(open("artic.json",encoding="utf-8"))
max_size = max([node_data["attributes"]["size"] for node_data in data["nodes"] ])
for node_data in data["nodes"]:
    node_data["attributes"]["size"] /= max_size
    node_data["attributes"]["size"] *= 20
    node_data["attributes"]["size"] += 5



app.layout = html.Div(
  [
    html.H1("Hello World ! ",style={"fontFamily":"Arial"}),
    SigmaJSComponent(
      id='graph_container',
      graph_data=data,style={"height":"500px","width":"50%","float":"left"},
      settings={
        "minCameraRatio": 0.1,
        "maxCameraRatio": 10,
      },
      layoutSettings={
        "outboundAttractionDistribution": True,
        "barnesHutOptimize": True,
        "adjustSizes": True,
        "linLogMode": True
      },
      layoutNumberOfIteration=200,nodeFocused="1",zoom={"duration":1000,"factor":10}
    ),
    SigmaJSComponent(
      id='graph_container2',
      graph_data=data2,style={"height":"500px","width":"50%","float":"left"},
      settings={
        "minCameraRatio": 0.1,
        "maxCameraRatio": 10,
      },
      layoutSettings={
        "outboundAttractionDistribution": True,
        "barnesHutOptimize": True,
        "adjustSizes": True,
        "linLogMode": True
      },
      layoutNumberOfIteration=200,
    )
  ]
)

if __name__ == '__main__':
    app.run_server(debug=True)
