# PWA Implementation Guide

This document provides instructions for working with the Progressive Web App (PWA) features of this portfolio website.

## PWA Icons

The application requires two icon sizes for PWA functionality:

- `pwa-192x192.png` (192x192 pixels)
- `pwa-512x512.png` (512x512 pixels)

### Generating the Icons

1. Open the `generate-pwa-icons.html` file in a browser (you can use the local development server and navigate to `/generate-pwa-icons.html`)
2. Click the "Generate Icons" button
3. Right-click on each canvas and select "Save image as..."
4. Save the images with the names `pwa-192x192.png` and `pwa-512x512.png` in the `public` folder

## Testing PWA Functionality

To test the PWA functionality:

1. Build the application for production:
   ```
   npm run build
   ```

2. Serve the production build:
   ```
   npm run preview
   ```

3. Open the application in Chrome
4. Open Chrome DevTools (F12 or Ctrl+Shift+I)
5. Go to the "Application" tab
6. In the left sidebar, under "Application", select "Service Workers"
7. You should see a registered service worker for the application
8. You can test offline functionality by:
   - Checking the "Offline" checkbox in the Service Workers panel
   - Refreshing the page to see if it loads without network connection

## PWA Features Implemented

This application includes the following PWA features:

1. **Service Worker**: Provides offline capabilities and caches assets
2. **Web App Manifest**: Allows the app to be installed on devices
3. **Offline Support**: Core assets are cached for offline use
4. **Update Notification**: Users are notified when a new version is available
5. **Responsive Design**: Works well on all device sizes

## Customizing PWA Settings

To customize the PWA settings, you can modify:

1. The PWA configuration in `vite.config.js` under the `VitePWA` plugin options
2. The manifest settings in the same file to change app name, colors, etc.
3. The caching strategies in the `workbox` section of the configuration

## Troubleshooting

If you encounter issues with the PWA functionality:

1. Clear the application cache in Chrome DevTools:
   - Go to Application > Storage > Clear site data
2. Unregister the service worker:
   - Go to Application > Service Workers > Unregister
3. Rebuild and restart the application

For more information on PWA development, refer to the [vite-plugin-pwa documentation](https://vite-pwa-org.netlify.app/).