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

import { LinkedListInterface } from "./linked-list.interface";
import { LinkedListNode } from "./linked-node";

export class LinkedList<T> implements LinkedListInterface<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;
  private size = 0;

  public constructor(item: T) {
    this.head = new LinkedListNode(item);
    this.tail = this.head;
    this.size++;
  }

  /**
   * Return true if linked list is empty
   * @returns true if Linked List is empty false otherwise
   */
  public isEmpty(): boolean {
    return this.size == 0;
  }

  /**
   * Clear linked list
   */
  public clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Get the size of the linked list
   * @returns the size of the linked list
   */
  public getSize(): number {
    return this.size;
  }

  /**
   * Get the first node of linked list
   * @returns The node or undefined
   */
  public getFirst(): T | undefined {
    return this.head?.value;
  }

  /**
   * Get the last node of linked list
   * @returns the node or undefined
   */
  public getLast(): T | undefined {
    return this.tail?.value;
  }

  /**
   * Get the item by index
   * @param item item
   * @returns index of the item or -1 if not found
   */
  public indexOf(item: T): number {
    let indexFound = -1;
    const invalidIndex = -1;
    let nextNode = this.head;

    while (nextNode) {
      indexFound++;
      if (nextNode.value === item) {
        return indexFound;
      }
      nextNode = nextNode.next;
    }

    return invalidIndex;
  }

  /**
   * Remove tail node
   */
  public removeTail(): void {
    // https://visualgo.net/en/list
    let pre = this.head || null;
    let temp = pre?.next;

    while (temp != null) {
      // tempNode -> node2 -> node3 -> null
      temp = temp?.next;
      if (temp != null) pre = pre?.next || null;
    }

    if (pre?.next) {
      pre.next = null;
    }
    if (pre) {
      this.tail = pre;
    }
    this.size--;
  }

  /**
   * Remove the node by index
   * @param index index of the node
   */
  public remove(index: number): void {
    // https://visualgo.net/en/list
    let preNode = this.head || null;
    for (let count = 0; count < index - 1; count++) {
      // go to the next inner node
      preNode = preNode?.next || null;
    }
    // preNode -> deleteNode -> nextNode -> null
    let deleteNode = preNode?.next || null;
    // preNode -> deleteNode -> nextNode -> null
    const nextNode = deleteNode?.next || null;
    if (preNode?.next) {
      preNode.next = nextNode;
    }
    // remove node from chain
    deleteNode = null;

    // update tail node
    if (index === this.size && preNode) {
      this.tail = preNode;
    }
    // decrease size
    this.size--;
  }

  /**
   * Check if the item is in the linked list
   * @param item item
   * @returns True if the item exists, false otherwise
   */
  public contains(item: T): boolean {
    let nextNode = this.head;
    let result = false;
    while (nextNode) {
      if (nextNode.value === item) {
        result = true;
        break;
      }
      nextNode = nextNode.next;
    }

    return result;
  }

  /**
   * Get the item in the specific index
   * @param index index of the node
   * @returns The node at the index or undefined
   */
  public get(index: number): T | undefined {
    let result: T | undefined = undefined;
    let indexOf = 0;
    let nextNode = this.head;
    while (nextNode) {
      if (index == indexOf) {
        result = nextNode.value;
      }
      indexOf++;
      nextNode = nextNode.next;
    }

    return result;
  }

  /**
   * insert a element in specific index
   */
  public add(index: number, item: T): void {
    // https://visualgo.net/en/list
    // check if the item must be inserted in the begging of linked list
    if (index == 0) {
      this.addFirst(item);
      return;
    }
    // [0]node1 -> [1]node2 -> [2]node3 -> [3]node4 -> null
    let preNode = this.head || null;
    // Big O(N)
    for (let count = 0; count < index - 1; count++) {
      // go to the next inner node
      preNode = preNode?.next || null;
    }
    if (preNode) {
      const newNode = new LinkedListNode(item);
      // [0]node1 -> [1]node2 -> [2]node3(preNode) -> [3]newNode -> null
      newNode.next = preNode?.next || null;
      // set next node
      preNode.next = newNode;
      // update linked list size
      this.size++;
      // update tail node
      if (index === this.size && preNode) {
        this.tail = newNode;
      }
    } else {
      throw new Error("index not found.");
    }
  }

  /**
   * Add node to the end of Linked List
   */
  public addLast(item: T): void {
    // https://visualgo.net/en/list
    const newNode = new LinkedListNode(item);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // node1 -> node2 -> node3 ->  newNode -> null
      if (this.tail?.next) {
        this.tail.next = newNode;
      }
      // node1 -> node2 -> node3 -> tail -> newNode -> null
      this.tail = newNode;
    }
    this.size++;
  }

  /**
   * Add node to the beginning of linked list
   */
  public addFirst(item: T): void {
    // https://visualgo.net/en/list
    const newNode = new LinkedListNode(item);
    // node2 -> node1 | null
    newNode.next = this.head;
    // head -> node2 -> node1 | null
    this.head = newNode;
    // increase linked list size
    this.size++;
    // set tail node
    if (this.size == 1) {
      this.tail = newNode;
    }
  }
}
