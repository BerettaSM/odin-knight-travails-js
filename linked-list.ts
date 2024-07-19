class ListNode<T> {
    constructor(public value: T, public next: ListNode<T> | null = null) {}
}

export class LinkedList<T> {
    private _head: ListNode<T> | null = null;
    private _tail: ListNode<T> | null = null;
    private length = 0;

    constructor(...items: T[]) {
        for (const item of items) {
            this.append(item);
        }
    }

    get head() {
        return this._head?.value ?? null;
    }

    get tail() {
        return this._tail?.value ?? null;
    }

    get size() {
        return this.length;
    }

    isEmpty() {
        return this.size === 0;
    }

    append(value: T) {
        const node = new ListNode(value);
        if (!this._tail) {
            this._head = this._tail = node;
        } else {
            this._tail = this._tail.next = node;
        }
        this.length++;
        return this;
    }

    prepend(value: T) {
        const node = new ListNode(value);
        if (!this._head) {
            this._head = this._tail = node;
        } else {
            node.next = this._head;
            this._head = node;
        }
        this.length++;
        return this;
    }

    shift(): T | null {
        const first = this._head;
        if (first === null) return null;
        if (this._tail === first) {
            this._head = this._tail = null;
        } else {
            this._head = this._head!.next;
        }
        this.length--;
        return first.value;
    }

    pop(): T | null {
        const last = this._tail;
        if (last === null) return null;
        if (this._head === last) {
            this._head = this._tail = null;
        } else {
            const prev = this.get(this.length - 2)!;
            prev.next = null;
            this._tail = prev;
        }
        this.length--;
        return last.value;
    }

    contains(value: T) {
        return this.find(value) !== null;
    }

    find(value: T) {
        if (this.length === 0) return null;
        let node = this._head;
        let index = 0;
        while (index < this.length && node!.value !== value) {
            node = node?.next ?? null;
            index++;
        }
        return node ? index : null;
    }

    at(index: number) {
        return this.get(index)?.value ?? null;
    }

    insertAt(value: T, index: number) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.prepend(value);
        if (index === this.length) return !!this.append(value);
        const prev = this.get(index - 1)!;
        const node = new ListNode(value);
        node.next = prev.next;
        prev.next = node;
        this.length++;
        return true;
    }

    removeAt(index: number) {
        if (index < 0 || index >= this.length) return null;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        const prev = this.get(index - 1)!;
        const removed = prev.next!;
        prev.next = removed.next;
        this.length--;
        return removed.value;
    }

    toString() {
        if (this.length === 0) return '[ Empty ]';
        const q: string[] = [];
        let node = this._head;
        while (node !== null) {
            q.push(`( ${node.value} )`);
            node = node.next;
        }
        q.push('null');
        return q.join(' -> ');
    }

    private get(index: number) {
        if (index < 0 || index >= this.length) return null;
        if (index === this.length - 1) return this._tail;
        let node = this._head;
        while (index > 0) {
            node = node!.next;
            index--;
        }
        return node;
    }
}
