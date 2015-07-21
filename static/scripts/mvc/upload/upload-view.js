define(["utils/utils","mvc/ui/ui-modal","mvc/ui/ui-tabs","mvc/upload/upload-button","mvc/upload/upload-view-default","mvc/upload/upload-view-composite"],function(a,b,c,d,e,f){return Backbone.View.extend({options:{nginx_upload_path:"",ftp_upload_site:"n/a",default_genome:"?",default_extension:"auto",height:500,width:900,auto:{id:"auto",text:"Auto-detect",description:"This system will try to detect the file type automatically. If your file is not detected properly as one of the known formats, it most likely means that it has some format problems (e.g., different number of columns on different rows). You can still coerce the system to set your data to the format you think it should be.  You can also upload compressed files, which will automatically be decompressed."}},modal:null,ui_button:null,current_history:null,list_extensions:[],list_genomes:[],initialize:function(b){var c=this;this.options=a.merge(b,this.options),this.ui_button=new d.Model,this.ui_button_view=new d.View({model:this.ui_button,onclick:function(a){a.preventDefault(),c.show()},onunload:function(){}}),$(".with-upload-button").append(this.ui_button_view.$el);var c=this;a.get({url:galaxy_config.root+"api/datatypes?extension_only=False",success:function(a){for(key in a)c.list_extensions.push({id:a[key].extension,text:a[key].extension,description:a[key].description,description_url:a[key].description_url});c.list_extensions.sort(function(a,b){return a.text>b.text?1:a.text<b.text?-1:0}),c.options.datatypes_disable_auto||c.list_extensions.unshift(c.options.auto)}}),a.get({url:galaxy_config.root+"api/genomes",success:function(a){for(key in a)c.list_genomes.push({id:a[key][1],text:a[key][0]});c.list_genomes.sort(function(a,b){return a.id==c.options.default_genome?-1:b.id==c.options.default_genome?1:a.text>b.text?1:a.text<b.text?-1:0})}})},show:function(){var a=this;return Galaxy.currHistoryPanel&&Galaxy.currHistoryPanel.model?(this.refresh(),this.modal||(this.tabs=new c.View,this.default_view=new e(this),this.tabs.add({id:"regular",title:"Regular",$el:this.default_view.$el}),this.composite_view=new f(this),this.tabs.add({id:"composite",title:"Composite",$el:$(this.composite_view.$el)}),this.modal=new b.View({title:"Download data directly from web or upload files from your disk",body:this.tabs.$el,height:this.options.height,width:this.options.width,closing_events:!0}),this.modal.$el.find(".modal-header").css({border:"none","padding-bottom":"0px"})),void this.modal.show()):void window.setTimeout(function(){a.show()},500)},refresh:function(){this.current_user=Galaxy.currUser.get("id"),this.current_history=null,this.current_user&&(this.current_history=Galaxy.currHistoryPanel.model.get("id"))}})});
//# sourceMappingURL=../../../maps/mvc/upload/upload-view.js.map