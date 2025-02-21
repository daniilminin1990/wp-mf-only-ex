import {PluginItem} from "@babel/core";

// PluginItem -- Тип из babel core, здесь есть вся нужная типизация для того, чтобы написать свой плагин
export function removeDataTestIdBabelPlugin(): PluginItem {
  return {
    visitor: {
      Program(path, state) { // Из state можем вытащить опции, которые мы в этот плагин будет передавать. В нашем случае это запрещенные пропсы, которые мы как раз будем удалять (data-testId)
        const forbiddenProps = state.opts.props || []

        path.traverse({ // этой функцией traverse мы будем обходить все узлы AST (Abstract Syntax Tree) и искать нужную ноду и обрабатывать. В данном случае мы ищем идентификатор JSX,
          JSXIdentifier(current){
            const nodeName = current.node.name
            if(forbiddenProps.includes(nodeName)){
              current.parentPath.remove() // если находим запрещенную ноду, удаляем ее
            }
          }
        })
      }
    }
  }
}