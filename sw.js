self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}; // Parse the push payload

  const options = {
    body: data.body || 'Default notification body',
    icon: data.icon || 'icon.png',
    tag: data.tag || 'default-tag',
  };

  self.registration.showNotification(data.title || 'Hello world!', options);
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification when clicked

  const redirectUrl = event.notification.data.url; // Get the URL from the notification's data

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if the URL is already open in a tab
      for (let client of clientList) {
        if (client.url === redirectUrl && 'focus' in client) {
          return client.focus(); // Focus the existing tab with the same URL
        }
      }

      // If not, open the URL in a new tab
      if (clients.openWindow) {
        return clients.openWindow(redirectUrl); // Open the URL in a new tab
      }
    })
  );
});
