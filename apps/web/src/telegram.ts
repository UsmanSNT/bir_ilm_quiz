type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  initData: string;
  initDataUnsafe?: {
    user?: {
      id: number;
      first_name?: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
  };
  MainButton: {
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
  };
};

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export function getTelegramApp() {
  return window.Telegram?.WebApp;
}

export function bootTelegramMiniApp() {
  const app = getTelegramApp();
  if (!app) return false;
  app.ready();
  app.expand();
  return true;
}
