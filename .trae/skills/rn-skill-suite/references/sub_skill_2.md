=== RN 子技能 2 ===
标题：Skill 2 - 单组件精确生成  
版本：v1.0.0  
更新日期：2026-01-21  
导航：返回主文档 → [main_skill.md](./main_skill.md)

---
name: RN Skill 2 - 单组件精确生成
description: 本技能用于生成与设计系统完美融合的单个 React Native 组件，优先复用既有组件并保持风格极致统一。
---

# 目的
精确生成新组件，结构清晰、命名一致、风格严格遵循设计系统。

# 何时使用
- 需要新增单组件时。
- 对既有页面进行组件化重构时。

# 输入
- 新组件需求、文件路径建议、Props 定义、强制要求与交互细节。

# 步骤
1. 复用组件库标准（Card/Badge/PrimaryButton等）。
2. 严格执行设计令牌（颜色/圆角/间距/字体）。
3. 输出完整可运行的 TypeScript 代码，包含必要 import。

# 提示词模板
```text
你是 React Native 组件工程师,擅长生成**风格极致统一**的高质量组件。

现在需要生成一个新组件:

【组件需求】
组件名: ProductCard
中文名: 商品卡片
文件路径建议: components/product/ProductCard.tsx

功能描述:
• 展示商品缩略图(左侧,正方形,尺寸 80x80)
• 商品标题(右侧上方,最多显示 2 行,超出省略)
• 商品价格(右侧下方,红色强调,大字号)
• 原价(划线灰色小字,可选)
• 促销标签(右上角悬浮,Badge 样式)
• 整体可点击

【Props 接口定义】
interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  onPress: () => void;
}

【强制要求】
1. 严格遵守已加载的设计系统(颜色/圆角/间距/字体)
2. 复用已有组件: Card, Badge(如果适用)
3. 图片使用 Image + resizeMode='cover'
4. 价格颜色用 danger(#FF3B30)强调
5. 标题用 title-md 字体,最多 2 行(numberOfLines=2)
6. 整体高度约 100,宽度撑满容器
7. 使用 TypeScript + StyleSheet
8. 触碰反馈(activeOpacity 0.7)
9. 适配暗色模式

请直接输出**完整可运行**的组件代码(包含所有必要 import)
不要有任何解释,直接给代码即可。
```

# 输出要求
- 完整 TypeScript 组件代码，包含 imports 与样式。
- 不附加解释文本。

# 实现与结构要求
- 单一职责与规模控制：组件≤300行；Hook≤200行
- 关注点分离：UI 仅负责展示与交互；业务逻辑封装在 hooks/useComponentLogic.ts；样式在 styles.ts；类型在 types.ts
- 目录结构建议（新组件）：
```
ProductCard/
├── index.tsx
├── types.ts
├── styles.ts
├── hooks/
│   └── useProductCard.ts
└── components/
    └── Price.tsx
```
- 命名约定：组件 PascalCase；Hook 以 use 前缀的 camelCase；styles.ts 与 types.ts 固定命名
- React Native 强制规则：
  - 条件渲染使用 !! 或三元，避免渲染 0/""/null/undefined
  - 数字显式比较，字符串检查长度或使用 !!
  - Toast/Snackbar 禁止使用 Modal，采用绝对定位 + zIndex/elevation

—— 页脚 ——  
文档：sub_skill_2.md | 返回： [main_skill.md](./main_skill.md)

