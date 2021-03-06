'use strict';
ecomApp.factory('OrderService', ['$http', '$q','$cookies', function($http, $q,$cookies){

	return {
		    
	     addNewOrder: function(orderDTO) {
		  return $http.post(sessionStorage.getItem('apiUrl')+'/core/order/',orderDTO)
				.then(
						function(response){
							return response.data;
						}, 
						function(errResponse){
							console.error('errResponseError creating new order'+errResponse);
							return $q.reject(errResponse);
						}
				);
         },
         
         getOrderHistory: function(user) {
   		  return $http.get(sessionStorage.getItem('apiUrl')+'/orderhistory/orderHistory/search/findByUserId?userId='+user)
   				.then(
   						function(response){
   							return response.data._embedded;
   						}, 
   						function(errResponse){
   							console.error('errResponseError retriving history'+errResponse);
   							return $q.reject(errResponse);
   						}
   				);
            },
            
            cancelOrder: function(orderId) {
         		  return $http.delete(sessionStorage.getItem('apiUrl')+'/core/order/'+orderId)
         				.then(
         						function(response){
         							return response;
         						}, 
         						function(errResponse){
         							console.error('errResponseError while cancel order'+errResponse);
         							return $q.reject(errResponse);
         						}
         				);
            },
            getOrderByStatus: function(status) {
       		  return $http.get(sessionStorage.getItem('apiUrl')+'/orderhistory/orderHistory/search/findByOrderStatus?orderStatus='+status)
       				.then(
       						function(response){
       							return response.data._embedded.orderHistory;
       						}, 
       						function(errResponse){
       							console.error('errResponseError while cancel order'+errResponse);
       							return $q.reject(errResponse);
       						}
       				);
          },
          
          shipOrder: function(orderId) {
        	  var shippingDTO={"orderId":orderId};
     		  return $http.post(sessionStorage.getItem('apiUrl')+'/shipping/shipping',shippingDTO)
     				.then(
     						function(response){
     							return response;
     						}, 
     						function(errResponse){
     							console.error('errResponseError while shipping order'+errResponse);
     							return $q.reject(errResponse);
     						}
     				);
        }, 
        
        deliverOrder: function(orderId,isDelivered) {
      	  var deliveryDTO={"orderId":orderId ,"delivered":isDelivered };
   		  return $http.post(sessionStorage.getItem('apiUrl')+'/delivery/delivery',deliveryDTO)
   				.then(
   						function(response){
   							return response;
   						}, 
   						function(errResponse){
   							console.error('errResponseError while shipping order'+errResponse);
   							return $q.reject(errResponse);
   						}
   				);
      }, 
            
         
        
	};

}]);
