class Stack<T> {
    items: T[] = [];

    push(element: T) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length == 0) return 'Underflow';

        return this.items.pop();
    }

    peek() : T {
        return this.items[this.items.length - 1];
    }

    isEmpty() : boolean {
        return this.items.length == 0;
    }

    toString() {

        let str = '';
        for (let i = 0; i < this.items.length; i++) str += this.items[i] + ' ';
        return str;
        
    }
}


export default <T>() => new Stack<T>()