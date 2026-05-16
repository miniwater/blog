// src/stores/sidebarStore.ts
import { atom } from 'nanostores';

// 默认展开状态。你可以改用 localStorage 确保刷新也不丢失
export const isSidebarOpen = atom(true);

// 切换状态的方法
export function toggleSidebar() {
    isSidebarOpen.set(!isSidebarOpen.get());
}

// 或者是类似 shadcn 的 setOpen 方法
export function setSidebarOpen(open: boolean) {
    isSidebarOpen.set(open);
}