import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { mockToken, responseLoginError, responseLoginOk } from './mocks/users.mock';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/usersModel';

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test endpoint /login/validate', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Returns an object with role and the status 200', async () => {
    sinon.stub(jwt, 'verify').callsFake(() => { data: { email: 'admin@admin.com' } });
    sinon.stub(User, 'findOne').resolves(responseLoginOk as unknown as User);

    const { status, body } = await chai.request(app).get('/login/validate')
      .set("authorization", mockToken.token);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(responseLoginOk);
  });

  it('Returns an obeject with an message and status 401 on error', async () => {
    sinon.stub(jwt, 'verify').callsFake(() => { data: { email: "email@invalido.com" } });
    sinon.stub(User, 'findOne').resolves(responseLoginError as unknown as User);

    const { status, body } = await chai.request(app).get('/login/validate')
      .set("authorization", mockToken.token);

    expect(status).to.be.equal(401);
    expect(body).to.be.equal(responseLoginError);
  })
});