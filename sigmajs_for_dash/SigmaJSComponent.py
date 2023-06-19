# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class SigmaJSComponent(Component):
    """A SigmaJSComponent component.
Component to use SigmaJS renderer in a React/Dash application

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- className (string; optional):
    The class(es) used to identify this component.

- graph_data (dict; optional):
    Dict/JSON that contains graph definition. See
    https://graphology.github.io/serialization.html#format.

- label (string; required):
    Label.

- layout (string; default "forceAtlas2"):
    Layout used (if empty ).

- layoutNumberOfIteration (number; default 100):
    Number of iterations for the layout algorithm.

- layoutSettings (dict; optional):
    Settings dict that indicate layout settings.

- settings (dict; default { allowInvalidContainer: True }):
    Settings.

- style (dict; optional):
    Inline Style."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'sigmajs_for_dash'
    _type = 'SigmaJSComponent'
    @_explicitize_args
    def __init__(self, graph_data=Component.UNDEFINED, id=Component.UNDEFINED, className=Component.UNDEFINED, style=Component.UNDEFINED, label=Component.REQUIRED, settings=Component.UNDEFINED, layout=Component.UNDEFINED, layoutSettings=Component.UNDEFINED, layoutNumberOfIteration=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'graph_data', 'label', 'layout', 'layoutNumberOfIteration', 'layoutSettings', 'settings', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'graph_data', 'label', 'layout', 'layoutNumberOfIteration', 'layoutSettings', 'settings', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['label']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(SigmaJSComponent, self).__init__(**args)
