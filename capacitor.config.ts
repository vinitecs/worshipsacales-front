import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wrs.app',
  appName: 'worship_scales_web',
  webDir: 'www',
  bundledWebRuntime: false,
  
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '34774580961-r5e7pboqblk4crtr7hq2ui1on1dlg1rf.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },

  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: [
      'http://192.168.100.21:8080'
    ]
  }
};

export default config;
