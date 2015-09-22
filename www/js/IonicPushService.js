angular.module('IonicPushModule', [])
.service('IonicPushService', ['$rootScope','$ionicUser', '$window', '$ionicPush',
function($rootScope, $ionicUser, $window, $ionicPush) {
    
    var service = this;
    
    service.registerForPush = function () {
        var user = $ionicUser.get();
        console.log(user);
        if(!user.user_id) {
          // Set your user_id here, or generate a random one.
          user.user_id = $ionicUser.generateGUID();
        }
    
        // Add some metadata to your user object.
        angular.extend(user, {
          tk_id: $window.localStorage["userID"],
          
        });
    
        // Identify your user with the Ionic User Service
        $ionicUser.identify(user).then(function(){
          
          console.log('Identified user ' + user.email + '\n ID ' + user.user_id);
        });
        
        // Register with the Ionic Push service.  All parameters are optional.
        $ionicPush.register({
            canShowAlert: true, //Can pushes show an alert on your screen?
            canSetBadge: true, //Can pushes update app icon badges?
            canPlaySound: true, //Can notifications play a sound?
            canRunActionsOnWake: true, //Can run actions outside the app,
            onNotification: function(notification) {
            // Handle new push notifications here
            console.log(notification);
                return true;
            }
        });
        
        $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
            console.log("Successfully registered token " + data.token);
            console.log('Ionic Push: Got token ', data.token, data.platform);
            
        });
        //curl -u 1b03b9932d2c63c75edcdd7df49c48f6e06895a6f74a8997: -H "Content-Type: application/json" -H "X-Ionic-Application-Id: 354d5be3" https://push.ionic.io/api/v1/push -d '{"tokens":["DEV-b09d0193-97de-4a8f-be61-60f36e7d0e71"],"notification":{"alert":"I come from planet Ion."}}'
        //DEV-b09d0193-97de-4a8f-be61-60f36e7d0e71
        
    };
}]);