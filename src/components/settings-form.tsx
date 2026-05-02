import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function SettingsForm() {
    return (
        <FieldSet>
            <FieldLegend>通用</FieldLegend>
            <FieldDescription>全局设置</FieldDescription>
            <FieldGroup>
                <FieldLabel>文本语言</FieldLabel>
                <Select defaultValue="cn">
                    <SelectTrigger>
                        <SelectValue placeholder="Choose department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>语言</SelectLabel>
                            <SelectItem value="cn">中文</SelectItem>
                            <SelectItem value="en" disabled>English(Beta)</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FieldDescription>
                    选择你喜欢的语言，默认是中文
                </FieldDescription>

                <FieldLabel>外观设置</FieldLabel>
                <ToggleGroup variant="outline" type="single" defaultValue="system">
                    <ToggleGroupItem value="light" aria-label="白天">
                        白天
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dark" aria-label="夜间">
                        夜间
                    </ToggleGroupItem>
                    <ToggleGroupItem value="system" aria-label="跟随系统">
                        跟随系统
                    </ToggleGroupItem>
                </ToggleGroup>

                <Field orientation="horizontal">
                    <Switch id="newsletter" />
                    <FieldLabel htmlFor="newsletter"
                    >Subscribe to the newsletter</FieldLabel
                    >
                </Field>

            </FieldGroup>
            <FieldLegend>评论设置</FieldLegend>
            <FieldDescription>以下是评论设置</FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="author">昵称</FieldLabel>
                    <Input id="author" name="author" autoComplete="off" placeholder="游客001" />
                    <FieldDescription>
                        如果你想在评论中显示昵称，请务必填写昵称
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">邮箱</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                    />
                    <FieldDescription>
                        如果你想收到评论回复通知，请务必填写邮箱地址
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="input-badge">
                        博客网址
                    </FieldLabel>
                    <Input
                        id="url"
                        type="url"
                        name="url"
                        placeholder="https://example.com/"
                    />

                    <FieldDescription>
                        如果你想在评论中展示个人博客链接，请务必填写博客网址
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}