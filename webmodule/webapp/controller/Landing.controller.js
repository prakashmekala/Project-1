sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("webmodule.controller.Landing", {
            onInit: function () {
                let URL = "/v2/catalog/Products";
                $.ajax({
                    url: URL,
                    type: "GET",
                    success: function (oData,response) {
                        console.log("got the data")
    				},
                    error: function (error) {
                        sap.m.MessageBox.error(JSON.parse(error.responseText).message, {
                            actions: ["OK"],
                            onClose: function (sAction) { }
                        });
                    }
                });
                let that = this;
                let oDataModel = this.getOwnerComponent().getModel();
                let sModel=new sap.ui.model.json.JSONModel();
		        oDataModel.read("/Products", {
                    success: function(oData, response){
                        sModel.setData(oData.results);
                        that.getView().setModel(sModel,"Products");
                        // that.getView().getModel("StatementList").refresh();

                        // let savedVar = JSON.parse(localStorage.getItem("filterVariant"));
                        // if(savedVar.length>0){
                        //     let oBinding = this.getView().byId("idTable").getBinding("items");
                        //     oBinding.filter(savedVar, sap.ui.model.FilterType.Application).sOperationMode = "Client";
                        // } 
                    },
                    errors: function(error){
                        console.log(error);
                    }
                })
            }
        });
    });
