jQuery.sap.declare("Routing.Component");
jQuery.sap.require("Routing.MyRouter");
sap.ui.core.UIComponent.extend("Routing.Component",{
	metadata:{
		routing:{
			config:{
				routerClass: Routing.MyRouter,
				viewType:"XML",
				viewPath:"Routing.routingxmlview",
				targetControl:"navContainer",
				clearTarget:false,
			},
			routes:[
			       {
			        	pattern:"",
			        	name:"Master",
			        	view:"Master",
			        	targetAggregation:"pages",
			        	 targetControl:"navContainer",
			        	
			        },
			        {
			        	pattern:"Detail/{context}",
     	        	   name:"Detail",
     	        	   view:"Detail",
     	        	   targetAggregation:"detailPages",
     	        	   targetControl:"navContainer",
			        },
			        ]
		}
	   
	},

	
	
	init:function(){
		
		
		console.log("Hi inside the init method of the component")
		//jQuery.sap.require("sap.ui.core.routing.History");
		jQuery.sap.require("Routing.MyRouter");
		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		var router = this.getRouter();
		console.log(router);
		
		
		/*router.myNavBack=Routing.MyRouter.myNavBack;
		router.myNavToWithoutHash=Routing.MyRouter.myNavToWithoutHash;*/
		
	 
		
		this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
		console.log("before Initialize "+this.routeHandler);
		console.log(this.routeHandler);
		router.initialize();
	 
		
	},
	
	
	destroy:function(){
		if(this.routeHandler){
			this.routeHandler.destroy();
		}
		sap.ui.core.UIComponent.prototype.destroy.apply(this,arguments);
	},
	
	
	
	
	
	
	createContent:function(){
		var oView = sap.ui.view({
			id:"app",
			viewName:"Routing.routingxmlview.App",
			type:"JS",
			viewData:{ component:this }
		});
	
		var oModel = new sap.ui.model.json.JSONModel("model/Demo.json");
		oView.setModel(oModel);
		
		var i18nModel =  new sap.ui.model.resource.ResourceModel({
			bundleUrl:"i18n/messageBundle.properties",
		});
		oView.setModel(i18nModel,"i18n");
		
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone: sap.ui.Device.system.phone,
			listMode:(sap.ui.Device.system.phone)?"None":"SingleSelectMaster",
			listItemType:(sap.ui.Device.system.phone)?"Active":"Inactive"	
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel,"device");
		
		return oView;
	},
});	