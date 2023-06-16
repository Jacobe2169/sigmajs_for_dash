import networkx as nx


def networkx2Sigma(G : nx.Graph, layout_function = nx.spring_layout):
    data = {"options":{
                "type": "directed" if G.is_directed() else "undirected",
                "multi": True if G.is_multigraph() else False,
                "allowSelfLoops": True
                },
            "attributes":G.graph,
            "nodes":[{"key":node_id,"attributes":attributes }for node_id,attributes in dict(G.nodes(data=True)).items()],
            "edges":[{"key":idx,"source":src,"target":tar,'attributes':attr}for idx,(src,tar,attr) in enumerate(list(G.edges(data=True)))]
    }
    absence_of_layout_info=False
    for node_data in data["nodes"]:
        if not "x" in node_data["attributes"] or not "y" in node_data["attributes"]:
            absence_of_layout_info= True
            break

    if absence_of_layout_info:
        layout = layout_function(G)
        for node_data in data["nodes"]:
            node_data["attributes"]["x"] = layout[node_data["key"]][0]
            node_data["attributes"]["y"] = layout[node_data["key"]][1]
        
    return data