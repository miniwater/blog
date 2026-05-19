import * as React from "react"
import { useState, useEffect } from "react";
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
import { ExpandIcon, ShrinkIcon } from "lucide-react"
import { toast } from "sonner"

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

    // 定义状态
    const [formData, setFormData] = useState({
        author: '',
        email: '',
        url: '',
    });

    // 2. 组件加载时自动读取并填充
    useEffect(() => {
        setFormData({
            author: localStorage.getItem('author') || '',
            email: localStorage.getItem('email') || '',
            url: localStorage.getItem('url') || '',
        });
    }, []);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        // 表单验证：确保必填项（比如昵称和邮箱）不为空
        if (!text.trim() ) {
            toast.error("哎呀，忘记评论啦")
            return;
        }

        // 验证通过，将最新的数据持久化到本地，下次来就不用再填了
        localStorage.setItem('author', formData.author);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('url', formData.url);

        // 执行发送给后端的逻辑
        console.log('准备提交的数据：', formData);
        console.log(text);
        toast.success("提交成功！")
        // try {
        //     // 示例：发送异步请求
        //     // await myApi.submitComment(formData);
        //     alert('提交成功！');
        // } catch (error) {
        //     alert('提交失败，请重试');
        // }
    };

    return (

        <Card className="mx-auto w-full " >
            <CardHeader>
                <CardTitle>评论</CardTitle>
                <CardDescription>爱评论的人，运气不会太差</CardDescription>
            </CardHeader>
            <CardContent>
                <FieldGroup className="grid w-full ">
                    <Collapsible
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        className="flex flex-col gap-3"
                    >
                        <CollapsibleTrigger asChild>
                            <Button variant="outline" className="w-full">
                                添加个人信息
                                {isOpen ? (<ShrinkIcon />) : <ExpandIcon />}
                            </Button>
                        </CollapsibleTrigger>
                        {/* aaaa */}
                        <CollapsibleContent className="grid w-full md:grid-cols-3 gap-2">
                            <Field>
                                <FieldLabel htmlFor="author">昵称</FieldLabel>
                                <Input id="author" name="author" type="text" placeholder="昵称" value={formData.author} onChange={(e) => handleChange('author', e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">邮箱</FieldLabel>
                                <Input id="email" name="email" type="text" placeholder="邮箱" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="url">网址</FieldLabel>
                                <Input id="url" name="url" type="text" placeholder="网址" value={formData.url} onChange={(e) => handleChange('url', e.target.value)} />
                            </Field>
                        </CollapsibleContent>


                    </Collapsible>
                    <Field>
                        <FieldLabel htmlFor="comment">
                            留下评论
                        </FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea
                                id="comment"
                                placeholder="说点什么吧..."
                                value={text}                 // 3. 绑定 value
                                onChange={handleTextChange} // 4. 绑定 onChange 事件
                                name="comment"
                                required
                            />
                            <InputGroupAddon align="block-end">
                                <InputGroupText>
                                    {text.length}/{maxLength}
                                </InputGroupText>
                                <InputGroupButton variant="default" size="sm" className="ml-auto" type="submit" onClick={handleSubmit}>
                                    发布评论
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription>
                            善语结善缘
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </CardContent>
        </Card>


    )
}
