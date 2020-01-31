export const inactiveCompanyResponse = {
    vbo_id: '0599010000360673',
    locatie: { lon: '4.48955658018247', lat: '51.8898488049787' },
    plaats: 'Rotterdam',
    datum_oprichting: '2007-12-10',
    postcode: '3083CZ',
    dossiernummer: '24426075',
    type: 'Hoofdvestiging',
    werknemers: 1,
    pand_id: '0599100000690284',
    omschrijving: 'Beheermaatschappij.',
    subdossiernummer: '0000',
    updated_at: '2019-08-08',
    straat: 'Wevershoekstraat',
    huisnummer: '582',
    actief: false,
    huisnummertoevoeging: 'C',
    bestaandehandelsnaam: ['Johannes Hendrikus Holding B.V. i.o.'],
    sbi: [6420],
    soort_onderneming: 'Besloten vennootschap (B.V.)',
    handelsnaam: 'Johannes Hendrikus Holding B.V. i.o.',
    _links: {
        self: {
            href:
                '/openkvk/hoofdvestiging-24426075-0000-johannes-hendrikus-holding-bv-io?ovio-api-key=6f52d195df4b10f3c923eadb310a74c410f0d6475b3d224220f6ef818de47bcc&',
        },
    },
}

export const activeCompanyResponse = {
    vbo_id: '1659010000003335',
    locatie: {
        lon: '5.6801046290436',
        lat: '51.5048764168317',
    },
    btw: 'NL859173707B01',
    plaats: 'Aarle-Rixtel',
    datum_oprichting: '2018-09-01',
    vestigingsnummer: '000040712761',
    postcode: '5735SB',
    dossiernummer: '72612681',
    type: 'Hoofdvestiging',
    werknemers: 2,
    pand_id: '1659100000001557',
    non_mailing_indicatie: false,
    omschrijving: '',
    naamsamenwerkingsverband: ['V.O.F. van de Sande'],
    rsin: '859173707',
    subdossiernummer: '0000',
    updated_at: '2019-08-06',
    straat: 'De Wolfsputten',
    huisnummer: '6',
    actief: true,
    bestaandehandelsnaam: ['V.O.F. van de Sande'],
    sbi: [93125],
    handelsnaam: 'V.O.F. van de Sande',
    _links: {
        self: {
            href:
                '/openkvk/hoofdvestiging-72612681-0000-vof-van-de-sande?ovio-api-key=6f52d195df4b10f3c923eadb310a74c410f0d6475b3d224220f6ef818de47bcc&',
        },
    },
}

export const companyNotFoundResponse = {
    error: 'test-company niet gevonden.',
}
