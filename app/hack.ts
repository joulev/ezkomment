/**
 * @author Malte Ubl
 * @link https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
export default function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
    return fn as (arg: T) => R;
}
