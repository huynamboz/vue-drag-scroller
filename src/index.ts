const FIRST_PKG = 'first-pkg';
console.log(`Hello from ${FIRST_PKG}!`);
const a: number = 0;
interface I {
    a: number;
}
import { B } from './ultils';
const b: I = { a: 0 };
export { a, b, B };