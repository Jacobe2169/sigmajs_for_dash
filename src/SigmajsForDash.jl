
module SigmajsForDash
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/''_sigmajscomponent.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "sigmajs_for_dash",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "sigmajs_for_dash.min.js",
    external_url = "https://unpkg.com/sigmajs_for_dash@0.0.1/sigmajs_for_dash/sigmajs_for_dash.min.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "sigmajs_for_dash.min.js.map",
    external_url = "https://unpkg.com/sigmajs_for_dash@0.0.1/sigmajs_for_dash/sigmajs_for_dash.min.js.map",
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
