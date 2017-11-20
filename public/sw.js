var cacheName = 'product-hunt';

self.addEventListener('install', event => { event.waitUntil(
	caches.open(cacheName).then(cache => cache.addAll([
		'/bootstrap.js','/material.min.css','/material.min.js','/static/js/bundle.js','/index.html','/']))
	); 
});

//fetch
self.addEventListener('fetch',function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			if(response)
				return response;

			var fetchRequest = event.request.clone();
			return fetch(fetchRequest).then(function(fetchResponse){
				if(!fetchResponse || fetchResponse.status !== 0)
					return fetchResponse;

				var responseToCache = fetchResponse.clone();

				caches.open(cacheName).then(function(cache) {
					cache.put(event.request,responseToCache);
				});

				return fetchResponse;
			});
		})
	)
})

self.addEventListener('push', function (event) {

  var payload = event.data ? JSON.parse(event.data.text()) : 'no payload';

  var title = 'Progressive Times';

  // Determine the type of notification to display
  if (payload.type === 'register') {
    event.waitUntil(
      self.registration.showNotification(title, {
        body: payload.msg,
        url: payload.url,
        icon: payload.icon
      })
    );
  } else if (payload.type === 'actionMessage') {
    event.waitUntil(
      self.registration.showNotification(title, {
        body: payload.msg,
        url: payload.url,
        icon: payload.icon,
        actions: [
          { action: 'voteup', title: '👍 Vote Up' },
          { action: 'votedown', title: '👎 Vote Down' }]
      })
    );
  }
});