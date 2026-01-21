=== RN 子技能 7 ===
标题：Skill 7 - 跨设备适配验证  
版本：v1.0.0  
更新日期：2026-01-21  
导航：返回主文档 → [main_skill.md](./main_skill.md)

---
name: RN Skill 7 - 跨设备适配验证
description: 本技能用于对页面进行多设备适配审查并给出修正代码，覆盖安全区、尺寸、键盘、横屏、小屏与大屏场景。
---

# 目的
确保页面在不同设备、方向与屏幕尺寸下显示与交互稳定。

# 何时使用
- 发布前适配审查阶段。
- 发现设备特定问题时。

# 输入
- 适配检查清单与当前页面代码上下文。

# 步骤
1. 逐项检查安全区、尺寸、键盘、横屏、小屏与大屏适配点。
2. 对发现问题提供具体修正代码片段。
3. 保持设计系统一致性与性能最佳实践。

# 提示词模板
```text
请对刚才生成的页面进行**跨设备适配审查**:

【必须检查的适配点】

1. 安全区处理
   □ 顶部是否使用 SafeAreaView 或 useSafeAreaInsets
   □ 底部固定栏是否加上底部安全区高度
   □ 刘海屏/挖孔屏是否正常显示

2. 尺寸适配
   □ 布局是否使用 flex 而非固定宽度
   □ 文字是否支持系统字体缩放(allowFontScaling)
   □ 图片是否使用 aspectRatio 而非固定高度
   □ 是否使用 Dimensions 或 useWindowDimensions

3. 键盘适配
   □ 输入框是否包裹在 KeyboardAvoidingView 中
   □ behavior 是否正确(iOS: 'padding', Android: 'height')
   □ 是否需要 ScrollView 配合 keyboardShouldPersistTaps

4. 横屏适配
   □ 关键信息是否在横屏也能正常显示
   □ 是否需要限制某些页面为竖屏(ScreenOrientation)

5. 小屏设备(iPhone SE / 小尺寸安卓)
   □ 最小屏幕宽度 320px 是否正常
   □ 间距/字体是否过大导致拥挤

6. 大屏设备(iPad / 折叠屏)
   □ 是否有最大宽度限制(避免过度拉伸)
   □ 是否需要多列布局

请逐项检查,如有问题,给出修正代码。
```

# 输出要求
- 针对问题的增量修正代码片段。
- 简短说明修正点与适配效果。

# 层级与交互阻塞检查
- Toast/Snackbar 不得使用 Modal：改为绝对定位 + zIndex/elevation，确保不阻塞滚动与触摸
- pointerEvents 设置合理：提示层可点击（关闭按钮）但不拦截页面交互
- 条件渲染安全：避免在适配逻辑中渲染 0/""/null/undefined；统一采用 `!!` 或三元

—— 页脚 ——  
文档：sub_skill_7.md | 返回： [main_skill.md](./main_skill.md)

