# AUTO GENERATED FILE - DO NOT EDIT

export ''_sigmajscomponent

"""
    ''_sigmajscomponent(;kwargs...)

A SigmaJSComponent component.
Component to use SigmaJS renderer in a React/Dash application
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `className` (String; optional): The class(es) used to identify this component.
- `graph_data` (Dict; optional): Dict/JSON that contains graph definition. See https://graphology.github.io/serialization.html#format
- `label` (String; optional): Label
- `layout` (String; optional): Layout used 
 - if empty will used ForceAltlas2
 - if empty string will used existing coordinates)
- `layoutNumberOfIteration` (Real; optional): Number of iterations for the layout algorithm
- `layoutSettings` (Dict; optional): Settings dict that indicate layout settings
- `nodeFocused` (String | Real; optional): Focus on a specific node : show only node and its neighbors
- `settings` (Dict; optional): Settings
- `style` (Dict; optional): Inline Style
- `zoom` (optional): Zoom control. zoom has the following type: lists containing elements 'duration', 'factor', 'coordinates'.
Those elements have the following types:
  - `duration` (Real; optional): Duration of the zoom animation
  - `factor` (Real; optional): Zoom intensity
  - `coordinates` (optional): Zoom coordinates. coordinates has the following type: lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (Real; optional): x coordinate to zoom
  - `y` (Real; optional): y coordinate to zoom
"""
function ''_sigmajscomponent(; kwargs...)
        available_props = Symbol[:id, :className, :graph_data, :label, :layout, :layoutNumberOfIteration, :layoutSettings, :nodeFocused, :settings, :style, :zoom]
        wild_props = Symbol[]
        return Component("''_sigmajscomponent", "SigmaJSComponent", "sigmajs_for_dash", available_props, wild_props; kwargs...)
end

