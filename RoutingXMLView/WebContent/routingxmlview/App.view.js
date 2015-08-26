sap.ui.jsview("Routing.routingxmlview.App", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf routingxmlview.App
	*/ 
	getControllerName : function() {
		return "Routing.routingxmlview.App";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf routingxmlview.App
	*/ 
	createContent : function(oController) {
		this.setDisplayBlock(true);
 		return new sap.m.App("navContainer");
	}

});