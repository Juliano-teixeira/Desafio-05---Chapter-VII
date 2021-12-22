/// <reference types="cypress" />
import req from '../support/api/request'
import asser from '../support/api/assertions'
context('Ping', () => {
    it('GET Healthcheck @healthcheck', () => {
        req.getPing().then(getPingResponse => {
            asser.shoulHaveStatus(getPingResponse, 201)
        })

    });
});