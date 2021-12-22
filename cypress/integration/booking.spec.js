/// <reference types="cypress" />

import req from '../support/api/request'
import contratos from '../support/api/contratos'
import assertions from '../support/api/assertions'

context('Booking', () => {
    before(() => {
        req.doAuth()
    });
    it('Validar o contrato do GET Booking', () => {
        req.getBooking().then(getBookingResponse => {
            expect(getBookingResponse.status).equal(200)
            assertions.validateContractOf(getBookingResponse, contratos.getBookingSchema())
        })
    });

    it('Criar reserva com sucesso', () => {
        req.postBooking()
            .then(postBookingResponse => {
                assertions.shoulHaveStatus(postBookingResponse, 200)
                assertions.bookingIdIsNotNull(postBookingResponse)
                assertions.validateTimeExecution(postBookingResponse, 900)
                assertions.defaultHeaderAreOK(postBookingResponse)
            })
    });

    it('Tentar alterar uma reserva sem informar o token', () => {
        req.postBooking()
            .then(postBookingResponse => {
                req.UpdateBookingSemToken(postBookingResponse).then(putBookingResponse => {
                    assertions.shoulHaveStatus(putBookingResponse, 403)
                    expect(putBookingResponse.body).eq('Forbidden')
                })
            })
    });

    it('Alterar uma reserva com sucesso', () => {
        req.postBooking()
            .then(postBookingResponse => {
                req.UpdateBooking(postBookingResponse).then(putBookingResponse => {
                    assertions.shoulHaveStatus(putBookingResponse, 200)
                })
            })
    });

    it('Deletar uma reserva com sucesso', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBooking => {
                assertions.shoulHaveStatus(deleteBooking, 201)
            })
        })
    });

    it('Alterar reserva inexistente', () => {
        req.updateReservaInexistente().then(UpdateBooking => {
            assertions.shoulHaveStatus(UpdateBooking, 405)
        })
    });

    it('tentar alterar uma reserva com token inválido', () => {
        req.postBooking().then(postBookingResponse => {
            req.UpdateBookingComTokenInvalido(postBookingResponse).then(updateTokenInvalidoResponse => {
                assertions.shoulHaveStatus(updateTokenInvalidoResponse, 403)
            })

        })
    });

    it('tentar excluir uma reserva inexistente ', () => {
        req.deleteReservaInexistente().then(deleteReservaInexistente =>{
            assertions.shoulHaveStatus(deleteReservaInexistente, 405)
        })
    });
});
