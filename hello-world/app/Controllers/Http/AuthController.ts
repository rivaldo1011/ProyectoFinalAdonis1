import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import 'App/Models/auth'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import auth from 'App/Models/auth'

export default class AuthController {
  public async Login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.attempt(email, password)
    return token.toJSON()
  }
  public async register({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'auths', column: 'email' })]),
      username: schema.string({ trim: true }, [
        rules.unique({ table: 'auths', column: 'username', caseInsensitive: true }),
      ]),
      tipo_usuario: schema.number(),
      password: schema.string({}, [rules.minLength(8)]),
    })
    const data = await request.validate({ schema: validations })
    const user = await auth.create(data)
    return response.created(user)
  }
  public async Logout({ auth, response }) {
    try {
      await auth.use('api').authenticate()
      await auth.use('api').revoke()
      return true
    } catch {
      return response.badRequest('No existe el usuario')
    }
  }
  public async VerificarToken({ auth }) {
    try {
      await auth.use('api').authenticate()
      return true
    } catch {
      return false
    }
  }
  public async getUser({ auth }) {
    await auth.use('api').authenticate()
    const user = auth.use('api').user.$attributes
    return user
  }
}
