/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in
  
  ### Question
  
  Implement the built-in `Omit<T, K>` generic without using it.
  
  Constructs a type by picking all properties from `T` and then removing `K`
  
  For example
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyOmit<Todo, 'description' | 'title'>
  
  const todo: TodoPreview = {
    completed: false,
  }
  ```
  
  > View on GitHub: https://tsch.js.org/3
*/


/* _____________ Your Code Here _____________ */
type ExcludeKeys<T, K> = {
  [k in keyof T]: k extends K ? never : k
}[keyof T]
type MyPick<T, K extends string | number | symbol> = {
  [k in K]: k extends keyof T ? T[k] : never
}
type MyOmit<T, K> = MyPick<T, ExcludeKeys<T, K>>
// type MyOmit<T, K extends string | number | symbol> = {
//   [k in { 
//     [k in keyof T]: k extends [K] ? never : k 
//   }[keyof T]]: k extends keyof T ? T[k] : never
// }


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/

