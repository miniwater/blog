import * as React from "react"
import { useState } from "react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Comment() {
    // 1. 定义状态来存储输入的文本
    const [text, setText] = useState("");
    const maxLength = 999; // 最大字数限制

    // 2. 处理输入变化的函数
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        // 如果不需要硬限制，可以去掉 if，只用 setText(value)
        if (value.length <= maxLength) {
            setText(value);
        }
    };

    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <FieldGroup className="max-w-sm">
            <Card className="mx-auto w-full max-w-xs" size="sm">
                <CardHeader>
                    <CardTitle>评论</CardTitle>
                    <CardDescription>Set the corner radius of the element.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Collapsible
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        className="flex items-start gap-2"
                    >
                        <FieldGroup className="grid w-full grid-cols-2 gap-2">
                            <Field>
                                <FieldLabel htmlFor="radius-x" className="sr-only">
                                    Radius X
                                </FieldLabel>
                                <Input id="radius" placeholder="0" defaultValue={0} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="radius-y" className="sr-only">
                                    Radius Y
                                </FieldLabel>
                                <Input id="radius" placeholder="0" defaultValue={0} />
                            </Field>
                            <CollapsibleContent className="col-span-full grid grid-cols-subgrid gap-2">
                                <Field>
                                    <FieldLabel htmlFor="radius-x" className="sr-only">
                                        Radius X
                                    </FieldLabel>
                                    <Input id="radius" placeholder="0" defaultValue={0} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="radius-y" className="sr-only">
                                        Radius Y
                                    </FieldLabel>
                                    <Input id="radius" placeholder="0" defaultValue={0} />
                                </Field>
                            </CollapsibleContent>
                        </FieldGroup>
                        <CollapsibleTrigger asChild>
                            <Button variant="outline" size="icon">
                                {isOpen ? <span /> : <span />}
                            </Button>
                        </CollapsibleTrigger>
                    </Collapsible>
                </CardContent>
            </Card>
            <Field>
                <FieldLabel htmlFor="block-end-input">Input</FieldLabel>
                <InputGroup className="h-auto">
                    <InputGroupInput id="block-end-input" placeholder="Enter amount" />
                    <InputGroupAddon align="block-end">
                        <InputGroupText>USD</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
                <FieldDescription>Footer positioned below the input.</FieldDescription>
            </Field>
            <Field>
                <FieldLabel htmlFor="block-end-textarea">
                    评论
                </FieldLabel>
                <InputGroup>
                    <InputGroupTextarea
                        id="block-end-textarea"
                        placeholder="说点什么吧..."
                        value={text}                 // 3. 绑定 value
                        onChange={handleTextChange} // 4. 绑定 onChange 事件
                    />
                    <InputGroupAddon align="block-end">
                        <InputGroupText>
                            {text.length}/{maxLength}
                        </InputGroupText>
                        <InputGroupButton variant="default" size="sm" className="ml-auto">
                            发布评论
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                    善语结善缘
                </FieldDescription>
            </Field>
        </FieldGroup>
    )
}
