let users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'María García', email: 'maria@example.com' },
    { id: 3, name: 'Oscar Ubaldo', email: 'oscar@example.com' }
];

const apiController = {
    getUsers: (req, res) => {
        res.json({
            status: 'success',
            data: users
        });
    },

    createUser: (req, res) => {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Nombre y email son requeridos'
            });
        }

        const newUser = {
            id: users.length + 1,
            name,
            email
        };

        users.push(newUser);

        res.status(201).json({
            status: 'success',
            data: newUser
        });
    },

    getUserById: (req, res) => {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            status: 'success',
            data: user
        });
    }
};

module.exports = apiController;
