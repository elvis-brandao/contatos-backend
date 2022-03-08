const controller = {
    index: (req, res) => {
        return console.log('index');
    },
    show: (req, res) => {
        return console.log('show');
    },
    create: (req, res) => {
        return console.log('create');
    },
    destroy: (req, res) => {
        return console.log('destroy');
    },
    update: (req, res) => {
        return console.log('update');
    },
    search: (req, res) => {
        return console.log('update');
    }
};

module.exports = controller;