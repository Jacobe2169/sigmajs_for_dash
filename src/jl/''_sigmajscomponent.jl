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
- `label` (String; required): Label
- `settings` (Dict; optional): Settings
- `style` (Dict; optional): Inline Style
"""
function ''_sigmajscomponent(; kwargs...)
        available_props = Symbol[:id, :className, :graph_data, :label, :settings, :style]
        wild_props = Symbol[]
        return Component("''_sigmajscomponent", "SigmaJSComponent", "sigmajs_for_dash", available_props, wild_props; kwargs...)
end

