sap.ui.controller("Routing.routingxmlview.Master", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf routingxmlview.Master
*/
	 onInit: function () {
		 
		  this.router = sap.ui.core.UIComponent.getRouterFor(this);  
		    // set explored app's demo model on this sample
		    var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Routing.model", "/Demo.json"));
		    this.getView().setModel(oModel);
		  },

		  handleListSelect: function (oEvent) {
			  var model = oEvent.getSource().getModel();		
			  var context = oEvent.getSource().getBindingContext();
			  var headerModel = new sap.ui.model.json.JSONModel({
				  Manufacturer : model.getProperty(context +"/Manufacturer"),
					Type :model.getProperty(context +"/Type"),
				  Price :model.getProperty(context +"/Price")
				 
				});
				var detailView = sap.ui.getCore().byId("Detail");
				//alert(oModel.getProperty(context +"/price"));
				headerModel.setDefaultBindingMode("OneWay");
				detailView.setModel(headerModel,"headerDetails");
				//sap.ui.getCore().setModel(headerModel,"headerDetails");
				//alert(detailView);
			  this.router.navTo("Detail",context);  
},

handleListItemPress: function (oEvent) {
	var model = oEvent.getSource().getModel();		
	  var context = oEvent.getSource().getBindingContext();
	  var headerModel = new sap.ui.model.json.JSONModel({
		  Manufacturer : model.getProperty(context +"/Manufacturer"),
			Type :model.getProperty(context +"/Type"),
		  Price :model.getProperty(context +"/Price")
		 
		});
		var detailView = sap.ui.getCore().byId("Detail");
		alert(detailView);
		if (detailView === undefined) {
			detailView = sap.ui.xmlview("Detail", "Detail");
		}
		alert(detailView);
		var theView = sap.ui.core.Core().byId("detailView");
		alert(theView);
		headerModel.setDefaultBindingMode("OneWay");
		detailView.setModel(headerModel,"headerDetails");
		 this.router.navTo("Detail",context);  
},

onSearch : function (oEvt) {

    // add filter for search
    var aFilters = [];
    var sQuery = oEvt.getSource().getValue();
    if (sQuery && sQuery.length > 0) {
      var filter = new sap.ui.model.Filter("Manufacturer", sap.ui.model.FilterOperator.Contains, sQuery);
      aFilters.push(filter);
    }

    // update list binding
    var list = this.getView().byId("idList");
    var binding = list.getBinding("items");
    binding.filter(aFilters, "Application");
  },



});