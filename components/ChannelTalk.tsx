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
      pluginKey: '43dabff9-cf21-4fe8-a7c9-984e3ffa9749',
      locale: 'ko',
      zIndex: 10000000,
      // 채널톡 자체 커스터마이징 옵션 사용
      customLauncherSelector: '#custom-channel-button',
      hideChannelButtonOnBoot: false,
    }]);

    // 채널톡이 부팅되면 UI 커스터마이징
    ch.c(['onBoot', function() {
      // 채널톡 UI 커스터마이징
      if (window.ChannelIO) {
        window.ChannelIO('updateAppearance', {
          theme: 'light',
          accentColor: '#3B82F6',
          hideChannelButton: false
        });
      }

      // 강제로 CSS 주입하는 함수
      const injectStyles = () => {
        // 모든 가능한 선택자로 스타일 적용
        const styleContent = `
          /* 채널톡 런처 버튼 - 모든 가능한 선택자 */
          #ch-plugin #ch-plugin-launcher,
          #ch-plugin-launcher,
          .ch-launcher,
          [id*="ch-plugin-launcher"],
          div[id^="ch-plugin"] #ch-plugin-launcher {
            background: #3B82F6 !important;
            background-color: #3B82F6 !important;
            background-image: none !important;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3) !important;
          }

          #ch-plugin #ch-plugin-launcher:hover,
          #ch-plugin-launcher:hover,
          .ch-launcher:hover,
          [id*="ch-plugin-launcher"]:hover {
            background: #2563EB !important;
            background-color: #2563EB !important;
            background-image: none !important;
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4) !important;
            transform: scale(1.05) !important;
          }

          /* 버튼 내부 아이콘 */
          #ch-plugin #ch-plugin-launcher svg,
          #ch-plugin #ch-plugin-launcher svg path,
          #ch-plugin-launcher svg,
          #ch-plugin-launcher svg path {
            fill: #FFFFFF !important;
            color: #FFFFFF !important;
          }

          /* iframe 내부에 스타일 주입을 위한 시도 */
          #ch-plugin iframe {
            color-scheme: normal !important;
          }
        `;

        // 방법 1: style 태그를 head에 추가
        let style = document.getElementById('channel-custom-style') as HTMLStyleElement;
        if (!style) {
          style = document.createElement('style');
          style.id = 'channel-custom-style';
          style.type = 'text/css';
          document.head.appendChild(style);
        }
        style.innerHTML = styleContent;

        // 방법 2: 직접 요소에 인라인 스타일 적용
        const launcher = document.querySelector('#ch-plugin-launcher');
        if (launcher && launcher instanceof HTMLElement) {
          launcher.style.cssText = `
            background-color: #3B82F6 !important;
            background-image: none !important;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3) !important;
          `;
        }

        // 방법 3: ch-plugin 전체에 CSS 변수 적용
        const chPlugin = document.getElementById('ch-plugin');
        if (chPlugin && chPlugin instanceof HTMLElement) {
          chPlugin.style.setProperty('--ch-launcher-bg', '#3B82F6', 'important');
          chPlugin.style.setProperty('--ch-primary', '#3B82F6', 'important');
        }
      };

      // 여러 번 시도하여 스타일 확실히 적용
      injectStyles();
      setTimeout(injectStyles, 100);
      setTimeout(injectStyles, 500);
      setTimeout(injectStyles, 1000);
      setTimeout(injectStyles, 2000);
      setTimeout(injectStyles, 3000);
      setTimeout(injectStyles, 5000);

      // MutationObserver로 지속적으로 감시
      const observer = new MutationObserver(() => {
        const launcher = document.querySelector('#ch-plugin-launcher');
        if (launcher && launcher instanceof HTMLElement) {
          if (launcher.style.backgroundColor !== 'rgb(59, 130, 246)') {
            launcher.style.cssText = `
              background-color: #3B82F6 !important;
              background-image: none !important;
              box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3) !important;
            `;
          }
        }
      });

      // ch-plugin을 감시
      const chPlugin = document.getElementById('ch-plugin');
      if (chPlugin) {
        observer.observe(chPlugin, {
          attributes: true,
          attributeFilter: ['style'],
          childList: true,
          subtree: true
        });
      }
    }]);

  }, []);

  return null;
}