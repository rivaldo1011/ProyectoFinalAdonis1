import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import auth from 'App/Models/auth'

export default class AuthController {

    public async register({ request, response }: HttpContextContract) {
        const validations = await schema.create({
          email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
          username: schema.string({ trim: true }, [
            rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
          ]),
          password: schema.string({}, [rules.minLength(8)]),
        })
        const data = await request.validate({ schema: validations })
        const user = await auth.create(data)
        return response.created(user)
      }
}
