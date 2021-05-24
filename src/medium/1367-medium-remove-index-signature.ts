/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium 
  
  ### Question
  
  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.
  
  For example:
  
  ```
  
  type Foo = {
    [key: string]: any;
    foo(): void;
  }
  
  type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
  
  ```
  
  > View on GitHub: https://tsch.js.org/1367
*/


/* _____________ Your Code Here _____________ */

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K]
}

// Explanation
// This syntax is too hard to read and write, so I leave some experiments
// Experiment 1 Where can I add parenthesis to the type?
type Experiment1<T> = {
  [K in (keyof T) as (string extends K ? never : K)]: T[K]
}
// I could add pairs of parenthesis just to `keyof T` and `string extends K ? never : K`.
// To ignore the former case, the latter case seems to cast a K (in keyof T) conditinally.
// Experiment 2 Why `string` and `number` (and `symbol`) needed?
// type Experiment2_1 is evaluated as `{ filteredIn: "foo"; filteredOut: string; }`
// because `string extends string` is true, but `string extends 'foo'` is false
type Experiment2_1 = {
  [K in keyof Foo as string extends K ? 'filteredOut' : 'filteredIn']: K
}
// type Experiment2_2 is evaluated as `{ filteredIn: number | "bar"; }`.
// In this case, we want to exclude `number` type key, but `string extends number` returns false, so it is "filteredIn".
type Experiment2_2 = {
  [K in keyof Bar as string extends K ? 'filteredOut' : 'filteredIn']: K
}
// type Experiment2_3 is evaluated as `{ filteredIn: number | "foo"; filteredOut: string; }`.
// In this case, `string extends 1` and `string extends number` are evaluated as false. 
// So we expect the whole type is evaludated as `{ filteredIn: number | 1 | "foo"; filteredOut: string; }`
// , but actually 1 and number are merged into number.
type Experiment2_3 = {
  [K in keyof Foo2 as string extends K ? 'filteredOut' : 'filteredIn']: K
}
type Foo2 = {
  [key: string]: any;
  foo(): void;
  1: any;
  [key: number]: any;
}


/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'


type Foo = {
  [key: string]: any;
  foo(): void;
}


type Bar = {
  [key: number]: any;
  bar(): void;
}

type Baz = {
  bar(): void;
  baz: string
}


type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/

