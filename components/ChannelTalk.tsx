'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    ChannelIO?: any;
    ChannelIOInitialized?: boolean;
  }
}

export default function ChannelTalk() {
  useEffect(() => {
    // Avoid duplicate initialization
    if (window.ChannelIOInitialized) {
      return;
    }

    const ChannelIO = function() {
      const ch: any = {
        q: []
      };

      ch.c = function(args: any) {
        ch.q.push(args);
      };

      if (typeof window !== 'undefined') {
        window.ChannelIO = ch;

        const loadScript = function() {
          if (window.ChannelIOInitialized) {
            return;
          }

          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';

          const firstScript = document.getElementsByTagName('script')[0];
          if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript);
          }

          window.ChannelIOInitialized = true;
        };

        if (document.readyState === 'complete') {
          loadScript();
        } else {
          window.addEventListener('DOMContentLoaded', loadScript);
          window.addEventListener('load', loadScript);
        }
      }

      return ch;
    };

    const ch = ChannelIO();

    // Initialize with your plugin key
    ch.c(['boot', {
      pluginKey: '43dabff9-cf21-4fe8-a7c9-984e3ffa9749'
    }]);

  }, []);

  return null;
}