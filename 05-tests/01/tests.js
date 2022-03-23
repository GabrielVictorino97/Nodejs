const assert = require('assert')
const { obterPessoas, obterTodasPessoas } = require('./service')

var chai = require('chai');
const nock = require('nock')
const chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

describe('Star Wars Tests', function() {
    this.beforeAll(() => {
        const response = {
            "count": 1,
            "next": null,
            "previous": null,
            "results": [{
                "name": "R2-D2",
                "height": "96",
                "mass": "32",
                "hair_color": "n/a",
                "skin_color": "white, blue",
                "eye_color": "red",
                "birth_year": "33BBY",
                "gender": "n/a",
                "homeworld": "https://swapi.dev/api/planets/8/",
                "films": ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/", "https://swapi.dev/api/films/3/", "https://swapi.dev/api/films/4/", "https://swapi.dev/api/films/5/", "https://swapi.dev/api/films/6/"],
                "species": ["https://swapi.dev/api/species/2/"],
                "vehicles": [],
                "starships": [],
                "created": "2014-12-10T15:11:50.376000Z",
                "edited": "2014-12-20T21:17:50.311000Z",
                "url": "https://swapi.dev/api/people/3/"
            }]
        }
        nock('https://swapi.dev/api/people')
            .get('/?search=r2-d2&format=json')
            .reply(200, response)
    })

    it('deve buscar o r2-d2 com o formato correto', async() => {
        const expected = [{
            nome: 'R2-D2',
            peso: '96'
        }]
        const nomeBase = `r2-d2`
        const resultado = await obterPessoas(nomeBase)
        assert.deepEqual(resultado, expected)
    })
})

describe('Star Wars Tests full', () => {
    // this.beforeAll(() => {
    //     nock('https://swapi.dev/api/people')
    //         .get('/?format=json').end((err, res) => {
    //             res.should.have(200)
    //         })
    //         .reply(200, resultado)
    // })
    // res.should.have.status(200);
    it('deve buscar todos personagens de star wars',(done) => {
        chai.request('https://swapi.dev/api/people')
            .get('/?format=json')
            .end((err, res) => {
                res.statusCode.should.statusCode(200)
                // res.should.to.have.status(200);
                // res.body.should.be.a('array');
                done();
            });
    });
});