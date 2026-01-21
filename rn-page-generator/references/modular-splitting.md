# React Native 组件模块化拆分规范

## 一、拆分原则

### 1.1 单一职责原则 (SRP)
- 每个文件/组件只负责一个功能领域
- 组件行数建议不超过 **300行**
- Hook 函数行数建议不超过 **200行**

### 1.2 关注点分离
| 类型 | 职责 |
|------|------|
| UI 组件 | 只负责展示和用户交互 |
| 业务逻辑 | 封装在自定义 Hook 中 |
| 样式定义 | 独立的 styles.ts 文件 |
| 类型定义 | 独立的 types.ts 文件 |

## 二、目录结构规范

### 2.1 模块化组件目录

```
ComponentName/
├── index.tsx                    # 主组件（容器组件）
├── types.ts                     # TypeScript 类型定义
├── styles.ts                    # 样式定义
├── hooks/
│   ├── useComponentLogic.ts     # 业务逻辑 Hook
│   └── useDataFetching.ts       # 数据获取 Hook
├── components/
│   ├── SubComponent1.tsx        # 子组件
│   └── SharedComponent.tsx      # 共享组件
└── utils/
    └── helpers.ts               # 工具函数
```

### 2.2 命名约定

| 类型 | 命名规则 | 示例 |
|------|----------|------|
| 组件文件 | PascalCase | `DepartmentCard.tsx` |
| Hook 文件 | camelCase + use 前缀 | `useDepartmentManagement.ts` |
| 类型文件 | types.ts | `types.ts` |
| 样式文件 | styles.ts | `styles.ts` |

## 三、拆分步骤

### 3.1 分析组件结构
识别组件的核心功能模块：
1. 主展示区域
2. 表单/输入区域
3. 弹窗/Modal
4. 列表渲染
5. 状态管理逻辑

### 3.2 提取类型定义

```typescript
// types.ts
export interface ComponentProps {
  data: DataType[];
  onAction: (id: number) => void;
}

export interface UseComponentReturn {
  state: StateType;
  handlers: {
    handleAdd: () => void;
    handleEdit: (id: number) => void;
  };
}
```

### 3.3 提取样式定义

```typescript
// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  
  // ========== 卡片样式 ==========
  card: { ... },
  cardHeader: { ... },
  
  // ========== 表单样式 ==========
  formGroup: { ... },
  formInput: { ... },
});
```

### 3.4 提取业务逻辑 Hook

```typescript
// hooks/useComponentLogic.ts
export const useComponentLogic = (initialData: DataType[]) => {
  const [state, setState] = useState(initialState);
  
  const handleAdd = useCallback(() => {
    // 添加逻辑
  }, []);
  
  const handleEdit = useCallback((id: number) => {
    // 编辑逻辑
  }, []);
  
  return {
    state,
    handlers: { handleAdd, handleEdit }
  };
};
```

### 3.5 重构主组件

```typescript
// index.tsx
import { useComponentLogic } from './hooks/useComponentLogic';
import { CardComponent } from './components/CardComponent';
import { styles } from './styles';

export const Component: React.FC<ComponentProps> = ({ data }) => {
  const { state, handlers } = useComponentLogic(data);
  
  return (
    <View style={styles.container}>
      <CardComponent data={state.data} onPress={handlers.handleEdit} />
    </View>
  );
};
```

## 四、常见陷阱 ⚠️

### 4.1 Toast 组件禁止使用 Modal【强制】

**问题**: Modal 会创建独立原生视图层级，阻止页面交互。

```typescript
// ❌ 错误：Modal 阻塞页面
<Modal visible={true} transparent>
  <Toast message="操作成功" />
</Modal>

// ✅ 正确：使用绝对定位
<Animated.View style={[styles.toast, { position: 'absolute', top: 50, zIndex: 9999 }]}>
  <Text>{message}</Text>
</Animated.View>
```

### 4.2 条件渲染 Falsy 值陷阱【强制】

**问题**: React Native 中 0、""、null 会导致崩溃。

```typescript
// ❌ 错误：isActive=0 时崩溃
{user.isActive && <ActiveBadge />}

// ✅ 正确：使用 !! 强制转换
{!!user.isActive && <ActiveBadge />}

// ✅ 正确：数字类型显式比较
{count > 0 && <Badge count={count} />}

// ✅ 正确：字符串检查
{!!text && <Text>{text}</Text>}
```

**必须使用 `!!` 的场景**:
- 数据库 tinyint 字段 (0/1)
- 可选描述/备注字段
- 计数器/数量字段
- 可空对象/数组

### 4.3 过度拆分

```typescript
// ❌ 不必要：5 行组件不需要单独文件
const TinyComponent = () => <View><Text>Hello</Text></View>;

// ✅ 合理：超过 50 行且逻辑独立才拆分
```

### 4.4 循环依赖

```typescript
// ❌ 禁止循环依赖
// ComponentA → ComponentB → ComponentA

// ✅ 单向依赖
// index.tsx → SubComponents → utils/types
```

## 五、拆分检查清单

### 拆分前检查
- [ ] 组件行数是否超过 500 行？
- [ ] 是否包含 3 个以上 Modal？
- [ ] 是否有可复用的 UI 模式？
- [ ] 业务逻辑是否与 UI 混合？

### 拆分后验证
- [ ] 每个文件行数 < 300 行？
- [ ] 类型定义是否完整？
- [ ] 组件职责是否单一？
- [ ] 条件渲染是否安全？
- [ ] TypeScript 编译是否通过？

## 六、性能优化

### 6.1 避免不必要重渲染

```typescript
// 使用 React.memo
export const CardComponent = React.memo<CardProps>(({ data }) => {
  return <View>{/* ... */}</View>;
});

// Hook 中使用 useCallback
const handlePress = useCallback((id: number) => {
  // 处理逻辑
}, [dependencies]);
```

### 6.2 懒加载大型组件

```typescript
const HeavyModal = React.lazy(() => import('./HeavyModal'));

<Suspense fallback={<Loading />}>
  {showModal && <HeavyModal />}
</Suspense>
```
