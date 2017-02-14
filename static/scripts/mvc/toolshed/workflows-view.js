define([ "mvc/toolshed/toolshed-model", "mvc/toolshed/util" ], function(toolshed_model) {
    var View = Backbone.View.extend({
        el: "#center",
        defaults: [ {} ],
        initialize: function() {
            var that = this;
            this.model = new toolshed_model.WorkflowTools(), this.listenTo(this.model, "sync", this.render), 
            this.model.fetch(), that.render();
        },
        render: function() {
            var that = this, workflows_missing_tools = that.templateWorkflows, workflows = that.model.models;
            _.each(workflows.attributes, function(wo) {
                console.log({
                    wo: workflows.get(wo)
                });
            }), console.log(workflows), that.$el.html(workflows_missing_tools({
                workflows: workflows
            })), $("#center").css("overflow", "auto"), that.bindEvents();
        },
        bindEvents: function() {
            var that = this;
            $(".show_wf_repo").on("click", function() {
                var tool_ids = $(this).attr("data-toolids"), toolshed = $(this).attr("data-shed"), api_url = Galaxy.root + "api/tool_shed/repository", params = {
                    tool_ids: tool_ids
                };
                $.get(api_url, params, function(data) {
                    repository_id = data.repository.id;
                    var new_route = "repository/s/" + toolshed.replace(/:/g, "%3a").replace(/\//g, "%2f") + "/r/" + data.repository.id;
                    Backbone.history.navigate(new_route, {
                        trigger: !0,
                        replace: !0
                    });
                });
            }), $("#from_workflow").on("click", that.loadWorkflows);
        },
        reDraw: function(options) {
            this.$el.empty(), this.initialize(options), this.model.fetch(), this.render(options);
        },
        templateWorkflows: _.template([ '<table id="workflows_missing_tools" class="grid" border="0" cellpadding="2" cellspacing="2" width="100%">', '<thead id="grid-table-header">', "<tr>", '<th class="datasetRow">Workflows</th>', '<th class="datasetRow">Tool IDs</th>', '<th class="datasetRow">Shed</th>', '<th class="datasetRow">Name</th>', '<th class="datasetRow">Owner</th>', '<th class="datasetRow">Actions</th>', "</tr>", "</thead>", "<tbody>", "<% _.each(workflows, function(workflow) { %>", "<tr>", '<td class="datasetRow">', '<ul class="workflow_names">', '<% _.each(workflow.get("workflows"), function(name) { %>', '<li class="workflow_names"><%= name %></li>', "<% }); %>", "</ul>", "</td>", '<td class="datasetRow">', '<ul class="workflow_tools">', '<% _.each(workflow.get("tools"), function(tool) { %>', '<li class="workflow_tools"><%= tool %></li>', "<% }); %>", "</ul>", "</td>", '<td class="datasetRow"><%= workflow.get("shed") %></td>', '<td class="datasetRow"><%= workflow.get("repository") %></td>', '<td class="datasetRow"><%= workflow.get("owner") %></td>', '<td class="datasetRow">', '<ul class="workflow_tools">', '<li class="workflow_tools">', '<input type="button" class="show_wf_repo btn btn-primary" data-shed="<%= workflow.get("shed") %>" data-owner="<%= workflow.get("owner") %>" data-repo="<%= workflow.get("repository") %>" data-toolids="<%= workflow.get("tools").join(",") %>" value="Preview" /></li>', '<li><input type="button" class="queue_wf_repo btn btn-primary" data-shed="<%= workflow.get("shed") %>" data-owner="<%= workflow.get("owner") %>" data-repo="<%= workflow.get("repository") %>" data-toolids="<%= workflow.get("tools").join(",") %>" value="Add to queue" /></li>', "</ul>", "</td>", "</tr>", "<% }); %>", "</ul>", "</div>" ].join(""))
    });
    return {
        Workflows: View
    };
});