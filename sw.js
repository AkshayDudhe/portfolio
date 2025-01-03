self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}; // Parse the push payload

  const options = {
    body: data.body || 'Default notification body',
    icon: data.icon || 'icon.png',
    tag: data.tag || 'default-tag',
  };

  self.registration.showNotification(data.title || 'Hello world!', options);
});
