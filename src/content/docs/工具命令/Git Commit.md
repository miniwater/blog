# Git Commit

Git Commit 提交规范

## 为什么要规范提交信息？

规范的 Git 提交信息能够带来以下好处：

1. **提高代码可读性**​ - 让团队成员快速理解每次提交的意图
2. **自动生成变更日志**​ - 便于追踪版本更新内容
3. **自动化版本管理**​ - 支持语义化版本控制
4. **方便问题定位**​ - 快速回溯历史记录，定位引入问题的提交
5. **提升协作效率**​ - 统一团队沟通语言

## 提交信息格式规范

### 基本格式

```
<type>(<scope>): <subject>
 
<body>
 
<footer>
```

### 各部分说明

#### Header（必须）

格式：`<type>(<scope>): <subject>`

- **type**：提交类型，必须为以下之一：
    - `feat`- 新功能
    - `fix`- 修复 bug
    - `docs`- 文档更新
    - `style`- 代码格式调整
    - `refactor`- 代码重构
    - `perf`- 性能优化
    - `test`- 测试相关
    - `chore`- 构建过程或辅助工具变动
    - `build`- 构建系统修改
    - `ci`- CI 配置修改
    - `revert`- 回退提交
- **scope**（可选）：影响范围，如模块、组件等
- **subject**：简短描述，不超过 50 字符

#### Body（可选）

详细说明修改内容，包括：

- 修改动机
- 实现细节
- 注意事项
- 每行不超过 72 字符

#### Footer（可选）

- 关联的 Issue：`Closes #123, #245`
- 破坏性变更说明：`BREAKING CHANGE: 旧接口已废弃`
- 关闭 Issue：`Fixes #456`

## 提交类型详解

| 类型 | 说明 | 示例 |
| --- | --- | --- |
| feat | 新增功能 | feat(user): 添加用户注册功能 |
| fix | 修复 Bug | fix(login): 修复登录超时问题 |
| docs | 文档更新 | docs: 更新 README 安装说明 |
| style | 代码格式 | style: 统一缩进为 2 空格 |
| refactor | 代码重构 | refactor(auth): 优化认证逻辑 |
| perf | 性能优化 | perf(image): 优化图片加载性能 |
| test | 测试相关 | test(api): 添加用户 API 测试 |
| chore | 构建工具 | chore: 更新 webpack 配置 |
| build | 构建系统 | build: 升级依赖包版本 |
| ci | CI 配置 | ci: 添加 GitHub Actions 配置 |
| revert | 回滚提交 | revert: 回滚到 v1.0.0 |

## 完整示例

### 示例 1：新功能提交

```
feat(auth): 添加 JWT 认证功能
 
- 实现 JWT token 生成
- 添加 token 验证中间件
- 配置 token 刷新机制
 
Closes #123
```

### 示例 2：Bug 修复

```
fix(payment): 修复支付回调失败问题
 
修复微信支付回调时参数解析错误的问题：
1. 修正金额计算逻辑
2. 添加回调参数验证
3. 优化错误处理机制
 
Fixes #45, #46
```

### 示例 3：重构提交

```
refactor(user): 重构用户服务层
 
- 将业务逻辑从控制器移到服务层
- 抽象用户数据操作接口
- 优化数据库查询性能
 
BREAKING CHANGE: 用户服务接口已重构，需更新调用方式
```

## 最佳实践

### 1. 保持提交原子性

每个提交应专注于单一功能或修复，避免混合多个不相关的修改。

✅ 正确：

```
feat(api): 新增用户搜索接口
fix(auth): 修复登录超时
```

❌ 错误：

```undefined
更新代码和修复 bug
```

### 2. 使用祈使语气

描述使用祈使语气，如"添加"、"修复"、"更新"。

✅ 正确：`fix: 修复登录错误`

❌ 错误：`fix: 修复了登录错误`

### 3. 长度控制

- Header：不超过 50 字符
- Body：每行不超过 72 字符

### 4. 关联 Issue

在 Footer 中明确关联的 Issue 编号，便于追踪。

```
Closes #123
Fixes #45, #46
Related to #78
```

## 自动化工具配置

### Commitizen（交互式提交工具）

**安装配置：**

```shell
npm install -g commitizen
npm install --save-dev cz-conventional-changelog
```

在 `package.json`中添加：

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "scripts": {
    "commit": "git-cz"
  }
}
```

使用：`npm run commit`

### Commitlint（提交信息校验）

**安装：**

```shell
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

**配置文件 `.commitlintrc.js`：**

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'ci', 'build', 'revert']
    ],
    'subject-case': [0]
  }
};
```

### Husky（Git 钩子管理）

**安装配置：**

```shell
npm install husky --save-dev
npx husky install
 
# 添加 commit-msg 钩子
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

## 常见问题处理

### 1. 修改最近提交

```sql
git commit --amend -m "feat: 更新提交信息"
```

### 2. 修改多个提交

```css
git rebase -i HEAD~3
```

### 3. 紧急情况跳过校验

```perl
git commit --no-verify -m "紧急修复"
```

## 实用命令

```shell
# 查看提交历史
git log --oneline --graph
 
# 查看特定文件历史
git log --follow -p filename
 
# 查看某次提交详情
git show <commit-hash>
 
# 搜索提交信息
git log --grep="修复登录"
```

## 总结

良好的提交规范是团队协作的基石。通过规范的提交信息，配合自动化工具，可以：

1. 提升代码审查效率
2. 自动生成高质量变更日志
3. 便于问题追踪和调试
4. 提高项目可维护性

建议团队在项目初期就建立并遵守提交规范，这将为项目的长期健康发展打下坚实基础。