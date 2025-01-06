// Handle incoming push event and display the notification
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
console.log("data", data);
  const options = {
    body: data.body || 'No message body',
    icon: data.icon || 'https://www.tansa.com/wp-content/themes/yootheme/cache/be/Logo_Tansa-be1b649c.jpeg',
    badge: data.badge || 'https://styleguard.com/wp-content/themes/yootheme/cache/20/APSG5-20dfa13c.png',
    image: data.image || null, // Optional banner image
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || [],
    data: data.data || {}, // Pass custom data for handling in click events
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Default Title', options)
  );
});

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
  const clickedAction = event.action; // Check which action button was clicked
  const notificationData = event.notification.data || {};
  console.log(event);
  event.notification.close(); // Close the notification

  if (clickedAction === 'join') {
    // Action: Join the meeting
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (let client of clientList) {
          if (client.url === notificationData.url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(notificationData.url);
        }
      })
    );
  } else if (clickedAction === 'dismiss') {
    // Action: Dismiss the notification
    console.log('Notification dismissed.');
  } else {
    // Default behavior: Open the URL
    event.waitUntil(
      clients.openWindow(notificationData.url || 'https://tansa.com')
    );
  }
});

// Optional: Handle silent notifications or background tasks
self.addEventListener('push', (event) => {
  console.log('Silent push received:', event.data ? event.data.json() : 'No data');
});
