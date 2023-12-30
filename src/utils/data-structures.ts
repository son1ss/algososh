export class Queue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }

    this.container[this.tail] = item;
    this.length++;
    if (this.tail + 1 < this.size) this.tail++;
    else this.tail = 0;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    this.container[this.head] = null;
    this.length--;
    if (this.head + 1 < this.size) this.head++;
    else this.head = 0;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;

  list = (): (T | null)[] => this.container.slice();

  getHead = () => this.head;
  getTail = () => this.tail;

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size).fill(null);
  };
}

export class Stack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container[this.container.length] = item;
  };

  pop = (): void => {
    this.container[this.container.length - 1] && this.container.pop();
  };

  peak = (): T | null => {
    return this.container[this.container.length - 1] || null;
  };

  getSize = () => this.container.length;

  list = (): T[] => this.container.slice();

  clear = () => (this.container = []);
}

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node<T>(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 1;

        while (currIndex < index) {
          curr && (curr = curr.next);
          currIndex++;
        }

        curr && (node.next = curr.next);
        curr && (curr.next = node);
      }

      this.size++;
    }
  }

  append(element: T) {
    const node = new Node<T>(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  prepend(value: T) {
    const node = new Node(value, this.head);
    this.head = node;
    this.size++;
  }

  deleteHead() {
    if (!this.head) throw new Error('Список пуст!');

    this.head = this.head.next;
    this.size--;
  }

  deleteTail() {
    if (!this.head?.next) this.head = null;
    else {
      let curr = this.head;
      while (curr.next?.next) {
        curr = curr.next;
      }
      curr.next = null;
    }

    this.size--;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) throw new Error(`Неверный индекс. [0, ${this.size}]`);

    if (!this.head || index === 0) this.deleteHead();
    else {
      let previous = this.head;
      while (index - 1 && previous.next && previous.next.next) {
        previous = previous.next;
      }
      previous.next = previous.next!.next;
    }

    this.size--;
  }

  getSize() {
    return this.size;
  }

  list = () => {
    const arr: T[] = [];
    let curr = this.head;
    curr && arr.push(curr.value);
    while (curr?.next) {
      curr = curr.next;
      arr.push(curr.value);
    }
    return arr;
  };

  clear = () => {
    this.head = null;
    this.size = 0;
  };
}
