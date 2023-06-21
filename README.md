
<h1 float="left">
<img src="documentation/logo-sigma-ruby.svg" style="width:45px;margin-right:5px" /> SigmaJS for Dash<img src="documentation/plotly_logo_dark.png" style="width:140px" /> 
  
</h1>


SigmaJS for Dash is a component that bring SigmaJS network fast renderer to your Dash app.


**Available features :**

 * Highlight node neighbors by clicking it
 * Zoom on a node or specific coordinates
 * Node searching features
 * Works with networkx graph

## Setup

Run the following command to install the component.

```shell
pip install git+https://github.com/Jacobe2169/sigmajs_for_dash
```

## Get Started

### Try it ! 
A demo is available in the `usage.py` script. Just run the command :

```python
python usage.py
```

The application should render a network like the animated gif below.

![Screenshot of the app in usage.py](documentation/animated_component.gif)

### Use the component

Let's start with a simple Dash application. We'll use the following script.

```python
from sigmajs_for_dash import SigmaJSComponent
from sigmajs_for_dash.utils import networkx2Sigma

from dash import Dash, html
import networkx as nx
import json

app = Dash(__name__)


app.layout = html.Div([
    html.H1("Hello World")
])

if __name__ == '__main__':
    app.run_server(debug=True)
```

SigmaJS only accepts network data in JSON format. Therefore, there are two options: 

 1. Create a Python dictionary following the JSON format described [here](https://graphology.github.io/serialization.html#format).

```python
{
  "attributes": { # Graph attributes
    "name": "place holder"
  },
  "options": {
    "multi": False,
    "allowSelfLoops": True,
    "type": "directed"
  },
  "nodes": [ # Nodes declaration
    {
      "key": "53", # node id
      "attributes": {
        "label": "Changement Climatique", # node label (displayed on screen)
        "x": 639.0149, # node x position
        "y": -703.6634, # node y position
        "size": 99.99999, # node size (displayed on screen)
        "color": "#66ff66", # node color (displayed on screen)
        # Check SigmaJS's documentation for other graphical customization options 
      }
    },
    #...
    ],
   "edges":[ # Edges declaration
    {
      "key": "0", # edge id
      "source": "0", # edge source
      "target": "1", # edge target
      "attributes": {# edge attributes
        "weight": 1.0
      }
    },
    //...
   ]
```

 2. Use the [`networkx` ](https://networkx.org/) library and its `networkx.Graph` object. The latter requires the `networkx2Sigma()` function to convert the networkx graph into a SigmaJS usable dictionary.

```python
# Using networkx 
G = nx.karate_club_graph()
data = networkx2Sigma(G)
```

Once your network data is ready, simply add the component in your Dash app layout :

```python
app.layout = html.Div(
    [
        html.H1("Hello"),
        SigmaJSComponent(
            id='graph_container',label="graph_container",
            graph_data=data,style={"height":"600px","width":"600px"}
        )
    ]
)
```

# Acknowledgments

This library is a simple wrapper around the fabulous SigmaJS(+ graphology) library proposed by the Sciences-Po Médialab and OuestWare. Check their [website](https://www.sigmajs.org/) ! 