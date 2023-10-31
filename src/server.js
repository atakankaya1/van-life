import { createServer, Model, Response } from "miragejs"


export function makeServer({ environment = 'test' } = {}) {
    let server = createServer({
    models: {
        vans: Model,
        users: Model
    },

    seeds(server) {
        
        server.create("user", { id: "123", email: "a@a.com", password: "a123", name: "Ata" })
        server.create("user", { id: "456", email: "b@b.com", password: "b123", name: "Batu" })
        server.create("user", { id: "789", email: "c@c.com", password: "c123", name: "Ceku" })
    },

    routes() {
        this.namespace = "api"
        this.logging = false
        this.passthrough("https://firestore.googleapis.com/**")

        this.post("/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody)
            const foundUser = schema.users.findBy({ email, password })
            if (!foundUser) {
                return new Response(401, {}, { message: "No user with those credentials found!" })
            }

            foundUser.password = undefined
            return {
                user: foundUser,
                token: "Your tokens."
            }
        })
    }
})

return server;
}