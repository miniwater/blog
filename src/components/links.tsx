import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { friends } from "@/content/friends";


export function FriendLinks() {
    return (
        friends.map((friend) => (
            < Card className="hover:shadow-md transition-shadow" >
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <CardTitle className="text-lg">{friend.name}</CardTitle>
                        <CardDescription className="line-clamp-1">{friend.description}{friend.avatar}</CardDescription>
                    </div>
                </CardHeader>
            </Card >
        ))
    )
}