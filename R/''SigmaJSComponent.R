# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''SigmaJSComponent <- function(id=NULL, className=NULL, graph_data=NULL, label=NULL, settings=NULL, style=NULL) {
    
    props <- list(id=id, className=className, graph_data=graph_data, label=label, settings=settings, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'SigmaJSComponent',
        namespace = 'sigmajs_for_dash',
        propNames = c('id', 'className', 'graph_data', 'label', 'settings', 'style'),
        package = 'sigmajsForDash'
        )

    structure(component, class = c('dash_component', 'list'))
}
