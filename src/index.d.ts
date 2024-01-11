declare const a: number;
interface I {
    a: number;
}
import { B } from './ultils';
declare const b: I;
export { a, b, B };
