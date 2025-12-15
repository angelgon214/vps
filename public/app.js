async function testEndpoint(endpoint, method) {
    const responseArea = document.getElementById('response-area');
    responseArea.textContent = 'Cargando...';

    try {
        const response = await fetch(endpoint, { method });
        const data = await response.json();
        responseArea.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        responseArea.textContent = `Error: ${error.message}`;
    }
}

async function createUser() {
    const responseArea = document.getElementById('response-area');
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;

    if (!name || !email) {
        responseArea.textContent = 'Error: Por favor completa todos los campos';
        return;
    }

    responseArea.textContent = 'Cargando...';

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        const data = await response.json();
        responseArea.textContent = JSON.stringify(data, null, 2);

        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
    } catch (error) {
        responseArea.textContent = `Error: ${error.message}`;
    }
}

async function getUserById() {
    const responseArea = document.getElementById('response-area');
    const userId = document.getElementById('userId').value;

    if (!userId) {
        responseArea.textContent = 'Error: Por favor ingresa un ID';
        return;
    }

    responseArea.textContent = 'Cargando...';

    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        responseArea.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        responseArea.textContent = `Error: ${error.message}`;
    }
}