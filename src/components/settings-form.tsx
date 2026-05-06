import { useState, useEffect } from "react";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldDescription, FieldSeparator, FieldContent, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem, } from "@/components/ui/toggle-group"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup, InputGroupAddon, InputGroupInput, } from "@/components/ui/input-group"
import { LinkIcon, MailIcon } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"

export function SettingsForm() {
    // 1. 统一管理所有状态
    const [settings, setSettings] = useState({
        theme: "system",
        grayscale: false,
        rtl: false,
        cookies: false,
        hue: 220, // 默认主题色调
        author: "",
        email: "",
        url: "",
    });

    // 2. 初始化：从本地存储读取
    useEffect(() => {
        const theme = localStorage.getItem("theme") || "system";
        const grayscale = localStorage.getItem("grayscale") === "true";
        const rtl = localStorage.getItem("rtl") === "true";
        const cookies = localStorage.getItem("cookies") === "true";
        const hue = parseInt(localStorage.getItem("hue") || "220");
        const author = localStorage.getItem("author") || "";
        const email = localStorage.getItem("email") || "";
        const url = localStorage.getItem("url") || "";

        setSettings({ theme, grayscale, rtl, cookies, hue, author, email, url });
    }, []);

    // 3. 核心：统一更新函数
    const handleUpdate = (key: string, value: string | boolean | number) => {
        // 更新本地 React 状态
        setSettings(prev => ({ ...prev, [key]: value }));

        // 同步到 localStorage
        const storageKey = key;
        localStorage.setItem(storageKey, value.toString());

        // 立即应用到 DOM（触发全局 Layout 里的逻辑）
        // 发送 storage 事件是为了让同一个页面下的不同组件或监听器能收到通知
        window.dispatchEvent(new StorageEvent('storage', {
            key: storageKey,
            newValue: value.toString()
        }));

    };

    return (
        <FieldSet>
            <FieldLegend>通用</FieldLegend>
            <FieldDescription>全局设置</FieldDescription>
            <FieldGroup>
                <Field orientation="horizontal">
                    <FieldContent>
                        <FieldLabel>文本语言</FieldLabel>
                        <FieldDescription>
                            选择你喜欢的语言，默认是中文
                        </FieldDescription>
                    </FieldContent>
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
                </Field>

                <Field orientation="horizontal">
                    <FieldLabel>主题</FieldLabel>
                    <ToggleGroup variant="outline" id="theme" type="single" defaultValue="system" value={settings.theme} onValueChange={(val) => val && handleUpdate('theme', val)}>
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
                </Field>

                <Field orientation="horizontal">
                    <FieldLabel>主题颜色</FieldLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">调色盘</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="leading-none font-medium">主题颜色</h4>
                                    <p className="text-sm text-muted-foreground">
                                        滑动滑块，选择你喜欢的主题颜色
                                    </p>
                                </div>
                                <Slider
                                    defaultValue={[settings.hue]}
                                    max={360}
                                    step={1}
                                    className="max-w-xs"
                                    onValueChange={(vals) => { handleUpdate('hue', vals[0] ?? settings.hue); }}
                                />
                                <div
                                    className="h-4 w-full rounded-full border shadow-sm"
                                    style={{
                                        background: `linear-gradient(to right, oklch(0.6 0.15 0), oklch(0.6 0.15 90), oklch(0.6 0.15 180), oklch(0.6 0.15 270), oklch(0.6 0.15 360))`
                                    }}
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        localStorage.removeItem("hue");
                                        document.documentElement.style.removeProperty("--primary");
                                        toast.success("成功重置颜色")
                                    }}
                                >
                                    重置颜色
                                </Button>

                            </div>
                        </PopoverContent>
                    </Popover>
                </Field>

                <Field orientation="horizontal">
                    <FieldLabel htmlFor="grayscale-mode">
                        灰色模式
                    </FieldLabel>
                    <Switch id="grayscale-mode" checked={settings.grayscale} onCheckedChange={(val) => handleUpdate('grayscale', val)} />
                </Field>

                <Field orientation="horizontal">
                    <FieldContent>
                        <FieldLabel htmlFor="switch-rtl-mode">
                            从右到左阅读模式
                        </FieldLabel>
                        <FieldDescription>
                            默认左到右，启用为从右到左阅读模式
                        </FieldDescription>
                    </FieldContent>
                    <Switch id="switch-rtl-mode" checked={settings.rtl} onCheckedChange={(val) => handleUpdate('rtl', val)} />
                </Field>

                <FieldLabel htmlFor="switch-share">
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldTitle>分享你的数据</FieldTitle>
                            <FieldDescription>
                                我们和指定合作伙伴使用Cookie和其他跟踪技术来实现我们网站的核心功能。如果您开启，我们将使用Cookie为您提供增强的体验，分析网站使用情况，提高其性能，并根据您的兴趣显示广告。要管理您的选择并了解更多信息，请单击“Cookie设置”。您可以随时通过单击页面左下角的设置按钮撤回您的同意。
                            </FieldDescription>
                        </FieldContent>
                        <Switch id="switch-share" checked={settings.cookies} onCheckedChange={(val) => handleUpdate('cookies', val)} />
                    </Field>
                </FieldLabel>

                {/* <Field orientation="horizontal">
                    <Checkbox
                        id="checkout-7j9-same-as-shipping-wgm"
                        defaultChecked
                    />
                    <FieldLabel
                        htmlFor="checkout-7j9-same-as-shipping-wgm"
                        className="font-normal"
                    >
                        黑白模式
                    </FieldLabel>
                </Field> */}
            </FieldGroup>
            <FieldSeparator />

            <FieldLegend>评论设置</FieldLegend>
            <FieldDescription>以下是评论设置</FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="author">昵称</FieldLabel>
                    <Input id="author" name="author" autoComplete="off" value={settings.author} onChange={(e) => handleUpdate('author', e.target.value)} placeholder="游客001" />
                    <FieldDescription>
                        如果你想在评论中显示昵称，请务必填写昵称
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">邮箱</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="email" type="email" name="email" value={settings.email} onChange={(e) => handleUpdate('email', e.target.value)} placeholder="name@example.com" />
                        <InputGroupAddon>
                            <MailIcon />
                        </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                        如果你想收到评论回复通知，请务必填写邮箱地址
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="input-badge">
                        博客网址
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <LinkIcon />https://
                        </InputGroupAddon>
                        <InputGroupInput id="url" type="url" name="url" value={settings.url} onChange={(e) => handleUpdate('url', e.target.value)} placeholder="example.com/" />

                    </InputGroup>
                    <FieldDescription>
                        如果你想在评论中展示个人博客链接，请务必填写博客网址
                    </FieldDescription>
                </Field>

                {/* <Field orientation="horizontal">
                    <Button type="submit">保存设置</Button>
                    <Button variant="outline" type="button">
                        Cancel
                    </Button>
                </Field> */}
            </FieldGroup>

            <FieldLegend>开发选项</FieldLegend>
            <FieldDescription>图一乐</FieldDescription>
            <FieldGroup>
                <Field orientation="horizontal">
                    <Checkbox id="terms-checkbox" name="terms-checkbox" />
                    <Label htmlFor="terms-checkbox">显示帧率</Label>
                </Field>
                <Field orientation="horizontal">
                    <Checkbox
                        id="terms-checkbox-2"
                        name="terms-checkbox-2"
                        defaultChecked
                    />
                    <FieldContent>
                        <FieldLabel htmlFor="terms-checkbox-2">
                            Accept terms and conditions
                        </FieldLabel>
                        <FieldDescription>
                            By clicking this checkbox, you agree to the terms.
                        </FieldDescription>
                    </FieldContent>
                </Field>
                <FieldLabel>
                    <Field orientation="horizontal">
                        <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
                        <FieldContent>
                            <FieldTitle>Enable notifications</FieldTitle>
                            <FieldDescription>
                                You can enable or disable notifications at any time.
                            </FieldDescription>
                        </FieldContent>
                    </Field>
                </FieldLabel>
            </FieldGroup>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">重置设置</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>你确定要还原设置吗？</AlertDialogTitle>
                        <AlertDialogDescription>
                            此操作无法撤消。这将重置所有设置为默认值，并删除本地存储中的相关数据。请确保你已经备份了重要的设置或数据，以免丢失。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>关闭</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}>
                            继续
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </FieldSet>

    );
}