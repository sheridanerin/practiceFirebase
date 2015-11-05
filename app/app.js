angular.module('rtfmApp', ['ui.router', 'firebase'])

	.constant('fb', {url: 'https://rtfm-application.firebaseio.com'})

	.config(function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('threads', {
				url: '/threads', 
				templateUrl: 'app/views/threads.html',
				controller: 'threadsCtrl',
				resolve: {
					threadsRef: function(threadService) {
						return threadService.getThreads();
					}
				}
			})
			.state('thread', {
				url: '/threads/:threadId',
				templateUrl: 'app/views/thread.html',
				controller: 'threadCtrl',
				resolve: {
					threadRef: function(threadService, $stateParams) {
						return threadService.getThread($stateParams.threadId);
					},
					commentsRef: function(threadService, $stateParams) {
						return threadService.getComments($stateParams.threadId);
					}
				}
			});

		$urlRouterProvider.otherwise('/threads');

});