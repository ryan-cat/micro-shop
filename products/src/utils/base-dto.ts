export abstract class BaseDto {
  static map<T, S>(item: T): S {
    return (item as unknown) as S;
  }

  static mapAll<T, S>(items: T[]): S[] {
    return items.map((x) => this.map(x));
  }
}
