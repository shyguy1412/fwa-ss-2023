// https://stackoverflow.com/questions/60269936/typescript-convert-generic-object-from-snake-to-camel-case
type CamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}` ?
  `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}` :
  S;


type CamelToSnakeCaseNested<T> = T extends Array<any> ? T : T extends Object ? {
  [K in keyof T as CamelToSnakeCase<K & string>]: CamelToSnakeCaseNested<T[K]>
} : T;
