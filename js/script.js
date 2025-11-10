const resultatSectionElement = document.getElementById('resultat');
const chiffreButtonElements = document.querySelectorAll('.chiffre');
const operateurButtonElements = document.querySelectorAll('.operateur');
const egalButtonElement = document.getElementById('egal');
const pointButtonElement = document.getElementById('point');
const clearButtonElement = document.getElementById('clear');
const deleteButtonElement = document.getElementById('delete');

let currentOperation = '';
let displayedResult = false;

for (const chiffreButtonElement of chiffreButtonElements) {
    chiffreButtonElement.addEventListener('click', (event) => {
        // Si un résultat vient d’être affiché, on recommence une nouvelle opération
        if (displayedResult) {
            currentOperation = '';
            displayedResult = false;
        }
        currentOperation += event.currentTarget.dataset.chiffre;
        resultatSectionElement.textContent = currentOperation;
    });
}

for (const operateurButtonElement of operateurButtonElements) {
    operateurButtonElement.addEventListener('click', (event) => {
        // Évite deux opérateurs à la suite
        if (currentOperation === '' || /[+\-*/]$/.test(currentOperation)) {
            return;
        }
        currentOperation += event.currentTarget.dataset.operateur;
        resultatSectionElement.textContent = currentOperation;
        displayedResult = false;
    });
}

egalButtonElement.addEventListener('click', () => {
    try {
        // Remplace les symboles visuels par les bons opérateurs
        const expression = currentOperation.replace(/x/g, '*').replace(/÷/g, '/');
        const result = eval(expression);
        resultatSectionElement.textContent = result;
        currentOperation = result.toString();
        displayedResult = true;
    } catch {
        resultatSectionElement.textContent = 'Erreur';
        currentOperation = '';
    }
});

pointButtonElement.addEventListener('click', () => {
    // Ne pas ajouter deux points dans le même nombre
    const parts = currentOperation.split(/[+\-*/]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes('.')) {
        return;
    }
    currentOperation += '.';
    resultatSectionElement.textContent = currentOperation;
});

clearButtonElement.addEventListener('click', () => {
    currentOperation = '';
    resultatSectionElement.textContent = '';
});

deleteButtonElement.addEventListener('click', () => {
    currentOperation = currentOperation.slice(0, -1);
    resultatSectionElement.textContent = currentOperation;
});