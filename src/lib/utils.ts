import type {AllPosts, IDisplay} from "$lib/customTypes.ts";

export function* merge<T0, T1>(a: Iterable<T0>, b: Iterable<T1>): Generator<T0 | T1> {
  if (a) {
    for (const item of a)
      yield item;
  }

  if (b) {
    for (const item of b)
      yield item;
  }
}

export function* orderConverter(src: AllPosts): Generator<IDisplay> {
  for (const item of src) {
    yield {
      id: item.id,
      name: item.name,
      budget: item.budget.toNumber(),
      material: item.material.toNumber(),
      overhead: item.overhead.toNumber(),
      seconds: -1
      // TODO elapsed time has to be stored in db and also retrieved
      // TODO change schema
    }
  }
}
