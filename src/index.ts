class _Node<T>{
    constructor(
        public left:_Node<T> | null,
        public right:_Node<T> | null,
        public value:T,
        public index:number
    ){}
}

class LinkedList<T> {
    private _first: _Node<T> | null;
    private _last: _Node<T> | null;
    [Symbol.iterator](){
        let node = this._first;
        return {
            next(){
                if(node === null){
                    return {done: true, value: undefined};
                }
                const value = node.value;
                node = node.right;
                return {done: false, value};
            }
        }
    }

    constructor(...values: T[]){
        if(values.length === 0){
            this._first = null;
            this._last = null;
            return;
        }else if(values.length === 1){
            const node = new _Node<T>(null, null, values[0], 0);
            this._first = node;
            this._last = node;
            return;
        }

        let currentNode = new _Node<T>(null, null, values.shift()!, 0);
        this._first = currentNode;
        for(const value of values){
            let newNode = new _Node<T>(currentNode, null, value, currentNode.index + 1);
            currentNode.right = newNode;
            currentNode = newNode;
        }
        this._last = currentNode;
    }

    first(){
        return this._first?.value;
    }

    last(){
        return this._last?.value;
    }

    at(index:number){
        if(index < 0 || !this._first || index > this._last!.index){ // POSSIBLY ERROR _last can be null
            return null;
        }
        for(let node = this._first; node !== null; node = node.right){
            if(node.index === index){
                return node.value;
            }
        }
        return null;
    }


    addFirst(value:T): void{
        const newNode = new _Node<T>(null, this._first, value, 0);
        for(let node = this._first; node !== null; node = node.right){
            node.index++;
        }
        this._first = newNode;

    }

    addLast(value:T): void{
        const newNode = new _Node<T>(this._last, null, value, this._last!.index + 1);
        this._last!.right = newNode;
        this._last = newNode;
    }

    insert(index:number, ...values:T[]): void{
        let nodeAtIndex;
        let nextNode;
        if(this._first === null) return;
        for(let node = this._first; node !== null; node = node.right){
            if(node.index === index){
                nodeAtIndex = node;
                nextNode = node.right;
            }
        }
        if(nodeAtIndex === null){
            return;
        }
        for (let node = nodeAtIndex.right;node !== null; node = node.right){
            node.index += values.length;
        }
        let currentNode = nodeAtIndex!;
        for(const value of values){
            let newNode = new _Node<T>(currentNode, null, value, currentNode.index + 1);
            currentNode.right = newNode;
            currentNode = newNode;
        }
        currentNode.right = nextNode;
    }

    remove(value:T){
        let nodeToRemove;
        for(let node = this._first; node !== null; node = node.right){
            if(node.value === value){
                nodeToRemove = node;
            }
        }
        if(nodeToRemove === null){
            return;
        }

        for(let node = nodeToRemove.right; node !== null; node = node.right){
            node.index--;
        }
        nodeToRemove.left.right = nodeToRemove.right;
    }

    removeAt(index:number){
        let nodeToRemove;
        for(let node = this._first; node !== null; node = node.right){
            if(node.index === index){
                nodeToRemove = node;
            }
        }
        if(nodeToRemove === null){
            return;
        }

        for(let node = nodeToRemove.right; node !== null; node = node.right){
            node.index--;
        }
        nodeToRemove.left.right = nodeToRemove.right;
    }

    removeFirst(){
        this._first = this._first!.right;
        for(let node = this._first; node !== null; node = node.right){
            node.index--;
        }
    }

    removeLast(){
        this._last = this._last!.left;
        this._last!.right = null;
    }

    change(index:number, value:T){
        for(let node = this._first; node !== null; node = node.right){
            if(node.index === index){
                node.value = value;
            }
        }
    }

    size(){
        if(this._last === null){
            return 0;
        }
        return this._last!.index + 1;
    }

    clear(){
        this._first = null;
        this._last = null;
    }

    clone(){
        const values = [];
        for(let node = this._first; node !== null; node = node.right){
            values.push(node.value);
        }
        return new LinkedList<T>(...values);
    }

    toArray(){
        const values = [];
        for(let node = this._first; node !== null; node = node.right){
            values.push(node.value);
        }
        return values;
    }

}

const list = new LinkedList<number>(1, 2, 3, 4, 5);
// console.log(list.first());
// console.log(list.last());
// list.addFirst(0);
// list.addLast(6);
// console.log(list.first());
// console.log(list.last());
console.log(list.size());
list.insert(3, 21, 22, 23, 24, 25);
console.log(list.size());
// for(let e of list){
//     console.log(e);
// }
// console.log(list.last());