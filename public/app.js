async function testEndpoint(endpoint, method) {
    const responseArea = document.getElementById('response-area');
    responseArea.textContent = 'Cargando...';

    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (method === 'POST') {
            options.body = JSON.stringify({
                name: 'Usuario de Prueba',
                email: 'prueba@example.com'
            });
        }

        const response = await fetch(endpoint, options);
        const data = await response.json();

        responseArea.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        responseArea.textContent = `Error: ${error.message}`;
    }
}