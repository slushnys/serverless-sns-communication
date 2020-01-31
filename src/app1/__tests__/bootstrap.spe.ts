// @ts-nocheck
const { spawn } = require('child_process')
var request = require('supertest')

// import * as serverless from 'serverless'

let slsOfflineProcess

beforeAll(async function(d) {
    // increase mocha timeout for this hook to allow sls offline to start

    console.log('[Tests Bootstrap] Start')
    // const sls = await new serverless()
    const serverless = new (require('serverless'))()
    serverless.init()
    console.log(serverless.service.getAllFunctions())

    // startSlsOffline()
    await startSlsOffline(function(err) {
        if (err) {
            return d(err)
        }
        d()
    })
    d()
    console.log('[Tests Bootstrap] Done')
})

afterAll(function(d) {
    console.log('[Tests Teardown] Start')

    stopSlsOffline()
    d()
    console.log('[Tests Teardown] Done')
})

// Helper functions

async function startSlsOffline(d) {
    slsOfflineProcess = spawn('sls', ['offline', 'start', '-port', '5744'])

    console.log(`Serverless: Offline started with PID : ${slsOfflineProcess.pid}`)

    // allows checking output in test results
    global.slsOfflineProcess = slsOfflineProcess

    slsOfflineProcess.stdout.on('data', data => {
        if (data.includes('Offline listening on')) {
            console.log(data.toString().trim())

            // clean up
            slsOfflineProcess.stdout.removeAllListeners()
            slsOfflineProcess.stderr.removeAllListeners()
            d()
        }
    })

    slsOfflineProcess.stderr.on('data', errData => {
        console.log(`Error starting Serverless Offline:\n${errData}`)
        d(errData)
    })
}

function stopSlsOffline() {
    slsOfflineProcess.kill()
    console.log('Serverless Offline stopped')
}

test('error when no payload', async () => {
    console.log('im in tests')
    const response = await request('http://localhost:5744').get('/all')
    expect(response.status).toBe(400)
    expect(response.body).toBe({ message: 'Payload is missing' })
})
