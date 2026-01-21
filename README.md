# Skill Project - React Native Page Generator

这是一个专注于 React Native 移动端开发自动化的 AI 技能项目。

## 核心模块：rn-page-generator

位于 `rn-page-generator/` 目录下，该模块提供了一套完整的 AI 技能体系，用于将自然语言功能需求转化为生产级 React Native 页面代码。

### 主要功能

*   **设计系统集成**：基于原子化设计理念，管理颜色、排版、间距等设计令牌。
*   **组件化开发**：自动扫描和复用现有组件库，避免重复造轮子。
*   **页面自动生成**：从自然语言描述直接生成完整的页面代码。
*   **风格一致性校准**：确保生成的 UI 严格符合预设的设计规范。
*   **最佳实践遵循**：内置移动端开发常见的坑点规避和性能优化策略。

### 目录结构

*   `rn-page-generator/`
    *   `assets/templates/`: 包含组件和页面的标准代码模板
    *   `references/`: 包含详细的设计规范、组件文档和故障排除指南
    *   `SKILL.md`: 核心技能定义文档，描述了完整的工作流和提示词工程

## AI 技能包：.trae/skills

位于 `.trae/skills/` 目录下，包含经过整合的 AI 技能套件 `rn-skill-suite`，旨在提供更细粒度、更专业的 React Native 开发指导。

### rn-skill-suite

这是一个综合性的技能包，整合了从设计系统到最终交付的全流程技能。

*   **入口文件**：`rn-skill-suite/SKILL.md` - 技能包的统一入口。
*   **详细文档**：`rn-skill-suite/references/` - 包含以下子技能：
    *   `main_skill.md`: 设计系统初始化与核心工作流。
    *   `sub_skill_1.md`: 组件知识库构建。
    *   `sub_skill_2.md`: 单组件精确生成。
    *   `sub_skill_3.md`: 完整页面生成。
    *   `sub_skill_4.md`: 风格一致性校准。
    *   `sub_skill_5.md`: 多轮迭代优化。
    *   `sub_skill_6.md`: 组件库回补。
    *   `sub_skill_7.md`: 跨设备适配验证。
    *   `sub_skill_8.md`: AI 工具链集成加速。

## 使用说明

本项目主要配合 AI 编程助手使用，作为上下文知识库，帮助 AI 更准确、规范地生成 React Native 代码。
