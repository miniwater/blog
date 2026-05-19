import { config } from "@/config";

export interface TreeNode {
    name: string;
    slug: string;
    children: TreeNode[];
}

// 这里的 allDocs 可以用具体类型 CollectionEntry<'docs'>[]
export function getDocTree(allDocs: any[]) {
    const root: TreeNode[] = [];

    allDocs.forEach((doc) => {
        const parts: string[] = doc.id.split('/');
        let currentLevel = root;

        parts.forEach((part: string, index: number) => {
            // 预先处理好要显示的名称
            const cleanName = part.replace(/\.mdx?$/, '');

            // 查找当前层级是否已存在同名节点
            let existingNode = currentLevel.find((node) => node.name === cleanName);

            if (!existingNode) {
                let nodeSlug = parts.slice(0, index + 1).join('/');

                // 1. 安全地获取 folderName，如果不存在则为 null
                const folderName: string | null = index > 0 ? (parts[index - 1] || null) : null;

                // 2. 只有当 folderName 存在时，才进行同名逻辑判断
                const isIndex = part.toLowerCase() === 'index';
                const isSameAsFolder = folderName !== null && part.toLowerCase() === folderName.toLowerCase();

                if (isIndex || isSameAsFolder) {
                    // 缩短路径逻辑
                    nodeSlug = parts.slice(0, index).join('/');
                }

                existingNode = {
                    name: cleanName,
                    slug: new URL(`docs/${nodeSlug}`, config.url).href,
                    children: [],
                };
                currentLevel.push(existingNode);
            }

            // 将指针移向下一层级
            currentLevel = existingNode.children;
        });
    });

    // root.sort((a, b) => b.children.length - a.children.length)
    return sortTree(root);
}

function sortTree(nodes: TreeNode[]): TreeNode[] {
    nodes.forEach(node => {
        if (node.children.length > 0) {
            // 递归排序子节点
            sortTree(node.children);
        }
    });

    // 对当前层级进行排序
    return nodes.sort((a, b) => {
        const aHasChildren = a.children.length > 0;
        const bHasChildren = b.children.length > 0;

        // 情况 1: 一个有子节点，一个没有
        if (aHasChildren && !bHasChildren) return -1; // a（有子节点）排在前面
        if (!aHasChildren && bHasChildren) return 1;  // b（有子节点）排在前面

        // 情况 2: 两个都有子节点，或者两个都没有子节点（同类比较）
        // 按名称字母顺序排序，防止同类节点顺序混乱
        return a.name.localeCompare(b.name, 'zh-CN', { numeric: true });
    });
}