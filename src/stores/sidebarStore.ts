// src/stores/sidebarStore.ts
import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

// 桌面端状态（继续使用持久化）
export const isSidebarOpen = persistentAtom<boolean>('sidebar_open_state', true, {
  encode: JSON.stringify,
  decode: JSON.parse
});

// 移动端状态（通常不需要持久化，频繁切换页面时默认关闭即可）
export const isMobileSidebarOpen = atom(false); 

export function toggleSidebar(isMobile: boolean = false) {
  if (isMobile) {
    isMobileSidebarOpen.set(!isMobileSidebarOpen.get());
  } else {
    isSidebarOpen.set(!isSidebarOpen.get());
  }
}

export function setSidebarOpen(open: boolean) {
  isSidebarOpen.set(open);
}

export function setMobileSidebarOpen(open: boolean) {
  isMobileSidebarOpen.set(open);
}
