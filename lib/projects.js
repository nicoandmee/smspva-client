const errorCodes = ['5', '6', '7'];

const projects = [
    { service: 'google', id: 'opt1' },
    { service: 'zoho', id: 'opt93' },
    { service: 'venmo', id: 'opt85' },
];

exports.serviceToPID = { }
exports.pidToService = { }

projects.forEach((project) => {
    const service = project.service;
    const id = project.id;
  
    exports.serviceToPID[service] = id;
    exports.pidToService[id] = service;
});
exports.errorCodes = errorCodes;
