/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal
  
  ### Question
  
  `FooBarBaz` -> `for-bar-baz`
  
  > View on GitHub: https://tsch.js.org/612
*/


/* _____________ Your Code Here _____________ */

type K<S> = S extends `${infer Head}${infer Rest}`
  ? Head extends Uppercase<Head>
  ? Head extends Lowercase<Head>
  ? `${Head}${K<Rest>}`
  : `-${Lowercase<Head>}${K<Rest>}`
  : `${Head}${K<Rest>}`
  : S;

type KebabCase<S> = S extends `${infer Head}${infer Rest}`
  ? Head extends Uppercase<Head> ? `${Lowercase<Head>}${K<Rest>}` : `${Head}${K<Rest>}`
  : S;


/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectExtends, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/

