function main() {
    const firstComputer = {
        secretNumber: NaN,
        name: 'Компьютер 1',
        
        createSecretNumber(min, max) {
            this.secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        compareWithSecretNumber(num) {
            if (num === this.secretNumber) {
                this.secretNumber = NaN;
                return { result: 0, message: `${this.name}: Угадал!` };
            }
            return num > this.secretNumber
                ? { result: -1, message: `${this.name}: Меньше.` }
                : { result: 1, message: `${this.name}: Больше.` };
        }
    };

    const secondComputer = {
        left: 1,
        right: 100,
        middle: 0,
        name: 'Компьютер 2',
        
        createMiddleNumber() {
            this.middle = Math.floor((this.left + this.right) / 2);
        },
        
        createRange(left, right) {
            this.left = left;
            this.right = right;
        },
        
        getMessage() {
            return `${this.name}: Пробую число ${this.middle}.`;
        }
    };

    
    secondComputer.createRange(1, 100);
    firstComputer.createSecretNumber(secondComputer.left, secondComputer.right);

    console.clear();
    let attempts = 0;

    while (true) {
        secondComputer.createMiddleNumber();
        const middle = secondComputer.middle;
        const { result, message } = firstComputer.compareWithSecretNumber(middle);

        
        console.log(secondComputer.getMessage());
        console.log(message);
        console.log('\n');

        attempts++;

        if (result === 0) {
            console.log(`${secondComputer.name} угадал число за ${attempts} попыток!`);
            break;
        }

        
        if (result === 1) {
            secondComputer.createRange(middle + 1, secondComputer.right);
        } else {
            secondComputer.createRange(secondComputer.left, middle - 1);
        }
    }
}

main();
