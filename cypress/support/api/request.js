class Requests {
    getPing() {
        return cy.request({
            url: 'ping',
            method: 'GET'
        })
    }

    getBooking() {
        return cy.request({
            url: '/booking/1',
            method: 'GET'
        })
    }
    postBooking() {
        return cy.request({
            method: 'POST',
            url: '/booking',
            body:
            {
                "firstname": "Via cypress",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        })
    }
    UpdateBookingSemToken(response) {
        const id = response.bookingid
        return cy.request({
            failOnStatusCode: false,
            url: `/booking/${id}`,
            method: 'PUT',
            body: {
                "firstname": "Via PUT cypress",
            }
        })
    }

    UpdateBooking(response) {
        const id = response.body.bookingid
        return cy.request({
            failOnStatusCode: false,
            url: `/booking/${id}`,
            method: 'PUT',
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "valida",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        })
    }

    postAuth() {
        return cy.request({
            method: 'POST',
            url: '/auth',
            body: {
                "username": "admin",
                "password": "password123"
            }
        })
    }
    doAuth() {
        this.postAuth().then(responseToken => {
            const token = responseToken.body.token
            Cypress.env('token', token)
        })
    }

    deleteBooking(response) {
        const id = response.body.bookingid
        return cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `/booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            }
        })
    }

    deleteReservaInexistente() {
        return cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: '/booking/9999ine',
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            }
        })
    }

    updateReservaInexistente() {
        return cy.request({
            failOnStatusCode: false,
            url: 'booking/9999ine',
            method: 'PUT',
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "valida",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        })
    }

    UpdateBookingComTokenInvalido(response) {
        const id = response.body.bookingid
        return cy.request({
            failOnStatusCode: false,
            url: `/booking/${id}`,
            method: 'PUT',
            headers: {
                Cookie: 'token=invalido'
            },
            body: {
                "firstname": "valida",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        })
    }
}
export default new Requests()