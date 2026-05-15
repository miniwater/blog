import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRight, FolderIcon } from "lucide-react"
import type { TreeNode } from "@/util/tree";

export function NavWorkspaces({
  docTree,
}: {
  docTree: TreeNode[];
}) {
  const renderItem = (fileItem: TreeNode) => {

    if (fileItem.children && fileItem.children.length > 0) {
      return (
        <Collapsible key={fileItem.name}>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={fileItem.name} className="group/menu-button">
                {/* <FolderIcon /> */}
                <span>{fileItem.name}</span>
                <ChevronRight className={`ml-auto transition-transform duration-200 group-data-[state=open]/menu-button:rotate-90`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="mr-0 pr-0">
                {fileItem.children.map((child) => renderItem(child))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      )
    }
    return (
      <SidebarMenuSubItem key={fileItem.name}>
        <SidebarMenuSubButton asChild>
          <a href={fileItem.slug}>
            {/* <FileIcon /> */}
            <span>{fileItem.name}</span>
          </a>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>文档</SidebarGroupLabel>
      <SidebarMenu>
        {docTree.map((item) => renderItem(item))}
      </SidebarMenu>
    </SidebarGroup>
  )
}