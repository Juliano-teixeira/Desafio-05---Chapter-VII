class Assertions {
    shoulHaveStatus(response, status) {
        expect(response.status).eq(status)
    }
    validateContractOf(response, schema) {
        return cy.wrap(response.body).should(
            schema
        )
    }
    bookingIdIsNotNull(response) {
        return expect(response.body.bookingid, 'Validando se o ID foi criado').to.not.be.null
    }
    validateTimeExecution(response, tempoEsperado) {
        return expect(response.duration).lessThan(tempoEsperado)
    }

    defaultHeaderAreOK(response) {
        return expect(response.headers).to.include({
            server: 'Cowboy',
            connection: 'keep-alive'
        })
    }
}
export default new Assertions()