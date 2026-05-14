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
                const folderName: string | null = index > 0 ? parts[index - 1] : null;

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

    return root;
}