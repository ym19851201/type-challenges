/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium 
  
  ### Question
  
  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.
  
  For example:
    
    ```ts
    type case1 = IsUnion<string>  // false
    type case2 = IsUnion<string|number>  // true
    type case3 = IsUnion<[string|number]>  // false
    ```
  
  > View on GitHub: https://tsch.js.org/1097
*/


/* _____________ Your Code Here _____________ */


type IsUnion<T> = ([T] extends any ? T[] : never) extends (T extends any ? T[] : never) ? false : true

// Explanation
type H1<T> = [T] extends [any] ? T[] : never;
type H2<T> = T extends any ? T[] : never;
// if H1 receives union, it returns a type like this
type X = H1<1 | 2> // (1 | 2)[]
// if H2 receives union, it returns a type like this
// because each elements of union is evaludated separately
type Y = H2<1 | 2> // 1[] | 2[]

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never

// TS4.0+
type Push<T extends any[], V> = [...T, V];

// TS4.1+
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>
type IsUnionUgly<T> = TuplifyUnion<T> extends [any] ? false : true

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
]

type uglyCases = [
  Expect<Equal<IsUnionUgly<string>, false>>,
  Expect<Equal<IsUnionUgly<string | number>, true>>,
  Expect<Equal<IsUnionUgly<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnionUgly<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnionUgly<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnionUgly<{ a: string | number }>, false>>,
  Expect<Equal<IsUnionUgly<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnionUgly<string | never>, false>>,
  Expect<Equal<IsUnionUgly<string | unknown>, false>>,
  Expect<Equal<IsUnionUgly<string | any>, false>>,
  Expect<Equal<IsUnionUgly<string | 'a'>, false>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1097/answer
  > View solutions: https://tsch.js.org/1097/solutions
  > More Challenges: https://tsch.js.org
*/

