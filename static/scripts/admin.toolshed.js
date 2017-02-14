define([ "mvc/toolshed/shed-list-view", "mvc/toolshed/categories-view", "mvc/toolshed/repositories-view", "mvc/toolshed/repository-view", "mvc/toolshed/repository-queue-view", "mvc/toolshed/repo-status-view", "mvc/toolshed/workflows-view" ], function(mod_shed_list_view, mod_categories_view, mod_repositories_view, mod_repository_view, mod_repoqueue_view, mod_repo_status_view, mod_workflows_view) {
    var AdminToolshedRouter = Backbone.Router.extend({
        initialize: function() {
            this.routesHit = 0, Backbone.history.on("route", function() {
                this.routesHit++;
            }, this), this.bind("route", this.trackPageview);
        },
        routes: {
            "": "toolsheds",
            sheds: "toolsheds",
            queue: "queue",
            workflows: "workflows",
            "status/r/:repositories": "status",
            status: "status",
            "categories/s/:tool_shed": "categories",
            "category/s/:tool_shed/c/:cateory_id": "repositories",
            "repository/s/:tool_shed/r/:repository_id": "repository"
        },
        back: function() {
            this.routesHit > 1 ? window.history.back() : this.navigate("#", {
                trigger: !0,
                replace: !0
            });
        }
    }), GalaxyAdminToolshedApp = Backbone.View.extend({
        app_config: {
            known_views: [ "toolsheds", "queue", "status", "categories", "repositories", "repoository" ]
        },
        initialize: function() {
            Galaxy.admintoolshedapp = this, this.admin_toolshed_router = new AdminToolshedRouter(), 
            $("#panel_header").append('<div class="unified-panel-header-inner"><a href="#/queue">Repository Queue</a></div>'), 
            this.admin_toolshed_router.on("route:queue", function() {
                Galaxy.admintoolshedapp.adminRepoQueueView ? Galaxy.admintoolshedapp.adminRepoQueueView.reDraw() : Galaxy.admintoolshedapp.adminRepoQueueView = new mod_repoqueue_view.RepoQueueView();
            }), this.admin_toolshed_router.on("route:toolsheds", function() {
                Galaxy.admintoolshedapp.adminShedListView ? Galaxy.admintoolshedapp.adminShedListView.reDraw() : Galaxy.admintoolshedapp.adminShedListView = new mod_shed_list_view.ShedListView();
            }), this.admin_toolshed_router.on("route:categories", function(tool_shed) {
                Galaxy.admintoolshedapp.adminShedCategoriesView ? Galaxy.admintoolshedapp.adminShedCategoriesView.reDraw({
                    tool_shed: tool_shed.replace(/\//g, "%2f")
                }) : Galaxy.admintoolshedapp.adminShedCategoriesView = new mod_categories_view.CategoryView({
                    tool_shed: tool_shed.replace(/\//g, "%2f")
                });
            }), this.admin_toolshed_router.on("route:repositories", function(tool_shed, category_id) {
                Galaxy.admintoolshedapp.adminShedCategoryView ? Galaxy.admintoolshedapp.adminShedCategoryView.reDraw({
                    tool_shed: tool_shed.replace(/\//g, "%2f"),
                    category_id: category_id
                }) : Galaxy.admintoolshedapp.adminShedCategoryView = new mod_repositories_view.Category({
                    tool_shed: tool_shed.replace(/\//g, "%2f"),
                    category_id: category_id
                });
            }), this.admin_toolshed_router.on("route:repository", function(tool_shed, repository_id) {
                Galaxy.admintoolshedapp.adminRepositoryView ? Galaxy.admintoolshedapp.adminRepositoryView.reDraw({
                    tool_shed: tool_shed.replace(/\//g, "%2f"),
                    repository_id: repository_id
                }) : Galaxy.admintoolshedapp.adminRepositoryView = new mod_repository_view.RepoDetails({
                    tool_shed: tool_shed.replace(/\//g, "%2f"),
                    repository_id: repository_id
                });
            }), this.admin_toolshed_router.on("route:status", function(repositories) {
                Galaxy.admintoolshedapp.adminRepoStatusView ? Galaxy.admintoolshedapp.adminRepoStatusView.reDraw({
                    repositories: repositories.split("|")
                }) : Galaxy.admintoolshedapp.adminRepoStatusView = new mod_repo_status_view.RepoStatus({
                    repositories: repositories.split("|")
                });
            }), this.admin_toolshed_router.on("route:workflows", function() {
                Galaxy.admintoolshedapp.adminWorkflowsView ? Galaxy.admintoolshedapp.adminWorkflowsView.reDraw() : Galaxy.admintoolshedapp.adminWorkflowsView = new mod_workflows_view.Workflows();
            }), Backbone.history.start({
                pushState: !1
            });
        }
    });
    return {
        GalaxyApp: GalaxyAdminToolshedApp
    };
});