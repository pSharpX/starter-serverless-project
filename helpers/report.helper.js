const getPersonalInformationSection = ({
    names = "{VALOR}",
    area = "{VALOR}",
    description = "{VALOR}",
    date = "{VALOR}"
} = {}) => {
    return {
        style: "tableContent",
        border: [false, false, false, false],
        table: {
            widths: [120, "*"],
            body: [
                [{
                    text: 'NOMBRES Y APELLIDOS:',
                    alignment: 'left',
                    bold: true,
                    border: [false, false, false, false]
                }, {
                    text: names,
                    alignment: 'left',
                    border: [false, false, false, true]
                }],
                [{
                    text: 'AREA:',
                    alignment: 'left',
                    bold: true,
                    border: [false, false, false, false]
                }, {
                    text: area,
                    alignment: 'left',
                    border: [false, false, false, true]
                }],
                [{
                    text: 'MOTIVO:',
                    alignment: 'left',
                    bold: true,
                    border: [false, false, false, false]
                }, {
                    text: description,
                    alignment: 'left',
                    border: [false, false, false, true]
                }],
                [{
                    text: 'FECHA:',
                    alignment: 'left',
                    bold: true,
                    border: [false, false, false, false]
                }, {
                    text: date,
                    alignment: 'left',
                    border: [false, false, false, true]
                }]
            ]
        },
    };
};

const getTypefReportSection = ({
    type = "{V}"
} = {}) => {
    return {
        style: "tableContent",
        border: [false, false, false, false],
        table: {
            widths: [100, 15, 120, 15],
            body: [
                [{
                    text: 'TARDANZA',
                    border: [false, false, false, false]
                }, {
                    text: type,
                    alignment: 'center',
                    border: [true, true, true, true]
                }, {
                    text: 'NO MARCAR INGRESO',
                    border: [false, false, false, false]
                }, {
                    text: type,
                    alignment: 'center',
                    border: [true, true, true, true]
                }],
                [{
                    text: 'EXTRA',
                    border: [false, false, false, false]
                }, {
                    text: type,
                    alignment: 'center',
                    border: [true, true, true, true]
                }, {
                    text: 'NO MARCAR SALIDA',
                    border: [false, false, false, false]
                }, {
                    text: type,
                    alignment: 'center',
                    border: [true, true, true, true]
                }],
                [{
                    text: 'PERMISO',
                    border: [false, false, false, false]
                }, {
                    text: type,
                    alignment: 'center',
                    border: [true, true, true, true]
                }, {
                    text: '',
                    border: [false, false, false, false]
                }, {
                    text: '',
                    border: [false, false, false, false]
                }]
            ]
        },
    };
};

const getCommentSection = (comment = "{VALOR}") => {
    return {
        style: "tableContent",
        border: [false, false, false, false],
        table: {
            widths: [80, 120],
            body: [
                [{
                    text: 'COMENTARIO',
                    border: [false, false, false, false]
                }, {
                    text: comment,
                    border: [false, false, false, false]
                }]
            ]
        },
    }
};

const getPermissionDatesSection = ({
    permissionDate = "{VALOR}",
    fromHour = "{VALOR}",
    toHour = "{VALOR}",
    deliveryDate = "{VALOR}",
    deliveryHour = "{VALOR}"
} = {}) => {
    return {
        style: "tableContent",
        border: [true, true, true, true],
        table: {
            widths: ["*"],
            body: [
                [{
                    border: [false, false, false, false],
                    table: {
                        widths: [80, 40, 50, 40, 50, 40],
                        body: [
                            [{
                                text: 'FECHA DE PERMISO:',
                                bold: true,
                                border: [false, false, false, false]
                            }, {
                                text: permissionDate,
                                border: [false, false, false, true]
                            }, {
                                text: 'DESDE LAS:',
                                bold: true,
                                border: [false, false, false, false]
                            }, {
                                text: fromHour,
                                border: [false, false, false, true]
                            }, {
                                text: 'HASTA LAS:',
                                bold: true,
                                border: [false, false, false, false]
                            }, {
                                text: toHour,
                                border: [false, false, false, true]
                            }]
                        ]
                    },
                }],
                [{
                    border: [false, false, false, false],
                    table: {
                        widths: [140, 40, 30, 40],
                        body: [
                            [{
                                text: 'JUSTIFICACIÓN ENTREGADA EL DIA:',
                                bold: true,
                                border: [false, false, false, false]
                            }, {
                                text: deliveryDate,
                                border: [false, false, false, true]
                            }, {
                                text: 'A LAS:',
                                bold: true,
                                border: [false, false, false, false]
                            }, {
                                text: deliveryHour,
                                border: [false, false, false, true]
                            }]
                        ]
                    },
                }]
            ]
        },
    };
};

const getSignaturesSection = () => {
    return {
        style: "signatureSection",
        border: [false, false, false, false],
        table: {
            widths: ["*", 10, "*", 10, "*"],
            body: [
                [{
                    text: 'FIRMA COLABORADOR',
                    bold: true,
                    border: [false, true, false, false],
                }, {
                    text: '',
                    border: [false, false, false, false],
                }, {
                    text: 'FIRMA JEFATURA DE AREA',
                    bold: true,
                    border: [false, true, false, false],
                }, {
                    text: '',
                    border: [false, false, false, false],
                }, {
                    text: 'FIRMA GERENTE DE ADMINISTRACION',
                    bold: true,
                    border: [false, true, false, false],
                }]
            ]
        },
    };
};


const getReportSection = ({
    date,
    hour
} = {}) => {
    return {
        style: "columnContent",
        table: {
            widths: ["*"],
            body: [
                [{
                    style: "tableHeader",
                    text: 'FORMATO DE JUSTIFICACIÓN GENERAL',
                    border: [true, true, true, false]
                }],
                [{
                    style: "tableContent",
                    table: {
                        widths: ["*"],
                        heights: [20, 50, 70],
                        body: [
                            [getPersonalInformationSection()],
                            [getTypefReportSection()],
                            [getCommentSection()]
                        ]
                    }
                }],
                [getPermissionDatesSection()],
                [getSignaturesSection()]
            ]
        }
    };
};

module.exports = {
    getPersonalInformationSection,
    getTypefReportSection,
    getCommentSection,
    getPermissionDatesSection,
    getReportSection,
    getSignaturesSection,
}