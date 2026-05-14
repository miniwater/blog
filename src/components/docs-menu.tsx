import { useState, useEffect } from "react"
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type { TreeNode } from "@/util/tree";
import { cn } from "@/lib/utils"

export function CollapsibleFileTree({ docTree }: { docTree: TreeNode[] }) {

    const [activeSlug, setActiveSlug] = useState<string>("")

    useEffect(() => {
        // 只有在 activeSlug 为空时（初次加载）才去匹配 URL
        if (!activeSlug) {
            const currentPath = window.location.href;
            setActiveSlug(currentPath);
        }
    }, []);

    const renderItem = (fileItem: TreeNode) => {
        const itemSlug = fileItem.slug?.startsWith('/') ? fileItem.slug : `/${fileItem.slug}`;
        const isActive = activeSlug === itemSlug || activeSlug === itemSlug.replace(/\/$/, "");

        if (fileItem.children && fileItem.children.length > 0) {
            return (
                <Collapsible key={fileItem.name}>
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
                        >
                            <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                            {/* <FolderIcon /> */}
                            {fileItem.name}
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1 ml-5 style-lyra:ml-4">
                        <div className="flex flex-col gap-1">
                            {fileItem.children.map((child) => renderItem(child))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )
        }
        return (
            <Button
                key={fileItem.name}
                variant="ghost"
                size="sm"
                className={cn(
                    "w-full justify-start gap-2 text-foreground",
                    isActive 
                        ? "bg-muted" 
                        : ""
                )}
                asChild
                onClick={() => setActiveSlug(itemSlug)}
            >
                <a href={fileItem.slug}>
                    <FileIcon />
                    <span>{fileItem.name}</span>
                </a>
            </Button>
        )
    }

    return (
        <div className="flex flex-col gap-1">
            {docTree.map((item) => renderItem(item))}
        </div>
    )
}
