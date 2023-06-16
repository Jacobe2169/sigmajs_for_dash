# SigmaJS for Dash

SigmaJS for Dash is a component that allows to bring SigmaJS graph renderer to your Dash app.


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

Then, you should see the following graph : 

![Screenshot of the app in usage.py](documentation/usage_example.png)

### Use the component

First, let's setup a basic Dash application with the following script.

```python
import sigmajs_for_dash
from sigmajs_for_dash.utils import networkx2Sigma

from dash import Dash, html
import networkx as nx
import json

app = Dash(__name__)


app.layout = html.Div([
    html.H1("Hello")
])

if __name__ == '__main__':
    app.run_server(debug=True)
```

SigmaJs takes only network data using the JSON format. Therefore, there are two choices : create a python dictionnary following the JSON format described [here]([https://](https://graphology.github.io/serialization.html#format)) or use the `networkx` library and its `networkx.Graph` object. Concerning the latter, the `networkx2Sigma()` method will transform the networkx Graph into a dict usable for SigmaJS.

```python
# Using networkx 
G = nx.karate_club_graph()
data = networkx2Sigma(G)

# or directly from JSON, using graphology format
data = json.load(open("artic.json",encoding="utf-8")) # File available in the repository
```

Once your network data is ready, simply add the component in your Dash app layout :

```python
app.layout = html.Div([
        html.H1("Hello"),
        sigmajs_for_dash.SigmaJSComponent(
        id='graph_container',label="graph_container",
        graph_data=data,style={"height":"600px","width":"600px"}
    )
])
```

# Acknowledgments

This library is a simple wrapper around the fabulous SigmaJS(+ graphology) library proposed by the Sciences-Po Médialab and OuestWare. Check their [website](https://www.sigmajs.org/) ! 