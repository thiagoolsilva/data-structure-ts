/*
 * Copyright (c) 2021  Thiago Lopes da Silva
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface LinkedListInterface<T> {
  addFirst(item: T): void;
  addLast(item: T): void;
  add(index: number, item: T): void;
  contains(item: T): boolean;
  get(index: number): T | undefined;
  getLast(): T | undefined;
  getFirst(): T | undefined;
  indexOf(item: T): number;
  remove(index: number): void;
  removeTail(): void;
  getSize(): number;
  clear(): void;
  isEmpty(): boolean;
  toArray(): T[];
}
