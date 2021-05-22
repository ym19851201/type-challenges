/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object
  
  ### Question
  
  Get an `Object` that is the difference between `O` & `O1`
  
  > View on GitHub: https://tsch.js.org/645
*/


/* _____________ Your Code Here _____________ */

type ExcludeKeys<T, K> = {
  [Key in keyof T]: Key extends K ? never : Key
}[keyof T]

type Diff<O, O1> = {
  [K in ExcludeKeys<O & O1, keyof (Foo | Bar)>]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never;
}


/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/

