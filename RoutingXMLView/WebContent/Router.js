jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.declare("Routing.MyRouter");

sap.ui.core.routing.Router.extend("Routing.MyRouter",{
	
	constructor:function(){ 
		console.log("inside constructor");
		sap.ui.core.routing.Router.apply(this,arguments);
		this.oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
		console.log(this.oRouteMatchedHandler);
		
	},
	
	myNavBack:function(sRoute,mData){
		
		var oHistory = sap.ui.core.routing.History.getInstance();
		
		
		var sUrl = this.getURL(sRoute,mData);
		
		var sDirection = oHistory.getDirection(sUrl);
		if("Backwards"=== sDirection){
			window.history.go(-1);
		}else{
			var bReplace = true;
			this.navTo(sRoute,mData,bReplace);
		}
		
	 
	},
	
	/**
	 * @public Changes the view without changing the hash
	 *
	 * @param oOptions {object} must have the following properties
	 * <ul>
	 * 	<li> currentView : the view you start the navigation from.</li>
	 * 	<li> targetViewName : the fully qualified name of the view you want to navigate to.</li>
	 * 	<li> targetViewType : the viewtype eg: XML</li>
	 * 	<li> isMaster : default is false, true if the view should be put in the master</li>
	 * 	<li> transition : default is "show", the navigation transition</li>
	 * 	<li> data : the data passed to the navContainers livecycle events</li>
	 * </ul>
	 */
	
	myNavToWithoutHash:function(viewName,viewType,master,data){
		//var oSplitApp = this._findSplitApp(oOptions.currentView);
		var oSplitApp = sap.ui.getCore().byId("navContainer");
		var oView = this.getView(viewName, viewType);
		oSplitApp.addPage(oView, master);
		oSplitApp.to(oView.getId(),"show", data);
	},
	
	 
});
