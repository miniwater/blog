import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { friends } from "@/content/friends";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { SquareArrowOutUpRightIcon } from "lucide-react"

export function FriendLinks() {
    return (
        <ItemGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends
                .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
                .map((friend, index) => (
                    <Item key={friend.name} variant="outline">
                        <ItemMedia>
                            <Avatar>
                                <AvatarImage src={friend.avatar.src} />
                                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </ItemMedia>
                        <ItemContent className="gap-1">
                            <ItemTitle>{friend.name}</ItemTitle>
                            <ItemDescription>{friend.description}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <a href={friend.url} target="_blank" rel="noopener noreferrer">
                                    <SquareArrowOutUpRightIcon />
                                </a>
                            </Button>
                        </ItemActions>
                    </Item>
                ))}
        </ItemGroup>
    )
}