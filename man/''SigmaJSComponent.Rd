% Auto-generated: do not edit by hand
\name{''SigmaJSComponent}

\alias{''SigmaJSComponent}

\title{SigmaJSComponent component}

\description{
Component to use SigmaJS renderer in a React/Dash application
}

\usage{
''SigmaJSComponent(id=NULL, className=NULL, graph_data=NULL, label=NULL,
layout=NULL, layoutNumberOfIteration=NULL,
layoutSettings=NULL, nodeFocused=NULL, settings=NULL,
style=NULL, zoom=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{className}{Character. The class(es) used to identify this component.}

\item{graph_data}{Named list. Dict/JSON that contains graph definition. See https://graphology.github.io/serialization.html#format}

\item{label}{Character. Label}

\item{layout}{Character. Layout used 
 - if empty will used ForceAltlas2
 - if empty string will used existing coordinates)}

\item{layoutNumberOfIteration}{Numeric. Number of iterations for the layout algorithm}

\item{layoutSettings}{Named list. Settings dict that indicate layout settings}

\item{nodeFocused}{Character | numeric. Focus on a specific node : show only node and its neighbors}

\item{settings}{Named list. Settings}

\item{style}{Named list. Inline Style}

\item{zoom}{Lists containing elements 'duration', 'factor'.
those elements have the following types:
  - duration (numeric; optional): duration of the zoom animation
  - factor (numeric; optional): zoom intensity. Zoom control}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

